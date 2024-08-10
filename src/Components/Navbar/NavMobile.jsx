import { Box } from '@mui/material'
import React, { useContext } from 'react'
import TemporaryDrawer from './Drawer'
import { Context } from '../../Context'

const NavMobile = () => {
    let {theme} = useContext(Context)
    return (
        <Box sx={{background:theme=="dark"?"rgb(32, 32, 32)":"white"}} zIndex={"999"} width={"100%"} display={["flex", "none"]} height={"60px"} position={"fixed"} top={0} left={0} bgcolor={"#e1e1e1"}>
            <TemporaryDrawer />
        </Box>
    )
}

export default NavMobile