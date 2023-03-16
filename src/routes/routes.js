import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { NotFound } from '../components/main/notFound';
import { routes } from './routesConsts';

function MainRoutes() {
    const renderRoutes = routes.map(({ path, Element }, idx) => (
        <Route key={idx} exact path={path} element={<Element />} />
    ));

    return (
        <Routes>
            {renderRoutes}
            
            <Route path='*' element={<NotFound />}/>
        </Routes>
    );
};

export default React.memo(MainRoutes);