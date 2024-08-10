import { Typography } from '@mui/material';
import React, { Component } from 'react';

let style={
    parent:{
        textAlign:"center",
        height:"100vh",
        margin:"auto",
        display:"grid",
        placeItems:"center"
    },
    heading:{
        fontSize:"24px"
    },
    button:{
        backgroundColor:"transparent",
        padding:"10px",
        
    }
}

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to a service like Sentry
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  reloadPage = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={style.parent}>
          <div>
          <h1 style={style.heading}>Something went wrong! :(</h1>
          <p>Please try to reload the page.</p>
          <button style={style.button} onClick={this.reloadPage}>Reload</button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;


