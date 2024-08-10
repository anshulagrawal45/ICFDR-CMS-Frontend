import { DeleteForever } from '@mui/icons-material';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { Context } from '../../../Context';
import styles from "../../UIComponents/CardDesign/NewCardDesign.module.css";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function AnnouncementCard({ data }) {
  let { allAnnouncements, axios, setAllAnnouncements, ActivateToast, theme, apiLink, userName, PostToLogs } = React.useContext(Context)
  const [expanded, setExpanded] = React.useState(false);
  console.log(data);
  // const [favorite, setFavorite] = React.useState(data.favorite) 
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleDeleteCard = () => {
    console.log(data._id)
    axios.delete(`${apiLink}announcement/${data._id}`).then(() => {
      setAllAnnouncements(allAnnouncements.filter((announcement) => announcement._id !== data._id));
      PostToLogs(`${userName} deleted announcement regarding ${data.title}`)
      ActivateToast("Announcement Successfully Deleted", "success")
    })
    .catch(error => {
      console.error('Error deleting announcement:', error);
      ActivateToast("Failed to delete announcement", "error");
    });
  }


  return (
    <div className={styles.book}>
      <Box style={{ overflowY: "scroll", marginTop: '16px', marginLeft: '30px', textAlign: 'left', paddingLeft: '10px', width: "100%" }}>
        {data.content}
      </Box>
      <Box style={{ position: 'absolute', bottom: 0, right: 0, background: "rgba(200, 235, 145,0.5)" }}>
        <IconButton aria-label="share" onClick={handleDeleteCard} >
          <DeleteForever />
        </IconButton>
      </Box>
      <div className={styles.cover}>
        <div className={styles.coverContent} style={{ textAlign: 'center', margin: "0 20px", flex: 1 }} >
          <Typography fontWeight={700}>{data.title}</Typography>
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
              {data.date}
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
              {data.time}
            </Typography>
          </Box>
        </div>
      </div>
    </div>
  );
}