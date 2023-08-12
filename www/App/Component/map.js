import { MapTemplate } from './Template/map.js';
export { Map };

class Map extends HTMLElement {
    constructor() {
        super();
    }

    static Init(el, parameters) {
        const locationOrigin = parameters.locationOrigin;
        const locationDestiny = parameters.locationDestiny;
        el = MapTemplate(el);

        const DirectionsPromise = (request) => {
            const directionsService = new google.maps.DirectionsService();
            return new Promise((resolve, reject) => {
                directionsService.route(request, (result, status) => {
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
        const elMap = el.querySelector('#map');
        const map = await new google.maps.Map(elMap, mapOptions);

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

        let markersArray = [];

        google.maps.Map.prototype.clearMarkers = () => {
            markersArray.forEach(markerArray => {
                markerArray.setMap(null);
            });
            markersArray.length = 0;
        };

        CalculateRoute(locationOrigin, locationDestiny);

        var mapModal = el.querySelector("#mapModal");

        var span = el.querySelector(".close");

        span.onclick = function () {
            mapModal.style.display = "none";
            mapModal.remove();
        }

        window.onclick = function (event) {
            if (event.target == mapModal) {
                mapModal.style.display = "none";
                mapModal.remove();
            }
        }
        return el;
    }
}