import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import Index from '@/pages/Index';
import CreateFood from '@/pages/CreateFood';

const routes: RouteObject[] = [
    {
        path: '/',
        Component: Index,
    },
    {
        path: '/createFood',
        Component: CreateFood,
    },
];

export default createBrowserRouter(routes);
