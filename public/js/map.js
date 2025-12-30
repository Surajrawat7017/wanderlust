

  const coordinates=list.geometry.coordinates;

  mapboxgl.accessToken = mapToken;
  const map = new mapboxgl.Map({
    container: 'map', 
    center: coordinates, 
    zoom: 9, 
  });


const marker1 = new mapboxgl.Marker({ color: 'red'})
.setLngLat(coordinates)
.setPopup(
  new mapboxgl.Popup({offset:25})
  .setHTML(`<h5>${list.location+','+list.country}</h5> <p>Exact Location Provided After Booking</p>`)) 
.addTo(map);




