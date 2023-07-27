import React, { useState } from 'react'
import styles from './Header.module.scss'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Face from '@mui/icons-material/Face3';
import { MdFavorite, MdShoppingCart } from 'react-icons/md';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { useGetFavUsersQuery } from '../../services/users.service';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Link } from "react-router-dom";
import { useTheme } from '@emotion/react';
import { ColorModeContext } from 'src/context';
type Props = {}

const Header = ({ setDrawerMenuOpen }: Props) => {


    const { mode, colorMode } = React.useContext(ColorModeContext);

    const menuItems = [
        {
            name: "Products",
            link: "/products",
        },
        {
            name: "Users",
            link: "/users"
        },
        {
            name: "Create user",
            link: "/create"
        }
    ]

    const location = useLocation();
    const { pathname } = location;

    const [isMenuOpen, setMenuOpen] = useState(false);
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [isFavMenuOpen, setFavMenuOpen] = useState(false);
    const { data } = useGetFavUsersQuery(null)
    //FIXME: Заменить все хендлера на handle 
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleOpenFavMenu = () => {
        setDrawerMenuOpen(true)
    }
    return (
        <AppBar position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Link href="/" className={styles.Logo}>
                        <Face sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap

                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            rubylnicApp
                        </Typography>
                    </Link>

                    <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                        {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>


                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            className={styles.Menu}
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {menuItems.map(item => (
                                <MenuItem>
                                    <Link to={item.link} className={classNames(styles.MenuItem, { [styles.MenuItemActive]: (pathname === item.link) })}>{item.name}</Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Face sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        rubylnicApp
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', gap: '10px', justifyContent: 'center' } }}>
                        {menuItems.map(item => (
                            <Link to={item.link} className={classNames(styles.MenuItem, { [styles.MenuItemActive]: (pathname === item.link) })}>{item.name}</Link>
                        ))}
                    </Box>
                    {
                        pathname === '/users' && <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="See favorite products">
                                <IconButton
                                    onClick={handleOpenFavMenu}
                                    sx={{ p: 0 }}>
                                    <MdFavorite />
                                    <Typography>{data?.length}</Typography>
                                </IconButton>
                            </Tooltip>
                        </Box>
                    }


                </Toolbar>
            </Container>
        </AppBar >
    )
}

export default Header