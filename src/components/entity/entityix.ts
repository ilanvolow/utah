
import express, { Express } from 'express';

export default interface UtahDataAdapter {
    createNewItem(request: express.Request, response: express.Response): void;
    retrieveItem(request: express.Request, response: express.Response): void;
    updateItem(request: express.Request, response: express.Response): void;
    deleteItem(request: express.Request, response: express.Response): void;
    find(request: express.Request, response: express.Response): void;
}