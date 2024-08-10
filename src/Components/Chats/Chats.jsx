import { Chat } from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box, IconButton } from "@mui/material";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";
import { Context } from "../../Context";
import NotiChat from "../../Whatsapp.mp3";
import Noti from "../../notification.mp3";
import IndividualChats from "./IndividualChats";
const Chats = () => {
  const [open, setOpen] = useState(false);
  const [eachPersonUnreadCount, setEachPersonUnreadCount] = useState(null);
  const [isIndividualChatOpen, setIsIndividualChatOpen] = useState("");
  let notification = new Audio(Noti);
  const chatsRef = useRef(null);
  let chatNoti = new Audio(NotiChat);
  const {
    apiLink,
    userID,
    isAdmin,
    selected,
    setSelected,
    profiles,
    setProfiles,
    chats,
    setChats,
    axios,
  } = useContext(Context);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatsRef.current && !chatsRef.current.contains(event.target)) {
        // Clicked outside the component, close it
        setSelected(false)
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

  var socket = useMemo(() => io(apiLink), []);
  useEffect(() => {
    if (!userID) return;
    (async () => {
      let { data } = await axios.get(`${apiLink}chats/${userID}`);
      setChats(data);
    })();
  }, [userID, open]);
  useEffect(() => {
    axios.get(apiLink + "users").then((res) => {
      let { data } = res;
      let temp = [];
      for (let i of data.data) {
        if (i._id === userID) continue;
        if (isAdmin) {
          if (i.role === "Leader" || i.role === "Admin" || i.isAdmin) {
            temp.push({
              name: i.name,
              userID: i._id,
              email: i.email,
            });
          }
        }
        if (!isAdmin) {
          if (i.isAdmin) {
            temp.push({
              name: i.name,
              userID: i._id,
              email: i.email,
            });
          }
        }
      }

      setProfiles(temp);
    });
  }, [apiLink, isAdmin, userID]);

  useEffect(() => {
    if (chats.length == 0) return;
    if (profiles.length == 0) return;
    let obj = {};
    for (let profile of profiles) {
      obj[profile.userID] = [];
    }
    for (let chat of chats) {
      if (chat.read == false) {
        if (obj[chat.from]) {
          obj[chat.from] = [...obj[chat.from], chat._id];
        }
      }
    }

    setEachPersonUnreadCount(obj);
  }, [profiles]);

  useEffect(() => {
    const recieveMessage = (message) => {
      if (message.to === userID) {
        if (isIndividualChatOpen) {
          chatNoti.play();
          axios.patch(`${apiLink}chats/${message._id}`, { read: true });
        } else {
          notification.play();
          let tempEachPersonUnreadCount = { ...eachPersonUnreadCount };
          tempEachPersonUnreadCount[message.from] = [
            ...tempEachPersonUnreadCount[message.from],
            message._id,
          ];
          setEachPersonUnreadCount(tempEachPersonUnreadCount);
        }

        setChats((prevChats) => [...prevChats, message]);
      }
    };

    socket.on("recieveMessage", recieveMessage);

    return () => {
      socket.off("recieveMessage", recieveMessage);
    };
  }, [open, isIndividualChatOpen]);

  useEffect(() => {
    if (open) {
      socket.connect();
    }

    if (!open) {
      socket?.disconnect();
    }

    return () => {
      socket?.disconnect();
    };
  }, [open]);

  // useEffect(() => {
  //     console.log(eachPersonUnreadCount)
  // }, [eachPersonUnreadCount])

  // useEffect(()=>{
  //     console.log(isIndividualChatOpen)
  // },[isIndividualChatOpen])

  return !userID ? null : (
    <Box
    ref={chatsRef}
      boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
      zIndex={999}
      position={"fixed"}
      bgcolor={"white"}
      bottom={10}
      right={50}
      width={open ? "280px" : "fit-content"}
      sx={{ transition: ".4s" }}
      borderRadius={!open ? "50%" : "0"}
      overflow={open&& !isIndividualChatOpen?"scroll":"hidden"}
      height={open ? "70vh" : "50px"}
    >
      <Box
        sx={{ cursor: "pointer" }}
        onClick={() => setOpen(!open)}
        p={"0 10px"}
        justifyContent={"space-between"}
        width={"100%"}
        bgcolor={"rgb(144, 238, 144)"}
        height={"50px"}
        display={"flex"}
        alignItems={"center"}
      >
        {/* <Typography fontWeight={"bold"}>Chats</Typography> */}
        <IconButton
          sx={{ width: "fit-content" }}
          onClick={() => {
            setOpen(true);
            setSelected(true);
          }}
        >
          <Chat />
        </IconButton>
        {open ? (
          <IconButton
            onClick={() => {
              setOpen(false);
              setSelected(false);
            }}
          >
            {<KeyboardArrowDownIcon />}
          </IconButton>
        ) : null}
      </Box>

      <Box
        width={"100%"}
        height={open ? "500px" : "100%"}
        p={"10px"}
        display={"flex"}
        flexDirection={"column"}
        gap={"5px"}
        onClick={() => setOpen(true)}
        
      >
        {eachPersonUnreadCount &&
          profiles
            .sort((a, b) => {
              return (
                eachPersonUnreadCount[b.userID]?.length -
                eachPersonUnreadCount[a.userID]?.length
              );
            })
            .map(
              (item) =>
                open && (
                  <IndividualChats
                    isIndividualChatOpen={isIndividualChatOpen}
                    setIsIndividualChatOpen={setIsIndividualChatOpen}
                    eachPersonUnreadCount={eachPersonUnreadCount}
                    setEachPersonUnreadCount={setEachPersonUnreadCount}
                    socket={socket}
                    chats={chats.filter(
                      (el) => el.from == item.userID || el.to == item.userID
                    )}
                    key={item.email}
                    data={item}
                    selected={selected}
                    setSelected={setSelected}
                  />
                )
            )}
      </Box>
    </Box>
  );
};

export default Chats;
