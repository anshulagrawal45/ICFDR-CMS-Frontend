import { Box, IconButton, Typography } from "@mui/material";
import { DataGrid, GridOverlay, GridToolbar } from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../../Context";
import { Refresh } from "@mui/icons-material";
import NotAuthorizedPage from "../../Features/StaticPages/NotAuthorised";

export default function Activities(){
    let {apiLink,isAdmin,axios} = useContext(Context)
    let [activitiesData, setActivitiesData] = useState([])
   function fetchData(){
    ((async()=>{
        let {data} = await axios.get(`${apiLink}logs`)
        setActivitiesData(data.data.reverse())
    })())
   }

   useEffect(()=>{
    fetchData()
   },[])
    
    return !isAdmin?<NotAuthorizedPage message={"You're Not authorized to view this page!"} />:<Box>
    <Typography textAlign={"center"} variant="h4">Activities</Typography>
    <IconButton title="Refresh Data" onClick={fetchData}><Refresh /></IconButton>
    <Box textAlign={"left"} display={"flex"} flexDirection={"column"} gap={"10px"}>
    {/* {data.map((el,i)=>{
        return <Typography variant="subtitle2">{`${el.from} ${el.activity} on ${el.date} at ${el.time}`}</Typography>
    })} */}
    <ActivitiesTable activitiesData={activitiesData} />
    </Box>
</Box>
}


function ActivitiesTable({activitiesData}) {
    // const [selectedRow, setSelectedRow] = useState(null);
      const columns = [
        { field: 'id', headerName: 'ID', width:["50"] },
        { field: 'userId', headerName: 'User ID', width:["250"] },
          { field: 'name', headerName: 'Name', width:"90" },
          { field: 'date', headerName: 'Date', width:"120" },
          { field: 'time', headerName: 'Time', width:"120" },
          { field: 'activity', headerName: 'Activity', width:"fit-content" },
          // Add more columns as needed
        ];
        const [columnVisibilityModel, setColumnVisibilityModel] = useState({
          userId:false
        });
    // Otherwise filter will be applied on fields such as the hidden column id
    const rows = activitiesData.map((activity, index) => ({
      id: index + 1,
      name: activity.from.name,
      userId:activity.from.userID,
      activity: activity.activity,
      date: activity.date,
      time: activity.time
      // Add more fields as needed
    }));
  
    // const handleCloseModal = () => {
    //   setSelectedRow(null);
    // };
  return  <Box sx={{ height: 400, width: 1 }}>
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
      }
    }}
  />
  </Box>
  }
  
  function CustomNoRowsOverlay() {
    return (
      <GridOverlay>
        <div>No activitiesfound.</div>
      </GridOverlay>
    );
  }