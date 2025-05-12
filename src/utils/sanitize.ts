import {Request, Response, NextFunction} from "express";

const sanitizeRequest = (req:Request, res:Response, next:NextFunction) => {
    const sanitize = (obj: Record<string, any>) => {
        for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            sanitize(obj[key]);
        } else if (typeof obj[key] === 'string') {
            // Remove potential XSS script tags
            obj[key] = obj[key].replace(/<.*?script.*?>.*?<\/.*?script.*?>/gi, '');
        }

        // Remove NoSQL operators like $gt, $ne, etc.
        if (key.startsWith('$') || key.includes('.')) {
            delete obj[key];
        }
        }
    };

    if (req.body && typeof req.body === 'object') sanitize(req.body);
    if (req.query && typeof req.query === 'object') sanitize(req.query);
    if (req.params && typeof req.params === 'object') sanitize(req.params);

    next();
};

export default sanitizeRequest;