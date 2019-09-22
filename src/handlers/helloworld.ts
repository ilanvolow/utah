import ResponseHandler from '../components/response_handler'

import * as express from 'express';

class HelloWorldHandler implements ResponseHandler {

    public handle(request: express.Request, response: express.Response) {
        if (request.query.person_name === 'anonymous') {
            response.reply('invalidHelloResponse');
        } else {
            response.reply('successfulHelloResponse', {'message' : `Hello ${request.query.person_name || 'neighbor'}`});
        }
    }
}

export default HelloWorldHandler;
