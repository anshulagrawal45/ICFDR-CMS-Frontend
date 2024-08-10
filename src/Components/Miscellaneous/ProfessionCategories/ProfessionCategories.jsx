import { Box, IconButton, Typography } from "@mui/material";
import { useContext } from "react";
import { Context } from "../../../Context";
import { NavLink, useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import styles from "./ProfessionCategoriesCard.module.css"
import styles2 from "../../Features/Styles/CustomInputs.module.css"

const ProfessionCategories = () => {
  const { configurationSettings, isAdmin, centers } = useContext(Context);
  let navigate = useNavigate();
  return (
    <>
      <IconButton
        onClick={() => {
          navigate("/client/misc");
        }}
      >
        <ArrowBack />
      </IconButton>
      <Typography variant="h5" className={styles2.title}>Profession Categories</Typography>
      <Typography variant="subtitle2" className={styles2.blueTextColor}>
        Create Profession Categories for Every Center Available
      </Typography>
      <br />
      <Box
        minHeight={"auto"}
        display={"grid"}
        gridTemplateColumns={["repeat(2, 1fr)","repeat(3, 1fr)","repeat(4, 1fr)"]}
        gap={"20px"}
      >
            {centers?.length==0 && <Typography variant="h5" textAlign={"center"}>No Centers Made</Typography>}
        {isAdmin &&
          configurationSettings?.centers?.map((item, i) => {
            return <CategoryCard title={item} path={`${item.replaceAll(" ", "-")}`} />
          })}
        {!isAdmin &&
          centers?.map((item, i) => {
         return   <CategoryCard title={item} path={`${item.replaceAll(" ", "-")}`} />
        })}
      </Box>
    </>
  );
};

export function CategoryCard({title,path}){
  return <NavLink className={styles.card} to={path}>
  <div className={styles.card1}>
   <p>{title}</p>
   {/* <p className={styles.small}>Card description with lots of great facts and interesting details.</p> */}
   <div className={styles["go-corner"]} href="#">
     <div className={styles["go-arrow"]}>
       →
     </div>
   </div>
 </div>
</NavLink>
}

export default ProfessionCategories;
