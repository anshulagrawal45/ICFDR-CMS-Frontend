
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DeleteForever, Edit } from "@mui/icons-material";
import { Context } from "../../../Context";
import { Box, Button, Modal, TextField } from "@mui/material";
import { LocalDate, LocalTime } from "../../Features/DateAndTime";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function NotesCard({ data }) {
  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  // const [favorite, setFavorite] = React.useState(data.favorite)
  let { notesData, setNotesData, axios, ActivateToast, theme, apiLink } =
    React.useContext(Context);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleDeleteCard = () => {
    console.log(data._id);
    axios
      .delete(`${apiLink}notes/${data._id}`)
      .then(() => {
        setNotesData(notesData.filter((note) => note._id !== data._id));
        ActivateToast("Toast Successfully Deleted", "success");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Card
      zIndex={1000}
      sx={{
        margin: "0 auto",
        width: [270, 250, 270, 300],
        height: "fit-content",
        background: theme === "dark" ? "rgb(145, 145, 145)" : "white",
      }}
    >
      <CardContent>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Box>
            <Typography
              variant="body2"
              fontSize={"12px"}
              color="text.secondary"
            >
              {data.date}
            </Typography>
            <Typography
              variant="body2"
              fontSize={"12px"}
              color="text.secondary"
            >
              {data.time}
            </Typography>
          </Box>
          <Typography variant="body1" fontWeight={700} color="text.secondary">
            {data.topic}
          </Typography>
        </Box>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={async () => {
            // setFavorite(!favorite)
            await axios.patch(`${apiLink}notes/${data._id}`, {
              favorite: !data.favorite,
            });
            // data.favorite=!favorite
            let temp = [...notesData];
            for (let i = 0; i < temp.length; i++) {
              if (temp[i]._id == data._id) {
                temp[i].favorite = !temp[i].favorite;
                // temp[i]=data
              }
            }
            let newArr = [
              ...temp.sort((a, b) => {
                console.log(a, b);
                return Number(b.favorite) - Number(a.favorite);
              }),
            ];
            setNotesData(newArr);
          }}
        >
          <FavoriteIcon
            sx={{ color: data.favorite ? "red" : "rgb(112, 112, 112)" }}
          />
        </IconButton>
        <IconButton aria-label="share" onClick={handleDeleteCard}>
          <DeleteForever />
        </IconButton>
        <IconButton
          aria-label="edit"
          onClick={() => {
            console.log(data)
            setOpen(true);
          }}
        >
          <Edit />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      {/* {expanded?<MultipleNotes data={data} setExpanded={setExpanded} />:null} */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{data.content}</Typography>
        </CardContent>
      </Collapse>
      <EditModal open={open} data={data} setOpen={setOpen} />
    </Card>
  );
}

function EditModal({ open, setOpen, data }) {
  let { axios, apiLink, notesData, ActivateToast, setNotesData } = React.useContext(Context);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
let id=data._id
  const handleClose = () => setOpen(false);
  async function edit(e) {
    e.preventDefault();
    let data = new FormData(e.currentTarget);
    let obj = {
      topic: data.get("Heading"),
      content: data.get("Content"),
      date: LocalDate(),
      time: LocalTime(),
    };
    console.log(obj);
    axios
      .patch(`${apiLink}notes/${id}`, {
        topic: data.get("Heading"),
        content: data.get("Content"),
        date: LocalDate(),
        time: LocalTime(),
      })
      .then((res) => {
      ActivateToast("Note Edited Successfully","success")
      setNotesData(prev=>{
       return prev.map((el)=>{
          if(el._id==id){
            console.log("found")
            return {
              ...data,
              ...obj
            }
          }else{
            console.log("not found")
            return el
          }
        })
      })
      console.log(notesData)
      console.log(res)
}
      )
      .catch((err) => {
        console.log(err);
      });
    setOpen(false);
  }

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component={"form"} onSubmit={edit}>
          <TextField
            fullWidth
            name="Heading"
            label={"Heading"}
            defaultValue={data.topic}
          />
          <br />
          <br />
          <TextField
            fullWidth
            multiline
            rows={5}
            name="Content"
            label={"Content"}
            defaultValue={data.content}
          />
          <br />
          <Button variant="outlined" type="submit">
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
