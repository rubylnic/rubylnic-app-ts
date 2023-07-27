import React from 'react'
import Drawer from '@mui/material/Drawer';
import { Box } from '@mui/system';

type Props = {}

function DrawerMenu({ position, isMenuOpen, setMenuOpen, children }: Props) {

    const handleCloseMenu = () => {
        setMenuOpen(false)
    }
    return (
        <Drawer
            anchor={position}
            open={isMenuOpen}
            onClose={handleCloseMenu}
        >
            {children}
        </Drawer>
    )
}

export default DrawerMenu