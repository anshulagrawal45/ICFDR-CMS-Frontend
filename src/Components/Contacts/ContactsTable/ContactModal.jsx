import { Cancel, Edit, Save } from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { Context } from "../../../Context";
import DeleteFromID from "../../Features/DeleteFromID";
import SendEmailModal from "../../Features/SendMailModal";
import separateCamelCase from "../../Features/SeparateCameCase";
import styles from "../../Features/Styles/CustomInputs.module.css";
import StyledButton from "../../UIComponents/Button/StyledButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: ["90%","50%"],
  height: "90vh",
  bgcolor: "background.paper",
  borderRadius: "25px",
  boxShadow: 24,
  p: [1,2,3,4],
  overflowY: "scroll",
};

export default function ContactModal({
  open,
  setOpen,
  handleClose,
  disabled,
  setDisabled,
  data,
}) {
  console.log(data)
  const { apiLink, axios, ActivateToast, setContactsData, contactsData } = useContext(Context);
  const [temp, setTemp] = useState(JSON.parse(JSON.stringify(data)));
  delete temp.__v;
  delete temp.moreContacts;
  delete temp.userID;
  return (
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
        <Typography className={styles.title} variant="h5">Contact with {data.name}</Typography>
        <br/>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
          width={"100%"}
        >
          <Box
            display={"flex"}
            gap={"10px"}
            justifyContent={"space-around"}
            flexWrap={"wrap"}
          >
            <SendEmailModal />
            {disabled && (
              <StyledButton text={"Edit"} icon={<Edit />} extraFunction={() => setDisabled(false)} />
            )}
            {!disabled && (
              <StyledButton
              text={"Save"}
              icon={<Save />}
                extraFunction={() => {
                  setDisabled(true);
                  axios
                    .patch(
                      apiLink + "contacts/" + (data?.id || data?._id),
                      temp
                    )
                    .then((res) => console.log(res.data));
                  ActivateToast("Contacts Updated", "success");
                }}
                variant="contained"
              />
            )}
            <DeleteFromID
          setModalOpen={setOpen}
          name={data.name}
          id={data._id}
          //same changes made in meetings modal file, refer changes from there!
          array={contactsData}
          setArray={setContactsData}
          route={"contacts"}
          headline={"Delete Contact"}
          message={"Delete this Contact?"}
          buttonText={"Delete"}
        />
          </Box>
        </Box>
        <br />
        <Divider />
        <Box textAlign={"center"}>
          <br />
          <Box className={styles.form} display={"flex"} gap={"10px"} flexDirection={"column"}>
            {Object.entries(temp).map(([key, value]) => {
              return (
                <label className={styles.label} key={key} width={"100%"}>
                  <input className={styles.input}
                    name={key}
                    placeholder={key.toUpperCase()}
                    onChange={({ target }) => {
                      let { value } = target;
                      setTemp({ ...temp, [key]: value });
                    }}
                    disabled={disabled}
                    value={value}
                  />
                  <span className={styles.span} style={{top:"25px"}}>{separateCamelCase(key)}</span>
                </label>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
