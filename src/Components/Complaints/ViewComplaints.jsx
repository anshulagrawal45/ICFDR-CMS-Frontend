import { Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Context";
import styles from "../Features/Styles/CustomInputs.module.css";
import ComplaintsCards from "./ComplaintsCard/ComplaintsCard";

export default function ViewComplaints(){
  const {axios,apiLink,userID} = useContext(Context)
  const [complaints, setComplaints] = useState([])
  const [complaintsData, setComplaintsData] = useState([]);
  let navigate = useNavigate()

    useEffect(() => {
      if (!userID) {
        navigate("/client/login")
      }
    }, [navigate, userID])

    useEffect(()=>{
      axios.get(`${apiLink}complaint`).then((res)=>{
        // console.log(res)
        let {data} = res.data
        console.log(data)
        setComplaints(data)
      }).catch(err=>{
        console.log(err)
      })
    },[])
    
    return <div>
        <h3 className={styles.title}>Complaints Section</h3>
        <br />
        <Box
                  // className={s.productsGrid}
                  minHeight={["auto", "auto"]}
                  width={["100%"]}
                  margin={"auto"}
                  display={["grid", "grid", "grid", "grid"]}
                  gridTemplateColumns={[
                    "repeat(1,1fr)",
                    "repeat(2,1fr)",
                    "repeat(3,1fr)",
                    "repeat(4,1fr)",
                  ]}
                  m={"auto"}
                  gap={"20px"}
                >

        {complaints.map((el,i)=>{
            return <ComplaintsCards complaint={el} key={el?._id} complaintsData={complaintsData} setComplaintsData={setComplaintsData} />
        })}
                </Box>
    </div>
}