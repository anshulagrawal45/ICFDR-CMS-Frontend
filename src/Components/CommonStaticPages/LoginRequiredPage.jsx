import React from 'react';
import { Button, Card, CardContent, CardHeader, Typography } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';




const LoginRequiredPage = () => {
    let navigate = useNavigate()
    const styles = {
        card: {
          maxWidth: 400,
          margin: 'auto',
          marginTop: 80,
          textAlign: 'center',
          paddingBottom: 20,
        },
        button: {
          marginTop: 20,
        },
      };
    
      return (
        <Card style={styles.card}>
          <CardHeader
            avatar={<LockOutlined />}
            title="Restricted Page"
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              This page requires you to be logged in to access it. Please log in to continue.
            </Typography>
            <Button
              style={styles.button}
              variant="contained"
              color="primary"
              onClick={()=>{ navigate("/client/login/")}}
            >
              Log In
            </Button>
          </CardContent>
        </Card>
      );
};

export default LoginRequiredPage;
