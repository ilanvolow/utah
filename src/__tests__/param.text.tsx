import request from 'supertest';
import express from 'express';
import { App, Route, Response, ResponseHandler, Param, HTTPRequest, HTTPResponse } from '../utah'
import app from 'express/lib/application';

describe('Query parameters', () => {

  describe('construction', () => {
    class TestHandler implements ResponseHandler {
      constructor() {

      }

      public handle(request: HTTPRequest, response: HTTPResponse) {
        response.reply('unsucessfulResponse', undefined);
      }
    }

    it('should not allow a parameter to be created without a name', () => {
      expect(() => {
      const appObject: App =
      <App>
        <Route path='/bunny' method='get' handler={ TestHandler }>
          <Param datatype='string' paramtype='query'/>
          <Response code='200' name='successfulResponse'/>
          <Response code='500' name='unsucessfulResponse'/>
        </Route>
      </App>;
      }).toThrow();
    });

    it('should not allow a parameter to be created without a data type', () => {
      expect(() => {
      const app =
      <App>
        <Route path='/bunny' method='get' handler={ TestHandler }>
          <Param name='bunny_name' paramtype='query'/>
          <Response code='200' name='successfulResponse'/>
          <Response code='500' name='unsucessfulResponse'/>
        </Route>
      </App>;
      }).toThrow();
    });

    it('should not allow a parameter to be created without a param type', () => {
      expect(() => {
      const app =
      <App>
        <Route path='/bunny' method='get' handler={ TestHandler }>
          <Param name='bunny_name' datatype='string'/>
          <Response code='200' name='successfulResponse'/>
          <Response code='500' name='unsucessfulResponse'/>
        </Route>
      </App>;
      }).toThrow();
    });
  });
  
  describe('handling routes', () => {

    class TestHandler implements ResponseHandler {
      constructor() {

      }

      public handle(request: utah, response: express.Response) {
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
          <Route path='/bunny' method='get' handler={ TestHandler }>
            <Param name='bunny_name' datatype='string' paramtype='query'/> 
            <Response code='200' name='successfulResponse'/>
            <Response code='500' name='unsucessfulResponse'/>
          </Route>
        </App>;

        const response = await request(appObject.app).get('/bunny?bunny_name=foofoo');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({'testOne': 'r'});
        appObject.server.close();
    });

    it('should handle optional parameters correctly', async () => {
      class OptionalParamHandler implements ResponseHandler {
        constructor() {

        }

        public handle(request: express.Request, response: express.Response) {
          response.reply('successfulResponse', {'testOne': 'r'})
        }
      }

      const appObject: App =
      <App>
        <Route path='/bunny' method='get' handler={ OptionalParamHandler }>
          <Param name='bunny_name' datatype='string' paramtype='query' optional={true}/>
          <Response code='200' name='successfulResponse'/>
          <Response code='500' name='unsucessfulResponse'/>
        </Route>
      </App>;

      const response = await request(appObject.app).get('/bunny');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({'testOne': 'r'});
      appObject.server.close();
    });

    it('should return a HTTP 400 error if an unexpected query parameter is sent', async () => {
        class UndeclaredParamRejectionHandler implements ResponseHandler {
          constructor() {

          }

          public handle(request: express.Request, response: express.Response) {
            response.reply('successfulResponse', {'testOne': 'r'})
          }
        }

        const appObject: App =
        <App>
          <Route path='/bunny' method='get' handler={ UndeclaredParamRejectionHandler }>
            <Param name='bunny_name' datatype='string' paramtype='query'/> 
            <Response code='200' name='successfulResponse'/>
            <Response code='500' name='unsucessfulResponse'/>
          </Route>
        </App>;

        const response = await request(appObject.app).get('/bunny?myrandomvar=whatever');
        expect(response.statusCode).toBe(400);
        appObject.server.close();
      });
  });
});