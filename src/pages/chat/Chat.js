import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/button/Button";
import styles from "./chat.module.css";
import { getConversation } from "../../utils/services/conversationService";
import { API_URL_SOCKET } from "../../utils/environment";
import { tokenStorage } from "../../utils/services/storageService";
import { getUserById } from "../../utils/services/usersService";
import UserContext from "../../context/user-context";
import Message from "./Message";

let socket;

const Chat = () => {
  const messageInput = useRef();

  //The user with whom the chat is opened
  const targetUserId = useParams().id;
  const [targetUser, setTargetUser] = useState("");

  //Current logged user that will open the chat
  const userId = tokenStorage.decodeToken().nameid;
  const currentUserProfilePictureUrl =
    useContext(UserContext)[0].profilePictureUrl;

  //Data related to conversation (id, messages ...)
  const [conversation, setConversation] = useState("");

  //chat body ref
  const chatMain = useRef();

  // We use this function when a new message arrives
  const scrollToBottom = () => {
    chatMain.current.scroll({
      top: chatMain.current.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    getUserById(targetUserId).then((res) => {
      setTargetUser(res.data);
    });

    getConversation(userId, targetUserId).then((res) => {
      setConversation(res.data);

      //Configure and open socket conntection in specific channel
      const url = `${API_URL_SOCKET}/messages/${res.data.id}`;
      socket = new WebSocket(url);

      //Listen for new messages
      listen();
    });
  }, []);

  const listen = () => {
    socket.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      setConversation((prev) => ({
        ...prev,
        messages: [...prev.messages, { ...newMessage, createdOn: new Date() }],
      }));
      scrollToBottom();
    };
  };

  const handleSendMessage = () => {
    if (messageInput.current.value !== "") {
      const msg = {
        conversationId: conversation.id,
        senderId: userId,
        recipientId: targetUserId,
        body: messageInput.current.value,
      };

      socket.send(JSON.stringify(msg));
      messageInput.current.value = "";
      return;
    }
  };

  const messages =
    conversation.messages &&
    conversation.messages.map((message) => {
      if (message.senderId === userId) {
        return (
          <Message
            profilePicture={currentUserProfilePictureUrl}
            message={message}
            type="right"
          />
        );
      }
      return (
        <Message
          profilePicture={targetUser.profilePicture}
          message={message}
          type="left"
        />
      );
    });

  //Profile picture that will be diplsayed on the chatbox header
  const targetProfilePicture = targetUser.profilePicture
    ? targetUser.profilePicture
    : "/user-icon.svg";

  return (
    <div className={styles["chat"]}>
      <section className={styles["chat-box"]}>
        <header className={styles["chat-header"]}>
          <img
            className={styles["msg-img"]}
            src={targetProfilePicture}
            alt="User profile"
          />
          <h5 className={styles["user-name"]}>{targetUser.email}</h5>
        </header>
        <main ref={chatMain} className={styles["chat-main"]}>
          <div className={styles["chat-box-messages"]}>{messages}</div>
        </main>
        <footer className={styles["chat-footer"]}>
          <input
            id="messaeg-input"
            ref={messageInput}
            className={styles["message-input"]}
            placeholder="Type your message.."
          ></input>
          <Button
            onClick={handleSendMessage}
            buttonStyle="btn-secondary"
            buttonSize="btn-small"
          >
            Send
          </Button>
        </footer>
      </section>
    </div>
  );
};
export default Chat;
