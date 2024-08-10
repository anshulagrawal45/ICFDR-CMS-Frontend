import {
  Avatar,
  Box,
  Button,
  Divider,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Edit, Save } from "@mui/icons-material";
import { Context } from "../../../Context";
import SendEmailModal from "../../Features/SendMailModal";
import { deepPurple } from "@mui/material/colors";
const IndividualContact = () => {
  let { apiLink, ActivateToast,axios } = useContext(Context);
  let { contactId } = useParams();
  const [data, setData] = useState({});
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true)
    axios.get(apiLink + "contacts/" + contactId).then(({ data }) => {
      // console.log(data)
      setData(data);
      setIsLoading(false)
    });
  }, [apiLink, contactId]);
  const handleMoreContactChange = (event, index) => {
    const { name, value } = event.target;
    const updatedContacts = [...data.moreContacts];
    updatedContacts[index] = {
      ...updatedContacts[index],
      [name]: value,
    };
    setData((prevData) => ({
      ...prevData,
      moreContacts: updatedContacts,
    }));
  };
  return (
    <Box minHeight={"100vh"}>
      <Divider />
      <br />
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-evenly"}
        width={"70%"}
      >
        <Box display={"flex"}
          gap={"10px"}
          flexDirection={["initial", "initial"]}
          justifyContent={"space-around"}
          width={["100%", "50%"]}>
          <Avatar sx={{ bgcolor: deepPurple[500], }}>{isLoading === false ? data.name[0].toUpperCase() : "@"}</Avatar>
          <SendEmailModal reciever={data.email} />
          {disabled && (
            <Button onClick={() => setDisabled(false)} variant="contained">
              Edit &nbsp; <Edit sx={{ fontSize: "20px" }} />
            </Button>
          )}
          {!disabled && (
            <Button
              onClick={() => {
                setDisabled(true);
                axios
                  .patch(apiLink + "contacts/" + contactId, data)
                  .then((res) => console.log(res.data));
                ActivateToast("Meetings Updated", "success");
              }}
              variant="contained"
            >
              Save &nbsp; <Save sx={{ fontSize: "20px" }} />
            </Button>
          )}
        </Box>
      </Box>
      <br />
      <Divider />
      <Box textAlign={"center"}>
        <br />
        <br />
        <Box display={"flex"} flexDirection={"column"}>
          <TextField
            onChange={({ target }) => {
              let { value } = target;
              setData({ ...data, name: value });
            }}
            disabled={disabled}
            value={data.name}
          />
          <TextField
            onChange={({ target }) => {
              let { value } = target;
              setData({ ...data, email: value });
            }}
            disabled={disabled}
            value={data.email}
          />
          <TextField
            onChange={({ target }) => {
              let { value } = target;
              setData({ ...data, phone: value });
            }}
            disabled={disabled}
            value={data.phone}
          />
          {data.company && <TextField
            onChange={({ target }) => {
              let { value } = target;
              setData({ ...data, company: value });
            }}
            disabled={disabled}
            value={data.company}
          />}
          {data.website && <TextField
            onChange={({ target }) => {
              let { value } = target;
              setData({ ...data, website: value });
            }}
            disabled={disabled}
            value={data.website}
          />}
          {data.dob && <TextField
            onChange={({ target }) => {
              let { value } = target;
              setData({ ...data, dob: value });
            }}
            disabled={disabled}
            value={data.dob}
          />}
          {(data?.moreContacts || []).map((el, i) => {
            return <>
              <TextField
                onChange={(event) => handleMoreContactChange(event, i)}
                disabled={disabled}
                value={el.contactName}
              />
              <TextField
                onChange={(event) => handleMoreContactChange(event, i)}
                disabled={disabled}
                value={el.contactMobile}
              />
            </>
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default IndividualContact;
