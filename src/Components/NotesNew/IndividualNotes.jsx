import { Box, IconButton, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { Context } from "../../Context";
import CloseIcon from "@mui/icons-material/Close";
import { Delete, Edit, Save } from "@mui/icons-material";
export default function IndividualChats({ data }) {
  const [open, setOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const { apiLink,isChatSelected,notesData,setNotesData,axios, ActivateToast } =
    useContext(Context);
  
  const [note, setNote] = useState({
    topic: data.topic,
    content: data.content,
    favorite: data.favorite,
    date: data.date,
    time: data.time,
  });
  function saveNote(){
      const currentDate = new Date().toLocaleDateString("en-GB");
      const currentTime = new Date().toLocaleTimeString();
      let temp = {...note, date:currentDate, time:currentTime}
      setNote(temp)
    const updatedNotesData = notesData.map((el) =>
          el._id === note._id ? { ...el, ...temp } : el
        );
        setNotesData(updatedNotesData);
    axios.patch(apiLink + "notes/" + data._id, {...temp});
        ActivateToast("Note Saved", "success")

        setIsDisabled(true)
  }

  const handleDeleteCard = ()=>{
    console.log(data._id)
    axios.delete(`${apiLink}notes/${data._id}`).then(() => {
      let temp = notesData.filter(note => note._id !== data._id)
      console.log(temp)
      setNotesData(temp);
      ActivateToast("Toast Successfully Deleted","success")
    })
    .catch(error => {
      console.log(error);
    });
  }

  return (
    <Box
      sx={{
        bgcolor: open && "#f1f1f1",
        cursor: "pointer",
        "&:hover": { bgcolor: "#f1f1f1" },
      }}
      p={"0 20px"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      boxShadow={
        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"
      }
      width={"100%"}
      height={"50px"}
      onClick={() => {
        // noteSelected.func(false);
        setOpen(true);
        // setNoteSelected({ func: setOpen });
      }}
    >
      {note.topic}
      <IconButton onClick={(e) => {
        // e.stopPropagation()
        handleDeleteCard()}}><Delete /></IconButton>
      {open && (
        <Box
          onClick={(e) => e.stopPropagation()}
          sx={{ cursor: "default" }}
          boxShadow={
            "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"
          }
          width={"300px"}
          height={"500px"}
          zIndex={999}
          position={"fixed"}
          bottom={0}
          right={isChatSelected?"850px":"500px"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          bgcolor={"white"}
          p={"10px"}
          gap={"10px"}
        >
          <Box
            width={"100%"}
            height={"fit-content"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            bgcolor={"#f1f1f1"}
            // pl={"20px"}
            pr={"10px"}
          >
            <TextField
              disabled={isDisabled}
              sx={{ border: "none", outline: "none" }}
              value={note.topic}
              fullWidth
              fontWeight={"bolder"}
              onChange={(e) => setNote({ ...note, topic: e.target.value })}
            />
            <IconButton onClick={(e) => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box display={"flex"} justifyContent={"space-around"}>
            <Typography variant="subtitle2">{note.time}</Typography>
            <Typography variant="subtitle2">{note.date}</Typography>
          </Box>
          <textarea
          onChange={(e) => setNote({ ...note, content: e.target.value })}
            disabled={isDisabled}
            rows={20}
            style={{
              width: "100%",
              padding: "8px",
              fontSize: "16px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              resize: "vertical",
              minHeight: "100px",
            }}
            value={note.content}
          />
          <Box
            width={"100%"}
            height={"50px"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <IconButton
              onClick={() => {
                setIsDisabled(false);
              }}
              sx={{
                bgcolor: "lightgreen",
                height: "50px",
                width: "50px",
                "&:hover": { color: "white", bgcolor: "green" },
              }}
            >
              <Edit />
            </IconButton>
            <IconButton
              disabled={isDisabled}
              onClick={saveNote}
              sx={{
                bgcolor: "lightgreen",
                height: "50px",
                width: "50px",
                "&:hover": { color: "white", bgcolor: "green" },
              }}
            >
              <Save />
            </IconButton>
          </Box>
        </Box>
      )}
    </Box>
  );
}

