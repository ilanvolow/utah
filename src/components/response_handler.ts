import { Request, Response } from 'express';

interface HTTPRequest extends Request {

}

interface HTTPResponse extends Response {
    reply(responseName: string, content: any): void;
}

interface ResponseHandler {
    handle(request: HTTPRequest, response: HTTPResponse): void;
}

export { ResponseHandler, HTTPRequest, HTTPResponse };