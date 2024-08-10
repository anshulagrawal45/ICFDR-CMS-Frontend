import { Call, Email } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React, { useContext, useState } from 'react';
import { Context } from "../../../Context";
import MeetingModal from "../MeetingsTable/MeetingModal";
import styles from './MeetingsCard.module.css';

export default function MeetingsCard({ data }) {
    const { role, memberLoginData } = useContext(Context);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [disabled, setDisabled] = useState(true);

    // Check if the role is 'Super Admin' or 'Leader'
    const isAdmin = role === 'Super Admin' || role === 'Leader';

    // Check if the role is 'Member' and the email matches
    const isMember = role === 'Member' && data.email === memberLoginData.email;

    // Determine whether to show the meeting card based on role
    const showMeetingCard = isAdmin || isMember;

    if (!showMeetingCard) {
        return null; // Return null if the meeting card should not be shown
    }

    return (
        <div className={styles.card}>
            <Box position={"relative"} margin={"0 auto"} width={"fit-content"} onClick={handleOpen}>
                <div className={styles['card-content']}>
                    <Box
                        position={"relative"}
                        height={"fit-content"}
                        maxWidth={"250px"}
                        minWidth={"250px"}
                    >
                        <Box className={styles['card-title']} display={"flex"} alignItems={"center"}>
                            <Typography variant="body2">{data.contactName}</Typography>
                        </Box>
                        <Box textAlign={"left"}>
                            <br />
                            <Box
                                display={"flex"}
                                alignItems={"center"}
                                border={"1px solid black"}
                                borderRadius={"10px"}
                                mb={"5px"}
                            >
                                &nbsp;&nbsp;&nbsp;
                                <Call sx={{ fontSize: "15px" }} />
                                &nbsp;&nbsp;&nbsp;
                                <Typography variant="subtitle2">{data.phone}</Typography>
                            </Box>
                            <Box overflow={"hidden"}
                                display={"flex"}
                                alignItems={"center"}
                                border={"1px solid black"}
                                borderRadius={"10px"}
                            >
                                &nbsp;&nbsp;&nbsp;
                                <Email sx={{ fontSize: "15px" }} />
                                &nbsp;&nbsp;&nbsp;
                                <Typography variant="subtitle2" fontSize={"12px"}>
                                    {data.email}
                                </Typography>
                            </Box>
                        </Box>
                        <Typography sx={{ bgcolor: data.priority === "Low" ? "rgb(244, 190, 0)" : data.priority == "Medium" ? "rgb(0, 199, 103)" : "red", p: "1px 5px", borderRadius: "10px", color: "white" }} position={"absolute"} top={"10px"} fontSize={"12px"} right={"50px"}>{data.priority}</Typography>
                    </Box>
                </div>
            </Box>
            <MeetingModal
                open={open}
                setDisabled={setDisabled}
                disabled={disabled}
                setOpen={setOpen}
                data={data}
                handleClose={handleClose}
            />
        </div>
    );
}
