import React from 'react';
import {
    Route,
    Routes
} from 'react-router-dom';
import { Tracks } from './tracks';
import { Packs } from './packs';
import { Checkout } from './checkout';
import { NotFound } from './notFound';
import { Dashboard } from './dashboard';

function MainRoutes() {
    return (
        <Routes>
            <Route exact path="/" element={<Tracks />} />
            <Route exact path="/tracks" element={<Tracks />} />
            <Route exact path="/packs" element={<Packs />} />
            <Route exact path="/checkout" element={<Checkout />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route path='*' element={<NotFound />}/>
        </Routes>
    );
};

export default React.memo(MainRoutes);