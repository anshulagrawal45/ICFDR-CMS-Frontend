import { Box, Typography } from "@mui/material";

export default function DashboardBoxes({heading,target,style}){
    return <Box minWidth={["150px","200px"]} sx={style} minHeight={["75px","100px"]} borderRadius={"10px"} boxShadow={"rgba(0, 0, 0, 0.16) 0px 1px 4px"} >
    <br />
    <Typography  fontSize={["15px","20px"]} fontWeight={500}>{heading}</Typography>
    <Typography variant="body1">{target}</Typography>
    <br />
    </Box>
}