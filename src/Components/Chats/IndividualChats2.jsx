import { Send } from "@mui/icons-material"
import s from "./IndividualChats2.module.css"
import { useContext } from "react";
import { Context } from "../../Context";
export default function IndividualChats2({
    isIndividualChatOpen,
    data,
    socket,
    eachPersonUnreadCount,
    setEachPersonUnreadCount,
    setIsIndividualChatOpen,
  }){
    const { apiLink, userID, chats, setChats, setIsChatSelected, axios } =
    useContext(Context);
    return <div className={s["container"]}>
    <div className={s["nav-bar"]}>
        <a>Chat</a>
      <div className={s["close"]}>
           <div className={s["line one"]}></div>
           <div className={s["line two"]}></div>
      </div>
    </div>
    <div className={s["messages-area"]}>
    {/* {chats.map((el, i) => {
              if (el.from == userID && el.to == data.userID) {
                return <div className={s["message one"]}>{el.body}</div>
              } else if (el.from == data.userID && el.to == userID) {
                  return <div className={s["message two"]}>{el.body}</div>
              }
            })} */}
      <div className={s["message one"]}></div>
      <div className={s["message two"]}></div>
      <div className={s["message three"]}></div>
      <div className={s["message four"]}></div>
      <div className={s["message five"]}></div>
      <div className={s["message six"]}></div>
    </div>
    <div className={s["sender-area"]}>
      <div className={s["input-place"]}>
          <input placeholder="Send a message." className={s["send-input"]} type="text" />
          <div className={s["send"]}>
              <Send />
          </div>
        </div>
    </div>
  <div></div></div>
}