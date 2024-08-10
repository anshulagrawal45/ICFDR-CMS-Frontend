import React from "react";
import { Context } from "../../../Context";
import ComplaintModal from "./ComplaintModal";
import styles from "./ComplaintsCards.module.css";
  
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    height: "95vh",
    bgcolor: "background.paper",
    borderRadius: "25px",
    boxShadow: 24,
    p: 4,
    overflowY: "scroll",
  };
  
  export default function ComplaintsCards({ complaint, complaintsData, setComplaintsData }) {
    const [open, setOpen] = React.useState(false);
    const {
      PostToLogs,
      axios,
      role,
      cloudinaryInfo,
      ActivateToast,
      theme,
      apiLink,
      membersData,
      setMembersData,
      userPermissions,
      isAdmin,
    } = React.useContext(Context);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [disabled, setDisabled] = React.useState(true);
    
   
  
    return (
      <div style={{ margin: "auto" }}>
        <div className={styles.card}>
          <p className={styles.initialName}>{complaint?.subject}</p>
          <button className={styles.role}>
            <p className={styles.roleText}>{complaint?.center}</p>
          </button>
          {/* <div className={styles["profile-pic"]}>
            <img
              className={styles.profilePic}
              src={
                "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"
              }
              alt="Profile Photo"
            />
          </div> */}
          <div className={styles.bottom}>
            <div className={styles.content}>
              <span className={styles.name}>{complaint?.subject}</span>
              <span className={styles["about-me"]}>
                {complaint?.description}
              </span>
            </div>
            <div className={styles["bottom-bottom"]}>
              <div className={styles["social-links-container"]}>
                <p className={styles.phone}>{complaint?.name.split(" ")[0]}</p>
              </div>
              <button className={styles.button} onClick={handleOpen}>
                Comment
              </button>
            </div>
          </div>
        </div>
        <ComplaintModal open={open} setOpen={setOpen} complaint={complaint} complaintsData={complaintsData} setComplaintsData={setComplaintsData} />
      </div>
    );
  }