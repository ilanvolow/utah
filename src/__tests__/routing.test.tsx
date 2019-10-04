import request from 'supertest';
import express from 'express';

import { App, Route, Response, ResponseHandler } from '../utah'


describe('Routing', () => {
    it('Can set up routes correctly', async () => {

      class TestHandler implements ResponseHandler {
        constructor() {

        }

        public handle(request: express.Request, response: express.Response) {
          response.reply('bunnySuccessResponse', {'testOne': 'r'})
        }
      }

      let appObject =
      <App>
        <Route path='/bunny' method='get' handler={ TestHandler }>
          <Response code='200' name='bunnySuccessResponse'/>
          <Response code='200' name='successfulThreadResponse'/>
        </Route>
      </App>;

      const response = await request(appObject.app).get('/bunny');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({'testOne': 'r'});
    });
  });
