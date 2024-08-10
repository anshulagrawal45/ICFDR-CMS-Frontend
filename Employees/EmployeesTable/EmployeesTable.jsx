import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridOverlay, GridToolbar } from "@mui/x-data-grid";
import {
} from "@mui/material";
import EmployeesEditModal from "./EmployeesEditModal";

export default function EmployeesTable({ employeesData }) {
  const [selectedRow, setSelectedRow] = React.useState(null);
  console.log(selectedRow)
  const [open, setOpen] = React.useState(false);
  const columns = [
    { field: "id", headerName: "ID", width: "85" },
    { field: "userID", headerName: "User ID", width: "125" },
    { field: "name", headerName: "Name", width: "160" },
    { field: "email", headerName: "Email", width: "240" },
    { field: "phone", headerName: "Phone", width: "160" },
    { field: "assignedCenter", headerName: "Assigned Center", width: "140" },
    { field: "role", headerName: "Role", width: "100" },
    { field: "creator", headerName: "Created By", width: "140" },
    { field: "allCenters", headerName: "All Center", width: "200" },
    { field: "panNumber", headerName: "PAN Number", width: "160" },
    { field: "aadharNumber", headerName: "Aadhar Number", width: "200" },
    { field: "gender", headerName: "Gender", width: "100" },
    // Add more columns as needed
    { field: "marriage", headerName: "Marital Status", width: "100" },
    { field: "collegeName", headerName: "College Name", width: "100" },
    { field: "courseName", headerName: "Course Name", width: "100" },
    { field: "year", headerName: "Year", width: "100" },
    { field: "photo", headerName: "Photo", width: "100" },
  ];
  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
    userID: false,
    donorType: false,
    lpNumber: false,
    panNumber: false,
    aadharNumber: false,
    introducedBy: false,
    gender: false,
    marriage:false,
    collegeName:false,
    courseName:false,
    year:false,
    photo:false,
  });
  // Otherwise filter will be applied on fields such as the hidden column id
  const rows = employeesData.map((employee, index) => ({
    id: index + 1,
    userID: employee._id,
    name: employee?.name,
    email: employee?.email,
    phone: employee?.phone,
    center: employee?.center,
    panNumber: employee?.details?.panNumber,
    aadharNumber: employee?.details?.aadharNumber,
    creator: employee?.creator?.name,
    assignedCenter: employee?.assignedCenter,
    role: employee?.role,
    allCenters: employee?.centers?.join(", "),
    data:employee,
    gender:employee?.details?.gender,
    marriage:employee?.details?.maritalStatus,
    collegeName:employee?.details?.collegeName,
    courseName:employee?.details?.courseName,
    year:employee?.details?.year,
    photo:employee?.details?.photo
    // Add more fields as needed
  }));

  const handleCloseModal = () => {
    setSelectedRow(null);
  };
  return (
    <Box sx={{ height: "80vh", width: 1,background:"rgba(255,255,255,0.8)" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        // isRowSelectable={true}
        // onRowClick={console.log("hello")}
        // onRowDoubleClick={}
        onRowDoubleClick={(params) => {
          console.log(params.row);
          setSelectedRow(params.row);
          setOpen(true)
        }}
        // disableColumnFilter
        // disableColumnSelector
        // disableDensitySelector
        slots={{
          toolbar: GridToolbar,
          noRowsOverlay: CustomNoRowsOverlay, // Custom overlay component when there are no rows
        }}
        // slotProps={{ toolbar: { printOptions: { disableToolbarButton: true } } }}
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
        <EmployeesEditModal handleCloseModal={handleCloseModal} employee={selectedRow.data} open={open} setOpen={setOpen} />
      )}
    </Box>
  );
}

function CustomNoRowsOverlay() {
  return (
    <GridOverlay>
      <div>No employees found.</div>
    </GridOverlay>
  );
}
