import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LocalDate, LocalTime } from "./Components/Features/DateAndTime";
import HTTP from "./HTTP";
export const Context = createContext();
export default function ContextProvider({ children }) {
  const [userID, setUserID] = useState("");
  const [userWhatsApp, setUserWhatsApp] = useState("");
  const [userEmailId, setUserEmailId] = useState("");
  const [ownerID, setOwnerID] = useState("");
  const [assignedCenter, setAssignedCenter] = useState("");
  const [userName, setUserName] = useState("User");
  const [theme, setTheme] = useState("light");
  let [notesData, setNotesData] = useState([]);
  let [universalLoading, setUniversalLoading] = useState(false);
  let [userPermissions, setUserPermissions] = useState({});
  let [memberDetails, setMemberDetails] = useState({
    assignedCenter: assignedCenter,
    profession: "",
    lifePatron: "no",
    donorType: "Occasional",
    lpNumber: "",
    name: "",
    initiated: "no",
    initiationName: "",
    spiritualMasterName: "",
    initiationDate: "",
    initiationPlace: "",
    residenceAddress: "",
    mobileNumber: "",
    whatsappNumber: "",
    dateOfBirth: "",
    email: "",
    photo: "",
    panNumber: "",
    panImage: "",
    aadharNumber: "",
    aadharImage: "",
    officeAddress: "",
    introducedBy: {
      name: "",
      contact: "",
    },
    dateOfMembership: "",
    dateOfMarriage: "",
    gender: "",
    isMarried: "",
    spouseName: "",
    spouseDateOfBirth: "",
    children: [],
    qualification: [{ courseName: "", collegeName: "", year: "" }],
    designation: "",
    currentWork: "",
    workPinCode: "",
    workPlace: "",
    place: "",
    duration: "",
    hasWorkExperience: "no",
    workExperience: [{ companyName: "", duration: "" }],
    siblings: [],
    fathersName: "",
    fathersDob: "",
    fathersOccupation: "",
    mothersName: "",
    mothersDob: "",
    mothersOccupation: "",
    parentsDateOfMarriage: "",
    resume: "",
    certificates: [],
  });
  const [configurationSettings, setConfigurationSettings] = useState({});
  let [employeesData, setEmployeesData] = useState([]);
  let [membersData, setMembersData] = useState([]);
  let [leadsData, setLeadsData] = useState([]);
  let [meetingsData, setMeetingsData] = useState([]);
  let [callsData, setCallsData] = useState([]);
  let [accountsData, setAccountsData] = useState([]);
  let [contactsData, setContactsData] = useState([]);
  let [AllEmailSent, setAllEmailSent] = useState([]);
  let [allAnnouncements, setAllAnnouncements] = useState([]);
  let [isAdmin, setIsAdmin] = useState(false);
  let [role, setRole] = useState("");
  const [chats, setChats] = useState([]);
  //to open chats and notes
  const [selected, setSelected] = useState(false);
  const [noteSelected, setNoteSelected] = useState({ func: () => {} });
  //to shift notes if chats is selected
  let [isChatSelected, setIsChatSelected] = useState(false);

  const [profiles, setProfiles] = useState([]);
  let [cloudinaryInfo, setCloudinaryInfo] = useState({
    cloud_name: "dodljshqs",
    upload_preset: "zgoizyqx",
  });
  let apiLink = "http://localhost:3003/";
  if (document.location.href.includes("localhost")) {
    apiLink = "http://localhost:3003/";
    // apiLink = "http://142.93.221.33:3001/";
    // apiLink = "https://prabhupadaseva.com/";
  } else {
    // apiLink = "http://139.59.40.88/";
    // apiLink = "//prabhupadaseva.com/";
    // apiLink = "https://iskcon-prayagraj.onrender.com/";
  }
  // apiLink = "https://prabhupadaseva.com/";
  function ActivateToast(text, type) {
    if (!type) {
      toast(text, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "colored",
      });
      return;
    }
    toast[type](text, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "colored",
    });
  }
  const [userData, setUserData] = useState({});
  const [gender, setGender] = useState("");
  const [name, setName] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [degree, setDegree] = useState("");
  const [open, setOpen] = useState(false); //It's for the modal for details that opens when a new employee logs in for the first time
  const [passwordChanged, setPasswordChanged] = useState(true);
  const [image, setImage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
  );
  //isMemberLogin
  let isMemberBool = Cookies.get("isMemberLogin");
  if (isMemberBool) isMemberBool = JSON.parse(isMemberBool);

  const [memberLoginData, setMemberLoginData] = useState({});
  const [centers, setCenters] = useState([]);
  const [userCreator, setUserCreator] = useState({});

  const [isMemberLogin, setIsMemberLogin] = useState(isMemberBool || false);
  const [hide, setHide] = useState(false);
  //array to show multiple notes
  const [newNotesArray, setNewNotesArray] = useState([0]);
  function PostToLogs(activity) {
    axios.post(`${apiLink}logs`, {
      from: {
        name: userName,
        userID,
      },
      activity,
      date: LocalDate(),
      time: LocalTime(),
    });
  }

  useEffect(() => {
    document.body.style.background =
      theme == "dark" ? "rgb(32,32,32)" : "white";
    document.body.style.color = theme == "dark" ? "white" : "black";
    let tables = document.querySelectorAll(".table");
    tables.forEach((element) => {
      element.className = "table";
      element.className =
        theme == "dark" ? "tableDark table" : "tableLight table";
    });
  }, [theme]);

  function sendWhatsAppMessage(to, value) {
    const BASE_URL = "https://jdg32v.api.infobip.com";
    // const API_KEY =
    //   "App 309c8b0ede0bf71c11f6f02c7cf35d67-952f7823-b42b-4d13-92dc-e99f7f12214d";
    const API_KEY =
      "App 6d968fce35e42c1bae479882ef450fe8-f8cca6eb-0163-4435-a0c8-d4a2022e3e8d";

    const SENDER = "447860099299";
    const RECIPIENT = `91${to}` || "919101151011";

    const payload = {
      from: SENDER,
      to: RECIPIENT,
      messageId: "a28dd97c-1ffb-4fcf-99f1-0b557ed381da",
      content: {
        text: value,
      },
      callbackData: "Callback data",
      notifyUrl: "https://www.example.com/whatsapp",
    };

    const headers = {
      Authorization: API_KEY,
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    fetch(BASE_URL + "/whatsapp/1/message/text", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }
  function sendSMS(to, value) {
    const BASE_URL = "https://jdg32v.api.infobip.com";
    // const API_KEY =
    //   "App 309c8b0ede0bf71c11f6f02c7cf35d67-952f7823-b42b-4d13-92dc-e99f7f12214d";
    const API_KEY =
      "App 6d968fce35e42c1bae479882ef450fe8-f8cca6eb-0163-4435-a0c8-d4a2022e3e8d";

    const SENDER = "447860099299";
    const RECIPIENT = `91${to}` || "919101151011";

    const payload = {
      messages: [
        {
          destinations: [
            {
              to: RECIPIENT,
            },
          ],
          from: SENDER,
          text: "This is a sample message",
        },
      ],
    };

    const headers = {
      Authorization: API_KEY,
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    fetch(BASE_URL + "/sms/2/text/advanced", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }

  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem(`token`)) || ""
  );
  let axios = HTTP(token);
  return (
    <Context.Provider
      value={{
        userWhatsApp,
        setUserWhatsApp,
        userEmailId,
        setUserEmailId,
        newNotesArray,
        setNewNotesArray,
        userCreator,
        setUserCreator,
        assignedCenter,
        setAssignedCenter,
        ownerID,
        setOwnerID,
        universalLoading,
        setUniversalLoading,
        configurationSettings,
        setConfigurationSettings,
        passwordChanged,
        setPasswordChanged,
        allAnnouncements,
        setAllAnnouncements,
        userName,
        setUserName,
        image,
        setImage,
        open,
        setOpen,
        userData,
        setUserData,
        gender,
        setGender,
        name,
        setName,
        maritalStatus,
        setMaritalStatus,
        degree,
        setDegree,
        chats,
        setChats,
        isChatSelected,
        setIsChatSelected,
        noteSelected,
        setNoteSelected,
        memberDetails,
        setMemberDetails,
        membersData,
        setMembersData,
        role,
        setRole,
        userPermissions,
        setUserPermissions,
        employeesData,
        setEmployeesData,
        isAdmin,
        setIsAdmin,
        AllEmailSent,
        setAllEmailSent,
        cloudinaryInfo,
        setCloudinaryInfo,
        contactsData,
        setContactsData,
        accountsData,
        setAccountsData,
        apiLink,
        meetingsData,
        setMeetingsData,
        callsData,
        setCallsData,
        leadsData,
        setLeadsData,
        notesData,
        setNotesData,
        ActivateToast,
        userID,
        setUserID,
        theme,
        setTheme,
        selected,
        setSelected,
        profiles,
        setProfiles,
        memberLoginData,
        setMemberLoginData,
        hide,
        setHide,
        centers,
        setCenters,
        isMemberLogin,
        setIsMemberLogin,
        PostToLogs,
        sendWhatsAppMessage,
        sendSMS,
        axios,
        token,
        setToken,
      }}
    >
      <ToastContainer />
      {children}
    </Context.Provider>
  );
}
