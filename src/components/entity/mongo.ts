

import express, { Express } from 'express';
import UtahDataAdapter from './entityix';
import mongoose, { Document, Schema, Model, model } from 'mongoose';
import { Entity, Property } from './entity';
const MONGODB_DEFAULT_CONNECTION: string = 'mongodb://localhost:27017/test';


function convertToNodeType(typeName: string) {
    if (typeName === 'string') {
        return String;
    } else if (typeName === 'number') {
        return Number;
    } else if (typeName === 'date') {
        return Date;
    } else if (typeName === 'boolean') {
        return Boolean;
    } else if (typeName == 'binary') {
        return Buffer;
    }
}

class MongoDataAdapter implements UtahDataAdapter {

    public name: string;
    public conn_string: string;
    public schema: Schema;
    protected model: any;

    constructor(name: string, children: any, conn_string = MONGODB_DEFAULT_CONNECTION) {
        this.name = name;
        this.model = undefined;
        this.schema = this.setupSchema(children);
        this.conn_string = conn_string;
    }

    setupSchema(children: Property[]): Schema {
        const schemaProps: {[index: string]: any} = {};

        for (const item of children) {
            schemaProps[item.name] = convertToNodeType(item.propertyType);
        }

        this.schema = new Schema(schemaProps, {timestamps: true});
        this.model = model(this.name, this.schema);
        return this.schema;
    }

    createNewItem(request: express.Request, response: express.Response) {
        mongoose.connect(this.conn_string);
        // TODO: Put in error handling
        this.model.create(request.body).then((doc: mongoose.Document) => {
            console.log(doc);
            response.json({ title: 'MongoBongo -- Create!'});
        });
    }

    retrieveItem(request: express.Request, response: express.Response) {
        const idParam = request.params['id'];
        if (idParam) {
            mongoose.connect(this.conn_string);
            this.model.findById(idParam).then((doc: mongoose.Document) => {
                const resultJSON = JSON.stringify(doc);
                response.end(resultJSON);
            });
        } else {
            response.status(400).send('Incorrect parameters');
        }
    }

    updateItem(request: express.Request, response: express.Response) {
        const idParam = request.params['id'];
        if (idParam) {
            mongoose.connect( this.conn_string);

            const query = { _id: idParam };
            this.model.update(query, request.body).then((doc: mongoose.Document) => {
                const resultJSON = JSON.stringify(doc);
                response.end(resultJSON);
            });
        } else {
            response.status(400).send('Incorrect parameters');
        }
    }

    deleteItem(request: express.Request, response: express.Response) {
        const idParam = request.params['id'];
        if (idParam) {
            mongoose.connect(this.conn_string);
            this.model.deleteOne({ _id: idParam })
            .then((doc: mongoose.Document) => {
                const resultJSON = JSON.stringify(doc);
                response.end(resultJSON);
            })
        } else {
            response.status(400).send('Incorrect parameters');
        }
    }

    find(request: express.Request, response: express.Response) {
        response.status(200).send({});
    }

    private initCaps(s: string) {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
}

export { MongoDataAdapter };