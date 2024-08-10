
import { TextField, Button, Box, Typography } from '@mui/material';

const LandingPageForm = () => {

  return (
    <Box display="flex" justifyContent="center" alignItems="center" padding="10px">
      <Box
        width={["100%", "100%", "300px", "400px"]}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography fontSize="20px">Contact Us For Full Support</Typography>
        <br />
        <Box sx={{ bgcolor: "white" }} p="10px" borderRadius="10px">
          <TextField
            label="Full Name"
            fullWidth
            sx={{ marginBottom: '5px' }}
          />
          <TextField
            label="Email"
            fullWidth
            sx={{ marginBottom: '5px' }}
          />
          <TextField
            label="Phone Number"
            type="number"
            fullWidth
          />
          
            {/* <AutocompleteCities /> */}
        </Box>
        <br />
        <Button variant="contained" color="primary">
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default LandingPageForm;
