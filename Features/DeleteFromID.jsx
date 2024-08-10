import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';
import { Context } from '../../Context';
import StyledButton from '../UIComponents/Button/StyledButton';

export default function DeleteFromID({id,name,route,array,setArray,headline,message,buttonText,setModalOpen}) {
  const [open, setOpen] = React.useState(false);
  const {apiLink, ActivateToast, axios,PostToLogs} = React.useContext(Context);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
  setOpen(false);
  setModalOpen(false);
  };
  const handleDelete=()=>{
    axios
    .delete(`${apiLink}${route}/${id}`)
    .then((response) => {
      // Check if the delete request was successful
      if (response.status === 200) {
        // Filter out the deleted item from the array
        const updatedArray = array.filter((item) => item._id !== id);
        console.log(updatedArray)
        setArray(updatedArray);
        ActivateToast("Item Deleted Successfully","success")
      }
    })
    .catch((error) => {
      console.error('Error deleting item:', error);
      ActivateToast("Error deleting item","error")
    })
    handleClose()
    if(route==="member"){
      PostToLogs(`Deleted ${name} from Members List.`)
    }
    if(route==="users"){
      PostToLogs(`Deleted ${name} from Admins/Leaders List.`)
    }

  }

  return (
    <Box component={"span"}>
      <StyledButton text={buttonText} background={"red"} extraFunction={handleClickOpen} />
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        sx={{zIndex:10000}}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {headline}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color={"error"} onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}