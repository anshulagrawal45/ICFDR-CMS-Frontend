import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  Modal,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import styles from "../../Features/Styles/CustomInputs.module.css"
import styles2 from "./CategoryCard.module.css"
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../../Context";
import CategoryCard from "./CategoryCard";
import { Add, ArrowBack, Delete, Info, Save } from "@mui/icons-material";
import LoadingPage from "../../Features/StaticPages/LoadingPage";
import StyledButton from "../../UIComponents/Button/StyledButton";
import separateCamelCase from "../../Features/SeparateCameCase";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  borderRadius: "10px",
  boxShadow: 24,
  p: 1,
  maxHeight: "80vh",
  overflowY: "scroll",
};

const IndividualProfessionCategory = () => {
  let { center } = useParams();
  let {
    apiLink,
    axios,
    userPermissions,
    setConfigurationSettings,
    configurationSettings,
    ActivateToast,
    isAdmin,
  } = useContext(Context);
  const [categories, setCategories] = useState({});
  const [role, setRole] = useState({});
  const [categoryFormPermission, setCategoryFormPermission] = useState({});
  const [roleFormPermission, setRoleFormPermission] = useState([
    "Admin",
    "Leader",
  ]);
  const [donorTypeForm, setDonorTypeForm] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [openRoleModal, setOpenRoleModal] = useState(false);
  const [openDonorModal, setOpenDonorModal] = useState(false);
  center = center.replaceAll("-", " ");
  useEffect(() => {
    axios
      .get(`${apiLink}configuration/647589da7d9cb06b225e4638`)
      .then(({ data }) => {
        setCategoryFormPermission(data.categoryFormPermission);

        try {
          setRoleFormPermission(
            data.roleFormPermission[center] || ["Admin", "Leader"]
          );
        } catch (err) {
          setRoleFormPermission({});
        }
        try {
          setDonorTypeForm(data.donorTypeForm[center] || []);
        } catch (err) {
          setDonorTypeForm([]);
        }
        try {
          setCategories(data.categoryFormPermission[center] || {});
        } catch (err) {
          setCategories({});
        }
        setLoading(false);
      });
  }, []);
  const [name, setName] = useState("");
  const [perm, setPerm] = useState({
    qualification: false,
    professionalDetails: false,
    workExperience: false,
    lifePatron: false,
    initiated: false,
    introducedBy: false,
    certificates: false,
    school: false,
    marriageDetails: false,
    IDs: false,
    nativePlace: false,
    bankDetails: false,
    uploadResume: false,
    familyDetails: false,
  });
  function handleAdd() {
    let temp = { ...categories };
    temp[name] = perm;
    setCategories(temp);
    setOpen(false);
    setName("");
  }

  const [roleName, setRoleName] = useState("");
  function handleRoleAdd() {
    let temp = [...roleFormPermission, roleName];
    setOpenRoleModal(false);
    setRoleFormPermission(temp);
    setRoleName("");
  }

  const [donorName, setDonorName] = useState("");
  function handleDonorAdd() {
    let temp = [...donorTypeForm, donorName];
    setOpenDonorModal(false);
    setDonorTypeForm(temp);
    setDonorName("");
  }
  let navigate = useNavigate();

  return loading === true ? (
    <LoadingPage />
  ) : (
    <>
      <IconButton
        onClick={() => {
          navigate("/client/misc/professionCategories");
        }}
      >
        <ArrowBack />
      </IconButton>
      <Typography className={styles.title} color={"red"} variant="subtitle2">
        Crucial Permissions like Admin and Leaders cannot be Deleted!
      </Typography>

      <Box
        display={"flex"}
        flexWrap={["wrap"]}
        justifyContent={"space-between"}
      >
        <Box
          width={"fit-content"}
          display={"flex"}
          flexDirection={"column"}
          p={"20px"}
          gap={"20px"}
        >
          <Typography className={styles.title} title={"(Ex: Donors, Volunteers etc)"}>
            {" "}
            <Info /> Manage Profession Categories For This Center
          </Typography>
          {Object.entries(categories || {}).length === 0 && (
            <Typography>No Category has been made for this Center</Typography>
          )}
          {!loading &&
            Object.entries(categories || {}).map((item, i) => (
              <CategoryCard
                key={i}
                categoryFormPermission={categoryFormPermission}
                permissions={userPermissions}
                center={center}
                data={item}
                setCategories={setCategories}
              />
            ))}
            <Box display={"flex"} gap={"10px"}>
            <StyledButton text={"Add"} extraFunction={() => setOpen(true)} tooltip={"Add Profession Categories For this Center"} icon={<Add />} />
            <StyledButton text={"Save"} extraFunction={() => {
              let temp = { ...categoryFormPermission };
              temp[center] = categories;
              setConfigurationSettings((prev) => {
                return { ...prev, categoryFormPermission: temp };
              });
              axios.patch(`${apiLink}configuration/647589da7d9cb06b225e4638`, {
                categoryFormPermission: temp,
              });
              ActivateToast("Settings Saved", "success");
            }} tooltip={"Save this settings for this Center"} icon={<Save />} />
            </Box>
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Box display={"flex"} className={styles.form} flexDirection={"column"} gap={"10px"}>
                <label className={styles.label}>
                  <input className={styles.input}
                    label="Category"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                  <span className={styles.span}>Category Name</span>
                </label>
                {Object.keys(perm).map((item, index) => (
                  <Box
                    key={item + index}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Typography>{separateCamelCase(item)}</Typography>
                    <Switch
                      onClick={(e) => {
                        setPerm({ ...perm, [item]: e.target.checked });
                      }}
                    />
                  </Box>
                ))}
                <StyledButton text={"Save"} tooltip={"Save these Settings"} icon={<Save/>} extraFunction={handleAdd} />
              </Box>
            </Box>
          </Modal>
        </Box>

        {/* Roles for individual centers */}
        <Box
          width={"fit-content"}
          display={"flex"}
          flexDirection={"column"}
          flexWrap={"wrap"}
          p={"20px"}
          gap={"20px"}
        >
          <Typography className={styles.title}>Manage Roles For This Center</Typography>
          {(roleFormPermission || []).length === 0 && (
            <Typography>No Roles has been made for this Center</Typography>
          )}
          {!loading &&
            (roleFormPermission || ["Admin", "Leader"]).map((el, i) => {
              return <NewCategoryCard name={el} deleteFunction={(e) => {
                      let temp = roleFormPermission.filter((item) => {
                        return item !== el;
                      });
                      setRoleFormPermission(temp);
                      ActivateToast("Deleted Successfully", "info");
                      setOpenRoleModal(false);
                      // console.log(categoryData);
                    }} disabled={
                      !userPermissions?.categoryPermission?.delete ||
                      !isAdmin ||
                      el === "Admin" ||
                      el === "Leader"
                    } />
            })}
          <Modal
            open={openRoleModal}
            onClose={() => setOpenRoleModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Box display={"flex"} className={styles.form} flexDirection={"column"} gap={"10px"}>
                <label className={styles.label}>
                  <input className={styles.input}
                    onChange={(e) => setRoleName(e.target.value)}
                    value={roleName}
                  />
                  <span className={styles.span}>Role</span>
                </label>

                <StyledButton text={"Save"} icon={<Save />} tooltip={"Save these Roles settings"} extraFunction={handleRoleAdd} />
              </Box>
            </Box>
          </Modal>
          <Box display={"flex"} gap={"10px"}>
          <StyledButton text={"Add"} extraFunction={() => setOpenRoleModal(true)} tooltip={"Add New Role for this Center"} icon={<Add />} />
          <StyledButton text={"Save"} extraFunction={() => {
              let temp = { ...configurationSettings };
              temp.roleFormPermission[center] = roleFormPermission;
              setConfigurationSettings(temp);
              axios.patch(`${apiLink}configuration/647589da7d9cb06b225e4638`, {
                roleFormPermission: temp.roleFormPermission,
              });
              ActivateToast("Settings Saved", "success");
            }} tooltip={"Save This Role settings for this Center"} icon={<Save />} />
          </Box>
        </Box>
        {/* Donor Type for individual centers */}
        <Box
          minHeight={"100vh"}
          width={"fit-content"}
          height={"50vh"}
          display={"flex"}
          flexDirection={"column"}
          p={"20px"}
          gap={"20px"}
        >
          <Typography className={styles.title} title={"(Ex: Regular, Occasional etc)"}>
            {" "}
            <Info /> Manage Donor Types For This Center
          </Typography>

          {(donorTypeForm || []).length === 0 && (
            <Typography>
              No Donor Types has been made for this Center
            </Typography>
          )}
          {!loading &&
            (donorTypeForm || []).map((el, i) => {
              return <NewCategoryCard name={el} disabled={
                      !userPermissions?.categoryPermission?.delete ||
                      !isAdmin ||
                      el === "Admin" ||
                      el === "Leader"
                    } deleteFunction={(e) => {
                      let temp = donorTypeForm.filter((item) => {
                        return item !== el;
                      });
                      setDonorTypeForm(temp);
                      ActivateToast("Deleted Successfully", "info");
                      setOpenDonorModal(false);
                      // console.log(categoryData);
                    }} />
            })}
          <Modal
            open={openDonorModal}
            onClose={() => setOpenDonorModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Box display={"flex"} className={styles.form} flexDirection={"column"} gap={"10px"}>
                <label className={styles.label}>
                  <input className={styles.input}
                    label="Donor Type"
                    onChange={(e) => setDonorName(e.target.value)}
                    value={donorName}
                  />
                  <span className={styles.span}>Donor Type</span>
                </label>
                <StyledButton text={"Save"} icon={<Save/>} tooltip={"Save these Donor type settings"} extraFunction={handleDonorAdd} >
                  Submit
                </StyledButton>
              </Box>
            </Box>
          </Modal>
          <Box display={"flex"} gap={"10px"}>
          <StyledButton text={"Add"} extraFunction={() => setOpenDonorModal(true)} tooltip={"Add New Donor Type for this Center"} icon={<Add />} />
          <StyledButton text={"Save"} extraFunction={() => {
              let temp = { ...configurationSettings };
              console.log(temp, center);
              if (temp.donorTypeForm) {
                temp.donorTypeForm[center] = donorTypeForm;
              } else {
                temp.donorTypeForm = {};
                temp.donorTypeForm[center] = donorTypeForm;
              }
              // temp.configurationSettings.roleFormPermission[center] = roleFormPermission
              setConfigurationSettings(temp);
              // setConfigurationSettings(prev=>{
              //     // console.log({...prev, roleFormPermission: temp})
              //     return {...prev, roleFormPermission: temp}
              // })
              axios.patch(`${apiLink}configuration/647589da7d9cb06b225e4638`, {
                donorTypeForm: temp.donorTypeForm,
              });
              ActivateToast("Settings Saved", "success");
            }} tooltip={"Save this Donor Type settings for this Center"} icon={<Save />} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

function NewCategoryCard({name,deleteFunction, disabled}){
  return <div className={styles2.notification}>
  <div className={styles2.notiglow}></div>
  <div className={styles2.notiborderglow}></div>
  <div className={styles2.notititle}>{name}</div>
  <div className={styles2.notibody}>
  <Button disabled={disabled} sx={{background:"rgb(34, 164, 241)",":disabled":{
    backgroundColor:"grey"
  }}} onClick={deleteFunction}>
    <Delete sx={{fill:"white"}} />
  </Button>
  </div>
</div>
}

export default IndividualProfessionCategory;
