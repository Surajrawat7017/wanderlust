const express=require('express');
const router=express.Router();
const wrapAsync=require('../utils/wrapAsync');
const ExpressError=require('../utils/ExpressError');
const {listingSchema}=require('../schema');
const listing = require('../models/listing');
const { LogedIn , Owner} = require('../middleware');
const listingController=require('../Controllers/listings');
const {storage}=require('../CloudConfig');
const multer=require('multer');
const upload=multer({storage});


//Validate ListingSchema
const validateListing=(req,res,next)=>{
    let{error}=listingSchema.validate(req.body);
    if(error) throw new ExpressError(400,error);
    else next();
}


router.route('/')
      .get(wrapAsync(listingController.RenderIndexPage))
      
      .post(LogedIn,upload.single('listing[image]'),validateListing,wrapAsync(listingController.CreateNewList));

router.get('/new',LogedIn,listingController.RenderNewPage);


router.route('/:id')
      .put(LogedIn,Owner,upload.single('listing[image]'),validateListing,wrapAsync(listingController.EditPage))
    
      .delete(LogedIn,Owner,wrapAsync(listingController.DeletePage))
      .get(wrapAsync(listingController.RenderShowPage))


router.get('/:id/edit' ,LogedIn,Owner,wrapAsync(listingController.RenderEditPage));

module.exports=router;


