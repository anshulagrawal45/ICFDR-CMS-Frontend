import { Box, Button, IconButton, TextField } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../Context";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Note, NoteAdd } from "@mui/icons-material";
import { uid } from "uid";
import StyledButton from "../UIComponents/Button/StyledButton";
const NewNotes = ({right}) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const notesRef = useRef(null)
  const [note, setNote] = useState({
    topic: "",
    content: "",
    favorite: false,
    date: "",
    time: "",
  });

  const {
    apiLink,
    userID,
    axios,
    setNotesData,
    ActivateToast,
    newNotesArray,
    setNewNotesArray
  } = useContext(Context);

  const currentDate = () => {
    return new Date().toLocaleDateString("en-GB");
  };
  const currentTime = () => {
    return new Date().toLocaleTimeString();
  };
 
  function addNewNote() {

    let temp = {...note, date:currentDate(), time:currentTime(), _id: uid(24), userID}
 
    setNotesData(prevNotes => [...prevNotes, temp]);
    axios.post(apiLink + "notes/" ,temp);
      setNote({...note,topic:"",content:"" });
        ActivateToast("Note Added", "success")

        if(right!==0){
          let filteredData = newNotesArray.filter((el,i)=>{
            return i!==right
          })
          setNewNotesArray(filteredData)
        }


  }

  useEffect(() => {
    if (!userID) return;
    (async () => {
      setIsLoading(true);
      let {data} = await axios.get(`${apiLink}notes?userID=${userID}`);
      setNotesData(
        data.data.sort((a, b) =>
          a.favorite === b.favorite ? 0 : a.favorite ? -1 : 1
        )
      );
      setIsLoading(false);
     })();
  }, [apiLink, setNotesData, userID]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notesRef.current && !notesRef.current.contains(event.target)) {
        // Clicked outside the component, close it
        setOpen(false);
      }
    };

    // Attach the event listener to the document
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpen]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  return !userID?null:<Box
  ref={notesRef}
  boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
  zIndex={999}
  overflow={"hidden"}
  // position={"fixed"}
  bgcolor={"white"}
  bottom={10}
  borderRadius={!open ? "50%" : "0"}
// right={position}
// right={selected ? 350:130}
  width={open?"230px":"fit-content"}
  sx={{ transition: ".4s" }}
  height={open ? "fit-content" : "50px"}
>
  <Box
  zIndex={999}
    sx={{ cursor: "pointer" }}
    p={"20px 10px"}
    justifyContent={open?"space-between":"center"}
    width={open?"100%":"fit-content"}
    borderRadius={!open ? "50%" : "0"}
    bgcolor={"rgb(144, 238, 144)"}
    height={"50px"}
    display={"flex"}
    alignItems={"center"}
  >
    <IconButton  sx={{width:"fit-content",zIndex:999}} onClick={() => {
      if(open===false){setOpen(true)}
      if(open){
        setNewNotesArray(prev=>[...prev,0])
      }
    }}><NoteAdd /></IconButton>
    {open ? <IconButton onClick={() => setOpen(false)}>
      {<KeyboardArrowDownIcon />}
    </IconButton>:null}
    
  </Box>
  <Box
  zIndex={999}
    width={open?"100%":"50px"}
    height={"100%"}
    sx={{ overflowY: open?"scroll":"hidden" }}
    p={"10px"}
    display={"flex"}
    flexDirection={"column"}
    gap={"5px"}
  >
<Box zIndex={9999}>
  <TextField
    label="Note Topic"
    name="topic"
    value={note.topic}
    onChange={handleInputChange}
    fullWidth
    margin="normal"
    variant="outlined"
  />
  <TextField
    label="Note Content"
    name="content"
    value={note.content}
    onChange={handleInputChange}
    fullWidth
    margin="normal"
    variant="outlined"
    multiline
    rows={4}
  />
  {/* <Button variant="contained" color="primary" onClick={addNewNote}>
    Save Note
  </Button> */}
  <StyledButton text={"Save Note"} icon={<NoteAdd />} tooltip={"Add a New Note"} extraFunction={addNewNote} />
</Box>
  </Box>
</Box>
}

export default NewNotes;
