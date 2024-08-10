import Box from '@mui/material/Box';
import { DataGrid, GridOverlay, GridToolbar } from '@mui/x-data-grid';
import * as React from 'react';
import MemberModal from './MemberModel';



export default function MembersTable({ membersData }) {
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const columns = [
    { field: 'id', headerName: 'ID', width: "85" },
    { field: 'dateOfMembership', headerName: 'Date Of Membership', width: "200" },
    { field: 'name', headerName: 'Name', width: "160" },
    { field: 'email', headerName: 'Email', width: "240" },
    { field: 'phone', headerName: 'Phone', width: "160" },
    { field: 'profession', headerName: 'Profession', width: "160" },
    { field: 'creator', headerName: 'Created By', width: "140" },
    { field: 'center', headerName: 'Center', width: "140" },
    { field: 'panNumber', headerName: 'PAN Number', width: "160" },
    { field: 'aadharNumber', headerName: 'Aadhar Number', width: "200" },
    { field: 'donorType', headerName: 'Donor Type', width: "200" },
    { field: 'lpNumber', headerName: 'LP Number', width: "200" },
    { field: 'introducedBy', headerName: 'Introduced By', width: "200" },
    // Add more columns as needed
    { field: 'dob', headerName: 'DOB', width: "200" },
    { field: 'whatsappNumber', headerName: 'WhatsApp Number', width: "200" },
    { field: 'residenceAddress', headerName: 'Residence Address', width: "200" },
    { field: 'photo', headerName: 'Photo', width: "200" },
    { field: 'officeAddress', headerName: 'Office Address', width: "200" },
    { field: 'isMarried', headerName: 'Marital Status', width: "200" },
    { field: 'dateOfMarriage', headerName: 'Date of Marriage', width: "200" },
  ];
  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
    donorType: false,
    lpNumber: false,
    panNumber: false,
    aadharNumber: false,
    introducedBy: false,
    dob: false,
    whatsappNumber: false,
    residenceAddress: false,
    photo: false,
    officeAddress: false,
    isMarried: false,
    dateOfMarriage: false,


  });
  // Otherwise filter will be applied on fields such as the hidden column id
  const rows = membersData.map((member, index) => ({
    id: index + 1,
    dateOfMembership: member.details.dateOfMembership,
    name: member.details.name,
    email: member.email,
    phone: member.phone,
    profession: member.details.profession,
    creator: member.createdBy,
    center: member.center,
    donorType: member.details.donorType,
    lpNumber: member.details.lpNumber,
    panNumber: member.details.panNumber,
    aadharNumber: member.details.aadharNumber,
    introducedBy: member.details.introducedBy,
    member,
    dob: member.dob,
    whatsappNumber: member.details.whatsappNumber,
    residenceAddress: member.details.residenceAddress,
    photo: member.details.photo,
    officeAddress: member.details.officeAddress,
    isMarried: member.details.isMarried,
    dateOfMarriage: member.details.dateOfMarriage

  }));

  // const handleCloseModal = () => {
  //   setSelectedRow(null);

  // };

  // React.useEffect(()=>{
  // },[selectedRow])


  return <Box sx={{ height: "80vh", width: 1 }}>
    <DataGrid
      rows={rows}
      columns={columns}
      onRowDoubleClick={(params) => {
        setOpen(true)
        setSelectedRow(params.row)
      }}
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
    {selectedRow && <MemberModal open={open} setSelectedRow={setSelectedRow} setOpen={setOpen} member={selectedRow?.member || {}} />}

  </Box>
}

function CustomNoRowsOverlay() {
  return (
    <GridOverlay>
      <div>No Members found.</div>
    </GridOverlay>
  );
}