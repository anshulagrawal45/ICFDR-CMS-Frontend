import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { Context } from "../../../Context";
import LoginRequiredPage from "../../CommonStaticPages/LoginRequiredPage";
import NotAuthorizedPage from "../../Features/StaticPages/NotAuthorised";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Configuration() {
  const {
    PostToLogs,
    isAdmin,
    apiLink,
    userID,
    axios,
    userPermissions,
    configurationSettings,
    setConfigurationSettings,
    ActivateToast,
  } = useContext(Context);
  const [centers, setCenters] = useState(configurationSettings.centers || []);
  const [newCenters, setNewCenters] = useState([]);
  const [roles, setRoles] = useState(configurationSettings.roles || []);
  const [newRoles, setNewRoles] = useState([]);
  const [professionCategories, setProfessionCategories] = useState(
    configurationSettings.professionCategories || []
  );
  const [newProfessionCategories, setNewProfessionCategories] = useState([]);

  let [categoryFormPermission, setCategoryFormPermission] = useState(
    configurationSettings.categoryFormPermission
  );

  const handleCenterChange = (index, value) => {
    const updatedCenters = [...newCenters];
    updatedCenters[index] = value;
    setNewCenters(updatedCenters);
  };

  const handleRoleChange = (index, value) => {
    const updatedRoles = [...newRoles];
    updatedRoles[index] = value;
    setNewRoles(updatedRoles);
  };

  let [inActive, setInActive] = useState(false);
  const handleProfessionCategoryChange = (index, value) => {
    const updatedProfessionCategories = [...newProfessionCategories];
    updatedProfessionCategories[index] = value;
    setNewProfessionCategories(updatedProfessionCategories);
    // if(inActive === true){
    //   let news=[...professionCategories,...updatedProfessionCategories]
    // let dabba = {}
    // for(let i of news){
    //   dabba[i]={
    //   "qualification":false,
    //   "professionalDetails":false,
    //   "workExperience":false,
    //   "lifePatron":false,
    //   "initiated":false,
    //   "disability":false,
    //   "school":false,
    //   "standard":false,
    //   "aadhar":false,
    //   "pan":false,
    //   "nativePlace":false,
    //   "bankName":false,
    //   "accountNumber":false,
    //   "ifsc":false,
    //   "uploadResume":false,}
    // }
    // setCategoryFormPermission((prev)=>({...prev,dabba}))
    // console.log(dabba)
    // }
  };

  const addCenterField = () => {
    setNewCenters([...newCenters, ""]);
  };

  const addRoleField = () => {
    setNewRoles([...newRoles, ""]);
  };

  const addProfessionCategoryField = () => {
    setNewProfessionCategories([...newProfessionCategories, ""]);
  };

  const deleteCenterField = (index) => {
    const updatedCenters = structuredClone(centers);
    updatedCenters.splice(index, 1);
    setCenters(updatedCenters);
  };

  const deleteRoleField = (index) => {
    const updatedRoles = [...roles];
    updatedRoles.splice(index, 1);
    setRoles(updatedRoles);
  };
  const deleteProfessionCategoryField = (index, category) => {
    const updatedProfession = [...professionCategories];
    updatedProfession.splice(index, 1);
    setProfessionCategories(updatedProfession);
    delete categoryFormPermission[category];
  };
  const deleteNewCenterField = (index) => {
    const updatedCenters = structuredClone(newCenters);
    updatedCenters.splice(index, 1);
    setNewCenters(updatedCenters);
  };
  const deleteNewProfesssionCategoryField = (index) => {
    const updatedProfessionCategories = structuredClone(
      newProfessionCategories
    );
    updatedProfessionCategories.splice(index, 1);
    setNewProfessionCategories(updatedProfessionCategories);
  };

  const deleteNewRoleField = (index) => {
    const updatedRoles = [...newRoles];
    updatedRoles.splice(index, 1);
    setNewRoles(updatedRoles);
  };

  const handleSave = async () => {
    let news = [...professionCategories, ...newProfessionCategories];
    let dabba = {};
    for (let i of news) {
      dabba[i] = {
        qualification: false,
        professionalDetails: false,
        workExperience: false,
        lifePatron: false,
        initiated: false,
        disability: false,
        school: false,
        standard: false,
        aadhar: false,
        pan: false,
        nativePlace: false,
        bankName: false,
        accountNumber: false,
        ifsc: false,
        uploadResume: false,
        familyDetails: false,
      };
    }
    let temp = {
      ...configurationSettings,
      centers: [...centers, ...newCenters],
      roles: [...roles, ...newRoles],
      professionCategories: news,
      categoryFormPermission: { ...dabba, ...categoryFormPermission },
      userID,
    };
    setConfigurationSettings(temp);
    try {
      if (centers.length === 0 && roles.length === 0) {
        await axios.post(`${apiLink}configuration/`, temp);
        ActivateToast("Settings Configured", "success");
      } else {
        await axios.patch(
          `${apiLink}configuration/647589da7d9cb06b225e4638`,
          temp
        );
        ActivateToast("Settings Updated", "success");
      }
    } catch (error) {
      console.log(error);
    }
    PostToLogs(`Changed Settings from Configuration Panel.`);
  };

  return !userID ? (
    <LoginRequiredPage />
  ) : isAdmin ||
    userPermissions?.Configuration?.create ||
    userPermissions?.Configuration?.update ||
    userPermissions?.Configuration?.delete ? (
    <Box>
      <Typography variant="h4" textAlign="center">
        Configuration
      </Typography>
      <Box>
        <Typography variant="h6">Customise Centers</Typography>
        {centers.map((center, index) => {
          return (
            <TextFieldComponent
              isAdmin={isAdmin}
              permissions={userPermissions}
              label="Center"
              handleDelete={deleteCenterField}
              disabled={true}
              item={center}
              index={index}
              totalNo={index + 1}
            />
          );
        })}
        {newCenters.map((center, index) => {
          return (
            <TextFieldComponent
              isAdmin={isAdmin}
              permissions={userPermissions}
              label="Center"
              handleDelete={deleteNewCenterField}
              handleChange={handleCenterChange}
              disabled={false}
              item={center}
              index={index}
              totalNo={index + centers.length + 1}
            />
          );
        })}
        {(userPermissions?.Configuration?.create || isAdmin) && (
          <Button variant="outlined" onClick={addCenterField}>
            Add Centers
          </Button>
        )}
      </Box>
      <br />
      <br />
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save Configuration
      </Button>
    </Box>
  ) : (
    <NotAuthorizedPage
      message={"You're Not Authorised to access this Page"}
      advice={"Contact your superior to allow you to access this page!"}
    />
  );
}

function TextFieldComponent({
  isAdmin,
  item,
  index,
  disabled,
  handleChange,
  handleDelete,
  label = "",
  totalNo,
  permissions,
}) {
  let [dis, setDis] = useState(disabled || false);
  return (
    <Box key={index} display={["block", "flex"]} alignItems="center">
      <TextField
        label={`${label} ${totalNo}`}
        value={item}
        onChange={(e) => handleChange(index, e.target.value)}
        fullWidth
        disabled={dis}
        margin="normal"
        onBlur={() => setDis(true)}
      />
      &nbsp;
      {isAdmin && (
        <Button
          variant="outlined"
          color="error"
          onClick={() => handleDelete(index)}
        >
          Delete
        </Button>
      )}
    </Box>
  );
}

