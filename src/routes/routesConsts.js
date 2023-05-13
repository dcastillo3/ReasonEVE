import { Home } from '../components/main/home';
import { Tracks } from '../components/main/tracks';
import { Packs } from '../components/main/packs';
import { Purchased } from '../components/main/purchased';
import { Cart } from '../components/main/cart';
import { Dashboard } from '../components/main/dashboard';
import { NotFound } from '../components/main/notFound';

//Maintain ID's
const menuRoutes = [
    {
        id: 1,
        name: 'Home',
        path: '/',
        Element: Home
    },
    {
        id: 2,
        name: 'Tracks',
        path: '/tracks',
        Element: Tracks
    },
    {
        id: 3,
        name: 'Packs',
        path: '/packs',
        Element: Packs
    },
    {
        id: 4,
        name: 'Dashboard',
        path: '/dashboard',
        Element: Dashboard
    },
];

const generalRoutes = [
    {
        id: 5,
        name: 'Cart',
        path: '/cart',
        Element: Cart
    },
    {
        id: 7,
        name: 'Not Found',
        path: '*',
        Element: NotFound
    }
];

const protectedRoutes = [
    {
        id: 6,
        name: 'Purchased',
        path: '/purchased',
        Element: Purchased
    },
];

const initialDocumentTitle = 'ReasonEVE';

export {
    menuRoutes,
    generalRoutes,
    protectedRoutes,
    initialDocumentTitle
};