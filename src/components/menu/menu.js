import React from 'react';
import { NavLink } from 'react-router-dom';

function Menu() {
    const activeClassName = 'active';
    const checkActive = ({ isActive }) => isActive ? activeClassName : undefined;

    return (
        <div>
            <ul>
                <li>
                    <NavLink
                        to="/tracks"
                        className={checkActive}
                    >
                        Tracks
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/packs"
                        className={checkActive}
                    >
                        Packs
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/checkout"
                        className={checkActive}
                    >
                        Checkout
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Menu;