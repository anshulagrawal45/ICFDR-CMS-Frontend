import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { Context } from "../../Context";
import { Email } from "@mui/icons-material";
import StyledButton from "../UIComponents/Button/StyledButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: ["80vw",400],
  margin:"auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function SendEmailModal({reciever}) {
  const {userID,userName} = React.useContext(Context);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let { apiLink, ActivateToast, axios } = React.useContext(Context);

  let [email, setEmail] = React.useState({
    email: reciever,
    subject: "",
    body: "",
  });

  async function sendEmail() {
    let res = await axios.post(`${apiLink}sendMail`, {
      userID,
      email: reciever,
      subject: email.subject,
      body: email.body,
    })
    axios.post(`${apiLink}emailTracker`, {
      email: reciever,
      userID: userID,
      Content: {
        sub: email.subject,
        body: email.body
      },from:{name:userName,userID},
      date : new Date().toLocaleDateString('en-GB'),
  time : new Date().toLocaleTimeString()
    })
    handleClose();
    if(res.data.error) return ActivateToast(res.data.message,"error")
    return  ActivateToast(res.data.message, "success");
  }

  return (
    <div>
      <Box
        sx={{ cursor: "pointer" }}
        display={"flex"}
        alignItems={"center"}
        onClick={handleOpen}
      >
        <StyledButton
        text={"Send Mail"}
        icon={<Email />}
          extraFunction={handleOpen}
        />
      </Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Send Email
            </Typography>
            <Box>
              <TextField
                label="To"
                value={reciever || ""}
                disabled={true}
                // onChange={(e) => setEmail({ ...email, email: e.target.value })}
                fullWidth
                margin="normal"
                sx={{ marginBottom: "10px" }}
              />
              <TextField
                label="Subject"
                value={email.subject || ""}
                onChange={(e) =>
                  setEmail({ ...email, subject: e.target.value })
                }
                fullWidth
                //   margin="normal"
                sx={{ marginBottom: "10px" }}
              />
              <textarea
                required
                onChange={(e) =>
                  setEmail({ ...email, body: e.target.value })
                }
                style={{
                  width: "90%",
                  margin:"auto",
                  padding: "12px 16px",
                  border: "1px solid rgba(0, 0, 0, 0.23)",
                  borderRadius: "4px",
                  fontSize: "16px",
                  lineHeight: "1.5",
                  color: "rgba(0, 0, 0, 0.87)",
                  backgroundColor: "#fff",
                  transition: "border-color 0.2s ease-out",
                  "&:hover": {
                    borderColor: "#3f51b5",
                  },
                  "&:focus": {
                    outline: "none",
                    borderColor: "#3f51b5",
                    boxShadow: "0 0 0 0.2rem rgba(63, 81, 181, 0.25)",
                  },
                }}
                rows="4"
                placeholder="Enter your message here..."
                name="content"
                label="Content"
                type="content"
                id="content"
              />
            </Box>
            <StyledButton text={"Send"} icon={<Email />} extraFunction={sendEmail} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
