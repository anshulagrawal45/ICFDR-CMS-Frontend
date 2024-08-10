import { Call, Computer, Delete } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { useContext } from "react";
import { Context } from "../../../Context";
import { NavLink } from "react-router-dom";

export default function AccountsCards({ data, setState, state }) {
    let { theme, ActivateToast, apiLink, axios } = useContext(Context)

    return <Box position={"relative"} margin={"0 auto"} width={"fit-content"} >
    <IconButton onClick={async () => {
            let temp = state.filter(i => i._id != data._id);
            axios.delete(apiLink + "accounts/" + data._id);
            setState(temp)
            ActivateToast("Deleted", "success")
        }}
            sx={{ position: "absolute", top: "0", right: "0", zIndex: 100 }}><Delete /></IconButton>
        <NavLink to={`${data._id}`} style={{ all: "unset", cursor: "pointer" }}>
            <Box sx={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px", p: "10px", borderRadius: "10px", bgcolor: theme == "dark" ? "rgb(145, 145, 145)" : "white" }} position={"relative"} height={"fit-content"} minWidth={"250px"} maxWidth={"250px"}>
                <Box display={"flex"} alignItems={"center"}>
                    <Typography variant="body2">{data.accountOwner}</Typography>
                </Box>
                <Box textAlign={"left"}>
                    <Box><Typography variant="subtitle2" color={"rgb(73, 174, 214)"}>{data.accountName}</Typography></Box>
                    <br />
                    <Box display={"flex"} alignItems={"center"} border={"1px solid black"} borderRadius={"10px"} mb={"5px"}>
                        &nbsp;&nbsp;&nbsp;<Call sx={{ fontSize: "15px" }} />
                        &nbsp;&nbsp;&nbsp;
                        <Typography variant="subtitle2" >{data.phone}</Typography>
                    </Box>
                    <Box display={"flex"} alignItems={"center"} border={"1px solid black"} borderRadius={"10px"}>
                        &nbsp;&nbsp;&nbsp;<Computer sx={{ fontSize: "15px" }} />
                        &nbsp;&nbsp;&nbsp;
                        <Typography variant="subtitle2" fontSize={"12px"} >{data.accountNumber}</Typography>
                    </Box>
                </Box>
                {/* <Typography sx={{bgcolor:data.priority=="Low"?"rgb(244, 190, 0)":data.priority=="Medium"?"rgb(0, 199, 103)":"red", p:"1px 5px", borderRadius:"10px", color:"white"}} position={"absolute"} top={"10px"} fontSize={"12px"} right={"10px"}>{data.priority}</Typography> */}
            </Box>
        </NavLink>
    </Box >

}