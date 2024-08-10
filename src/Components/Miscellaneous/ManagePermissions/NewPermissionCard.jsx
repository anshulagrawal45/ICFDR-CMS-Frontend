import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
    Button,
    Checkbox,
    IconButton
} from "@mui/material";
import { Call, Cancel, Email, Expand, ExpandMore } from "@mui/icons-material";
import { Context } from "../../../Context";
import DeleteFromID from "../../Features/DeleteFromID";
import PermissionTable from "./SwitchComponent/PermissionTable";
import styles from "./NewPermissionCard.module.css"
import styles2 from "../../Features/Styles/CustomInputs.module.css"
import StyledButton from "../../UIComponents/Button/StyledButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: ["100%","50%"],
  height: "fit-content",
  bgcolor: "background.paper",
  borderRadius: "25px",
  boxShadow: 24,
  p: 4,
  overflowY: "scroll"
};
export default function NewPermissionCard({employee}){
    console.log(employee)
    const [open, setOpen] = React.useState(false);
    const { PostToLogs,axios, ActivateToast, theme, apiLink, employeesData, setEmployeesData, userID, isAdmin } = React.useContext(Context);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [disabled, setDisabled] = React.useState(true);
    const [permissions, setPermissions] = React.useState(employee.permissions);
    
    return<>
        <div className={styles.card}>
  <div className={styles["card-border-top"]}>
  <div>{employee.role}</div>
  </div>
  <div className={styles.img}>
  <img src={employee?.details?.photo || "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"} alt="Profile Photo" />
  </div>
  <span className={styles.name}> {employee?.name}</span>
  <p className={styles.job}> {employee.phone}</p>
  <p className={styles.job}> {employee.email}</p>
  <div style={{width:"fit-content",margin:"10px auto 0"}}>
  <StyledButton text={<ExpandMore/>} extraFunction={handleOpen} tooltip={"Expand to see Permissions"} /></div>
</div>
<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box position={"absolute"} top={"10px"} right={"10px"}>
            <IconButton onClick={handleClose}>
              <Cancel />
            </IconButton>
          </Box>
          <Box>
            <Typography variant="h6" className={styles2.title} fontWeight={700}>Permissions:</Typography>
            <br />
            <Box display="flex" alignItems="center">
              <Box>
                {(employee.creator._id === userID || isAdmin) && <Typography className={styles2.blueTextColor}>Hide Data</Typography>}
              </Box>
              {(employee.creator._id === userID || isAdmin) && <Box sx={{ display: 'flex', gap: '40px', marginLeft: 'auto' }}>
                {/* create */}
                <Checkbox
                  title="Check to Allow user to Hide his/her data from others"
                  checked={permissions?.hidden || false}
                  disabled={disabled}
                  onChange={(e) => {
                    setPermissions((prev) => ({
                      ...prev,
                      hidden: permissions?.hidden ? false : true
                    }));
                  }}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </Box>}
            </Box>
            <Box display="flex" alignItems="center">
              <Box>
                <Typography className={styles2.blueTextColor} fontWeight={700}>Name</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: '30px', marginLeft: 'auto' }}>
                {/* create */}
                <Typography fontWeight={700}>Create</Typography>
                {/* update */}
                <Typography fontWeight={700}>Update</Typography>
                {/* delete */}
                <Typography fontWeight={700}>Delete</Typography>
              </Box>
            </Box>
            {Object.keys(permissions).map((key, i) => {
              if(key== "Social Activity") return
              if (key !== "hidden") {
                return <PermissionTable key={key} name={key} disabled={disabled} initialCreate={key.create} initialUpdate={key.update} initialRemove={key.delete} state={permissions} setState={setPermissions} />

              }
            })}

            <br />
          </Box>
          {disabled ? <Button variant="outlined" onClick={() => { setDisabled(false) }}>Edit</Button> : <Button variant="outlined" onClick={async () => {
            let res = await axios.patch(`${apiLink}users/${employee._id}`, { permissions })
            setDisabled(true)
            PostToLogs(`Updated ${employee.name}'s Permissions from Permission's Panel.`)
            ActivateToast("Information Updated", "success")
            setOpen(false)
          }}>Save</Button>}
          &nbsp;&nbsp;
          <DeleteFromID setModalOpen={setOpen} name={employee.name} id={employee._id} array={employeesData} setArray={setEmployeesData} route={"users"} headline={"Delete Employee"} message={"Delete Your Employee Forever?"} buttonText={"Delete"} />
        </Box>
      </Modal>
    </>
}