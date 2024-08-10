import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  IconButton,
  TextField,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { Context } from "../../../Context";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  height: "80vh",
  overflow: "scroll",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AccountCreationModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let { userID, ActivateToast,axios, theme, callsData, setCallsData, apiLink, accountsData, setAccountsData } =
    React.useContext(Context);
  let [address, setAddress] = React.useState({
    billingStreet: ``,
    billingCity: ``,
    billingState: ``,
    billingCode: ``,
    billingCountry: ``,
    shippingStreet: ``,
    shippingCity: ``,
    shippingState: ``,
    shippingCode: ``,
    shippingCountry: ``
  })

  const [newAccountsData, setNewAccountsData] = React.useState({
    accountOwner: ``,
    accountName: ``,
    accountSite: ``,
    parentAccount: ``,
    accountNumber: ``,
    accountType: ``,
    industry: ``,
    annualRevenue: ``,
    phone: ``,
    fax: ``,
    website: ``,
    employees: ``,
    sicCode: ``,
    userID
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewAccountsData({ ...newAccountsData, [name]: value });
  };

  const handleAddressChange = (event) => {
    const { name, value } = event.target;
    let temp = { ...address }
    temp[name] = value
    setAddress(temp)
  };


  const handleFormSubmit = async (event) => {
    if (!userID) return ActivateToast("Login First!", "warning");
    let temp = { ...newAccountsData, address }
    setNewAccountsData(temp)
    setAccountsData([...accountsData, temp])
    // console.log(temp)
    for (const key in newAccountsData) {
      if (newAccountsData[key].length < 1) {
        return ActivateToast(`Please fill ${key} Field`, "warning");
      }
    }
    let data = await axios.post(
      `${apiLink}accounts`,
      temp
    );
    let customersInfo = {
      name: temp.accountName || temp.accountOwner,
      email: temp.email || "",
      contact: temp.phone || "",
      userID
    }
    console.log(customersInfo)
    axios.post(`${apiLink}customersInfo`, customersInfo)
    if (data.data.errors) console.log(data.data.errors);
    if (data.data.errors) return ActivateToast("Internal Server Error", "error");
    axios.post(
      `${apiLink}customersInfo`,
      {
        name: temp.accountName || temp.accountOwner,
        email: temp.email || "",
        contact: temp.phone || "",
        userID
      }
    )
    ActivateToast("Contact Added Successfully", "success");
    setCallsData([...callsData, newAccountsData]);
    handleClose();
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Create Account
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box
              sx={{
                bgcolor: theme === "dark" ? "rgb(145, 145, 145)" : "white",
              }}
            >
              <Typography variant="h5" textAlign={"center"}>
                Create An Account
              </Typography>
              <IconButton
                onClick={handleClose}
                sx={{ position: "absolute", top: 5, right: 5 }}
              >
                <Close />
              </IconButton>
              <Typography variant="h6">Account Information</Typography>
              <Box
                p={"10px"}
                gap={"20px"}
                display={["block", "block", "flex", "flex"]}
                justifyContent={"center"}
                onSubmit={handleFormSubmit}
              >
                <Box width={["100%", "75%", "50%", "45%"]}>
                  <TextField
                    name="accountOwner"
                    label="Account Owner (Required)"
                    value={newAccountsData.accountOwner}
                    onChange={handleInputChange}
                    fullWidth
                  />
                  <TextField
                    name="accountName"
                    label="Account Name (Required)"
                    value={newAccountsData.accountName}
                    onChange={handleInputChange}
                    fullWidth
                  />
                  <TextField
                    name="accountSite"
                    label="Account Site (Required)"
                    value={newAccountsData.accountSite}
                    onChange={handleInputChange}
                    fullWidth
                  />
                  <TextField
                    name="parentAccount"
                    label="Parent Account (Required)"
                    value={newAccountsData.parentAccount}
                    onChange={handleInputChange}
                    fullWidth
                  />
                  <TextField
                    name="accountNumber"
                    label="Account Number (Required)"
                    value={newAccountsData.accountNumber}
                    onChange={handleInputChange}
                    fullWidth
                  />
                  <TextField
                    name="accountType"
                    label="Account Type (Required)"
                    value={newAccountsData.accountType}
                    onChange={handleInputChange}
                    fullWidth
                  />
                  <TextField
                    name="industry"
                    label="Industry"
                    value={newAccountsData.industry}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Box>
                <Box width={["100%", "75%", "50%", "45%"]}>
                  <TextField
                    name="annualRevenue"
                    label="Annual Revenue"
                    value={newAccountsData.annualRevenue}
                    onChange={handleInputChange}
                    fullWidth
                  />
                  <TextField
                    name="phone"
                    label="phone"
                    value={newAccountsData.phone}
                    onChange={handleInputChange}
                    fullWidth
                  />
                  <TextField
                    name="fax"
                    label="FAX"
                    value={newAccountsData.fax}
                    onChange={handleInputChange}
                    fullWidth
                  />
                  <TextField
                    name="website"
                    label="Website"
                    value={newAccountsData.website}
                    onChange={handleInputChange}
                    fullWidth
                  />
                  <TextField
                    name="employees"
                    label="Employees"
                    value={newAccountsData.employees}
                    onChange={handleInputChange}
                    fullWidth
                  />
                  <TextField
                    name="sicCode"
                    label="SIC Code"
                    value={newAccountsData.sicCode}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Box>
              </Box>
              <Box>
                <br />
                <br />
                <br />
                <Typography variant="h6">Address Information</Typography>
                <Box
                  p={"10px"}
                  gap={"20px"}
                  display={["block", "block", "flex", "flex"]}
                  justifyContent={"center"}
                >
                  <Box width={["100%", "75%", "50%", "45%"]}>
                    <TextField
                      name="billingStreet"
                      label="Billing Street"
                      value={address.billingStreet}
                      onChange={handleAddressChange}
                      fullWidth
                    />
                    <TextField
                      name="billingCity"
                      label="Billing City (Required)"
                      value={address.billingCity}
                      onChange={handleAddressChange}
                      fullWidth
                    />
                    <TextField
                      name="billingState"
                      label="Billing State (Required)"
                      value={address.billingState}
                      onChange={handleAddressChange}
                      fullWidth
                    />
                    <TextField
                      name="billingCode"
                      label="Billing Code (Required)"
                      value={address.billingCode}
                      onChange={handleAddressChange}
                      fullWidth
                    />
                    <TextField
                      name="billingCountry"
                      label="Billing Country (Required)"
                      value={address.billingCountry}
                      onChange={handleAddressChange}
                      fullWidth
                    />
                  </Box>
                  <Box width={["100%", "75%", "50%", "45%"]}>
                    <TextField
                      name="shippingStreet"
                      label="Shipping Street"
                      value={address.shippingStreet}
                      onChange={handleAddressChange}
                      fullWidth
                    />
                    <TextField
                      name="shippingCity"
                      label="Shipping City"
                      value={address.shippingCity}
                      onChange={handleAddressChange}
                      fullWidth
                    />
                    <TextField
                      name="shippingState"
                      label="Shipping State"
                      value={address.shippingState}
                      onChange={handleAddressChange}
                      fullWidth
                    />
                    <TextField
                      name="shippingCode"
                      label="Shipping Code"
                      value={address.shippingCode}
                      onChange={handleAddressChange}
                      fullWidth
                    />
                    <TextField
                      name="shippingCountry"
                      label="Shipping Country"
                      value={address.shippingCountry}
                      onChange={handleAddressChange}
                      fullWidth
                    />
                  </Box>
                </Box>
              </Box>
              <Box display={"flex"} justifyContent={"center"}>
                <Button
                  onClick={handleFormSubmit}
                  sx={{ m: "auto", width: "10%" }}
                  variant="contained"
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
