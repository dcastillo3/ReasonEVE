import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { NotFound } from '../components/main/notFound';
import { protectedRoutes, menuRoutes, generalRoutes } from './routesConsts';

function MainRoutes() {
    const renderMenuRoutes = menuRoutes.map(({ path, Element }, idx) => (
        <Route key={idx} exact path={path} element={<Element />} />
    ));

    const renderGeneralRoutes = generalRoutes.map(({ path, Element }, idx) => (
        <Route key={idx} exact path={path} element={<Element />} />
    ));

    const renderProtectedRoutes = protectedRoutes.map(({ path, Element }, idx) => (
        <Route key={idx} exact path={path} element={<Element />} />
    ));

    return (
        <Routes>
            {renderMenuRoutes}
            {renderGeneralRoutes}
            {renderProtectedRoutes}
            <Route path='*' element={<NotFound />}/>
        </Routes>
    );
};

export default React.memo(MainRoutes);