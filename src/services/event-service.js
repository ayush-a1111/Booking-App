import { STATUS_CODES } from '../constants/index.js';
import { EventRepository } from '../respositories/index.js';
import { AppError } from '../utils/errors/app-error.js';

const eventRepository = new EventRepository();

const createEvent = async (data) => {
    try {
        const event = await eventRepository.create(data);
        return event;
    } catch (error) {
        console.log(error);
        if (error.name == 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach(({ message }) => {
                explanation.push(message);
            });
            throw new AppError(explanation, STATUS_CODES.BAD_REQUEST);
        }
        if (error.name == 'SequelizeUniqueConstraintError') {
            throw new AppError(
                ['Entry must be unique'],
                STATUS_CODES.BAD_REQUEST
            );
        }
        throw new AppError(
            'Something went wrong while creating new Event',
            STATUS_CODES.INTERNAL_SERVER
        );
    }
};

const getEvent = async (data) => {
    try {
        const event = await eventRepository.get(data);
        return event;
    } catch (error) {
        if (error.statusCode === STATUS_CODES.NO_DATA_FOUND) {
            throw new AppError('No such event is found', error.statusCode);
        }
        throw new AppError(
            'Something went wrong while fetching the Event',
            STATUS_CODES.INTERNAL_SERVER
        );
    }
};

const updateEvent = async (data) => {
    try {
        const event = await eventRepository.update(data);
        return event;
    } catch (error) {
        console.log(error);
        if (error.name == 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach(({ message }) => {
                explanation.push(message);
            });
            throw new AppError(explanation, STATUS_CODES.BAD_REQUEST);
        }
        if (error.name == 'SequelizeUniqueConstraintError') {
            throw new AppError(
                ['Entry must be unique'],
                STATUS_CODES.BAD_REQUEST
            );
        }
        throw new AppError(
            'Something went wrong while creating new Event',
            STATUS_CODES.INTERNAL_SERVER
        );
    }
};

//TODO
const getAllEvents = async (data) => {
    try {
        const event = await eventRepository.getAll(data);
        return event;
    } catch (error) {
        throw new AppError(
            'Something went wrong while fetching all Events',
            STATUS_CODES.INTERNAL_SERVER
        );
    }
};

export { createEvent, getAllEvents, getEvent, updateEvent };
