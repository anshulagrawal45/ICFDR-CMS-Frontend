export let templates = {
  thankYou: function (name) {
    return (
      `<!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Template</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f0f0f0;
                margin: 0;
                padding: 20px;
              }
              .container {
                background-color: #ffffff;
                padding: 20px;
                text-align: center;
                max-width: 500px;
                margin: 0 auto;
              }
              .title {
                font-size: 24px;
                margin-bottom: 10px;
              }
              .content {
                font-size: 16px;
                margin-bottom: 20px;
              }
              .button {
                display: inline-block;
                background-color: #4caf50;
                color: #ffffff !important;
                text-decoration: none;
                padding: 10px 20px;
                border-radius: 4px;
                font-size: 16px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1 class="title">Hello, ${name}!</h1>
              <p class="content">Thank you for using our service. We appreciate your support.</p>
              <a class="button" href="https://cmsicfdr.org/">Visit Our Website</a>
            </div>
          </body>
          </html>`
    )
  },
  welcome: function (name) {
    return (
      `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to ICFDR</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f0f0f0;
              margin: 0;
              padding: 20px;
            }
            .container {
              background-color: #ffffff;
              padding: 20px;
              text-align: center;
              max-width: 500px;
              margin: 0 auto;
            }
            .title {
              font-size: 24px;
              margin-bottom: 10px;
            }
            .content {
              font-size: 16px;
              margin-bottom: 20px;
            }
            .button {
              display: inline-block;
              background-color: #4caf50;
              color: #ffffff !important;
              text-decoration: none;
              padding: 10px 20px;
              border-radius: 4px;
              font-size: 16px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1 class="title">Welcome to ICFDR ${name}!</h1>
            <p class="content">Thank you for registering on our platform. We are excited to have you on board.</p>
            <p class="content">Please feel free to explore our features and make the most out of your experience.</p>
            <a class="button" href="https://cmsicfdr.org/">Visit ICFDR</a>
          </div>
        </body>
        </html>
        `
    )
  },
  resetPassword: function (otp) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset - ICFDR CMS</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f0f0f0;
          margin: 0;
          padding: 20px;
        }
        .container {
          background-color: #ffffff;
          padding: 20px;
          text-align: center;
          max-width: 500px;
          margin: 0 auto;
        }
        .title {
          font-size: 24px;
          margin-bottom: 10px;
        }
        .content {
          font-size: 16px;
          margin-bottom: 20px;
        }
        .otp {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1 class="title">Password Reset - ICFDR CMS</h1>
        <p class="content">You have requested to reset your password for the ICFDR CMS platform.</p>
        <p class="content">Please use the following One-Time Password (OTP) to reset your password:</p>
        <p class="otp">${otp}</p>
        <p class="content">If you did not initiate this password reset, please ignore this email.</p>
        <p class="content">Head to the Reset page where you've initiated the process and use the OTP above to reset it.</p>
      </div>
    </body>
    </html>
    `
  },
  userCreated: function (name, email, password) {
    return `<!DOCTYPE html>
    <html>
    <head>
      <title>ICFDR Platform - New User Credentials</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
          margin: 0;
          padding: 0;
        }
        
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 4px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        h1 {
          color: #333;
          margin-top: 0;
        }
        
        p {
          color: #555;
          margin-bottom: 20px;
        }
        
        .credentials {
          background-color: #f5f5f5;
          padding: 10px;
          border-radius: 4px;
        }
        
        .label {
          font-weight: bold;
        }
        
        .value {
          margin-left: 10px;
        }
        
        .cta-button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #007bff;
          color: #fff !important;
          text-decoration: none;
          border-radius: 4px;
        }
        
        .cta-button:hover {
          background-color: #0056b3;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>ICFDR Platform - New User Credentials</h1>
        <p>Dear ${name},</p>
        <p>Your employer has generated new credentials for you to access the ICFDR platform. Please find the details below:</p>
        
        <div class="credentials">
          <p><span class="label">Username:</span><span class="value">${email}</span></p>
          <p><span class="label">Password:</span><span class="value">${password}</span></p>
        </div>
        
        <p>Please keep your credentials secure and do not share them with anyone.</p>
        <p>Click the button below to access the ICFDR platform:</p>
        <a href="https://cmsicfdr.org/" class="cta-button">Access ICFDR Platform</a>
      </div>
    </body>
    </html>
    `
  },
  meetingScheduled: function (name, sendersName, date, time) {
    return `<!DOCTYPE html>
    <html>
    <head>
      <title>Scheduled Meeting</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          font-size: 14px;
        }
        .container {
          margin: 20px auto;
          max-width: 600px;
          padding: 20px;
          border: 1px solid #ccc;
          background-color: #f9f9f9;
        }
        h1 {
          color: #333;
        }
        p {
          margin-bottom: 10px;
        }
        .highlight {
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Scheduled Meeting</h1>
        <p>Dear ${name}</p>
        <p>This email is to inform you that a meeting has been scheduled with <span class="highlight">${sendersName}</span> on <span class="highlight">${date}</span> at <span class="highlight">${time}</span>.</p>
        <p>Please make sure to mark your calendar and be prepared for the meeting.</p>
        <p>Should you have any questions or need further information, feel free to reach out.</p>
        <p>Best regards,</p>
        <p>iCFDR</p>
      </div>
    </body>
    </html>
    `
  }
}