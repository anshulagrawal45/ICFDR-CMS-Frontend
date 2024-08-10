import { Box, Button, Modal, Switch, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../../Context";
import styles from "./CategoryCard.module.css"
import StyledButton from "../../UIComponents/Button/StyledButton";
import { Delete } from "@mui/icons-material";
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
  p: 4,
  maxHeight: "80vh",
  overflowY: "scroll",
};

const CategoryCard = ({
  data,
  setCategories,
  permissions,
  categoryFormPermission,
}) => {
  let { isAdmin, ActivateToast } = useContext(Context);
  const [categoryData, setCategoryData] = useState(data[1] || {});
  const [open, setOpen] = useState(false);
  return (
    <Box>
    <NewCategoryCard data={data} clickFunction={() => setOpen(true)} deleteFunction={(e) => {
      setCategories((prev) => {
        delete prev[data[0]];
        return { ...prev };
      });
      ActivateToast("Deleted Successfully", "info");
      setOpen(false);
    }} />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
            <Button
              onClick={(e) => {
                setCategories((prev) => {
                  prev[data[0]] = categoryData;
                  return { ...prev };
                });
                setOpen(false);
                ActivateToast("Settings Saved", "info");
              }}
              variant="contained"
            >
              SAVE
            </Button>

            {Object.keys(data[1]).map((item) => (
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography>{separateCamelCase(item)}</Typography>
                <Switch
                  checked={categoryData[item]}
                  onClick={(e) => {
                    setCategoryData({
                      ...categoryData,
                      [item]: e.target.checked,
                    });
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

function NewCategoryCard({data,clickFunction,deleteFunction}){
  return <div className={styles.notification} onClick={(clickFunction)}>
  <div className={styles.notiglow}></div>
  <div className={styles.notiborderglow}></div>
  <div className={styles.notititle}>{data[0]}</div>
  <div className={styles.notibody}>
  {/* <StyledButton text={<Delete />} extraFunction={deleteFunction} tooltip={"Delete Category"} /> */}
  <Button  sx={{background:"rgb(34, 164, 241)",":disabled":{
    backgroundColor:"grey"
  }}}>
    <Delete sx={{fill:"white"}} />
  </Button>
  </div>
  {/* <button 
  // className={styles.notibody}
  >
    Delete
  </button> */}
</div>
}

export default CategoryCard;
