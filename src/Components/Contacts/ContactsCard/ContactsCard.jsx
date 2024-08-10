import { Call, Email } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React, { useContext, useState } from 'react';
import { Context } from "../../../Context";
import styles from '../../Meetings/MeetingsCards/MeetingsCard.module.css';
import ContactModal from "../ContactsTable/ContactModal";

export default function ContactsCard({ data, state, setState }) {

    let { theme, apiLink, ActivateToast, axios } = useContext(Context);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [disabled, setDisabled] = useState(true);
    const [temp, setTemp] = useState(JSON.parse(JSON.stringify(data)));
    delete temp.__v;
    delete temp.moreContacts;
    delete temp.userID;

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
                        <Box display={"flex"} alignItems={"center"}>
                            <Typography variant="body2">{data.name}</Typography>
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
                            <Box
                                overflow={"hidden"}
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
                    </Box>
                </div>
            </Box>
            <ContactModal
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

