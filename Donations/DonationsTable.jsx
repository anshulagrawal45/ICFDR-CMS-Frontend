import { Box } from "@mui/material";
import { DataGrid, GridOverlay, GridToolbar } from "@mui/x-data-grid";
import React, { useState } from "react";

export default function DonationsTable({ donationsData }) {
  const columns = [
    { field: "id", headerName: "ID", width: ["50"] },
    { field: "name", headerName: "Name", width: "90" },
    { field: "date", headerName: "Date", width: "120" },
    { field: "donation", headerName: "Donations", width: "90" },
    { field: "paymentMode", headerName: "Payment Mode", width: "130" },
    { field: "center", headerName: "Center", width: "130" },
    { field: "address", headerName: "Address", width: "300" },
    { field: "bankName", headerName: "Bank Name", width: "80" },
    {field: "isMember", headerName: "IsMember", width: "80"},
    {
      field: "tempReceiptNumber",
      headerName: "Temp. Receipt Number",
      width: "140",
    },
    {
      field: "permReceiptNumber",
      headerName: "Perm. Receipt Number",
      width: "140",
    },
    {
      field: "transactionNumber",
      headerName: "Transaction Number",
      width: "140",
    },
    { field: "donorType", headerName: "Donor Type", width: "140" },
    { field: "year", headerName: "Year", width: "140" },
    { field: "month", headerName: "Month", width: "140" },
    // Add more columns as needed
  ];
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    address: false,
    bankName:false
  });
  // Otherwise filter will be applied on fields such as the hidden column id
  const rows = donationsData.map((donations, index) => ({
    id: index + 1,
    name: donations.name,
    date: donations.date,
    donation: donations.donation,
    purpose: donations.purpose,
    paymentMode: donations.paymentMode,
    center: donations.center,
    address: donations.address,
    bankName: donations.bankName,
    tempReceiptNumber: donations.tempReceiptNumber,
    permReceiptNumber: donations.permReceiptNumber,
    transactionNumber: donations.transactionNumber,
    donorType: donations.donorType,
    year: donations.year,
    month: donations.month,
    isMember: donations.isMember,
    // isMember: true,
    // Add more fields as needed
  }));

  // const handleCloseModal = () => {
  //   setSelectedRow(null);
  // };
  return (
    <Box sx={{ height: 400, width: 1 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        // disableColumnFilter
        // disableColumnSelector
        // disableDensitySelector
        // onRowDoubleClick={(params) => {
        //   setSelectedRow(params.row)}}
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
    </Box>
  );
}

function CustomNoRowsOverlay() {
  return (
    <GridOverlay>
      <div>No activitiesfound.</div>
    </GridOverlay>
  );
}

export function DonationsTableByMonth({ donationsData, selectedYear }) {
  const columns = [
    { field: "id", headerName: "ID", width: ["50"] },
    { field: "name", headerName: "Name", width: "80" },
    { field: "year", headerName: "Year", width: "60" },
    { field: "January", headerName: "January", width: "80" },
    { field: "February", headerName: "February", width: "80" },
    { field: "March", headerName: "March", width: "80" },
    { field: "April", headerName: "April", width: "60" },
    { field: "May", headerName: "May", width: "60" },
    { field: "June", headerName: "June", width: "60" },
    { field: "July", headerName: "July", width: "60" },
    { field: "August", headerName: "August", width: "80" },
    { field: "September", headerName: "September", width: "80" },
    { field: "October", headerName: "October", width: "80" },
    { field: "November", headerName: "November", width: "80" },
    { field: "December", headerName: "December", width: "80" },
    { field: "Total", headerName: "Total", width: "80" },
    // Add more columns as needed
  ];
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    address: false,
  });
  const rows = donationsData.map((donations, index) => ({
    id: index + 1,
    name: donations.name,
    year: selectedYear,
    January: +donations.data[selectedYear]?.January || 0,
    February: +donations.data[selectedYear]?.February || 0,
    March: +donations.data[selectedYear]?.March || 0,
    April: +donations.data[selectedYear]?.April || 0,
    May: +donations.data[selectedYear]?.May || 0,
    June: +donations.data[selectedYear]?.June || 0,
    July: +donations.data[selectedYear]?.July || 0,
    August: +donations.data[selectedYear]?.August || 0,
    September: +donations.data[selectedYear]?.September || 0,
    October: +donations.data[selectedYear]?.October || 0,
    November: +donations.data[selectedYear]?.November || 0,
    December: +donations.data[selectedYear]?.December || 0,
    Total: (+donations.data[selectedYear]?.January || 0) +
    (+donations.data[selectedYear]?.February || 0) +
    (+donations.data[selectedYear]?.March || 0) +
    (+donations.data[selectedYear]?.April || 0) +
    (+donations.data[selectedYear]?.May || 0) +
    (+donations.data[selectedYear]?.June || 0) +
    (+donations.data[selectedYear]?.July || 0) +
    (+donations.data[selectedYear]?.August || 0) +
    (+donations.data[selectedYear]?.September || 0) +
    (+donations.data[selectedYear]?.October || 0) +
    (+donations.data[selectedYear]?.November || 0) +
    (+donations.data[selectedYear]?.December || 0),

    // Add more fields as needed
  }));
  // const handleCloseModal = () => {
  //   setSelectedRow(null);
  // };
  return (
    <Box sx={{ height: 400, width: 1 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        // disableColumnFilter
        // disableColumnSelector
        // disableDensitySelector
        // onRowDoubleClick={(params) => {
        //   setSelectedRow(params.row)}}
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
    </Box>
  );
}
