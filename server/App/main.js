import { Sleep, AsyncForEach, BinarySearchClosest } from './library.js';
import { GetData } from './Data/Data.js';
import { CacheNodeFacade } from './Data/CacheNodeFacade.js';
import { IsValidCacheImplementation } from './Data/CacheInterface.js';
import { googleMaps, keyMaps, CalculateHaversineDistance } from './maps.js';
import { Filter } from './filter.js';
//import { SchoolHead } from './Component/schoolHead.js'
//import { SchoolClose } from './Component/schoolClose.js';
//import { SchoolNeighbor } from './Component/schoolNeighbor.js';
//import { FactoryComponent } from './Component/factoryComponent.js';
//import { Map } from './Component/map.js';
export { Update };

"use strict";

const Update = async (parameters) => {
    try {
        let cache = new CacheNodeFacade();
        if (!IsValidCacheImplementation(cache))
            throw new Error('Erro no componente: CacheNodeFacade');
        const data = await GetData(cache);
        

        const filterParsed = new Filter(data, JSON.parse(parameters));
        filterParsed.Init();
        const schoolSelected = SchoolSelected(data, filterParsed.schoolSelectId);
        const schoolsFiltered = ApplyFilter(filterParsed, data, schoolSelected);
        //POC
        //filter.addressOrigin = 'lirio dos vales, 106, São Bernardo do Campo, SP'
        //filter.addressOrigin = "R Simão da mata, 299, São Bernardo do Campo, SP"
        //filter.addressOrigin = "Av Antonio Toneto, 105, São Bernardo do Campo, SP"
        //filter.addressOrigin = "Rua Princesa Maria da Glória, 176, São Bernardo do Campo, SP"
        //filter.addressOrigin = 'R. Me. de Deus, 263 - Mooca, São Paulo - SP, 03119-000'
        //filter.addressOrigin = 'Av. Dona Ruyce Ferraz Alvim, 631 - Serraria, Diadema - SP, 09961-540';
        //filter.addressOrigin = 'Av. Fundibem, 1010 - Casa Grande, Diadema - SP, 09961-390';
        //filter.addressOrigin = 'Av. Humberto de Alencar Castelo Branco, 2563 - Chácara Dublin Paulista, São Bernardo do Campo - SP, 09851-320';
        const locationOrigin = await AddressOriginToLocation(filterParsed.addressOrigin, data.message);
        const schoolsRay = FilterSchoolsByRay(locationOrigin, schoolsFiltered);
        if (!schoolsRay)
            throw new Error(data.message.noFindedSchool);
        let wayCloses = await ProcessSchoolsRay(locationOrigin, schoolsRay);
        if (!wayCloses)
            throw new Error(data.message.noLocation);
        wayCloses = SortWays(wayCloses);
        return { "ways": FilterWays(wayCloses), "neighbors": FilterNeighbors(wayCloses) };
    } catch (error) {
        throw error;
    } finally {
        //googleMaps = undefined;
    }
}



const SchoolSelected = (data, school_id) => {
    let schoolFound = data.schools.find(school => school.selected);
    if (schoolFound)
        schoolFound.selected = false;
    if (school_id === 0)
        return false;
    schoolFound = data.schools.find(school => school.school_id == school_id);
    if (schoolFound) {
        schoolFound.selected = true;
        schoolFound.junctionsId = [];
        return schoolFound;
    }
    throw Error(data.message.noFindedSchool);
}

const ApplyFilter = (filter, data, schoolSelected) => {
    let schoolsFiltered = [];
    if (schoolSelected)
        schoolsFiltered.push(schoolSelected);
    const junctionsId = [];
    filter.parameters.forEach(parameter => {
        data.junctions.filter(junction => {
            return junction.model_id == parameter.model_id && junction.shift_id == parameter.shift_id && junction.year_id == parameter.year_id;
        }).forEach(junction => {
            junctionsId.push(junction.id);
        })
    })

    data.schools.forEach(school => {
        if (school.neighbor)
            schoolsFiltered.push(school);
        else {
            const schoolJunction = data.schoolJunctions.find(schoolJunction => school.school_id == schoolJunction.school_id)
            const junctionsIdFound = junctionsId.find(id => schoolJunction.junction.indexOf(id) > -1);
            if (junctionsIdFound) {
                const schoolFound = schoolsFiltered.find(schoolFiltered => school.school_id == schoolFiltered.school_id)
                if (schoolFound) {
                    if (!schoolFound.junctionsId)
                        schoolFound.junctionsId = [];
                    schoolFound.junctionsId.push(junctionsIdFound);
                } else {
                    let schoolFiltered = school;
                    schoolFiltered.junctionsId = [];
                    schoolFiltered.junctionsId.push(junctionsIdFound);
                    schoolsFiltered.push(schoolFiltered);
                }
            }
        }
    })
    return schoolsFiltered;
}

const ValidationSchoolsByRay = (school, locationOrigin, distanceRay) => {
    if (school.lat && school.lng) {
        const locationDestiny = { 'lat': school.lat, 'lng': school.lng };
        const distance = CalculateHaversineDistance(locationOrigin, locationDestiny);
        return distance && distance <= distanceRay;
    }
    return false;
};

const DistanceSchoolsByRay = (school, locationOrigin) => {
    if (school.lat && school.lng) {
        const locationDestiny = { 'lat': school.lat, 'lng': school.lng };
        const distance = CalculateHaversineDistance(locationOrigin, locationDestiny);
        return distance;
    }
    return false;
};

const FilterSchoolsByRay = (locationOrigin, schools) => {
    let schoolsRay = schools.filter(school => { return !school.neighbor && !school.selected });
    schoolsRay.map(school => {
        school.distanceRay = DistanceSchoolsByRay(school, locationOrigin);
    });
    schoolsRay.sort((schoolA, schoolB) => {
        return schoolA.distanceRay - schoolB.distanceRay;
    });
    const maxInd = schoolsRay.length < 5 ? schoolsRay.length - 1 : 5;
    schoolsRay = schoolsRay.slice(0, maxInd);
    const largerDistance = schoolsRay[maxInd];
    let schoolsNeighbor = schools.filter(school => { return school.neighbor && school.distanceRay <= largerDistance });
    if (schoolsNeighbor) {
        schoolsNeighbor.sort((a, b) => {
            return a.distanceRay - b.distanceRay;
        });
        schoolsNeighbor = schoolsNeighbor.slice(0, 3);
        schoolsRay = schoolsRay.concat(schoolsNeighbor);
    };
    const schoolSelected = schools.filter(school => { return school.selected });
    if (schoolSelected)
        schoolsRay.unshift(schoolSelected);
    return schoolsRay;
}

const SortWays = (ways) => {
    ways.sort((a, b) => {
        if (a.school.selected < b.school.selected)
            return 1;
        else if (a.school.selected > b.school.selected)
            return -1;
        else
            return a.distance - b.distance;
    });
    return ways;
}

const FilterWays = (ways) => {
    const schoolSelected = ways.find(way => way.school.selected);
    const wayVisions = ways.filter(way => { return !way.school.neighbor })
        .slice(0, 3 + (schoolSelected ? 1 : 0));
    wayVisions.map(way =>
        way.addressDestiny += ' escola'
    );
    return wayVisions;
}

const FilterNeighbors = (ways) => {
    return ways.filter(way => { return way.school.neighbor === true });
}

const GetDistanceMatrixPromise = (options) => {
    const service = new googleMaps.DistanceMatrixService();
    return new Promise((resolve, reject) => {
        service.getDistanceMatrix(options, (response, status) => {
            if (status === googleMaps.DistanceMatrixStatus.OK) {
                resolve(response);
            } else {
                reject(new Error('Não foi possível calcular as distâncias, tente novamente.'));
            }
        });
    });
}

const ParseLocationToString = (location) => {
    return `${location.lat},${location.lng}`;
}

const CalculateDistance = async (school, locationOrigin, locationDestiny) => {
    const response = await googleMaps.distancematrix({
        'params': {
            'origins': ParseLocationToString(locationOrigin),
            'destinations': ParseLocationToString(locationDestiny),
            'travelMode': 'walking', // Modo (DRIVING | WALKING | BICYCLING)
            'unitSystem': 'metric', // Sistema de medida (METRIC | IMPERIAL)     
            'key': keyMaps
        }
    });
    if (response.status === 'OK')
        return { "school": school, "locationOrigin": locationOrigin, "locationDestiny": locationDestiny, "distance": response.rows[0].elements[0].distance.value, "addressDestiny": response.destinationAddresses, "addressOrigin": response.originAddresses, "distanceLong": response.rows[0].elements[0].distance.text, "time": response.rows[0].elements[0].duration.text };
    else
        throw Error('Não foi possível calcular as distâncias, tente novamente.');
}

const ProcessSchoolsRay = async (locationOrigin, schoolsRay) => {
    let i = 0;
    let ways = [];
    await new Promise((resolve) => {
        AsyncForEach(schoolsRay, async (school) => {
            i++;
            if (i % 4 === 0)
                await Sleep(1010);
            const locationDestiny = { 'lat': school.lat, 'lng': school.lng };
            ways.push(await CalculateDistance(school, locationOrigin, locationDestiny));
            if (i === schoolsRay.length)
                resolve();
        });
    });
    return ways;
}

const AddressOriginToLocation = async (addressOrigin, message) => {
    const response = await googleMaps.geocode({ 'params': { 'address': addressOrigin, 'region': 'BR', 'key': keyMaps } });
    if (response.statusText === "OK") {
        const data = response.data;
        if (data.status === "ZERO_RESULTS")
            throw new Error(message.noFindedAddress);
        else if (data.status === "OK") {
            const results = response.data.results;
            const lat = results[0].geometry.location.lat;
            const lng = results[0].geometry.location.lng;
            return { 'lat': lat, 'lng': lng };
        } else
            throw new Error(message.noLocation);
    }
    else
        throw new Error(message.noLocation);
}

const CreateComponents = () => {
    const schoolHead = new FactoryComponent('school-head', SchoolHead);
    const schoolClose = new FactoryComponent('school-close', SchoolClose);
    const schoolNeighbor = new FactoryComponent('school-neighbor', SchoolNeighbor);
    const map = new FactoryComponent('map-close', Map);
    return { 'schoolHead': schoolHead, 'schoolClose': schoolClose, 'schoolNeighbor': schoolNeighbor, 'map': map };
}




