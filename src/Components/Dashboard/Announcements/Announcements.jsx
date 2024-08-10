import { Box, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Context } from "../../../Context";
import styles from "../../UIComponents/CardDesign/NewCardDesign.module.css";

const Announcements = () => {
  let { allAnnouncements, setAllAnnouncements, apiLink, axios } = useContext(Context)

  useEffect(() => {
    ((async () => {
      let { data } = await axios.get(`${apiLink}announcement`)
      console.log(data.data)
      setAllAnnouncements(data.data)
    })())
  }, [apiLink])

  return <Box display={"flex"} flexWrap={"wrap"}  gap={"60px"}>
    {allAnnouncements.length === 0 ? <Typography>No Announcement Made</Typography> : allAnnouncements.map((announcement, index) => (
      <div className={styles.book}>
        <Box style={{ overflowY: "scroll", marginTop: '16px', marginLeft: '30px', textAlign: 'left', paddingLeft: '10px', width: "100%" }}>
          {announcement.content}
        </Box>
        <div className={styles.cover}>
          <div className={styles.coverContent} style={{ textAlign: 'center', margin: "0 20px", flex: 1 }} >
            <Typography fontWeight={700}>{announcement.title}</Typography>
            <br /> <br />
            <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
              <Typography
                variant="body2"
                fontSize={"12px"}
                fontWeight={"700"}
                color="text.secondary"
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                {announcement.date}
              </Typography>
              <Typography
                variant="body2"
                fontSize={"12px"}
                fontWeight={"700"}
                color="text.secondary"
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                {announcement.time}
              </Typography>
            </Box>
          </div>
        </div>
      </div>
    ))}
  </Box>
};

export default Announcements;