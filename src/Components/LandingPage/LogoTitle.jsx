import { Box, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { Context } from '../../Context'

const LogoTitle = ({detail}) => {
  let {theme} = useContext(Context)
  return (
    <Box color={theme==="light"?"black":"white"} bgcolor={theme==="light"?"white":"black"} display={"flex"} width={"100%"} alignItems={"center"} gap={"10px"}>
        <img src={"./iskconPLogo.png"} alt="logo" height={"100px"} />
        <Box width={"100%"} ml={"0.5%"} >
        <Typography variant={"h4"} fontSize={["1rem","1.5rem","2rem","2.5rem"]} fontWeight={700}>
        International Society For Krishna Consciousness
        </Typography>
        {detail && <Typography variant='h5' fontSize={["0.5rem","0.75rem","1rem","1.75rem"]}>Founder-Acharya:- His Divine Grace A.C. Bhaktivedanta Swami Prabhupada</Typography>}        </Box>
        </Box>
  )
}

export default LogoTitle