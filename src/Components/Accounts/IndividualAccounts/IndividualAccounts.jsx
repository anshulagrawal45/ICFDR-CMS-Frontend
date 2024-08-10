import { Avatar, Box, Button, Divider, IconButton, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion';
import RemoveIcon from '@mui/icons-material/Remove';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import { Edit, Save } from '@mui/icons-material';
import { Context } from '../../../Context';
import { deepPurple } from '@mui/material/colors';
const IndividualAccounts = () => {
    let { apiLink,ActivateToast, axios } = useContext(Context);
    let { accountId } = useParams();
    const [data, setData] = useState({});
    const [isDraggable, setIsDraggable] = useState(true);
    const [isNotesVisible, setIsNotesVisible] = useState(false);
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);
    const [disabled, setDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [notes, setNotes] = useState("");
    useEffect(() => {
        setIsLoading(true)
        axios.get(apiLink + "accounts/" + accountId).then(({ data }) => {
            // console.log(data)
            setData(data)
            setNotes(data.notes)
            setIsLoading(false)
        })
    },[])
    return (
        <Box minHeight={"100vh"}>
            <Box position={"fixed"} bottom={"0"} right={"0"} width={"200px"} height={"50px"} bgcolor={"rgb(230,185,5)"} display={!isNotesVisible ? "flex" : "none"} justifyContent={"space-between"} alignItems={"center"} p={"0 0 0 20px"}>
                <Typography fontWeight={"bold"}> Note</Typography>
                <Box display={"flex"}>
                    <IconButton onClick={() => setIsNotesVisible(true)} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <AspectRatioIcon />
                    </IconButton>
                </Box>
            </Box>
            <motion.div dragConstraints={{
                left: 0,
                right: window.innerWidth - 500,
                top: 0,
                bottom: window.innerHeight - 300,
            }}
                drag={isDraggable} style={{resize:"both" ,overflow:"hidden",outline: isDraggable ? "none" : "3px solid red", width: "300px", height: "250px", background: "rgb(30,30,30)", position: "fixed", zIndex: 1000, display: isNotesVisible ? "flex" : "none", flexDirection: "column" }}>
                <Box sx={{ cursor: isDraggable ? "move" : "default" }} height={"20%"} bgcolor={"rgb(230,185,5)"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"0 0 0 20px"}>
                    <Typography fontWeight={"bold"}>Notes</Typography>
                    <Box display={"flex"}>
                        <IconButton disabled={isSaveDisabled} onClick={() => {
                            setIsSaveDisabled(true)
                            axios.patch(apiLink + "account/" + accountId,{
                                notes
                            })
                        }}
                            sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Save />
                        </IconButton>
                        <IconButton onClick={() => setIsNotesVisible(false)} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <RemoveIcon />
                        </IconButton>
                    </Box>
                </Box>

                <Box height={"70%"} padding={"20px"} color={"rgb(230,185,5)"}>
                    <textarea className='textArea' value={notes} onChange={({ target }) => {
                        if(isSaveDisabled==true){
                            setIsSaveDisabled(false)
                        }
                        setNotes(target.value)
                    }} onFocus={() => setIsDraggable(false)} onBlur={() => setIsDraggable(true)} style={{ width: "100%", height: "100%", background: "transparent", color: "yellow", resize: "none", outline: "none", border: "none" }}></textarea>
                </Box>
            </motion.div>
            <Divider />
            <br />
            <Box display={"flex"} alignItems={"center"} justifyContent={"space-evenly"} width={"70%"} >
                <Box display={"flex"}
            gap={"10px"}
            flexDirection={["initial","initial"]}
            justifyContent={"space-around"}
            width={["100%", "50%"]}>
            <Avatar sx={{ bgcolor: deepPurple[500]  }}>{isLoading==false?data.accountOwner[0].toUpperCase():"@"}</Avatar>
                    {/* <SendEmailModal /> */}
                    {disabled && <Button onClick={() => setDisabled(false)} variant="contained">Edit &nbsp; <Edit sx={{ fontSize: "20px" }} /></Button>}
                    {!disabled && <Button onClick={() => {
                        setDisabled(true);
                        console.log(data)
                        axios.patch(apiLink + "accounts/" + accountId, data).then(res => console.log(res.data));
                        ActivateToast("Meetings Updated", "success")
                    }} variant="contained">Save &nbsp; <Save sx={{ fontSize: "20px" }} /></Button>}
                </Box>
            </Box>
            <br />
            <Divider />
            <Box textAlign={"center"}>
            <br />
            <br />
            <Box display={"flex"} flexDirection={"column"}>
                <TextField onChange={({ target }) => { let { value } = target; setData({ ...data, accountOwner: value }) }} disabled={disabled} value={data.accountOwner} />
                <TextField onChange={({ target }) => { let { value } = target; setData({ ...data, accountName: value }) }} disabled={disabled} value={data.accountName} />
                <TextField onChange={({ target }) => { let { value } = target; setData({ ...data, accountSite: value }) }} disabled={disabled} value={data.accountSite} />
                <TextField onChange={({ target }) => { let { value } = target; setData({ ...data, parentAccount: value }) }} disabled={disabled} value={data.parentAccount} />
                <TextField onChange={({ target }) => { let { value } = target; setData({ ...data, accountNumber: value }) }} disabled={disabled} value={data.accountNumber} />
                <TextField onChange={({ target }) => { let { value } = target; setData({ ...data, accountType: value }) }} disabled={disabled} value={data.accountType} />
                <TextField onChange={({ target }) => { let { value } = target; setData({ ...data, industry: value }) }} disabled={disabled} value={data.industry} />
                <TextField onChange={({ target }) => { let { value } = target; setData({ ...data, annualRevenue: value }) }} disabled={disabled} value={data.annualRevenue} />
                <TextField onChange={({ target }) => { let { value } = target; setData({ ...data, phone: value }) }} disabled={disabled} value={data.phone} />
                <TextField onChange={({ target }) => { let { value } = target; setData({ ...data, fax: value }) }} disabled={disabled} value={data.fax} />
                <TextField onChange={({ target }) => { let { value } = target; setData({ ...data, website: value }) }} disabled={disabled} value={data.website} />
                <TextField onChange={({ target }) => { let { value } = target; setData({ ...data, employees: value }) }} disabled={disabled} value={data.employees} />
                <TextField onChange={({ target }) => { let { value } = target; setData({ ...data, sicCode: value }) }} disabled={disabled} value={data.sicCode} />
            </Box>
            </Box>
        </Box>
    )
}

export default IndividualAccounts