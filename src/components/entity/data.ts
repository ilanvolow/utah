
import UtahDataAdapter from './entityix';
import { Entity, Property } from './entity';
import { TingoDataAdapter } from './tingo';
import * as express from 'express';

class Data {

    public adapterClass: UtahDataAdapter;
    public adapterConfig: {};
    public entities: Entity[];

    static jsxFactory(args: any, children: any[]): Data | undefined {
        if (Data.validateData(args)) {
            // If no data class is set, then use TingoDB by default
           const selAdapter: UtahDataAdapter = args.class ? args.class : TingoDataAdapter;
            const newData = new Data(selAdapter, args.config, children);
            return newData;
        } else {
            return;
        }
    }

    // Placeholder for right
    static validateData(args: any) {
        const isValid = true;
        return isValid;
    }

    constructor(adapterClass: UtahDataAdapter, config = {}, entities: Entity[]) {
        this.adapterClass = adapterClass;
        this.adapterConfig = config,
        this.entities = entities;
        this.setEntitiesAdapter(this.entities);
    }

    private setEntitiesAdapter(entities: Entity[]) {
        // Becasue the Entity objects are technically created before the Data object (how JSX works)
        // we have to go back and their those entity objects' data adapters
        entities.map(currEntity => {
            currEntity.setDataAdapterClass(this.adapterClass);
        });
    }

    dataEntityRoutes(): express.Router[] {
        const entityRouters = this.entities.map(x => {return x.router});
        return entityRouters;
    }
}

export { Data, Entity, Property, UtahDataAdapter, TingoDataAdapter };

