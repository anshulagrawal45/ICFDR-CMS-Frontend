import { Cancel } from "@mui/icons-material";
import { Avatar, Badge, Box } from "@mui/material";
import axe from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Context";
import styles from "../Features/Styles/CustomInputs.module.css";
import StyledButton from "../UIComponents/Button/StyledButton";
import DonationTable3 from "./DonationTable3";
import "./Profile2.css";

function Profile2() {
  const { memberLoginData, axios, apiLink, cloudinaryInfo, ActivateToast, userID } = React.useContext(Context);
  let [allDonations, setAllDonations] = useState([]);
  let [limit, setLimit] = useState(10);
  let [page, setPage] = useState(1);
  let navigate = useNavigate()
  const [memberDetails, setMemberDetails] = useState(memberLoginData.details)
  const [profile, setProfile] = useState({
    phone: memberLoginData.phone,
    email: memberLoginData.email, // Increased Placeholder image size
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMemberDetails({ ...memberDetails, [name]: value });
  };

  useEffect(() => {
    if (!userID) {
      navigate("/client/login")
    }
  }, [navigate, userID])

  useEffect(() => {
    (async () => {
      let { data } = await axios.get(
        `${apiLink}allDonations?page=${page}&limit=${limit}`
      );
      setAllDonations(data.data);
    })();
  }, []);

  //image
  const imageInput = useRef(null);
  const [image, setImage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
  );
  const [disabled, setDisabled] = useState(true)
  const handleImageChange = async (e) => {
    ActivateToast("Please Wait while Image is Uploading", "warning");
    const file = e.target.files[0];
    let cloud_name = cloudinaryInfo.cloud_name;
    let upload_preset = cloudinaryInfo.upload_preset;
    let formData1 = new FormData();
    formData1.append("file", file);
    formData1.append("upload_preset", upload_preset);

    let link = await axe.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      formData1
    );
    link = link.data;
    setImage(link.secure_url);
    // setDetails({ ...details, photo: link.secure_url });
    setMemberDetails({...memberDetails,photo:link.secure_url})
    ActivateToast("Image is uploaded, fill other details", "success");
  };
  function handleRemoveImage() {
    setImage(null);
  }
  return (
    <div>
      <h1 className={styles.title}>Profile</h1>
      <div className="profile-container">
        {/* <div className="profile-picture">
          {memberLoginData?.details?.photo ? (
            <img src={memberLoginData?.details?.photo} />
          ) : (
            <img src="blank-profile-picture.jpg" alt="No Profile" />
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div> */}
        <Box
          minHeight={"100px"}
          display={"flex"}
          gap={"20px"}
          alignItems={"center"}
        >
          <Box display={"flex"} alignItems={"center"} gap={"20px"}>
            <Box>
              <Badge
                overlap="circular"
                sx={{ position: "relative" }}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <Cancel
                    sx={{
                      color: "red",
                      position: "absolute",
                      bottom: "80px",
                      fontSize: "30px",
                      cursor: "pointer",
                    }}
                    titleAccess={"Remove Image"}
                    onClick={handleRemoveImage}
                  />
                }
              >
                <Avatar
                  sx={{
                    height: "100px",
                    width: "100px",
                    border: "1px solid grey",
                  }}
                  src={
                    image ??
                    "https://cdn.pixabay.com/photo/2016/05/30/14/23/detective-1424831_960_720.png"
                  }
                />
              </Badge>
            </Box>
            <Box>
              <label>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  ref={imageInput}
                  onChange={handleImageChange}
                />
                {!disabled ? (
                  <StyledButton
                    text={"Change Photo"}
                    extraFunction={() => {
                      imageInput.current.click();
                    }}
                  />
                ) : null}
              </label>
            </Box>
          </Box>
          {disabled && (
            <StyledButton
              extraFunction={() => setDisabled(false)}
              text={"Edit"}
            />
          )}
          {!disabled && (
            <StyledButton
              text={"Save"}
              extraFunction={() => {
                axios.patch(`${apiLink}member/${memberLoginData._id}`, {
                  ...profile,
                  details:memberDetails
                }).then(res=>console.log(res)).catch(err=>console.log(err))
                setDisabled(true);
                ActivateToast("Details Updated Successfully", "success");
              }}
            />
          )}
        </Box>

        <div className={styles.form}>
          <label className={styles.label}>
            <input
              className={styles.input}
              type="text"
              name="name"
              value={memberDetails?.name}
              placeholder="Name"
              onChange={handleInputChange}
            />
            <span className={styles.span}>Name</span>
          </label>
          <label className={styles.label}>
            <input
              className={styles.input}
              type="text"
              name="centerName"
              value={memberLoginData?.center}
              placeholder="Center Name"
            //   onChange={handleInputChange}
            disabled
            />
            <span className={styles.span}>Center Name</span>
          </label>
          <label className={styles.label}>
            <input
              className={styles.input}
              type="text"
              name="Address"
              value={memberDetails?.residenceAddress}
              placeholder="Address"
              onChange={handleInputChange}
            />
            <span className={styles.span}>Address</span>
          </label>
          <label className={styles.label}>
            <input
              className={styles.input}
              type="number"
              name="Mobile No"
              value={profile?.phone}
              placeholder="Mobile No"
              onChange={(e)=>{
                setProfile({...profile,phone:e.target.value})
              }}
            />
            <span className={styles.span}>Mobile Number</span>
          </label>
          <label className={styles.label}>
            <input
              className={styles.input}
              type="text"
              name="Email Id"
              value={profile?.email}
              placeholder="Email Id"
              onChange={(e)=>{
                setProfile({...profile,phone:e.target.value})
              }}
            />
            <span className={styles.span}>Email Id</span>
          </label>
          <label className={styles.label}>
            <input
              className={styles.input}
              type="text"
              name="Profession"
              value={memberDetails?.profession}
              placeholder="Profession"
              onChange={handleInputChange}
            />
            <span className={styles.span}>Profession</span>
          </label>
        </div>
      </div>
      <br />
      <div>
        <h1 className={styles.title}>Donations by You</h1>
        <DonationTable3
          membersData={memberLoginData}
          donationsData={allDonations}
        />
      </div>
    </div>
  );
}

export default Profile2;
