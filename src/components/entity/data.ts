
import UtahDataAdapter from './entityix';
import { Entity, Property } from './entity';
import { MongoDataAdapter } from './mongo';
import * as express from 'express';

class Data {

    public adapter: UtahDataAdapter;
    public entities: Entity[];

    static jsxFactory(args: any, children: any[]): Data | undefined {
        if (Data.validateData(args)) {
            const newData = new Data(args.adapter, children);
            return newData;
        } else {
            return;
        }
    }

    static validateData(args: any) {
        const isValid = true;
        return isValid;
    }

    constructor(adapter: UtahDataAdapter, entities: Entity[]) {
        this.adapter = adapter;
        this.entities = entities;
        this.setEntitiesAdapter(this.entities);
    }

    private setEntitiesAdapter(entities: Entity[]) {
        // Becasue the Entity objects are technically created before the Data object (how JSX works)
        // we have to go back and their those entity objects' data adapters
        entities.map(currEntity => {
            currEntity.setDataAdapter(this.adapter);
        });
    }

    dataEntityRoutes(): express.Router[] {
        const entityRouters = this.entities.map(x => {return x.router});
        return entityRouters;
    }
}

export { Data, Entity, Property, UtahDataAdapter, MongoDataAdapter };

