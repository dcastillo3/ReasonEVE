import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { protectedRoutes, menuRoutes, generalRoutes } from './routesConsts';
import Page from './page';

function MainRoutes() {
    const renderMenuRoutes = menuRoutes.map(({ name, path, Element }, idx) => (
        <Route key={idx} exact path={path} element={<Page title={name}><Element /></Page>} />
    ));

    const renderGeneralRoutes = generalRoutes.map(({ name, path, Element }, idx) => (
        <Route key={idx} exact path={path} element={<Page title={name}><Element /></Page>} />
    ));

    const renderProtectedRoutes = protectedRoutes.map(({ name, path, Element }, idx) => (
        <Route key={idx} exact path={path} element={<Page title={name}><Element /></Page>} />
    ));

    return (
        <Routes>
            {renderMenuRoutes}
            {renderGeneralRoutes}
            {renderProtectedRoutes}
        </Routes>
    );
};

export default React.memo(MainRoutes);