import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { PDFViewer } from '@react-pdf/renderer';
import * as React from 'react';
import Receipt from './Receipt';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'fit-content',
    height: '90vh',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ReceiptModal({open, setSelectedRow, setOpen, data}) {
    // const [open, setOpen] = React.useState(false);
    // const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    console.log(data)

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <PDFViewer style={{height:"100%"}}>
                        <Receipt data={data}/>
                    </PDFViewer>
                </Box>
            </Modal>
        </div>
    );
}
