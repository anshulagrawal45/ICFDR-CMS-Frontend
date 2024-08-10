import {
  Box,
  Button,
  Fade,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { Context } from "../../Context";
import { templates } from "../Email/Templates";

function generateOTP() {
  const digits = "0123456789";
  let otp = "";

  for (let i = 0; i < 6; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }

  return otp;
}


const ForgotPasswordPage = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  let [otp, setOTP] = useState("");
  let [otpInput, setOTPInput] = useState("");
  let [newPassword, setNewPassword] = useState("");
  let { apiLink, ActivateToast,axios } = useContext(Context);
  let [stage, setStage] = useState(0);
  let [isOTPVerified, setIsOTPVerified] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const sendOTP = async () => {
    let temp = generateOTP();

    // Handle form submission
    if (email.length === 0)
      return ActivateToast("Please fill the email First", "warning");
    await axios.post(`${apiLink}sendMail`, {
      userID: "64e8be4d1b836b49647d78aa",
      // userID: "647589da7d9cb06b225e4638",
      email: email,
      subject: "Password Recovery: Reset Your ICFDR Account Credentials",
      body: templates.resetPassword(temp),
    }).then((res)=>{console.log(res)
  setOTP(temp);
      ActivateToast("OTP Sent on Your Email and Registered WhatsApp Number", "info");
      setStage(1);
    }).catch(err=>{console.log(err)})
    await axios.post(`${apiLink}sendWhatsappOtp`,{
      email,
      otp:temp
    }).then(res=>console.log(res)).catch(err=>console.log(err))

 
  };

  function verifyOTP() {
    if (otp === otpInput && otp !== "") {
      setIsOTPVerified(true);
      setStage(2);

      return ActivateToast("OTP Verified", "info");
    }
    return ActivateToast("Wrong OTP", "error");
  }

  function resetPassword() {
    if (newPassword.length >= 8 && isOTPVerified) {
      axios.patch(`${apiLink}users/email/${email}`, { password: newPassword });
      setStage(0);
      handleClose();
      setNewPassword("");
      setOTPInput("");
      return ActivateToast(
        "Password has been Reset, Login with the New Password",
        "success"
      );
    }
    return ActivateToast("Something went Wrong", "error");
  }

  const paperStyle = {
    backgroundColor: "#fff",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.15)",
    padding: "32px",
    width: "700px",
  };

  const titleStyle = {
    marginBottom: "16px",
  };

  return (
    <div>
      <Typography
        sx={{ cursor: "pointer" }}
        color="primary"
        variant="body2"
        onClick={handleOpen}
      >
        Forgot Password
      </Typography>
      <Modal
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "600px",
          margin: "auto",
        }}
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open} sx={{ width: "100%" }}>
          <div style={paperStyle} sx={{ width: "100%" }}>
            <Typography variant="h4" style={titleStyle}>
              Forgot Password
            </Typography>
            <Typography variant="body1">
              Enter your email address below to reset your password.
            </Typography>
            <Typography variant="body2">
              You'll also get the OTP on your registered WhatsApp Number i.e if given!
            </Typography>
            <br />
            <form>
              <Box display={"flex"} alignItems={"center"}>
                <TextField
                  type="email"
                  label="Email Address"
                  fullWidth
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <Button
                  variant="outlined"
                  onClick={sendOTP}
                  color="primary"
                  sx={{ minWidth: "170px" }}
                >
                  Send OTP
                </Button>
              </Box>
              <br />
              <Box display={stage > 0 ? "flex" : "none"} alignItems={"center"}>
                <TextField
                  type="number"
                  label="OTP"
                  fullWidth
                  value={otpInput}
                  onChange={(e) => {
                    setOTPInput(e.target.value);
                  }}
                />
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ minWidth: "170px" }}
                  onClick={verifyOTP}
                >
                  Verify OTP
                </Button>
              </Box>
              <br />
              <Box display={stage > 1 ? "flex" : "none"} alignItems={"center"}>
                <TextField
                  type="text"
                  label="New Password"
                  fullWidth
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                />
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ minWidth: "170px" }}
                  onClick={resetPassword}
                >
                  Reset Password
                </Button>
              </Box>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default ForgotPasswordPage;
