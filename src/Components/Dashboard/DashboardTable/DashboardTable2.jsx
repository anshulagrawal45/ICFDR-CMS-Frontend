import React, { useContext, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  MenuItem,
  Select,
} from "@mui/material";
import { Context } from "../../../Context";

const LeadTable = ({ leads, route }) => {
  const {theme} = useContext(Context)
  return (
    <TableContainer component={Paper} sx={{width:["100%","100%"],background:theme==="dark"?"rgb(145, 145, 145)":"white"}}>
      <Table aria-label="lead table">
        <TableHead>
          <TableRow>
            <TableCell>Company Name</TableCell>
            <TableCell>Contact Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Subject</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leads.map((lead, i) => {
            return <TableTextField key={i} lead={lead} route={route} />;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

function TableTextField({ lead, route }) {
  let { apiLink, meetingsData, setMeetingsData, callsData, setCallsData, ActivateToast,axios } = useContext(Context)
  let [status, setStatus] = useState(lead.status);
  let [isDisabled, setIsDisabled] = useState(true);
  const handleStatusChange = ({target}) => {
    setStatus(target.value);
  };

  const handleSaveStatus = async () => {
    setIsDisabled(true)
    let temp = { ...lead };
    temp.status = status;
    // Update the meetingsData context
    if (route == "meetings") {
      let updatedMeetingsData = meetingsData.map((item) => {
        if (item._id === lead._id) {
          return temp;
        } else {
          return item;
        }
      });
      setMeetingsData(updatedMeetingsData);
    }
    if (route == "calls") {
      let updatedCallsData = callsData.map((item) => {
        if (item._id === lead._id) {
          return temp;
        } else {
          return item;
        }
      });
      setCallsData(updatedCallsData);
    }
    // Save the updated data to the server
    await axios.patch(`${apiLink}${route}/${lead._id}`, temp);
    ActivateToast("Data Updated Successfully", "success")
  }

  function handleDeleteMeeting(id) {
    axios.delete(`${apiLink}${route}/${id}`).then(() => {
      // Remove the deleted meeting from the meetingsData context
      if (route == "meetings") {
        const updatedMeetingsData = meetingsData.filter((item) => item._id !== id);
        setMeetingsData(updatedMeetingsData);
      }
      if (route == "calls") {
        const updatedCallsData = callsData.filter((item) => item._id !== id);
        setCallsData(updatedCallsData);
      }
      ActivateToast("Data Deleted Successfully", "success");
    });
  }
  return (
    <TableRow key={lead._id}>
      <TableCell>{lead.company}</TableCell>
      <TableCell>{lead.contactName}</TableCell>
      <TableCell>{lead.date}</TableCell>
      <TableCell>{lead.time}</TableCell>
      <TableCell>{lead.priority}</TableCell>
      <TableCell>
        <Select
        fullWidth
          value={status}
          onChange={handleStatusChange}
          inputProps={{ 'aria-label': 'Without label' }}
          disabled={isDisabled}
        >
          <MenuItem value={"Converted"}>Converted</MenuItem>
          <MenuItem value={"Pending"}>Pending</MenuItem>
          <MenuItem value={"Onboard"}>Onboard</MenuItem>
        </Select>
      </TableCell>
      <TableCell>{lead.subject}</TableCell>
      <TableCell>
        {isDisabled ? <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setIsDisabled(false)
          }}
        >
          Edit
        </Button> : <Button
          variant="contained"
          color="primary"
          onClick={handleSaveStatus}
        >
          Save
        </Button>}
      </TableCell>
      <TableCell>
        <Button variant="contained" color={"error"} onClick={() => {
          handleDeleteMeeting(lead._id)
        }}>
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default LeadTable;
