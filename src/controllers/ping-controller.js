import { responseObj } from '../utils/response/index.js';
import { STATUS_CODES } from '../constants/index.js';

const ping = (req, res) => {
    res.send(
        responseObj(true, 'Successful Ping', {}, {}, STATUS_CODES.SUCCESS)
    );
};

export { ping };
