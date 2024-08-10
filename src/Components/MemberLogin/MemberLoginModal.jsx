import { Close, Login } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import Modal from '@mui/material/Modal';
import Cookies from 'js-cookie';
import * as React from 'react';
import { Context } from '../../Context';
import StyledButton from '../UIComponents/Button/StyledButton';
import MemberLogin2 from './MemberLogin';

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: ["90vw", "fit-content"],
    height: "fit-content",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    overflowY: "scroll",
    borderRadius: "10px"
};

export default function MemberLoginModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [phone, setPhone] = React.useState("")
    const [dob, setDob] = React.useState("")
    const { apiLink, memberLoginData, axios, setMemberLoginData, setUserID, ActivateToast, PostToLogs, setRole } = React.useContext(Context)
    async function handleLogin() {
        let temp = {
            phone, dob
        }
        const { data } = await axios.post(apiLink + "memberLogin", temp);
        if(data.token){
            ActivateToast("Logged In Successfully", "success")
        console.log(data)
        setMemberLoginData(data)
        setUserID(data._id)
        setRole("Member")
        PostToLogs(`${data.details.name}(Member) Logged In!`)
        Cookies.set(`isMemberLogin`, JSON.stringify(true))
        Cookies.set(`UserID`, JSON.stringify(data._id))
        }else{
            ActivateToast("Check Your Credentials Again!","error")
        }
    }
    // if (memberLoginData._id) return <Navigate to={"/client/dashboard"} />

    return (
        <div>
            {/* <Button onClick={handleOpen} variant='contained'>Member Login</Button> */}
            <StyledButton extraFunction={handleOpen} tooltip={"Member Login"} text={"Member Login"} icon={<Login />} />
            <Modal
                open={open}
                onClose={handleClose}
                onBackdropClick={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ width: "fit-content", margin: "auto", position: "relative" }}>
                    <IconButton onClick={handleClose} sx={{ position: "absolute", top: ["200px", "235px"], right: "20px" }}>
                        <Close />
                    </IconButton>
                    <MemberLogin2 extraFunction={handleClose} />
                </Box>
            </Modal>
        </div>
    );
}