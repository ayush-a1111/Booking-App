import { v5 as uuidv5 } from 'uuid';
import moment from 'moment-timezone';

const paginate = (query, { page, pageSize }) => {
    const offset = page * pageSize;
    const limit = pageSize;

    return {
        ...query,
        offset,
        limit,
    };
};

const generateUUID = (key, identifier) => {
    const uuid = uuidv5(key, identifier);
    return uuid;
};

const convertToYYYYMMDD = (dateInput) => {
    if (typeof dateInput === 'number') {
        // Case 1: Date.now() timestamp (milliseconds)
        return moment(dateInput).format('YYYY-MM-DD');
    } else if (moment(dateInput, 'DD/MM/YYYY', true).isValid()) {
        // Case 2: "DD/MM/YYYY" format
        return moment(dateInput, 'DD/MM/YYYY').format('YYYY-MM-DD');
    } else {
        try {
            // Case 3 & 4: ISO 8601 & timezone formats
            return moment.parseZone(dateInput).format('YYYY-MM-DD');
        } catch (error) {
            throw new Error('Invalid date format');
        }
    }
};

export { paginate, generateUUID, convertToYYYYMMDD };
