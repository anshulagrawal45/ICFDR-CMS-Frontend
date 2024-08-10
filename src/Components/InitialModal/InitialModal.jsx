import React, { useContext, useRef, useState } from 'react'
import { Context } from '../../Context';
import axe from 'axios';
import {
    Avatar,
    Badge,
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    IconButton,
    MenuItem,
    Modal,
    Radio,
    RadioGroup,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";


import { Cancel, CheckCircle, Close } from "@mui/icons-material";

const InitialModal = () => {

    let { apiLink, userID, ActivateToast, cloudinaryInfo, axios } =
        useContext(Context);
        const [imageUploadStatus, setImageUploadStatus] = useState({
            aadhar: false,
            pan: false,
          });
    const { open, setOpen } = useContext(Context);
    const { userData, setUserData } = useContext(Context);
    const { gender, setGender } = useContext(Context);
    const { userName } = useContext(Context);
    const { maritalStatus, setMaritalStatus } = useContext(Context);
    const { setDegree } = useContext(Context);
    //image
    const aadharImageInput = useRef(null);
    const handleAadharImage = async (e) => {
        setImageUploadStatus({ ...imageUploadStatus, aadhar: false });
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
        setUserData({ ...userData, aadharImage: link.secure_url });
        setImageUploadStatus({ ...imageUploadStatus, aadhar: true });
        ActivateToast("Image is uploaded, fill other details", "success");
    };
    const panImageInput = useRef(null);
    const handlePanImage = async (e) => {
        setImageUploadStatus({ ...imageUploadStatus, pan: false });
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
        setUserData({ ...userData, panImage: link.secure_url });
        setImageUploadStatus({ ...imageUploadStatus, pan: true });
        ActivateToast("Image is uploaded, fill other details", "success");
    };



    //image
    const imageInput = useRef(null);
    const { image, setImage } = useContext(Context)
    const handleImageChange = async (e) => {
        ActivateToast("Please Wait while Image is Uploading", "warning");
        const file = e.target.files[0];
        console.log(file)
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
        console.log(link)
        setImage(link.secure_url);
        ActivateToast("Image is uploaded, fill other details", "success");
    };

    function handleRemoveImage() {
        setImage(null);
    }

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    const handleMaritalStatusChange = (event) => {
        setMaritalStatus(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        let data = new FormData(event.currentTarget)
        let name = data.get("Name")
        let temp = {
            ...userData,
            maritalStatus,
            gender,
            photo: image,
        };

        axios.patch(`${apiLink}users/${userID}`, {name, details: temp });
        console.log(temp);
        setOpen(false);
    };

    const handleInitiatedChange = (event) => {
        const { value } = event.target;
        setUserData({
            ...userData,
            initiated: value,
            initiationName: "",
            spiritualMasterName: "",
            initiationDate: "",
            initiationPlace: "",
        });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleDegreeChange = (event) => {
        setDegree(event.target.value);
    };

    return (
        <Modal
            open={open}
            onClose={() => {
                setOpen(false);
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ overflowY: "scroll", width: "fit-content", margin: "auto" }}
        >
            <Box>
                <Box
                    minHeight={"fit-content"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    bgcolor={"gray.50"}
                >
                    <Box
                        maxWidth={"md"}
                        bgcolor={"white"}
                        borderRadius={"xl"}
                        boxShadow={4}
                        p={6}
                        position={"relative"}
                    >
                        <IconButton
                            onClick={() => {
                                setOpen(false);
                            }}
                            sx={{ position: "absolute", top: 5, right: 5 }}
                        >
                            <Close />
                        </IconButton>
                        <Typography
                            variant={"h4"}
                            component={"h1"}
                            sx={{ lineHeight: 1.1 }}
                        >
                            User Profile Edit
                        </Typography>
                        <Box display={"flex"} alignItems={"center"}>
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
                                        sx={{ height: "100px", width: "100px" }}
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
                                        zIndex={"1000"}
                                    />
                                    <Button
                                        w="100%"
                                        onClick={() => {
                                            imageInput.current.click();
                                        }}
                                    >
                                        Change Photo
                                    </Button>
                                </label>
                            </Box>
                        </Box>
                        <Box>
                            <form onSubmit={handleSubmit}>
                                <br />
                                <FormControl fullWidth>
                                    <TextField
                                        label={"Name"}
                                        name="Name"
                                        defaultValue={userName}
                                        onChange={handleChange}
                                        variant="outlined"
                                        margin="normal"
                                    />
                                </FormControl>
                                <Box>
                                    {/* Initiated */}
                                    <FormControl component="fieldset" margin="normal">
                                        <Typography variant="subtitle1">Initiated</Typography>
                                        <RadioGroup
                                            name="initiated"
                                            value={userData?.initiated}
                                            onChange={handleInitiatedChange}
                                            row
                                        >
                                            <FormControlLabel
                                                value="yes"
                                                control={<Radio />}
                                                label="Yes"
                                            />
                                            <FormControlLabel
                                                value="no"
                                                control={<Radio />}
                                                label="No"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                    {userData?.initiated === "yes" && (
                                        <div>
                                            <FormControl fullWidth>
                                                <TextField
                                                    required={userData?.initiated === "yes"}
                                                    label="Initiation Name"
                                                    name="initiationName"
                                                    value={userData?.initiationName}
                                                    onChange={handleChange}
                                                    variant="outlined"
                                                    margin="normal"
                                                />
                                            </FormControl>
                                            <FormControl fullWidth>
                                                <TextField
                                                    required={userData?.initiated === "yes"}
                                                    label="Spiritual Master Name"
                                                    name="spiritualMasterName"
                                                    value={userData?.spiritualMasterName}
                                                    onChange={handleChange}
                                                    variant="outlined"
                                                    margin="normal"
                                                />
                                            </FormControl>
                                            <FormControl fullWidth>
                                                <TextField
                                                    required={userData?.initiated === "yes"}
                                                    label="Initiation Date"
                                                    name="initiationDate"
                                                    type="date"
                                                    value={userData?.initiationDate}
                                                    onChange={handleChange}
                                                    variant="outlined"
                                                    margin="normal"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </FormControl>
                                            <FormControl fullWidth>
                                                <TextField
                                                    required={userData?.initiated === "yes"}
                                                    label="Initiation Place"
                                                    name="initiationPlace"
                                                    value={userData?.initiationPlace}
                                                    onChange={handleChange}
                                                    variant="outlined"
                                                    margin="normal"
                                                />
                                            </FormControl>
                                        </div>
                                    )}
                                    <FormControl fullWidth>
                                        <FormLabel>Address</FormLabel>
                                        <TextField
                                            placeholder="Address"
                                            variant="outlined"
                                            margin="dense"
                                            required
                                            multiline
                                            rows={4}
                                            name="address"
                                            value={userData?.address || ""}
                                            onChange={(e) =>
                                                setUserData({ ...userData, address: e.target.value })
                                            }
                                        />
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <FormLabel>Centre Name</FormLabel>
                                        <TextField
                                            placeholder="Centre Name"
                                            variant="outlined"
                                            margin="dense"
                                            name="centreName"
                                            value={userData?.centreName}
                                            onChange={(e) =>
                                                setUserData({
                                                    ...userData,
                                                    centreName: e.target.value,
                                                })
                                            }
                                        />
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <FormLabel>Date of Birth</FormLabel>
                                        <TextField
                                            placeholder="Date of Birth"
                                            variant="outlined"
                                            margin="dense"
                                            required
                                            type="date"
                                            name="dob"
                                            value={userData?.dob}
                                            onChange={(e) =>
                                                setUserData({ ...userData, dob: e.target.value })
                                            }
                                        />
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <FormLabel>Gender</FormLabel>
                                        <Select
                                            value={gender}
                                            onChange={handleGenderChange}
                                            variant="outlined"
                                            margin="dense"
                                            required
                                            name="gender"
                                        >
                                            <MenuItem value="">Select Gender</MenuItem>
                                            <MenuItem value="male">Male</MenuItem>
                                            <MenuItem value="female">Female</MenuItem>
                                            <MenuItem value="other">Other</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <FormLabel>Current Designation</FormLabel>
                                        <TextField
                                            placeholder="Current Designation"
                                            variant="outlined"
                                            margin="dense"
                                            required
                                            multiline
                                            name="currentDesignation"
                                            value={userData?.currentDesignation || ""}
                                            onChange={(e) =>
                                                setUserData({ ...userData, currentDesignation: e.target.value })
                                            }
                                        />
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <FormLabel>Department Name</FormLabel>
                                        <TextField
                                            placeholder="Department Name"
                                            variant="outlined"
                                            margin="dense"
                                            required
                                            multiline
                                            name="departmentName"
                                            value={userData?.departmentName || ""}
                                            onChange={(e) =>
                                                setUserData({ ...userData, departmentName: e.target.value })
                                            }
                                        />
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <FormLabel>Salary</FormLabel>
                                        <TextField
                                            placeholder="Salary"
                                            variant="outlined"
                                            margin="dense"
                                            required
                                            multiline
                                            name="salary"
                                            value={userData?.salary || ""}
                                            onChange={(e) =>
                                                setUserData({ ...userData, salary: e.target.value })
                                            }
                                        />
                                    </FormControl>
                                    <Typography variant="h6">Type of Business/Profession/Occupation</Typography>
                                    <FormControl fullWidth>
                                        <TextField
                                            label="Current Work"
                                            name="currentWork"
                                            value={userData?.currentWork}
                                            onChange={handleChange}
                                            variant="outlined"
                                            margin="normal"
                                        />
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <TextField
                                            label="Place"
                                            name="place"
                                            value={userData?.place}
                                            onChange={handleChange}
                                            variant="outlined"
                                            margin="normal"
                                        />
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <TextField
                                            label="Duration"
                                            name="duration"
                                            value={userData?.duration}
                                            onChange={handleChange}
                                            variant="outlined"
                                            margin="normal"
                                        />
                                    </FormControl>
                                    <Typography variant="h6">Qualification</Typography>
                                    <div>
                                        <FormControl fullWidth>
                                            <TextField
                                                required
                                                label="Course Name"
                                                name="courseName"
                                                value={userData?.courseName}
                                                onChange={(e) =>
                                                    setUserData({
                                                        ...userData,
                                                        courseName: e.target.value,
                                                    })
                                                }
                                                variant="outlined"
                                                margin="normal"
                                            />
                                        </FormControl>
                                        <FormControl fullWidth>
                                            <TextField
                                                required
                                                label="College Name"
                                                name="collegeName"
                                                value={userData?.collegeName}
                                                onChange={(e) =>
                                                    setUserData({
                                                        ...userData,
                                                        collegeName: e.target.value,
                                                    })
                                                }
                                                variant="outlined"
                                                margin="normal"
                                            />
                                        </FormControl>
                                        <FormControl fullWidth>
                                            <TextField
                                                required
                                                label="Year"
                                                name="year"
                                                value={userData?.year}
                                                onChange={(e) =>
                                                    setUserData({
                                                        ...userData,
                                                        year: e.target.value,
                                                    })
                                                }
                                                variant="outlined"
                                                margin="normal"
                                            />
                                        </FormControl>
                                    </div>

                                    <FormControl fullWidth>
                                        <FormLabel>Marital Status</FormLabel>
                                        <Select
                                            value={maritalStatus}
                                            onChange={handleMaritalStatusChange}
                                            variant="outlined"
                                            margin="dense"
                                            required
                                            name="maritalStatus"
                                        >
                                            <MenuItem value="">Select Marital Status</MenuItem>
                                            <MenuItem value="single">Single</MenuItem>
                                            <MenuItem value="married">Married</MenuItem>
                                            <MenuItem value="divorced">Divorced</MenuItem>
                                            <MenuItem value="widowed">Widowed</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                                <FormControl fullWidth>
                                    <TextField
                                        label="PAN Number"
                                        name="panNumber"
                                        value={userData?.panNumber}
                                        onChange={handleChange}
                                        variant="outlined"
                                        margin="normal"
                                    />
                                </FormControl>
                                <Box>
                                    <label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            style={{ display: "none" }}
                                            ref={panImageInput}
                                            onChange={handlePanImage}
                                            zIndex={"1000"}
                                        />
                                        <Box
                                            display={"flex"}
                                            justifyContent={"left"}
                                            alignItems={"center"}
                                        >
                                            <Button
                                                w="100%"
                                                variant="contained"
                                                onClick={() => {
                                                    panImageInput.current.click();
                                                }}
                                            >
                                                {imageUploadStatus.pan ? "Reupload?" : "Upload PAN"}
                                            </Button>
                                            {imageUploadStatus.pan ? <CheckCircle /> : null}
                                        </Box>
                                    </label>
                                </Box>
                                <br />
                                <FormControl fullWidth>
                                    <TextField
                                        label="Aadhar Number"
                                        name="aadharNumber"
                                        value={userData?.aadharNumber}
                                        onChange={handleChange}
                                        variant="outlined"
                                        margin="normal"
                                    />
                                </FormControl>
                                <Box>
                                    <label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            style={{ display: "none" }}
                                            ref={aadharImageInput}
                                            onChange={handleAadharImage}
                                            zIndex={"1000"}
                                        />
                                        <Box
                                            display={"flex"}
                                            justifyContent={"left"}
                                            alignItems={"center"}
                                        >
                                            <Button
                                                w="100%"
                                                variant="contained"
                                                onClick={() => {
                                                    aadharImageInput.current.click();
                                                }}
                                            >
                                                {imageUploadStatus?.aadhar
                                                    ? "Reupload?"
                                                    : "Upload Aadhar"}
                                            </Button>
                                            {imageUploadStatus?.aadhar ? <CheckCircle /> : null}
                                        </Box>
                                    </label>
                                </Box>
                                <br />
                                <Stack spacing={2} direction={["column", "row"]}>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        sx={{ flexGrow: 1, mr: 2 }}
                                        onClick={() => setOpen(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        sx={{ flexGrow: 1 }}
                                    >
                                        Submit
                                    </Button>
                                </Stack>
                            </form>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default InitialModal