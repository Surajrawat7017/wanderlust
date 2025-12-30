const listing = require('../models/listing');
const Review = require('../models/review');
const mbxGeoCoding = require('@mapbox/mapbox-sdk/services/geocoding');

const mapToken = process.env.mapToken;
const geocodingClient = mbxGeoCoding({ accessToken: mapToken });

module.exports.RenderIndexPage = async (req, res) => {
    let { Search, category } = req.query;

    if ((!Search || Search === '') && (!category || category === '')) {
        let data = await listing.find();
        return res.render('listings/index.ejs', { data });
    }

    if (!category || category === '') {
        let Searchdata = await listing.find({
            $or: [
                { location: { $regex: Search, $options: 'i' } },
                { country: { $regex: Search, $options: 'i' } }
            ]
        });

        if (Searchdata.length === 0) {
            req.flash('error', 'Sorry Listing not Available');
            return res.redirect('/listings');
        }
        return res.render('listings/index.ejs', { data: Searchdata });
    }

    let categoryData = await listing.find({ category });
    if (categoryData.length === 0) {
        req.flash('error', 'Sorry Listing not Available');
        return res.redirect('/listings');
    }

    res.render('listings/index.ejs', { data: categoryData });
};

module.exports.RenderNewPage = (req, res) => {
    res.render('listings/new.ejs');
};

module.exports.CreateNewList = async (req, res) => {
    let response = await geocodingClient
        .forwardGeocode({
            query: `${req.body.listing.location}, ${req.body.listing.country}`,
            limit: 1
        })
        .send();

    let url = req.file.path;
    let filename = req.file.filename;

    let newList = req.body.listing;
    newList.owner = req.user._id;
    newList.image = { filename, url };
    newList.geometry = response.body.features[0].geometry;

    let list = new listing(newList);
    await list.save();

    req.flash('success', 'New Listing Created');
    res.redirect('/listings');
};

module.exports.RenderEditPage = async (req, res) => {
    let { id } = req.params;
    let list = await listing.findById(id);

    let imgUrl = list.image.url.replace('/upload', '/upload/e_blur:300');
    res.render('listings/edit.ejs', { list, imgUrl });
};

module.exports.EditPage = async (req, res) => {
    let { id } = req.params;

    let response = await geocodingClient
        .forwardGeocode({
            query: `${req.body.listing.location}, ${req.body.listing.country}`,
            limit: 1
        })
        .send();

    let updatedData = req.body.listing;
    let Listing = await listing.findByIdAndUpdate(id, updatedData, { new: true });

    if (req.file) {
        Listing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    }

    Listing.geometry = response.body.features[0].geometry;
    await Listing.save();

    req.flash('success', 'Listing Updated');
    res.redirect(`/listings/${id}`);
};

module.exports.DeletePage = async (req, res) => {
    let { id } = req.params;
    await listing.findByIdAndDelete(id);

    req.flash('success', 'Listing Deleted');
    res.redirect('/listings');
};

module.exports.RenderShowPage = async (req, res) => {
    let { id } = req.params;

    const list = await listing.findById(id)
        .populate('owner')
        .populate({
            path: 'reviews',
            populate: {
                path: 'author'
            }
        });

    if (!list) {
        req.flash('error', 'Listing not found');
        return res.redirect('/listings');
    }

    res.render('listings/show.ejs', { list });
};
