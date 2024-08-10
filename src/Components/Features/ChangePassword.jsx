import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../Context';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
    let {passwordChanged, setPasswordChanged,setOpen,axios, userID,apiLink,ActivateToast} = useContext(Context)
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  let navigate = useNavigate()
  
  useEffect(()=>{
    ActivateToast("Please Create A New Password", "success")
  },[])

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
       return ActivateToast("Passwords doesn't match!","error")
        // Display an error message or set an error state
    }
    
    ((async()=>{
        await axios.patch(`${apiLink}users/${userID}?password=${true}`,{password:password,password_changed:true})
        ActivateToast("Password Reset Successfully","info")
        setPasswordChanged(true)
      })())
  };
   if (passwordChanged){
    setOpen(true)
    return navigate("/")} 
 return  (
    <Box width={"70%"} m={"10% auto"} textAlign={"center"}>
        <form onSubmit={handleSubmit}>
      <Typography variant="h6">Create A New Password</Typography>
      <br />
      <TextField
        type="password"
        value={password}
        label={(password)?.length==0?"New Password":(password)?.length<=3?"Very Weak":(password)?.length<=6?"Weak":(password)?.length<=8?"Strong":"Very Strong"}
          variant="standard"
          color={(password)?.length==0?"error":(password)?.length<=3?"error":(password)?.length<=6?"warning":(password)?.length<=8?"success":"success"}
        onChange={handlePasswordChange}
        fullWidth
        required
      />
      <br />
      <br />
      <TextField
        type="password"
        label={(confirmPassword)?.length==0?"New Password":(confirmPassword)?.length<=3?"Very Weak":(confirmPassword)?.length<=6?"Weak":(confirmPassword)?.length<=8?"Strong":"Very Strong"}
          variant="standard"
          color={(confirmPassword)?.length==0?"error":(confirmPassword)?.length<=3?"error":(confirmPassword)?.length<=6?"warning":(confirmPassword)?.length<=8?"success":"success"}
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        fullWidth
        required
      />
      <br />
      <Button type="submit" variant="contained" color="primary">
        Reset Password
      </Button>
    </form>
    </Box>
  );
};

export default ChangePassword;
