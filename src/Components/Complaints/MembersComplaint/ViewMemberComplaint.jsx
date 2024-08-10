import { Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../../Context";
import styles from "../../Features/Styles/CustomInputs.module.css";
import ComplaintsCards from "../ComplaintsCard/ComplaintsCard";

export default function ViewMemberComplaints() {
    const { axios, apiLink, memberLoginData } = useContext(Context); // Assuming user context includes memberID
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        axios.get(`${apiLink}complaint`).then((res) => {
            let { data } = res.data;
            console.log(data);

            // Filter complaints by logged-in user's memberID
            const userComplaints = data.filter(complaint => complaint?.memberID === memberLoginData?._id);
            // console.log(userComplaints);
            setComplaints(userComplaints);
            // console.log(setComplaints);
        }).catch(err => {
            console.log(err);
        });
    }, [axios, apiLink, memberLoginData?._id]);
    return (
        <div>
            <h3 className={styles.title}>Complaints Section</h3>
            <br />
            <Box
                minHeight={["auto", "auto"]}
                width={["100%"]}
                margin={"auto"}
                display={["grid", "grid", "grid", "grid"]}
                gridTemplateColumns={[
                    "repeat(1,1fr)",
                    "repeat(2,1fr)",
                    "repeat(3,1fr)",
                    "repeat(4,1fr)"
                ]}
                m={"auto"}
                gap={"20px"}
            >
                {complaints.map((el) => {
                    return <ComplaintsCards complaint={el} key={el._id} />;
                })}
            </Box>
        </div>
    );
}
