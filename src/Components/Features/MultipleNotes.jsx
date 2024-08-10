import { Remove, Save } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Context } from "../../Context";

export default function MultipleNotes({data, setExpanded}){
    const {apiLink, notesData, setNotesData, ActivateToast,axios} = useContext(Context)
    const [isDraggable, setIsDraggable] = useState(true);
  const [isNotesVisible, setIsNotesVisible] = useState(true);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [notes, setNotes] = useState({
    _id:data._id,
    content: data.content,
    topic:data.topic,
    time: data.date,
    date: data.time,
  });
  // const [notesList, setNotesList] = useState([]);

    function getCurrentTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, "0");
        const minutes = now.getMinutes().toString().padStart(2, "0");
        const seconds = now.getSeconds().toString().padStart(2, "0");
        return `${hours}:${minutes}:${seconds}`;
      }
      function getCurrentDate() {
        const now = new Date();
        const year = now.getFullYear().toString();
        const month = (now.getMonth() + 1).toString().padStart(2, "0");
        const day = now.getDate().toString().padStart(2, "0");
        return `${day}-${month}-${year}`;
      }

      function saveNote() {
        setIsSaveDisabled(true);
        const updatedNotesData = notesData.map((note) =>
          note._id === notes._id ? { ...note, ...notes } : note
        );
        setNotesData(updatedNotesData);
        axios.patch(apiLink + "notes/" + notes._id, {...notes});
        ActivateToast("Note Saved", "success")
      }
      
      return  <>
      <motion.div
        dragConstraints={{
          left: 0,
          right: window.innerWidth - 500,
          top: 0,
          bottom: window.innerHeight - 300,
        }}
        drag={isDraggable}
        style={{
          resize: "both",
          overflow: "hidden",
          outline: isDraggable ? "none" : "3px solid red",
          width: "300px",
          height: "250px",
          background: "rgb(30,30,30)",
          position: "fixed",
        //   display: isNotesVisible ? "flex" : "none",
          flexDirection: "column",
          zIndex: 200,
        }}
      >
        <Box
          sx={{ cursor: isDraggable ? "move" : "default" }}
          height={"20%"}
          bgcolor={"rgb(230,185,5)"}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          p={"0 0 0 20px"}
        >
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography fontWeight={"bold"}>Notes</Typography>
            &nbsp;&nbsp;&nbsp;
            <Box>
              <Typography
                variant="subtitle2"
                fontSize={"10px"}
                fontWeight={"bold"}
              >
                Last Updated:
              </Typography>
              <Typography
                variant="subtitle2"
                fontSize={"10px"}
                fontWeight={"bold"}
              >
                {notes.date}
                &nbsp;&nbsp;
                {notes.time}
              </Typography>
            </Box>
          </Box>
          <Box display={"flex"}>
            <IconButton
              disabled={isSaveDisabled}
              onClick={saveNote}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Save />
            </IconButton>
            <IconButton
              onClick={() => {
                setIsNotesVisible(false)
                setExpanded(false)
              }}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Remove />
            </IconButton>
          </Box>
        </Box>

        <Box display={"flex"}>
        <Typography color={"white"} pr={"10px"}>Topic:</Typography>
          <textarea
            className="textArea"
            value={notes.topic}
            onChange={({ target }) => {
              if (isSaveDisabled == true) {
                setIsSaveDisabled(false);
              }
              setNotes({
                ...notes,
                topic: target.value,
                date: getCurrentDate(),
                time: getCurrentTime(),
              });
            }}
            onFocus={() => setIsDraggable(false)}
            onBlur={() => setIsDraggable(true)}
            style={{
              width: "100%",
              background: "transparent",
              color: "white",
              resize: "none",
              outline: "none",
              border: "none",
            }}
          ></textarea>
        </Box>
        <hr />
        <Box height={"70%"} padding={"20px"} color={"rgb(230,185,5)"}>
          <textarea
            className="textArea"
            value={notes.content}
            onChange={({ target }) => {
              if (isSaveDisabled == true) {
                setIsSaveDisabled(false);
              }
              setNotes({
                ...notes,
                content: target.value,
                date: getCurrentDate(),
                time: getCurrentTime(),
              });
            }}
            onFocus={() => setIsDraggable(false)}
            onBlur={() => setIsDraggable(true)}
            style={{
              width: "100%",
              height: "100%",
              background: "transparent",
              color: "yellow",
              resize: "none",
              outline: "none",
              border: "none",
            }}
          ></textarea>
        </Box>
      </motion.div>
    </>

    // return <>
    //     <Box
    //     onClick={() => setIsNotesVisible(true)}
    //     position={"fixed"}
    //     sx={{ cursor: "pointer" }}
    //     bottom={"0"}
    //     right={"0"}
    //     width={"200px"}
    //     height={"50px"}
    //     bgcolor={"rgb(230,185,5)"}
    //     display={!isNotesVisible ? "flex" : "none"}
    //     justifyContent={"space-between"}
    //     alignItems={"center"}
    //     p={"0 0 0 20px"}
    //     zIndex={200}
    //   >
    //     <Typography fontWeight={"bold"}>Notes</Typography>
    //     <Box display={"flex"}>
    //       <IconButton
    //         sx={{
    //           display: "flex",
    //           justifyContent: "center",
    //           alignItems: "center",
    //         }}
    //       >
    //         <AspectRatio />
    //       </IconButton>
    //     </Box>
    //   </Box>
    //   <motion.div
    //     dragConstraints={{
    //       left: 0,
    //       right: window.innerWidth - 500,
    //       top: 0,
    //       bottom: window.innerHeight - 300,
    //     }}
    //     drag={isDraggable}
    //     style={{
    //       resize: "both",
    //       overflow: "hidden",
    //       outline: isDraggable ? "none" : "3px solid red",
    //       width: "300px",
    //       height: "250px",
    //       background: "rgb(30,30,30)",
    //       position: "fixed",
    //       display: isNotesVisible ? "flex" : "none",
    //       flexDirection: "column",
    //       zIndex: 200,
    //     }}
    //   >
    //     <Box
    //       sx={{ cursor: isDraggable ? "move" : "default" }}
    //       height={"20%"}
    //       bgcolor={"rgb(230,185,5)"}
    //       display={"flex"}
    //       justifyContent={"space-between"}
    //       alignItems={"center"}
    //       p={"0 0 0 20px"}
    //     >
    //       <Box
    //         display={"flex"}
    //         justifyContent={"space-between"}
    //         alignItems={"center"}
    //       >
    //         <Typography fontWeight={"bold"}>Notes</Typography>
    //         &nbsp;&nbsp;&nbsp;
    //         <Box>
    //           <Typography
    //             variant="subtitle2"
    //             fontSize={"10px"}
    //             fontWeight={"bold"}
    //           >
    //             Last Updated:
    //           </Typography>
    //           <Typography
    //             variant="subtitle2"
    //             fontSize={"10px"}
    //             fontWeight={"bold"}
    //           >
    //             {notes.date}
    //             &nbsp;&nbsp;
    //             {notes.time}
    //           </Typography>
    //         </Box>
    //       </Box>
    //       <Box display={"flex"}>
    //         <IconButton
    //           disabled={isSaveDisabled}
    //           onClick={() => {
    //             setIsSaveDisabled(true);
    //             // axios.patch(apiLink + "leads/" + leadId, {
    //             //   notes,
    //             // });
    //           }}
    //           sx={{
    //             display: "flex",
    //             justifyContent: "center",
    //             alignItems: "center",
    //           }}
    //         >
    //           <Save />
    //         </IconButton>
    //         <IconButton
    //           onClick={() => setIsNotesVisible(false)}
    //           sx={{
    //             display: "flex",
    //             justifyContent: "center",
    //             alignItems: "center",
    //           }}
    //         >
    //           <RemoveCircleOutline />
    //         </IconButton>
    //       </Box>
    //     </Box>

    //     <Box height={"70%"} padding={"20px"} color={"rgb(230,185,5)"}>
    //       <textarea
    //         className="textArea"
    //         value={notes.note}
    //         onChange={({ target }) => {
    //           if (isSaveDisabled == true) {
    //             setIsSaveDisabled(false);
    //           }
    //           setNotes({
    //             ...notes,
    //             note: target.value,
    //             date: getCurrentDate(),
    //             time: getCurrentTime(),
    //           });
    //         }}
    //         onFocus={() => setIsDraggable(false)}
    //         onBlur={() => setIsDraggable(true)}
    //         style={{
    //           width: "100%",
    //           height: "100%",
    //           background: "transparent",
    //           color: "yellow",
    //           resize: "none",
    //           outline: "none",
    //           border: "none",
    //         }}
    //       ></textarea>
    //     </Box>
    //   </motion.div>
    // </>
}