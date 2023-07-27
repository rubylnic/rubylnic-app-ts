import { FC, PropsWithChildren, useState } from 'react';
import Header from './Header/Header';
import { IMeta } from '../seo/meta.interface';
import Meta from '../seo/Meta';

import React from 'react'
import { Container, Box, Typography } from '@mui/material';

import Footer from './Footer/Footer';
import FavsList from '../features/FavsList/FavsList';
import DrawerMenu from './DrawerMenu';
import { useTheme } from '@mui/material/styles';
import { ColorModeContext } from 'src/context';


const Layout: FC<PropsWithChildren<IMeta>> = ({ children, title, description, ...props }) => {
    const [isDrawerMenuOpen, setDrawerMenuOpen] = useState(false);
    const theme = useTheme();
    return (
        <>
            <Box sx={{ background: theme.palette.background.default }}>
                {/* <Container> */}
                <Header setDrawerMenuOpen={setDrawerMenuOpen} />
                <Container sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }} {...props}>
                    <Box component="main" sx={{ pt: "20px" }}>
                        <Typography component="h1" variant="h5" mb="20px" textAlign="center" color={theme.palette.primary[700]} >{title}</Typography>
                        {children}
                    </Box>
                </Container>
                <Footer />
            </Box>
            <DrawerMenu position="right" isMenuOpen={isDrawerMenuOpen} setMenuOpen={setDrawerMenuOpen}>
                <FavsList />
            </DrawerMenu>
        </>





    )
}


export default Layout