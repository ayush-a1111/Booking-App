import { STATUS_CODES } from '../constants/index.js';
import {
    ErrorResponse,
    responseObj,
    SuccessResponse,
} from '../utils/response/index.js';
import { EventService } from '../services/index.js';

/*
POST : /events
req.body : {
                type: string,
                name: string,
                description: string,
                cast: [{}],
                duration: integer,
                genre: [""],
                language: [""],
                releaseDate: date,
                isActive: boolean
            }

*/

const createEvent = async (req, res) => {
    try {
        let {
            type,
            name,
            description,
            cast,
            duration,
            genre,
            language,
            releaseDate,
            isActive,
        } = req.body;

        const event = await EventService.createEvent({
            type,
            name,
            description,
            cast,
            duration,
            genre,
            language,
            releaseDate,
            isActive,
        });

        SuccessResponse.data = event;
        return res.status(STATUS_CODES.SUCCESS).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
};

/*
GET : /events
req.query 
*/

const getEvent = async (req, res) => {
    try {
        let query = req.query;
        const event = await EventService.getEvent(query);

        SuccessResponse.data = event;
        return res.status(STATUS_CODES.SUCCESS).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
};

/*
PATCH : /events
req.query
req.body : {
                type: string,
                name: string,
                description: string,
                cast: [{}],
                duration: integer,
                genre: [""],
                language: [""],
                releaseDate: date,
                isActive: boolean
            }
*/

const updateEvent = async (req, res) => {
    try {
        let filter = req.query;
        let updateObj = req.body;
        console.log('---Ayush', filter, updateObj);
        const event = await EventService.updateEvent({ filter, updateObj });

        SuccessResponse.data = event;
        return res.status(STATUS_CODES.SUCCESS).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
};

export { createEvent, getEvent, updateEvent };
