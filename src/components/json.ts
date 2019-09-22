import express, { Express } from 'express';
import Route from './route';
import Response from './response';
import ResponseHandler from './response_handler';
import Param from './param';
import { bindExpression } from '@babel/types';
import res from 'express/lib/response';

class JSON {

    public body: any;

    static jsxFactory(args: any, children: any[]): JSON | undefined {
        if (JSON.validateJSON(args, children)) {
           const newJSON: JSON = new JSON(children[0]);
            return newJSON;
        } else {
            return;
        }
    }

    static validateJSON(args: any, children: any[]) {
        let isValid = true;

        if (children.length != 1) {
            isValid = false;
            throw new Error('JSON element must have a body');
        } else {
            const bodyObject = children[0];

            // Check to see whether we've got a string, array, or an object
            isValid = (Array.isArray(bodyObject) ||
                ((typeof bodyObject === 'string' || bodyObject instanceof String)) ||
                typeof bodyObject === 'object');

            if (!isValid) {
                throw new Error('JSON body must be a valid JSON object');
            }
        }

        return isValid;
    }

    public isRouteDelegate() {
        return true;
    }

    handleRoute(route: Route, responseRouter: express.Router): void {
        responseRouter.get(route.rpath, (req: express.Request, res: express.Response) => { res.status(200).json(this.body)});
    }

    constructor(body: string) {
        this.body = body;
    }
}

export default JSON;