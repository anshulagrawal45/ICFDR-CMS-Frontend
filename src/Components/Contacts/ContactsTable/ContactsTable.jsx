import Box from "@mui/material/Box";
import { DataGrid, GridOverlay, GridToolbar } from "@mui/x-data-grid";
import * as React from "react";
import ContactModal from "./ContactModal";

export default function ContactsTable({ contactsData }) {
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [disabled, setDisabled] = React.useState(true)
  const columns = [
    { field: "id", headerName: "ID", width: "35" },
    { field: "name", headerName: "Name", width: "120" },
    { field: "phone", headerName: "Phone", width: "120" },
    { field: "email", headerName: "Email", width: "240" },
    { field: "company", headerName: "Company", width: "120" },
    { field: "website", headerName: "Website", width: "120" },
    { field: "department", headerName: "Department", width: "120" },
    // Add more columns as needed
  ];
  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
    userID: false,
  });
  // Otherwise filter will be applied on fields such as the hidden column id
  const rows = contactsData.map((contact, index) => ({
    id: contact?._id,
    name: contact?.name,
    email: contact?.email,
    phone: contact?.phone,
    company: contact?.company,
    website: contact?.website,
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
          let temp = contactsData.filter(el=>{
            return el?._id ==params?.row?.id
          })
          setSelectedRow(temp[0]);
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
            printOptions: { disableToolbarButton: true }
          },
        }}
      />
      {selectedRow && (
        <ContactModal data={selectedRow} setOpen={setSelectedRow} open={Boolean(selectedRow)}  handleClose={handleCloseModal} disabled={disabled} setDisabled={setDisabled} />
        
      )}
    </Box>
  );
}

function CustomNoRowsOverlay() {
  return (
    <GridOverlay>
      <div>No contacts found.</div>
    </GridOverlay>
  );
}
