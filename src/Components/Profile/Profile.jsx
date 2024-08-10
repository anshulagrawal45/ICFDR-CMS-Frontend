import { Cancel } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box
} from "@mui/material";
import axe from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Context";
import separateCamelCase from "../Features/SeparateCameCase";
import StyledButton from "../UIComponents/Button/StyledButton";
import s from "./Profile.module.css";
let staticData = [
  "address",
  "centreName",
  "designation",
  "courseName",
  "collegeName",
  "year",
  "panNumber",
  "aadharNumber",
];
let staticDataIni = [
  "initiationName",
  "spiritualMasterName",
  "initiationDate",
  "initiationPlace",
];

export default function Profile() {
  const [details, setDetails] = useState({});
  const [name, setName] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const {
    apiLink,
    axios,
    role,
    userID,
    ActivateToast,
    cloudinaryInfo,
    configurationSettings,
    setConfigurationSettings,
  } = useContext(Context);
  let navigate = useNavigate()


  useEffect(() => {
    if (!userID) {
      navigate("/client/login")
    }
  }, [navigate, userID])

  useEffect(() => {
    if (role == "Member") {
      (async () => {
        if (!userID) return;
        let { data: res } = await axios.get(`${apiLink}member/${userID}`);
        setName(res.details.name);
        setDetails(res?.details);
        setImage(res?.details?.photo);
      })();
    } else {
      (async () => {
        if (!userID) return;
        let { data: res } = await axios.get(`${apiLink}users/${userID}`);
        setName(res.name);
        setDetails(res?.details);
        setImage(res?.details?.photo);
      })();
    }
  }, []);
  //image
  const imageInput = useRef(null);
  const [image, setImage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
  );
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
    setDetails({ ...details, photo: link.secure_url });
    ActivateToast("Image is uploaded, fill other details", "success");
  };
  function handleRemoveImage() {
    setImage(null);
  }
  return (
    <div className={s.container}>
      <div className={s.heading}>Profile</div>
      <div className={s.form}>
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
                axios.patch(`${apiLink}users/${userID}`, {
                  details,
                  name,
                  // photo: image,
                });
                setDisabled(true);
                ActivateToast("Details Updated Successfully", "success");
              }}
            />
          )}
        </Box>
        <div className={s.inputContainer}>
          <label>{separateCamelCase("Name")}</label>
          <input
            placeholder="Name"
            disabled={disabled}
            id="name"
            name="Name"
            value={name}
            className={s.input}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div className={s.inputContainer}>
          <label>{separateCamelCase("gender")}</label>
          <select
            name="gender"
            id="gender"
            className={s.input}
            value={details?.gender || ""}
            disabled={disabled}
            onChange={({ target }) =>
              setDetails({ ...details, gender: target.value })
            }
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className={s.inputContainer}>
          <label>{separateCamelCase("maritalStatus")}</label>
          <select
            name="maritalStatus"
            id="maritalStatus"
            className={s.input}
            disabled={disabled}
            value={details?.maritalStatus || ""}
            onChange={({ target }) =>
              setDetails({ ...details, maritalStatus: target.value })
            }
          >
            <option value="">Select Marital Status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
        </div>
        <div className={s.inputContainer}>
          <label>{separateCamelCase("date")}</label>
          <input
            placeholder="Date"
            disabled={disabled}
            type="date"
            id="date"
            name="date"
            className={s.input}
            value={details?.dob}
            onChange={({ target }) =>
              setDetails({ ...details, dob: new Date(target.value) })
            }
          />
        </div>
        <div className={s.inputContainer}>
          <label>{separateCamelCase("currentWork")}</label>
          <input
            placeholder="Type of Business Profession/Occupation"
            disabled={disabled}
            id="currentWork"
            name="currentWork"
            className={s.input}
            value={details?.currentWork}
            onChange={({ target }) =>
              setDetails({ ...details, currentWork: target.value })
            }
          />
        </div>
        <div className={s.inputContainer}>
          <label>{separateCamelCase("place")}</label>
          <input
            placeholder="Place"
            disabled={disabled}
            id="place"
            name="place"
            className={s.input}
            value={details?.place}
            onChange={({ target }) =>
              setDetails({ ...details, place: target.value })
            }
          />
        </div>
        <div className={s.inputContainer}>
          <label>{separateCamelCase("duration")}</label>
          <input
            placeholder="Duration"
            disabled={disabled}
            id="duration"
            name="duration"
            className={s.input}
            value={details?.duration}
            onChange={({ target }) =>
              setDetails({ ...details, duration: target.value })
            }
          />
        </div>
        <div className={s.inputContainer}>
          <label>{separateCamelCase("center")}</label>
          <select
            placeholder="Center"
            name="center"
            id="center"
            className={s.input}
            disabled={role !== "Super Admin"}
            value={details?.centerName || ""}
            defaultValue={details?.centerName}
            onChange={({ target }) =>
              setDetails({ ...details, centerName: target.value })
            }
          >
            {configurationSettings?.centers?.map((center) => {
              return (
                <option key={center} value={center}>
                  {center}
                </option>
              );
            })}
          </select>
        </div>

        {staticData.map((item, i) => (
          <div className={s.inputContainer} key={`${item}_${i}`}>
            <label>{separateCamelCase(item)}</label>
            <input
              placeholder={item.toUpperCase()}
              value={details?.[item] || ""}
              onChange={(e) => {
                setDetails({ ...details, [item]: e.target.value });
              }}
              disabled={disabled}
              variant="outlined"
              margin="normal"
              className={s.input}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
