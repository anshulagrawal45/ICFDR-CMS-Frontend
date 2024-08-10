import {
  Box,
} from "@mui/material";
import { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Authorisation/Login/Login";
import Register from "./Components/Authorisation/Register/Register";
import Chats from "./Components/Chats/Chats";
import ComplaintForm from "./Components/Complaints/MembersComplaint/Complaint";
import ViewMemberComplaint from "./Components/Complaints/MembersComplaint/ViewMemberComplaint";
import ViewComplaints from "./Components/Complaints/ViewComplaints";
import Contacts from "./Components/Contacts/Contacts";
import Dashboard from "./Components/Dashboard/Dashboard";
import Donations from "./Components/Donations/Donations";
import NonMembers from "./Components/Donations/NonMember";
import Emails from "./Components/Email/Email";
import Employees from "./Components/Employees/Employees";
import ExternalForm from "./Components/ExternalForm/ExternalForm";
import ChangePassword from "./Components/Features/ChangePassword";
import InitialModal from "./Components/InitialModal/InitialModal";
import LandingPage from "./Components/LandingPage/LandingPage";
import Meetings from "./Components/Meetings/Meetings";
import MemberLogin from "./Components/MemberLogin/MemberLogin";
import Members from "./Components/Members/Members";
import Miscellaneous from "./Components/Miscellaneous/Miscellaneous";
import IndividualProfessionCategory from "./Components/Miscellaneous/ProfessionCategories/IndividualProfessionCategory";
import ProfessionCategories from "./Components/Miscellaneous/ProfessionCategories/ProfessionCategories";
import NavMobile from "./Components/Navbar/NavMobile";
import Navbar from "./Components/Navbar/Navbar";
import Notes from "./Components/Notes/Notes";
import NewNotes from "./Components/NotesNew/NewNotes";
import Profile from "./Components/Profile/Profile";
import Profile2 from "./Components/Profile/Profile2";
import WhatsApp from "./Components/WhatsApp/WhatsApp";
import WhatsAppUi from "./Components/WhatsApp2/WhatsAppUi";
import { Context } from "./Context";

function App() {
  let { apiLink, universalLoading, setIsAdmin, userID, setRole, setHide, setUserPermissions, setCenters, setUserName, axios, selected } =
    useContext(Context);
  const { setOpen, setConfigurationSettings, token, setMemberLoginData, newNotesArray, setNewNotesArray } = useContext(Context);
  const { setUserData, isMemberLogin, setUserID } = useContext(Context);
  const { setUserCreator, setAssignedCenter, setUniversalLoading } = useContext(Context);
  const { setGender } = useContext(Context);
  const { setName } = useContext(Context);
  const { setMaritalStatus } = useContext(Context);
  const { setDegree } = useContext(Context);
  const { setImage } = useContext(Context)


  useEffect(() => {
    if (!isMemberLogin) {
      return
    }
    axios.get(apiLink + "member/" + userID).then(({ data }) => {
      setMemberLoginData(data)
      setName(data.details.name || "");
      setUserCreator({
        name: data.createdBy,
        userID
      })
      setAssignedCenter(data.center || "")
    })
  }, [apiLink, axios, isMemberLogin, setAssignedCenter, setMemberLoginData, setName, setUserCreator, userID])

  useEffect(() => {
    ((async () => {
      let { data } = await axios.get(`${apiLink}configuration/647589da7d9cb06b225e4638`)
      setConfigurationSettings(data)
    })())
    if (!token) return;
    if ((token && userID)) return;
    if (!token && userID) return;
    setUniversalLoading(true)
    axios.get(apiLink + "userDataByToken").then(({ data: res }) => {
      setUserID(res._id)
      setUserData(res.details);
      setName(res.name || "");
      setUserName(res.name || "")
      setRole(res.role || "");
      setIsAdmin(res.isAdmin || false);
      setUserPermissions(res.permissions)
      setCenters(res.centers)
      setAssignedCenter(res.assignedCenter || "")
      setUserCreator(res?.creator)
      if (res.isAdmin || res.role === "Leader" || res.role === "Admin") {
        ((async () => {
          let { data } = await axios.get(`${apiLink}configuration/647589da7d9cb06b225e4638`)
          setConfigurationSettings(data)
        })())
      }
      setHide(!!(res.isDataHidden))
      setMaritalStatus(res.details?.maritalStatus || "");
      setImage(res.details?.photo || "");
      setDegree(res.details?.degree || "");
      setGender(res.details?.gender || "");
      setUniversalLoading(false)
    }).catch((err) => setUniversalLoading(false))
  }, [])
  return (
    <Box p={["60px 0 0 0", "0 0 0 100px"]} className="App">
      <InitialModal />
      <Navbar />
      <NavMobile />
      <Chats />
      <Box zIndex={9} display={"flex"} flexWrap={"wrap"} alignItems={"flex-end"} flexDirection={"row-reverse"} position={"fixed"} gap={"10px"} bottom={10} right={[120, selected ? 340 : 120]}>
        {newNotesArray.map((el, i) => {
          return <NewNotes key={i} right={i} />
        })}
      </Box>
      <br />
      {/* <DonationModal /> */}
      <Box p={"10px"}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/client/notes" element={<Notes />} />
          <Route path="/client/emails" element={<Emails />} />
          <Route path="/client/whatsApp" element={<WhatsApp />} />
          <Route path="/client/contacts" element={<Contacts />} />
          <Route path="/client/meetings" element={<Meetings />} />
          <Route path="/client/misc" element={<Miscellaneous />} />
          <Route path="/client/misc/professionCategories" element={<ProfessionCategories />} />
          <Route path="/client/misc/professionCategories/:center" element={<IndividualProfessionCategory />} />
          <Route path="/client/donations" element={<Donations />} />
          <Route path="/client/NonMembers" element={<NonMembers />} />
          <Route path="/client/dashboard" element={<Dashboard />} />
          <Route path="/client/addLeaders" element={<Employees />} />
          <Route path="/client/form/:formID" element={<ExternalForm />} />
          <Route path="/client/addMembers" element={<Members />} />
          <Route path="/client/register" element={<Register />} />
          <Route path="/client/login" element={<Login />} />
          <Route path="/client/profile" element={<Profile />} />
          <Route path="/client/profile2" element={<Profile2 />} />
          <Route path="/client/complaints" element={<ViewComplaints />} />
          <Route path="/client/complaints" element={<ViewMemberComplaint />} />
          <Route path="/client/complaintForm" element={<ComplaintForm />} />
          <Route path="/client/memberLogin" element={<MemberLogin />} />
          <Route path="/client/changePassword" element={<ChangePassword />} />
          <Route path="/client/whatsApp2"  element={<WhatsAppUi />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
