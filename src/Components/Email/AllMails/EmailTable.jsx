import {
  Button,
  Modal,
  Typography
} from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridOverlay, GridToolbar } from "@mui/x-data-grid";
import * as React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: ["95%", "fit-content"],
  height: "fit-content",
  maxHeight: "90vh",
  background: "white",
  padding: "20px",
  boxShadow: 24,
  p: 4,
  overflowY: "scroll"
};

export default function EmailsTable({ emailsData }) {
  const [selectedRow, setSelectedRow] = React.useState(null);
  const columns = [
    { field: "id", headerName: "ID", width: "85" },
    { field: "userID", headerName: "User ID", width: "125" },
    { field: "name", headerName: "Name", width: "160" },
    { field: "from", headerName: "From", width: "160" },
    { field: "to", headerName: "To", width: "160" },
    { field: "date", headerName: "Date", width: "140" },
    { field: "time", headerName: "Time", width: "140" },
    { field: "subject", headerName: "Subject", width: "140" },
  ];
  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
    userID: false
  });
  // Otherwise filter will be applied on fields such as the hidden column id
  const rows = emailsData.map((email, index) => ({
    id: index + 1,
    userID: email._id,
    name: email.name || email.email,
    from: email.from.name,
    to: email.email,
    date: email.date,
    time: email.time,
    subject: email.content.sub,
    content: email.content.body,
    // Add more fields as needed
  }));

  const handleCloseModal = () => {
    setSelectedRow(null);
  };
  return (
    <Box sx={{ height: "80vh", width: 1, background: "rgba(255,255,255,0.8)" }}>
      <DataGrid
        initialState={{
          pagination: {
            paginationModel: { pageSize: 25, page: 0 },
          }
        }}
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
        <Modal open={Boolean(selectedRow)} onClose={handleCloseModal}>
          <Box style={style}>
            <Typography>Row Details</Typography>
            <Box sx={{ width: "100%" }}>
              {/* Render the row details inside the modal */}
              <p>{`Serial Number: ${selectedRow.id}`}</p>
              <p>{`User ID: ${selectedRow.userID}`}</p>
              <p>{`Name: ${selectedRow.name}`}</p>
              <p>{`Email To: ${selectedRow.to}`}</p>
              <p>{`Email From: ${selectedRow.from}`}</p>
              <p>{`Email From: ${selectedRow.subject}`}</p>
              <Box sx={{ width: "100%" }} border={"1px solid black"} mt={2} p={2} height={"60%"}>
                <Typography id="modal-modal-description">
                  Content:
                </Typography>
                <iframe
                  srcDoc={selectedRow.content}
                  title="Content of Email"
                  style={{ border: "0", width: "100%", height: "400px" }}
                />
              </Box>
              {/* Add more row details as needed */}
            </Box>
            <Button onClick={handleCloseModal}>Close</Button>
          </Box>

        </Modal>

      )}
    </Box>
  );
}

function CustomNoRowsOverlay() {
  return (
    <GridOverlay>
      <div>No emails found.</div>
    </GridOverlay>
  );
}
