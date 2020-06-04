const weatherForm = document.getElementById('weather-form')
const search = document.getElementById('user-location')






mapboxgl.accessToken = "pk.eyJ1IjoicGZ1bHRvbjQyMyIsImEiOiJjazJ2dmozbGEwOWZ5M21xaGR1aHk5cDY1In0.s87id357rwy7yRHxwqmzVg"
const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/pfulton423/cka9vxicy26ye1ipr3diajxr4",
    zoom: 1,
    center: [-122.420679, 50.772537]
})


const searchLocation = weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    const searchBtn = document.getElementById('search-submit');

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                // messageOne.textContent = data.error
                searchBtn.className = "btn btn-danger"
            } else {
                
                dataCardGenerate('data-card')
                
                const messageOne = document.querySelector('#message-1')
                const messageTwo = document.querySelector('#message-2')
                const messageThree = document.getElementById('message-3')
                messageOne.textContent = `Current meteorlogical conditions in ${data.location}:`
                messageTwo.textContent = `Temperature: ${JSON.stringify(data.forecast.temp)} degrees Faranheit`
                messageThree.textContent = `Summary: ${JSON.parse(JSON.stringify(data.forecast.summary))} `
                
                searchBtn.className = "btn btn-success"
                
                map.flyTo({
                    center: [data.longitude, data.latitude],
                    zoom: 8,
                    speed: 0.8,
                    curve: 1,
                    easing(t) {
                        return t;
                    }
                }) 

                if (map.style.imageManager.images.customMarker && map.style._layers.markers ) {
                    delete map.style.imageManager.images.customMarker
                    map.removeLayer('markers').removeSource('markers')
                    
                }


                map.loadImage("https://i.imgur.com/MK4NUzI.png", function(error, image) {
                    if (error) throw error;
   



                    map.addImage("customMarker", image);

                    map.addLayer({
                        id: "markers",
                        type: "symbol",
                        source: {
                            type: "geojson",
                            data: {
                                type: 'FeatureCollection',
                                features: [{
                                        type: 'Feature',
                                        properties: {},
                                        geometry: {
                                            type: "Point",
                                            coordinates: [data.longitude, data.latitude]                                   }
                                    }]
                                }
                        },
                        layout: {
                            "icon-image": "customMarker",
                        }
                    });
                    console.log(map.style._layers.markers)
                });                
            }
        }) 
    })
})




