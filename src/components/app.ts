import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import debugLib from 'debug';
import http from 'http';
import * as bodyParser from 'body-parser';
import Route from './route';
import { Data, Entity } from './entity/data';
import React from 'react';


const debug = debugLib('your-project-name:server');

class App {
    public readonly app: express.Application
    public readonly server: http.Server
    private port: string

    static jsxFactory(args: any, children: any[]) {
      const newApp: App = new App();
      for (let item of children) {
        if (item instanceof Route) {
          const route = item as Route;
          newApp.addRoute(route);
        } else if (item instanceof Data) {
          const currData = item as Data;
          newApp.addDataEntityRoutes(currData);
        }
      }

      return newApp;
    }

    constructor(port: string = '3000') {
        this.port = this.normalizePort(process.env.PORT || port);
        this.app = express();
        this.app.get('/', (req: any, res: any) => res.send('Hello World'))

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cookieParser());
        const startPort: number = parseInt(port);
        this.server = this.app.listen(startPort)
        this.server.on('error', this.onError);
        this.server.on('listening', this.onListening);
    }

    addRoute(route: Route) {
      const routePrimitive = route.route();
      this.app.use('/', routePrimitive);
    }

    addEntity(entity: Entity) {
      const routePrimitive = entity.router;
      this.app.use('/', routePrimitive);
    }

    addDataEntityRoutes(data: Data) {
      data.entities.map(x => {
        this.app.use('/', x.router);
      })
    }

    normalizePort(val: string): string {
        const port = parseInt(val, 10);

        if (isNaN(port)) {
          // named pipe
          return val;
        }

        if (port >= 0) {
          // port number
          return port.toString();
        }

        return '';
    }

    onError(error: any) {

        if (error.syscall !== 'listen') {
          throw error;
        }

        const bind = typeof this.port === 'string'
          ? 'Pipe ' + this.port
          : 'Port ' + this.port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
          case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
          case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
          default:
            throw error;
        }
    }

    onListening() {
      console.log("listening. aw yeahhh");
        // const addr = this.server.address();
        // const bind = typeof addr === 'string'
        //   ? 'pipe ' + addr
        //   : 'port ' + addr.port;
        // debug('Listening on ' + bind);
    }

    static createUtahObject(tag: any, args: any, ...children: any): any {
      if (tag.jsxFactory) {
          const newObj = tag.jsxFactory(args, children);
          return newObj;
      } else {
          return undefined;
      }
  }
}

export default App;