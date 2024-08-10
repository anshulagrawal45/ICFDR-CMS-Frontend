import { Box, CircularProgress, Typography } from "@mui/material";

export default function LoadingPage(){
    return <Box height={"100vh"} justifyContent={"center"} display={"flex"} flexDirection={"column"} alignItems={"center"}>
    <Typography variant="h6">Loading, Please Wait...</Typography>
    <br />
    <CircularProgress size={"100px"} color="secondary"  />
    </Box>
}