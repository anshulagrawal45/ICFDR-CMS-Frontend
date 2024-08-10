import { Box, IconButton, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../Context";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import { Refresh } from "@mui/icons-material";
import { uid } from "uid";

export default function IndividualChats({
  isIndividualChatOpen,
  data,
  socket,
  eachPersonUnreadCount,
  setEachPersonUnreadCount,
  setIsIndividualChatOpen,
}) {
  const [open, setOpen] = useState(false);
  const currentDate = () => {
    return new Date().toLocaleDateString("en-GB");
  };
  const currentTime = () => {
    return new Date().toLocaleTimeString();
  };
  const { apiLink, userID, chats, setChats, setIsChatSelected, axios } =
    useContext(Context);
  let [message, setMessage] = useState({
    from: userID,
    to: data.userID,
    body: "",
    date: "",
    time: "",
  });

  async function RefreshChats() {
    let temp = await axios.get(`${apiLink}chats/${userID}`);
    setChats(temp.data);
  }

  async function sendMessage() {
    let temp = {
      _id: uid(24),
      ...message,
      from: userID,
      date: currentDate(),
      time: currentTime(),
      read: false,
    };
    try {
      socket.emit("sendMessage", temp);
      axios.post(`${apiLink}chats`, temp);
      setChats((prevChats) => [...prevChats, temp]);
      setMessage({ ...message, body: "", time: "", date: "", read: false });
    } catch (error) {
      // Handle the error here
      console.log(error);
    }
  }

  const chatWindowRef = useRef(null);
  useEffect(() => {
    if (!chatWindowRef.current) return;
    // Scroll to the bottom of the chat window when it opens or a new chat appears
    if (open || chats.length > 0) {
      chatWindowRef.current.scrollTop = chatWindowRef?.current?.scrollHeight;
    }
  }, [open, chats]);

  return (
    <Box
      sx={{
        bgcolor: open
          ? "#f1f1f1"
          : eachPersonUnreadCount[data.userID]?.length != 0
          ? "lightgreen"
          : "white",
        cursor: "pointer",
        "&:hover": {
          bgcolor:
            eachPersonUnreadCount[data.userID]?.length != 0
              ? "lightgreen"
              : "#f1f1f1",
        },
      }}
      p={"0 20px"}
      display={"flex"}
      alignItems={"center"}
      boxShadow={
        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"
      }
      width={"100%"}
      height={"50px"}
      onClick={() => {
        setIsIndividualChatOpen(data.userID);
        setOpen(true);
        let tempEachPersonUnreadCount = { ...eachPersonUnreadCount };
        for (let i of tempEachPersonUnreadCount[data.userID]) {
          axios.patch(`${apiLink}chats/${i}`, { read: true });
        }
        tempEachPersonUnreadCount[data.userID] = [];
        setEachPersonUnreadCount(tempEachPersonUnreadCount);
        setIsChatSelected(true);
      }}
    >
      <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
        <Typography>{data.name}</Typography>
        <Box>
          {eachPersonUnreadCount[data.userID]?.length == 0
            ? ""
            : eachPersonUnreadCount[data.userID]?.length}
        </Box>
      </Box>
      {isIndividualChatOpen == data.userID && (
        <Box
          onClick={(e) => e.stopPropagation()}
          sx={{ cursor: "default" }}
          boxShadow={
            "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"
          }
          width={"100%"}
          height={"100%"}
          zIndex={999}
          position={"absolute"}
          top={0}
          left={0}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          bgcolor={"rgb(0, 144, 135)"}
          p={"10px"}
          gap={"10px"}
        >
          <Box
          borderRadius={"10px"}
            width={"100%"}
            height={"50px"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            bgcolor={"#f1f1f1"}
            pl={"20px"}
            pr={"10px"}
          >
            <Typography fontWeight={"bolder"}>{data.name}</Typography>
            <IconButton onClick={RefreshChats}>
              <Refresh />
            </IconButton>
            <IconButton
              onClick={(e) => {
                setOpen(false);
                setIsChatSelected(false);
                setIsIndividualChatOpen("");
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Box
            ref={chatWindowRef}
            width={"100%"}
            height={"calc( 100% - 100px )"}
            sx={{ overflowY: "scroll" }}
            display={"flex"}
            flexDirection={"column"}
            gap={"5px"}
          >
            {chats.map((el, i) => {
              if (el.from == userID && el.to == data.userID) {
                return <SentMessage key={i} text={el.body} time={el.time} />;
              } else if (el.from == data.userID && el.to == userID) {
                return (
                  <RecievedMessage key={i} text={el.body} time={el.time} />
                );
              }
            })}
          </Box>
          <Box
            width={"100%"}
            height={"50px"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <TextField
              value={message.body}
              multiline
              onChange={(e) => {
                setMessage({ ...message, body: e.target.value });
              }}
              placeholder="Write Your Message"
              sx={{ width: "80%",bgcolor:"white",borderRadius:"10px" }}

            />
            <IconButton
              onClick={sendMessage}
              sx={{
                bgcolor: "lightgreen",
                height: "50px",
                width: "50px",
                "&:hover": { color: "white", bgcolor: "green" },
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      )}
    </Box>
  );
}

function SentMessage({ text, time }) {
  return (
    <Box
      display={"flex"}
      justifyContent={"flex-start"}
      sx={{ wordWrap: "break-word" }}
      borderRadius={"10px"}
      minWidth={"100px"}
      width={"fit-content"}
      position={"relative"}
      bgcolor={"lightgreen"}
      flexDirection={"column"}
      alignSelf={"flex-end"}
      gap={"10px"}
      mr={"5px"}
      p={"5px 5px 20px 5px"}
    >
      <Typography>{text}</Typography>
      <Typography
        fontSize={"10px"}
        position={"absolute"}
        bottom={"0"}
        right={"10px"}
      >
        {time}
      </Typography>
    </Box>
  );
}
function RecievedMessage({ text, time }) {
  return (
    <Box
      display={"flex"}
      justifyContent={"flex-start"}
      sx={{ wordWrap: "break-word" }}
      borderRadius={"10px"}
      minWidth={"100px"}
      width={"fit-content"}
      position={"relative"}
      bgcolor={"lightblue"}
      flexDirection={"column"}
      alignSelf={"flex-start"}
      gap={"10px"}
      p={"5px 5px 20px 5px"}
    >
      <Typography>{text}</Typography>
      <Typography
        fontSize={"10px"}
        position={"absolute"}
        bottom={"0"}
        right={"10px"}
      >
        {time}
      </Typography>
    </Box>
  );
}
