
import express, { Express } from 'express';
import UtahDataAdapter from './entityix';

class Entity {

    public router: express.Router;
    public name: string;
    public dataAdapter: UtahDataAdapter | undefined;
    public properties: Property[];

    constructor(name: string, properties: Property[]) {
        this.router = express.Router();
        this.name = name;
        this.properties = properties;
        this.dataAdapter = undefined;
    }

    static jsxFactory(args: any, children: any[]): Entity {
        const entity = new Entity(args.name, children);
        return entity;
    }

    setDataAdapterClass(adapterClass: typeof UtahDataAdapter, config: any) {

        // Here's where we actually create the instance of the adapter
        this.dataAdapter =  new adapterClass(this.name, config, this.properties);
        this.setupRouting();
    }

    setupRouting() {
        if (this.dataAdapter) {
            const basePath = '/' + this.name.toLowerCase();

            this.router.post(basePath, this.dataAdapter.createNewItem.bind(this.dataAdapter));

            // TODO: doing a more 'join' way of doing this
            const getRetrievePath = basePath + '/:id';
            this.router.get(getRetrievePath, this.dataAdapter.retrieveItem.bind(this.dataAdapter));

            const putPath        = basePath + '/:id';
            this.router.put(putPath,         this.dataAdapter.updateItem.bind(this.dataAdapter));

            const deletePath = basePath + '/:id';
            this.router.delete(deletePath, this.dataAdapter.deleteItem.bind(this.dataAdapter));
        }
    }
}

class Property {

    public name: string;
    public propertyType: string;

    constructor(name: string, type: string) {
        this.name = name;
        this.propertyType = type;
    }

    static jsxFactory(args: any, children: any[]): Property {
        const newProperty = new Property(args.name, args.type);
        return newProperty
    }
}

export  { Entity, Property };