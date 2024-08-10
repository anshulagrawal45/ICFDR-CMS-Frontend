import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridOverlay, GridToolbar } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from "@mui/material";

export default function WhatsAppTable({ whatsAppData }) {
  console.log(whatsAppData)
  const [selectedRow, setSelectedRow] = React.useState(null);
  const columns = [
    { field: "id", headerName: "ID", width: "85" },
    { field: "userID", headerName: "User ID", width: "125" },
    // { field: "name", headerName: "Name", width: "160" },
    { field: "from", headerName: "From", width: "160" },
    { field: "to", headerName: "To", width: "160" },
    { field: "date", headerName: "Date", width: "140" },
    { field: "time", headerName: "Time", width: "140" },
    { field: "content", headerName: "Content", width: "140" }
    // Add more columns as needed
  ];
  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
    userID: false
  });
  // Otherwise filter will be applied on fields such as the hidden column id
  const rows = whatsAppData.map((message, index) => ({
    id: index + 1,
    userID: message._id,
    // name: message.mobile,
    from:message.from.name || message.from.email,
    to: message.mobile,
    date: message.date,
    time: message.time,
    content: message.content.body,
    // Add more fields as needed
  }));

  const handleCloseModal = () => {
    setSelectedRow(null);
  };
  return (
    <Box sx={{ height: "80vh", width: 1 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        // isRowSelectable={true}
        // onRowClick={console.log("hello")}
        // onRowDoubleClick={}
        onRowDoubleClick={(params) => {
          setSelectedRow(params.row);
        }}
        // disableColumnFilter
        // disableColumnSelector
        // disableDensitySelector
        slots={{
          toolbar: GridToolbar,
          noRowsOverlay: CustomNoRowsOverlay, // Custom overlay component when there are no rows
        }}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) =>
          setColumnVisibilityModel(newModel)
        }
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
      />
      {selectedRow && (
        <Dialog open={Boolean(selectedRow)} onClose={handleCloseModal}>
          <DialogTitle>Row Details</DialogTitle>
          <DialogContent>
            {/* Render the row details inside the modal */}
            <p>{`Serial Number: ${selectedRow.id}`}</p>
            <p>{`User ID: ${selectedRow.userID}`}</p>
            {/* <p>{`Name: ${selectedRow.name}`}</p> */}
            {/* <p>{`message: ${selectedRow.message}`}</p> */}
            <Box border={"1px solid black"} mt={2} p={2} height={"60%"}>
          <Typography id="modal-modal-description">
            Content:
          </Typography>
          <iframe
            srcDoc={selectedRow.content}
            title="Content of message"
            style={{ border: "0", width: "100%", minHeight: ["100vh","70%"] }}
          />
          </Box>
            {/* Add more row details as needed */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}

function CustomNoRowsOverlay() {
  return (
    <GridOverlay>
      <div>No messages found.</div>
    </GridOverlay>
  );
}
