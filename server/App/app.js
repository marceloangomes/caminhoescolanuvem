
import http from 'http';
import { Update } from './main.js';

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer(async (req, res) => {
    try {
        res.setHeader('Content-Type', 'application/json');
        const url = new URL(req.url, `http://${req.headers.host}`);
        const queryParams = url.searchParams;
        const parameters = queryParams.get('parameters');
        const messageValidation = ValidateParameters(parameters);
        if (messageValidation.message === 'OK') {
            res.statusCode = 200
            response = Update(parameters);
        }
        else {
            res.statusCode = 422;
            response = messageValidation;
        }
        res.end(JSON.stringify(response));
    } catch (error) {
        res.statusCode = 500;
        res.end(JSON.stringify(error))
    }    
})

server.listen(port, hostname, () => {

})

const ValidateParameters = (parameters) => {
    if (!parameters)
        return { "message": 'There is no parameters.' };
    parameters = JSON.parse(parameters);
    if (!parameters.hasOwnProperty("addressOrigin"))
        return { 'message': 'Missing parameter addressOrigin' };
    if (!parameters.hasOwnProperty("shiftId"))
        return { 'message': 'Missing parameter shiftId' };
    if (!parameters.hasOwnProperty("year"))
        return { 'message': 'Missing parameter year' };
    if (!parameters.hasOwnProperty("models"))
        return { 'message': 'Missing parameter models' };
    if (!parameters.hasOwnProperty("cityId"))
        return { 'message': 'Missing parameter cityId' };
    if (!parameters.hasOwnProperty("schoolSelectedId"))
        return { 'message': 'Missing parameter schoolSelectedId' };
    return { 'message': 'OK' };
}