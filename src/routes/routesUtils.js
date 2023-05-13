import _ from "lodash";
import { initialDocumentTitle, generalRoutes, menuRoutes, protectedRoutes } from "./routesConsts";

const getRouteById = id => {
    const menuRoute = menuRoutes.find(route => route.id === id);
    if (!_.isEmpty(menuRoute)) return menuRoute;

    const generalRoute = generalRoutes.find(route => route.id === id);
    if (!_.isEmpty(generalRoute)) return generalRoute;

    const protectedRoute = protectedRoutes.find(route => route.id === id);
    if (!_.isEmpty(protectedRoute)) return protectedRoute;
};

const buildDocumentTitle = title =>
    title !== getRouteById(1).name ? `${initialDocumentTitle} | ${title}` : initialDocumentTitle;

export {
    getRouteById,
    buildDocumentTitle
};