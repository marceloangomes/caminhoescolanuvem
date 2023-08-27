
export { googleMaps, keyMaps, CalculateHaversineDistance, CalculateAngleByZero };

import { Client } from '@googlemaps/google-maps-services-js';
const googleMaps = new Client({});
const keyMaps = 'AIzaSyBojyiRKpcW87ZJPFwUrcrVOGG3oAxGKXY'
const latLngZero = { 'lat': 0, 'lng': 0 };

const DegreesToRadians = (degrees) => {
    return degrees * (Math.PI / 180);
}

const RadiansToDegrees = (radians) => {
    return radians * (180 / Math.PI);
};

const CalculateHaversineDistance = (latLngA, latLngB) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = DegreesToRadians(latLngB.lat - latLngA.lat);
    const dLon = DegreesToRadians(latLngB.lng - latLngA.lng);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(DegreesToRadians(latLngA.lat)) *
        Math.cos(DegreesToRadians(latLngB.lat)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance * 1000; // km To meters
}

function SortCoordinatesByDistance(coordinates) {
    return coordinates.sort((entityA, entityB) => {
        const latLngA = { 'lat': entityA.lat, 'lng': entityA.lng };
        const latLngB = { 'lat': entityB.lat, 'lng': entityB.lng };
        const distanceA = CalculateAngle(latLngZero, latLngA);
        const distanceB = CalculateAngle(latLngZero, latLngB);
        return distanceA - distanceB;
    });
}

const CalculateAngle = (latLngA, latLngB) => {
    // Convert latitudes and longitudes to radians
    latLngA.lat = DegreesToRadians(latLngA.lat);
    latLngB.lat = DegreesToRadians(latLngB.lat);
    latLngA.lng = DegreesToRadians(latLngA.lng);
    latLngB.lng = DegreesToRadians(latLngB.lng);

    // Calculate the difference in longitudes
    const deltaLong = latLngB.lng - latLngA.lng;

    // Calculate the angle in radians
    const angleRad = Math.atan2(Math.sin(deltaLong) * Math.cos(latLngB.lat), Math.cos(latLngA.lat) * Math.sin(latLngB.lat) - Math.sin(latLngA.lat) * Math.cos(latLngB.lat) * Math.cos(deltaLong));

    // Convert angle to degrees
    return RadiansToDegrees(angleRad);
}

const CalculateAngleByZero = (latLng) => {
    return CalculateAngle(latLngZero, latLng);
}

const NextCity = (citysLatLgn, locationOrigin) => {
    const degreesCitysLatLng = citysLatLgn.map((city) => {
        return city.degreeDistance;
    })
    const cityLatLng = citysLatLgn[BinarySearchClosest(degreesCitysLatLng, CalculateAngleByZero(locationOrigin))];
    return { 'lat': cityLatLng.lat, 'lng': cityLatLng.lng };
}
