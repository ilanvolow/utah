import request from 'supertest';
import express from 'express';
import { App, Route, Response, ResponseHandler, JSON, HTTPRequest, HTTPResponse } from '../../utah'
import { Data, Entity } from '../../components/entity/data';

describe('Entity Data Tests', () => {
    describe('Entity setup', () => {
        const appObject: App =
        <App>
            <Data>
                <Entity>
                    <Property name="name" type="string"/>
                    <Property name="race" type="string"/>
                    <Property name="introduced_season" type="number"/>
                </Entity>
            </Data>
        </App>

        it('Should use TingoDB by default', () => {

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