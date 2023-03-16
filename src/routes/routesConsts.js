import { Home } from '../components/main/home';
import { Tracks } from '../components/main/tracks';
import { Packs } from '../components/main/packs';
import { Cart } from '../components/main/cart';
import { Dashboard } from '../components/main/dashboard';

const routes = [
    {
        name: 'Home',
        path: '/',
        Element: Home
    },
    {
        name: 'Tracks',
        path: '/tracks',
        Element: Tracks
    },
    {
        name: 'Packs',
        path: '/packs',
        Element: Packs
    },
    {
        name: 'Dashboard',
        path: '/dashboard',
        Element: Dashboard
    },
    {
        name: 'Cart',
        path: '/cart',
        Element: Cart
    }
];

export {
    routes
};