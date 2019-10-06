import request from 'supertest';
import express from 'express';

import { App, Route, Response, ResponseHandler } from '../utah'

describe('Routing', () => {

    describe('setting up routes', () => {
        class TestHandler implements ResponseHandler {
          constructor() {

          }
          public handle(request: express.Request, response: express.Response) {
            if (request.query.testSuccess) {
              response.reply('successfulResponse', {'testOne': 'r'})
            } else if (request.query.testFailure) {
              response.reply('unsucessfulResponse', undefined);
            }
          }
        }

        const appObject: App =
        <App>
          <Route path='/bunny' method='get' handler={ TestHandler }>
            <Response code='200' name='successfulResponse'/>
            <Response code='500' name='unsucessfulResponse'/>
          </Route>
        </App>;

      it('Can set up routes correctly', async () => {
        const response = await request(appObject.app).get('/bunny?testSuccess=1');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({'testOne': 'r'});
        appObject.server.close();
      });

     it('Can set up routes correctly', async () => {
        const response = await request(appObject.app).get('/bunny?testFailure=1');
        expect(response.statusCode).toBe(500);
        expect(response.body).toEqual({});
        appObject.server.close();
      });
    });
  });
