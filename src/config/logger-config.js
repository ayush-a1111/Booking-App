import { createLogger, format, transports } from 'winston';
const { combine, timestamp, label, printf } = format;

const customLogFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} :  ${level} : ${message}`;
});

const logger = createLogger({
    format: combine(
        timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
        customLogFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'combined.log' }),
    ],
});

export { logger };
