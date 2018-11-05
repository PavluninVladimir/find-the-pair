import { createLogger, transports, format } from 'winston';

const myFormat = format.printf(info => {
    return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});

export const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.label({ label: 'find-the-pair' }),
        format.timestamp(),
        myFormat
    ),
    transports: [
        new transports.Console(),
    ]
});
