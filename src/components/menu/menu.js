import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Grid, Text } from '../styled';

function Menu() {
    const activeClassName = 'active';
    const checkActive = ({ isActive }) => isActive ? activeClassName : undefined;

    return (
        <Grid style={{justifyContent: 'space-evenly'}}>
            <Box>
                <NavLink
                    to="/tracks"
                    className={checkActive}
                >
                    <Text>
                        Tracks
                    </Text>
                </NavLink>
            </Box>

            <Box>
                <NavLink
                    to="/packs"
                    className={checkActive}
                >
                    <Text>
                        Packs
                    </Text>
                </NavLink>
            </Box>

            <Box>
                <NavLink
                    to="/checkout"
                    className={checkActive}
                >
                    <Text>
                        Checkout
                    </Text>
                </NavLink>
            </Box>

            <Box>
                <NavLink
                    to="/dashboard"
                    className={checkActive}
                >
                    <Text>
                        Dashboard
                    </Text>
                </NavLink>
            </Box>
        </Grid>
    );
};

export default Menu;