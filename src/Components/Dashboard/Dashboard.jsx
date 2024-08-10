import { Box, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Context";
import styles from "../Features/Styles/CustomInputs.module.css";
import Announcements from "./Announcements/Announcements";
import DashboardBoxes from "./DashBoardBoxes/DashboardBoxes";
import LeadTable from "./DashboardTable/DashboardTable2";



export default function Dashboard() {
  let {userID, apiLink, assignedCenter, userCreator, axios,name} = useContext(Context)
  let [meetingsData, setMeetingsData] = useState([])
  let [isLoading, setIsLoading] = useState(false)
  let navigate = useNavigate()
  let [length, setLength] = useState({
    meetings:0,emails:0
  })
  
  useEffect(() => {
    if(!userID){
      return navigate("/client/login")
    }
    
    ((async () => {
      setIsLoading(true)
      let { data } = await axios.get(`${apiLink}meetings?userID=${userID}`)
      setMeetingsData(data.data)
      setLength({...length,meetings:data.data.length})
      setIsLoading(false)
    })());
    ((async () => {
      setIsLoading(true)
      let { data } = await axios.get(`${apiLink}emailTracker?userID=${userID}`)
      setLength({...length,emails:data.data.length})

      setIsLoading(false)
    })());
  }, [userID])
  return <Box position={"relative"} width={["calc(100vw-100px)"]} p={["10px","30px"]}>
  <Box textAlign={"center"}>
    <Box display={"flex"} justifyContent={"space-between"}>
    <Typography variant="h6" fontWeight={700}>{assignedCenter?`Center: ${assignedCenter}`:null}</Typography>
    <Typography variant="h5" className={styles.title} fontWeight={700}>Welcome {name}</Typography>
    <Typography variant="h6" fontWeight={700}>Created By: {userCreator?.name?userCreator.name:null}</Typography>
    </Box>

    <Box mt={"20px"} textAlign={"center"} display={"flex"} justifyContent={"space-evenly"}>
      <DashboardBoxes heading={"Today's Meetings"} target={length.meetings} />
      <DashboardBoxes heading={"Total Mails Sent"} style={{display:["none","none","initial","initial"]}} target={length.emails} />
    </Box>

    <Box mt={"20px"} textAlign={"center"}>
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <Typography variant={"h5"} className={styles.title}>Today's Meetings</Typography>
      </Box>
      <br />
      <LeadTable leads={meetingsData} route={"meetings"}  />
      <br />
      <br />
    </Box>
    <br />
    <br />
    <Box m={"auto"} width={"100%"} textAlign={"center"} >
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
    <Typography variant="h4" fontWeight={700}  className={styles.title}>Announcements</Typography>
    </Box>
      <Announcements />
    </Box>
  </Box>
</Box>
}