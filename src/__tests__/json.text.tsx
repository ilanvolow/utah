import request from 'supertest';
import express from 'express';
import { App, Route, Response, ResponseHandler, JSON } from '../utah'

describe('Query parameters', () => {

    class TestHandler implements ResponseHandler {
        constructor() {

        }

        public handle(request: express.Request, response: express.Response) {
          if (request.query.bunny_name === 'foofoo') {
            response.reply('successfulResponse', {'testOne': 'r'})
          } else {
            response.reply('unsucessfulResponse', undefined);
          }
        }
    }

    it('should successfully set up parameters and pass to the request', async () => {
        const appObject: App =
        <App>
          <Route path='/translation'>
            <JSON>
                {{
                    'bed' : 'cama',
                    'butterfly' : 'mariposa',
                    'cow' : 'vaca'
                }}
            </JSON>
          </Route>
        </App>;

        const response = await request(appObject.app).get('/translation');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            'bed' : 'cama',
            'butterfly' : 'mariposa',
            'cow' : 'vaca'
        });
        appObject.server.close();
    });
});