import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Divider, IconButton } from "@mui/material";
import { Celebration } from "@mui/icons-material";
import axios from "axios";
import { Context } from "../../Context";
import { DataGrid, GridOverlay, GridToolbar } from "@mui/x-data-grid";
import s from "./Notifications.module.css"
import StyledButton from "../UIComponents/Button/StyledButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: ["90vw", "fit-content"],
  height:"90vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflowY:"scroll",
  borderRadius:"10px"
};

export default function Notifications() {
  const [open, setOpen] = React.useState(false);
  const { apiLink, userID } = React.useContext(Context);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data, setData] = React.useState({});
  // const [userColumns, setUserColumns] = React.useState({});
  const [userRows, setUserRows] = React.useState({});
  // const [memberColumns, setMemberColumns] = React.useState({});
  const [memberRows, setMemberRows] = React.useState({});
  // const [childrensColumns, setChildrensColumns] = React.useState({});
  const [childrensRows,setChildrensRows ] = React.useState({});
  // const [anniversaryColumns,setAnniversaryColumns ] = React.useState({});
  const [anniversaryRows,setAnniversaryRows ] = React.useState({});

  React.useEffect(() => {
    if (!userID) return;
    (async () => {
      await axios
        .get(`${apiLink}getBirthdays`)
        .then((res) => {
          setData(res.data);
          setUserRows(res?.data?.users?.map((el, index) => ({
            id: el?._id,
            name: el?.name,
            email:el?.email,
            date: el?.dob,
            phone: el?.phone
            // Add more fields as needed
          })))
          setMemberRows(res?.data?.members?.map((el, index) => ({
            id: el?._id,
            name: el?.name,
            email:el?.email,
            date: el?.dob,
            phone: el?.phone
            // Add more fields as needed
          })))
          setChildrensRows(res?.data?.childrens?.map((el, index) => ({
            id: el?._id,
            name: el?.name,
            memberName: el?.memberName,
            email:el?.email,
            date: el?.dob,
            phone: el?.phone
            // Add more fields as needed
          })))
          setAnniversaryRows(res?.data?.anniversaries?.map((el, index) => ({
            id: el?._id,
            name: el?.memberName,
            spouse: el?.spouseName,
            email:el?.email,
            date: el?.date,
            phone: el?.phone
            // Add more fields as needed
          })))
        })
        .catch((err) => console.log(err));
    })();
  }, [userID]);

  const userColumns = [
    { field: 'id', headerName: 'ID', width:["50"] },
      { field: 'name', headerName: 'Name', width:"90" },
      { field: 'date', headerName: 'Date', width:"120" },
      { field: 'email', headerName: 'Email', width:"120" },
      { field: 'phone', headerName: 'Phone', width:"fit-content" },
      // Add more columns as needed
    ];
  const memberColumns = [
    { field: 'id', headerName: 'ID', width:["50"] },
      { field: 'name', headerName: 'Name', width:"90" },
      { field: 'date', headerName: 'Date', width:"120" },
      { field: 'email', headerName: 'Email', width:"120" },
      { field: 'phone', headerName: 'Phone', width:"fit-content" },
      // Add more columns as needed
    ];
  const childrensColumns = [
    { field: 'id', headerName: 'ID', width:["50"] },
      { field: 'name', headerName: 'Name', width:"90" },
      { field: 'memberName', headerName: 'Member Name', width:"90" },
      { field: 'date', headerName: 'Date', width:"120" },
      { field: 'email', headerName: 'Email', width:"120" },
      { field: 'phone', headerName: 'Phone', width:"fit-content" },
      // Add more columns as needed
    ];
  const anniversaryColumns = [
    { field: 'id', headerName: 'ID', width:["50"] },
      { field: 'name', headerName: 'Name', width:"90" },
      { field: 'spouse', headerName: 'Spouse', width:"90" },
      { field: 'date', headerName: 'Date', width:"120" },
      { field: 'email', headerName: 'Email', width:"120" },
      { field: 'phone', headerName: 'Phone', width:"fit-content" },
      // Add more columns as needed
    ];

  return !userID ? null : (
    <Box zIndex={1000} right={["200px", "225px", "250px"]}>
      <StyledButton text={"Notifications"} tooltip={"Upcoming"} extraFunction={handleOpen} icon={<Celebration />} />


      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className={s.notificationContainer}>
          <Typography variant="h5">See Upcoming Events</Typography>
          <br />
          {data?.users?.length === 0 &&
          data?.members?.length === 0 &&
          data?.anniversaries?.length === 0 &&
          data?.childrens?.length === 0 ? (
            <Typography>No Upcoming Events :(</Typography>
          ) : (
            <Box sx={{background:"rgba(255,255,255,0.8)"}}>
              <NotificationsTable columns={userColumns} rows={userRows} heading={"Users Birthdays"} />
              <NotificationsTable columns={memberColumns} rows={memberRows} heading={"Members Birthdays"} />
              <NotificationsTable columns={childrensColumns} rows={childrensRows} heading={"Childrens Birthdays"} />
              <NotificationsTable columns={anniversaryColumns} rows={anniversaryRows} heading={"Upcoming Anniversaries"} />
            </Box>
          )}
        </Box>
      </Modal>
    </Box>
  );
}



export function NotificationsTable({columns,rows,heading}){
    let {apiLink,isAdmin,axios} = React.useContext(Context)
    let [activitiesData, setActivitiesData] = React.useState([])
   function fetchData(){
    ((async()=>{
        let {data} = await axios.get(`${apiLink}logs`)
        setActivitiesData(data.data.reverse())
    })())
   }

   React.useEffect(()=>{
    fetchData()
   },[])
    
    return<Box>
    <Typography textAlign={"center"} variant="h6">{heading}</Typography>
    <Box textAlign={"left"} display={"flex"} flexDirection={"column"} gap={"10px"}>
    <Table activitiesData={activitiesData} columns={columns} rows={rows} />
    </Box>
</Box>
}


function Table({columns,rows}) {
        const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
          userId:false
        });
  return  <Box sx={{ height: 400, width: 1 }}>
  <DataGrid
    rows={rows}
    columns={columns}
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
      }
    }}
  />
  </Box>
  }
  
  function CustomNoRowsOverlay() {
    return (
      <GridOverlay>
        <div>No Data Found.</div>
      </GridOverlay>
    );
  }
