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
import { getMessagesDate } from "../../utils/services/dateService";

let socket;

/**
 *  message = {
 *  "senderId": "1289df60-06e9-4ad1-aa24-655490004565",
 *   "recipientId": "08f02f9c-a558-41f0-80da-5918bcb2f1ac",
 *  "createdOn": "2022-08-29T11:32:14.7227312",
 *   "body": "asd"
 *  }
 *
 * Gets collestions of messages and returns Map with messages.
 * Map -> (key: sliced datetime, vlaue: array of messages on this date);
 *
 * @param {array of message object} messages
 * @returns {new Map() of messages}
 **/

const divideMessagesByDate = (messages) => {
  const messagesMap = new Map();

  messages.forEach((current, index) => {
    const key = current.createdOn.slice(0, current.createdOn.indexOf("T"));
    if (messagesMap.get(key)) {
      messagesMap.get(key).push(current);
    } else {
      messagesMap.set(key, [current]);
    }
  });
  return messagesMap;
};

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
      setConversation({
        id: res.data.id,
        messages: divideMessagesByDate(res.data.messages),
      });

      //Configure and open socket conntection in specific channel
      const url = `${API_URL_SOCKET}/messages/${res.data.id}`;
      socket = new WebSocket(url);

      //Listen for new messages
      listen();
    });

    return () => {
      //close socket on component unmount (when we left the chat page)
      socket.close();
    };
  }, []);

  const listen = () => {
    socket.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      newMessage.createdOn = new Date();
      const key = new Date().toISOString().slice(0, 10);
      setConversation((prev) => {
        if (prev.messages.get(key)) {
          prev.messages.get(key).push(newMessage);
        } else {
          prev.messages.set(key, newMessage);
        }
        return {
          id: prev.id,
          messages: prev.messages,
        };
      });
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

  /**
   * Builds array of message and span elements.
   * @returns {array of message or span (with message's datetime) elements}
   */
  const buildMessages = () => {
    const result = [];

    conversation.messages.forEach((value, key) => {
      result.push(
        <span className={styles["messages-date"]}>
          <p>{getMessagesDate(new Date(key))}</p>
        </span>
      );

      value.forEach((message) => {
        if (message.senderId === userId) {
          result.push(
            <Message
              profilePicture={currentUserProfilePictureUrl}
              message={message}
              type="right"
            />
          );
        } else {
          result.push(
            <Message
              profilePicture={targetUser.profilePicture}
              message={message}
              type="left"
            />
          );
        }
      });
    });
    return result;
  };

  const messages = conversation && buildMessages();

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
