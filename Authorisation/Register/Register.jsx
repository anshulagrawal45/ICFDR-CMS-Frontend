import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Navigate, useNavigate } from "react-router-dom";
import { Context } from "../../../Context";
import GoogleSignUpButton from "./GoogleRegisterButton";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        ICFDR
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
const isValidPassword = (password) => {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  return regex.test(password);
};

const themes = createTheme();

export default function Register() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const { ActivateToast, apiLink, axios } = React.useContext(Context);
  const handleRegister = async () => {
    console.log(user);
    let requiredErrors = [];
    if (!user.name) requiredErrors.push("Name");
    if (!user.email) requiredErrors.push("Email");
    if (!user.password) requiredErrors.push("Password");
    if (!confirmPassword) requiredErrors.push("Confirm Password");
    if (!user.name || !user.email || !user.password || !confirmPassword) {
      let errorStr = "";
      for (let i = 0; i < requiredErrors.length - 1; i++) {
        errorStr += requiredErrors[i] + ", ";
      }
      if (!errorStr)
        errorStr +=
          requiredErrors[requiredErrors.length - 1] + " field is required !";
      else
        errorStr +=
          "and " +
          requiredErrors[requiredErrors.length - 1] +
          " fields are required !";
      return ActivateToast(errorStr, "warning");
    }
    if (!isValidEmail(user.email))
      return ActivateToast("Email is Invalid", "warning");
    if (!isValidPassword(user.password))
      return ActivateToast(
        "Password should contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character.",
        "warning"
      );
    if (user.password != confirmPassword)
      return ActivateToast(
        "Password does not match with confirm password",
        "warning"
      );
    const { data: res } = await axios.post(apiLink + "users/", user,);
    if (res.error) {
      return ActivateToast(res.error, "error");
    }
    ActivateToast("Account Created Successfully", "success");
    setSubmitted(true);
  };
  if (submitted) return <Navigate to={"/"} />;

  return (
    <ThemeProvider theme={themes}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <GoogleSignUpButton />
            <br />
            <Typography textAlign={"center"}>OR</Typography>
            <Grid container>
              <Grid item xs={12} sm={12}>
                <TextField
                  label="Name"
                  value={user.name || ""}
                  variant="standard"
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  fullWidth
                  margin="normal"
                  sx={{ marginBottom: "10px" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  value={user.email || ""}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  fullWidth
                  variant="standard"
                  margin="normal"
                  sx={{ marginBottom: "10px" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="password"
                  label={
                    user?.password?.length == 0
                      ? "Password"
                      : user?.password?.length <= 3
                      ? "Very Weak"
                      : user?.password?.length <= 6
                      ? "Weak"
                      : user?.password?.length <= 8
                      ? "Strong"
                      : "Very Strong"
                  }
                  variant="standard"
                  color={
                    user?.password?.length == 0
                      ? "error"
                      : user?.password?.length <= 3
                      ? "error"
                      : user?.password?.length <= 6
                      ? "warning"
                      : user?.password?.length <= 8
                      ? "success"
                      : "success"
                  }
                  value={user.password || ""}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  fullWidth
                  margin="normal"
                  sx={{ marginBottom: "10px" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  color={
                    confirmPassword?.length == 0
                      ? "error"
                      : confirmPassword?.length <= 3
                      ? "error"
                      : confirmPassword?.length <= 6
                      ? "warning"
                      : confirmPassword?.length <= 8
                      ? "success"
                      : "success"
                  }
                  type="password"
                  variant="standard"
                  label={
                    confirmPassword?.length == 0
                      ? "Confirm Password"
                      : confirmPassword?.length <= 3
                      ? "Very Weak"
                      : confirmPassword?.length <= 6
                      ? "Weak"
                      : confirmPassword?.length <= 8
                      ? "Strong"
                      : "Very Strong"
                  }
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  fullWidth
                  margin="normal"
                  sx={{ marginBottom: "20px" }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              onClick={handleRegister}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <br />
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography
                  color={"primary"}
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/client/login");
                  }}
                  variant="body2"
                >
                  Already have an account? Sign in
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
