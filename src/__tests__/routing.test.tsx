import request from 'supertest';
import express from 'express';

import { App, Route, Response, ResponseHandler } from '../utah'


describe('Routing', () => {
    it('Can set up routes correctly', async () => {

      class TestHandler extends ResponseHandler {
        constructor() {
          super();
        }

        public handle(request: express.Request, response: express.Response) {
          expect(request.path).toEqual('/bunny');
          expect(request.method).toEqual('GET');
          expect(response).not.toBeUndefined;
          response.status(this.responses['bunnySuccessResponse'].code).json({ title: 'Hello World'});
        }
      }

      //let handler = new TestHandler();

      let appObject =
      <App>
        <Route path='/bunny' method='get' handler={ TestHandler }>
          <Response code='200' name='bunnySuccessReponse'/>
          <Response code='200' name='successfulThreadResponse'/>
        </Route>
      </App>;

      const response = await request(appObject.app).get('/bunny');
      expect(response.statusCode).toBe(200);
    });

    // it('Should throw an exception if path not set', () => {
    //     expect(() => {
    //       <App>
    //         <Route method='get' handler={{}}/>
    //       </App>
    //     }).toThrow();
    // });

    // it('Should throw an exception if method not set', () => {
    //   expect(() => {
    //     <App>
    //        <Route path='/bunny' handler={ TestHandler }/>
    //     </App>
    //   }).toThrow();
    // });

    // it('Should throw an exception if hander not set', () => {
    //   expect(() => {
    //     <App>
    //        <Route path='/bunny' method='get'/>
    //     </App>
    //   })
    //   .toThrow();
    // });
  });
