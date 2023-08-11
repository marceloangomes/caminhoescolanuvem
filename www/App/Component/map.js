import { MapTemplate } from './Template/map.js';
export { Map };

class Map extends HTMLElement {
    constructor() {
        super();                
    }

    static Init(el, parameters) {
        el = MapTemplate(el);                       
        let script = document.createElement('script');
        script.src = 'https://maps.google.com/maps/api/js?v=3&libraries=geometry&key=AIzaSyBojyiRKpcW87ZJPFwUrcrVOGG3oAxGKXY&callback=initMap';
        script.async = true;
        
        el.appendChild(script);
        const initMap = ()=>{
            const start = parameters.address.s
            CalculateRoute()
        }
              
        const DirectionsPromise = (request) => {
            const directionsService = new google.maps.DirectionsService();
            return new Promise((resolve, reject) => {
                directionsService.route(request, (result, status)=> {
                    if (status === 'OK') {
                        resolve(result);
                    } else {
                        reject(new Error('Não foi possível calcular as distâncias, tente novamente.'));
                    }
                });
            });
        }
        
        const CalculateRoute = async (start, end) => {            
            var mapOptions = {
                zoom: 12,
                center: start,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            const map = await new google.maps.Map(el.querySelector('#map'), mapOptions);

            var request = {
                origin: start,
                destination: end,
                provideRouteAlternatives: true,
                travelMode: google.maps.TravelMode.WALKING, // Modo (DRIVING | WALKING | BICYCLING)
                unitSystem: google.maps.UnitSystem.METRIC // Sistema de medida (METRIC | IMPERIAL)                                     
            };
           
            const response = await DirectionsPromise(request);
            let directionsDisplay = await new google.maps.DirectionsRenderer();
            await directionsDisplay.setDirections(response);
            map.setCenter(response.routes[0].legs[0].start_location);            
        }
        
        
        // let markersArray = [];

        // google.maps.Map.prototype.clearMarkers = () => {
        //     markersArray.forEach(markerArray => {
        //         markerArray.setMap(null);
        //     });
        //     markersArray.length = 0;
        // };

        var mapModal = el.querySelector("#mapModal");

        var span = el.querySelector(".close");
        
        span.onclick = function () {
            mapModal.style.display = "none";
        }

        window.onclick = function (event) {
            if (event.target == mapModal) {
                mapModal.style.display = "none";
            }
        }
        return el;
    }
}