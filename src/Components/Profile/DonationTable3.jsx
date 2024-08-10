import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid, GridOverlay, GridToolbar } from '@mui/x-data-grid';
import * as React from 'react';
import Receipt from "./Receipt";
import ReceiptModal from './ReceiptModal';

const MemoizedReceipt = React.memo(Receipt);


export default function DonationTable3({ membersData, donationsData }) {
    const [selectedRow, setSelectedRow] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const columns = [
        { field: 'id', headerName: 'ID', width: "85" },
        { field: 'date', headerName: 'Date Of Donation', width: "200" },
        { field: 'name', headerName: 'Name', width: "160" },
        { field: 'address', headerName: 'Address', width: "240" },
        { field: 'paymentMode', headerName: 'PaymentMode', width: "160" },
        { field: 'donation', headerName: 'Amount', width: "160" },
        { field: 'purpose', headerName: 'Purpose', width: "140" },
        { field: 'transactionNumber', headerName: 'Transaction Number', width: "140" },
        { field: 'tempReceiptNumber', headerName: 'Temporary Receipt No.', width: "160" },
        { field: 'permReceiptNumber', headerName: 'Permanent Receipt No.', width: "200" },
        { field: 'donorType', headerName: 'Donor Type', width: "200" },
        { field: 'year', headerName: 'Year', width: "200" },
        { field: 'month', headerName: 'Month', width: "200" },
        { field: 'memberId', headerName: 'Member Id', width: "200" },
        { field: 'userId', headerName: 'User Id', width: "200" },
        { field: 'bankName', headerName: 'Bank Name', width: "200" },
        {
            field: 'download',
            headerName: 'Download Receipt',
            width: "150",
            renderCell: (params) => (
                <Button
                    variant="outlined"
                    size="small"
                    // onClick={() => handleDownload(params.row)}
                    onClick={() => {
                        console.log('Row double-clicked:', params);
                        setOpen(true);
                        setSelectedRow(params.row);
                        console.log(params.row);
                    }}
                >
                    Download
                </Button>
            ),
        },
    ];
    const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
        donorType: false,
        address: false,
        transactionNumber: false,
        // tempReceiptNumber: false,
        permReceiptNumber: false,
        memberId: false,
        year: false,
        month: false,
        userId: false,
        bankName: false,

    });

    const handleDownload = (rowData) => {
        // Handle download logic here using the rowData
        console.log('Download clicked for row:', rowData);
    };

    const rows = donationsData.filter(donation => donation?.memberID === membersData?._id)
        .map((donation, index) => ({
            id: index + 1,
            date: donation?.date,
            name: donation?.name,
            address: donation?.address,
            paymentMode: donation?.paymentMode,
            donation: donation?.donation,
            purpose: donation?.purpose,
            transactionNumber: donation?.transactionNumber,
            tempReceiptNumber: donation?.tempReceiptNumber,
            permReceiptNumber: donation?.permReceiptNumber,
            donorType: donation?.donorType,
            year: donation?.year,
            month: donation?.month,
            memberID: donation?.memberID,
            userID: donation?.userID,
            bankName: donation?.bankName,

        }));
    return <Box sx={{ height: "80vh", width: 1 }}>
        <DataGrid
            rows={rows}
            columns={columns}
            onRowDoubleClick={(params) => {
                console.log('Row double-clicked:', params);
                setOpen(true);
                setSelectedRow(params.row);
                console.log(params.row);
            }}
            slots={{
                toolbar: GridToolbar,
                noRowsOverlay: CustomNoRowsOverlay,
            }}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(newModel) =>
                setColumnVisibilityModel(newModel)
            }
            slotProps={{
                toolbar: {
                    showQuickFilter: true,
                    quickFilterProps: { debounceMs: 500 },
                    printOptions: { disableToolbarButton: true }
                },
            }}
        />
        {selectedRow && <ReceiptModal open={open} setSelectedRow={setSelectedRow} setOpen={setOpen} data={selectedRow} />}

    </Box>
}

function CustomNoRowsOverlay() {
    return (
        <GridOverlay>
            <div>No Donations found.</div>
        </GridOverlay>
    );
}