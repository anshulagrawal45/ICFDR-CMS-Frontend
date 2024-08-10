import { Edit, Save } from '@mui/icons-material';
import { Avatar, Box, Button, Divider, TextField, Typography } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../../../Context';
import SendEmailModal from '../../Features/SendMailModal';
const IndividualMeetings = () => {
    let { apiLink,ActivateToast,axios } = useContext(Context);
    let { meetingId } = useParams();
    const [data, setData] = useState({});
    const [notes, setNotes] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(true)
        axios.get(apiLink + "meetings/" + meetingId).then(({ data }) => {
            // console.log(data)
            setData(data)
            setNotes(data.notes)
            setIsLoading(false)
        })
    }, [])
    return (
        <Box minHeight={"100vh"}>
            <Divider />
            <br />
            <Box display={"flex"} alignItems={"center"} justifyContent={"space-evenly"} width={"70%"} >
                <Box display={"flex"}
            gap={"10px"}
            flexDirection={["initial","initial"]}
            justifyContent={"space-around"}
            width={["100%", "50%"]}>
            <Avatar sx={{ bgcolor: deepPurple[500],  }}>{isLoading==false?data.contactName[0].toUpperCase():"@"}</Avatar>
                    <SendEmailModal />
                    {disabled && <Button onClick={() => setDisabled(false)} variant="contained">Edit &nbsp; <Edit sx={{ fontSize: "20px" }} /></Button>}
                    {!disabled && <Button onClick={() => {
                        setDisabled(true);
                        axios.patch(apiLink + "meetings/" + meetingId, data).then(res => console.log(res.data));
                        ActivateToast("Meetings Updated", "success")
                    }} variant="contained">Save &nbsp; <Save sx={{ fontSize: "20px" }} /></Button>}
                </Box>
            </Box>
            <br />
            <Divider />
            <Box textAlign={"center"}>
                <br />
                <Typography variant='h5'>Meeting with {data.contactName}</Typography>
                <br />
                <Box display={"flex"} flexDirection={"column"}>
                    <TextField  onChange={({ target }) => { let { value } = target; setData({ ...data, contactName: value }) }} disabled={disabled} value={data.contactName} />
                    <TextField  onChange={({ target }) => { let { value } = target; setData({ ...data, email: value }) }} disabled={disabled} value={data.email} />
                    <TextField  onChange={({ target }) => { let { value } = target; setData({ ...data, phone: value }) }} disabled={disabled} value={data.phone} />
                    <TextField  onChange={({ target }) => { let { value } = target; setData({ ...data, website: value }) }} disabled={disabled} value={data.website} />
                    <TextField  onChange={({ target }) => { let { value } = target; setData({ ...data, company: value }) }} disabled={disabled} value={data.company} />
                    <TextField  onChange={({ target }) => { let { value } = target; setData({ ...data, leadSource: value }) }} disabled={disabled} value={data.leadSource} />
                    <TextField  onChange={({ target }) => { let { value } = target; setData({ ...data, priority: value }) }} disabled={disabled} value={data.priority} />
                    <TextField  onChange={({ target }) => { let { value } = target; setData({ ...data, subject: value }) }} disabled={disabled} value={data.subject} />
                    <TextField  onChange={({ target }) => { let { value } = target; setData({ ...data, date: value }) }} disabled={disabled} value={data.date} />
                    <TextField  onChange={({ target }) => { let { value } = target; setData({ ...data, time: value }) }} disabled={disabled} value={data.time} />
                    <TextField  onChange={({ target }) => { let { value } = target; setData({ ...data, status: value }) }} disabled={disabled} value={data.status} />
                </Box>
            </Box>
        </Box>
    )
}

export default IndividualMeetings