import { Campaign } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { uid } from "uid";
import { Context } from "../../../Context";
import { LocalDate, LocalTime } from "../../Features/DateAndTime";
import styles from "../../Features/Styles/CustomInputs.module.css";
import StyledButton from "../../UIComponents/Button/StyledButton";
import AnnouncementCard from "./AnnouncementCards";

const AnnouncementCreation = ({ onSubmit }) => {
  let {
    userID,
    axios,
    allAnnouncements,
    setAllAnnouncements,
    apiLink,
    PostToLogs,
    ActivateToast,
    userName,
  } = useContext(Context);
  const [announcement, setAnnouncement] = useState({ title: "", content: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    let temp = {
      ...announcement,
      _id: uid(24),
      userID,
      date: LocalDate(),
      time: LocalTime(),
    };
    axios.post(`${apiLink}announcement`, temp);
    PostToLogs(
      `${userName} created announcement regarding ${announcement.title}`
    );
    ActivateToast("Announcement Created", "info");
    setAllAnnouncements((prev) => [...prev, temp]);
    setAnnouncement({ title: "", content: "" });
  };

  return (
    <Box>
    <Box sx={{
      width:"fit-content",
      boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      m:"auto",
      padding:"15px",
      borderRadius:"10px"
    }}>
    <Typography
        width={"fit-content"}
        m={"auto"}
        textAlign={"center"}
        className={styles.title}
        variant="h4"
      >
        Create Announcements
      </Typography>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "400px",
          margin: "0 auto",
        }}
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <label className={styles.label}>
          <input
            className={styles.input}
            style={{ marginBottom: "16px" }}
            value={announcement.title}
            onChange={(e) =>
              setAnnouncement({ ...announcement, title: e.target.value })
            }
            required
          />
          <span className={styles.span}>Title</span>
        </label>
        <label className={styles.label}>
          <textarea
            className={styles.input}
            style={{ marginBottom: "16px" }}
            value={announcement.content}
            onChange={(e) =>
              setAnnouncement({ ...announcement, content: e.target.value })
            }
            aria-multiline
            rows={8}
            required
          />
          <span className={styles.span} style={{top:announcement.content.length>0?"120px":"30px"}}>Content</span>
        </label>
        <Button
          type="submit"
          sx={{all:"unset",width:"fit-content",m:"auto"}}

        >
          <StyledButton text={"Create"} tooltip={"Create Announcement"} icon={<Campaign />} />
        </Button>
      </form>
    </Box>
      <Box>
        <br />
        <br />
        <br />
        <Typography width={"fit-content"} m={"auto"} className={styles.title} variant="h4" textAlign={"center"}>
          All Announcements
        </Typography>
        <br />
        <Box
          // className={s.productsGrid}
          minHeight={["auto", "auto"]}
          width={["100%"]}
          margin={"auto"}
          sx={{placeItems:'center'}}
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
          {allAnnouncements.length === 0 ? (
            <Typography>No Announcements Yet</Typography>
          ) : (
            allAnnouncements.map((el, i) => {
              return <AnnouncementCard key={i} data={el} />;
            })
          )}{" "}
        </Box>
      </Box>
    </Box>
  );
};

export default AnnouncementCreation;
