import { Cancel, Send } from "@mui/icons-material";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Modal,
  OutlinedInput,
  Typography
} from "@mui/material";
import React, { useContext, useState } from "react";
import { Context } from "../../../Context";
import { LocalDate, LocalTime } from "../../Features/DateAndTime";
import DeleteFromID from "../../Features/DeleteFromID";
import { default as formStyles, default as styles } from "../../Features/Styles/CustomInputs.module.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: ["90%", "50%"],
  height: "95vh",
  bgcolor: "background.paper",
  borderRadius: "25px",
  boxShadow: 24,
  p: [1, 2, 3, 4],
  overflowY: "scroll",
};

export default function ComplaintModal({
  complaint,
  open,
  setOpen,
  complaintsData,
  setComplaintsData,
}) {
  const {
    cloudinaryInfo,
    axios,
    ActivateToast,
    role,
    apiLink,
    membersData,
    setMembersData,
    userPermissions,
    isAdmin,
    PostToLogs,
    userID
  } = useContext(Context);

  const [allChats, setAllChats] = useState(complaint?.chats || []);
  const [chatInput, setChatInput] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleCommentSubmit = (comment) => {
    const updatedComplaints = complaintsData.map(c =>
      c.id === complaint.id ? { ...c, comments: [...c.comments, comment] } : c
    );
    setComplaintsData(updatedComplaints);
    handleClose();
  };

  const handleDelete = (id) => {
    axios.delete(`${apiLink}complaint/${id}`)
      .then(() => {
        const updatedComplaints = complaintsData.filter(c => c._id !== id);
        setComplaintsData(updatedComplaints);
        setOpen(false);
      })
      .catch(err => {
        console.error("Failed to delete complaint:", err);
      });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className={styles.form}>
          <Box position={"absolute"} top={"10px"} right={"10px"}>
            <IconButton onClick={handleClose}>
              <Cancel />
            </IconButton>
          </Box>
          <div className={formStyles.form}>
            <p className={formStyles.title}>{complaint?.name}'s Complaint</p>
            <label className={formStyles.label}>
              <input
                className={formStyles.input}
                value={complaint?.subject}
                type="text"
                readOnly
              />
              <span className={formStyles.span}>Subject</span>
            </label>
            <label className={formStyles.label}>
              <input
                className={formStyles.input}
                value={complaint?.description}
                readOnly
                type="text"
              />
              <span className={formStyles.span}>Description</span>
            </label>
          </div>

          <Box
            className={formStyles.form}
            sx={{
              border: "1px solid grey",
              height: "100%",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <p
              className={formStyles.title}
              style={{ fontSize: "14px", margin: 0 }}
            >
              Chatbox
            </p>
            <Box
              sx={{
                height: "100%",
                maxHeight: "400px",
                overflowY: "scroll",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {allChats?.map((chat, i) => {
                if (chat?.from === userID) {
                  return (
                    <Box
                      key={i}
                      sx={{
                        backgroundColor: "rgb(210, 210, 210)",
                        borderRadius: "10px",
                        p: "5px",
                        width: "fit-content",
                        minWidth: "100px",
                        maxWidth: "50%",
                        mr: "5px",
                        alignSelf: "flex-end",
                      }}
                    >
                      <Typography variant="subtitle2">{chat?.body}</Typography>
                    </Box>
                  );
                } else {
                  return (
                    <Box
                      key={i}
                      sx={{
                        backgroundColor: "rgb(241, 241, 241)",
                        borderRadius: "10px",
                        p: "5px",
                        width: "fit-content",
                        minWidth: "100px",
                        maxWidth: "50%",
                      }}
                    >
                      <Typography variant="subtitle2">{chat?.body}</Typography>
                    </Box>
                  );
                }
              })}
            </Box>
            <FormControl fullWidth>
              <InputLabel htmlFor="outlined-adornment-amount">Send</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                onChange={(e) => {
                  setChatInput(e.target.value);
                }}
                value={chatInput}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Send Chat"
                      onClick={() => {
                        let chat = {
                          to: complaint.memberID,
                          from: userID,
                          body: chatInput,
                          date: LocalDate(),
                          time: LocalTime(),
                          read: false,
                        };
                        axios
                          .post(`${apiLink}complaint/${complaint._id}/chats`, chat)
                          .then((res) => {
                            setAllChats((prev) => [...prev, chat]);
                            setChatInput("");
                            const updatedComplaints = complaintsData.map((c) =>
                              c._id === complaint._id
                                ? { ...c, chats: [...c.chats, chat] }
                                : c
                            );
                            setComplaintsData(updatedComplaints);
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      }}
                      edge="end"
                    >
                      <Send />
                    </IconButton>
                  </InputAdornment>
                }
                label="Send"
              />
            </FormControl>
          </Box>

          <Box className={styles.flex}>
            {(role === "Admin" || role === "Leader" || isAdmin) && (
              <DeleteFromID
                id={complaint._id}
                name={"Complaint"}
                setModalOpen={setOpen}
                array={complaintsData}
                setArray={setComplaintsData}
                route={"complaint"}
                headline={"Delete complaint"}
                message={"Delete Your complaint Forever?"}
                buttonText={"Delete"}
                handleDelete={handleDelete}
              />
            )}
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
