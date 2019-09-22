import * as express from 'express';

interface ResponseHandler {

    handle(request: express.Request, response: express.Response): void;
}

export default ResponseHandler