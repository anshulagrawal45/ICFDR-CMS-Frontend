import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import Razorpay from '../Razorpay/Razorpay';

const DonationModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let [paymentData,setPaymentData] = useState({})
  let [next,setNext] = useState(false)

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "90vw",
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setPaymentData({
        name: data.get('Name'),
      email: data.get('Email'),
      phone: data.get('Phone'),
      address:data.get('Address'),
      amount:data.get('Amount')
    })
    // console.log({
    //     name: data.get('Name'),
    //   email: data.get('Email'),
    //   phone: data.get('Phone'),
    //   address:data.get('Address')
    // });
    setNext(true)
  };

  ;

  return (
    <Box >
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Donate
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle} component={"form"} onSubmit={handleSubmit} >
    <Typography variant='h6'>Thank you for Choosing to Donate in Our Organisation!</Typography>
    <Typography component={"p"} variant='subtitle2'>Please Fill us in with some details!</Typography>
      <Box maxWidth={["100vw","70vw","30vw"]}>
        <TextField
          fullWidth
          label="Name"
          name='Name'
          variant="outlined"
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Email"
          name='Email'
          variant="outlined"
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Phone"
          name='Phone'
          variant="outlined"
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Address"
          name='Address'
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Amount"
          name='Amount'
          required
          type='Number'
          variant="outlined"
          margin="normal"
        />
        <Button type="submit" variant="contained"  color="primary">
          Next
        </Button>
        &nbsp;&nbsp;
        {next && paymentData?.amount && <Razorpay  paymentData={paymentData} />} 
      </Box>
    </Box>
      </Modal>
    </Box>
  );
};

export default DonationModal;
