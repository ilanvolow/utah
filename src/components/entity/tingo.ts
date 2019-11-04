

import express, { Express } from 'express';
import UtahDataAdapter from './entityix';
import mongoose, { Document, Schema, Model, model } from 'mongoose';
import { Entity, Property } from './entity';
import * as uuid from 'uuid';
const MONGODB_DEFAULT_CONNECTION: string = 'mongodb://localhost:27017/test';

const Engine = require('tingodb')();

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

class TingoDataAdapter implements UtahDataAdapter {

    public name: string;
    private storepath: string;
    private db: any;

    constructor(name: string, config: any, children: []) {
        this.name = name;
        this.db = new Engine.Db(config.storepath, {});
        this.storepath = config.storepath;
    }

    createNewItem(request: express.Request, response: express.Response) {
        // mongoose.connect(this.conn_string);
        // // TODO: Put in error handling
        // this.model.create(request.body).then((doc: mongoose.Document) => {
        //     console.log(doc);
        //     response.json({ title: 'MongoBongo -- Create!'});
        // });

        // Add UUID and created/updated timestamps
        const newUUID = uuid.v4();

        const content = Object.assign(request.body);
        content['uuid'] = newUUID;


        // TODO: Put in promise here
        const collection = this.db.collection(this.name);
        collection.insert(content, function(err: any, item: any) {
            if (err) {
                response.status(500).send(err);
            } else {
                response.json(item[0]);
            }
        });
    }

    retrieveItem(request: express.Request, response: express.Response) {
        const idParam = request.params['id'];
        if (idParam) {
            const collection = this.db.collection(this.name);
            collection.findOne({uuid: idParam}, function(err: any, item: any) {
                if (err) {
                    response.status(500).send(err);
                } else {
                    response.json(item);
                }
            })
        } else {
            response.status(400).send('Incorrect parameters');
        }
    }

    updateItem(request: express.Request, response: express.Response) {
        const idParam = request.params['id'];
        if (idParam) {
            const collection = this.db.collection(this.name);
            collection.update({uuid: idParam}, request.body, function(err: any, item: any) {
                if (err) {
                    response.status(500).send(err);
                } else {
                    response.json(item);
                }
            });
        } else {
            response.status(400).send('Incorrect parameters');
        }

    }

    deleteItem(request: express.Request, response: express.Response) {
        const idParam = request.params['id'];
        if (idParam) {
            const collection = this.db.collection(this.name);
            collection.remove({uuid: idParam}, function(err: any, item: any) {
                if (err) {
                    response.status(500).send(err);
                } else {
                    response.json(item);
                }
            })
        } else {
            response.status(400).send('Incorrect parameters');
        }
    }

    find(request: express.Request, response: express.Response) {
        // response.status(200).send({});
    }

    // private initCaps(s: string) {
    //     if (typeof s !== 'string') return ''
    //     return s.charAt(0).toUpperCase() + s.slice(1)
    // }
}

export { TingoDataAdapter };