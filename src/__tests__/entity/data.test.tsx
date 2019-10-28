import request from 'supertest';
import express from 'express';
import { App, Route, Response, ResponseHandler, JSON, HTTPRequest, HTTPResponse } from '../../utah'
import { Data, Entity, Property } from '../../components/entity/data';
import { TingoAdapter, TingoDataAdapter } from '../../components/entity/tingo';
import {  dir, DirectoryResult } from 'tmp-promise'

describe('Entity Data Tests', () => {
    describe('Entity setup', () => {


        it('Should be able to store and retrieve', async () => {

            const result: DirectoryResult = await dir();
            const appObject: App =
            <App>
                <Data class={TingoDataAdapter} config={{ 'storepath': '/Users/ilanvolow/temp/tingo' }}>
                    <Entity name="Character">
                        <Property name='name' type='string'/>
                        <Property name='race' type='string'/>
                        <Property name='introduced_season' type='number'/>
                    </Entity>
                </Data>
            </App>

            const response = await request(appObject.app)
                .post('/character')
                .send({
                        'name': 'Lucifer',
                        'race': 'Devil',
                        'introduced_season': 1
                });

            expect(response.statusCode).toBe(200);

            const retrieve = await request(appObject.app)
                .get('/character?name=Lucifer');

            appObject.server.close();
        });
    });

    describe('Entity storing', () => {

    });

    describe('Entity retrieving', () => {

    });

    describe('Etntiy updating', () => {

    });

    describe('Entity deleting', () => {

    });

});
// describe('Query parameters', () => {

//     class TestHandler implements ResponseHandler {
//         constructor() {

//         }

//         public handle(request: HTTPRequest, response: HTTPResponse) {
//           if (request.query.bunny_name === 'foofoo') {
//             response.reply('successfulResponse', {'testOne': 'r'})
//           } else {
//             response.reply('unsucessfulResponse', undefined);
//           }
//         }
//     }

//     it('should successfully set up parameters and pass to the request', async () => {
//         const appObject: App =
//         <App>
//           <Data>
//               <Entity
//           </Data>
//         </App>;

//         const response = await request(appObject.app).get('/translation');
//         expect(response.statusCode).toBe(200);
//         expect(response.body).toEqual({
//             'bed' : 'cama',
//             'butterfly' : 'mariposa',
//             'cow' : 'vaca'
//         });
//         appObject.server.close();
//     });
// });