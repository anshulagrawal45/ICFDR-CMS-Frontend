import { Typography } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';

const NotAuthorizedPage = ({message, advice}) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ textAlign: 'center' }}>
        <Typography variant="h4" fontSize={"50px"} component="h1" gutterBottom>
          {message}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {advice}
        </Typography>
        <NavLink to={"/"} >
          Go to Home Page
        </NavLink>
      </div>
    </div>
  );
};

export default NotAuthorizedPage;
