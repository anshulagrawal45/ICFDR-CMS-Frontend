import { Box, Typography } from '@mui/material'
import React from 'react'

const OurActivities = () => {
    let style={
        container:{
        backgroundColor: "#000000",
    opacity: 0.6,
    transition: "background 0.3s, border-radius 0.3s, opacity 0.3s",
    textAlign:"center",
    padding:"10px"
        },
    heading:{
        color: "#DFC15E",
        fontStyle:"italic",
    fontSize: "30px",
    fontWeight: "500",
    },
    content:{
        color:"white"
    }
    }
  return (
    <Box sx={style.container}>
    <Typography variant='h6' sx={style.heading}>Our Activities</Typography>
    <br />
    <Box textAlign={"left"}>
    <Typography sx={style.content} variant='body1'>Join us for our daily Morning Prayers or meditate with us during the morning Mantra Meditations. Listen to our regular philosophy classes based on the Bhagavad Gita and Srimad Bhagavatam, essential Vedic texts. Our Sunday Feast weekly program is a great introduction or watch this space to attend an upcoming seminar.You can also take Darshan or observe one of the arati ceremonies.</Typography>
    </Box>
    </Box>
  )
}

export default OurActivities