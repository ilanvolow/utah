import express, { Express } from 'express';
import Route from './route';

interface RouteDelegate {
    isRouteDelegate(): boolean;
    handleRoute(route: Route, responseRouter: express.Router): void;
}

export default RouteDelegate;