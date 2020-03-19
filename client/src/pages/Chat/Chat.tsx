import React from "react";
import { useHistory } from "react-router-dom";
import { Icon } from "antd";
import { useDispatch } from "react-redux";
import socketIOClient from "socket.io-client";
import moment from "moment";
import { cloudinaryFetchUrl } from "../../helpers";
import { reduxGetCourse } from "./../../features/Courses/CourseSlice";
import "./Chat.css";
const socket: SocketIOClient.Socket = socketIOClient("/8080");

export const Chat = () => {
  const dispatch = useDispatch();

  const history: any = useHistory();
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState<any>([]);
  React.useEffect(() => {
    const onLoad = async () => {
      const course: any = await dispatch(
        reduxGetCourse(history.location.state.courseId)
      );
      if (course.courseChat.length > 0) {
        setMessages(course.courseChat);
      }
    };

    socket.emit("Join", { room: history.location.state.courseId });
    socket.on(history.location.state.courseId, (m: any) => {
      setMessages((prevMessages: any) => [...prevMessages, m.msg]);
    });

    onLoad();

    return () => {
      socket.disconnect();
    };
  }, [dispatch, history]);

  const hanleSearchChange = (e: any) => {
    setMessage(e.target.value);
  };

  const pushSendMessage = () => {
    let userId =
      history.location.state.studentId || history.location.state.proffesorId;
    let courseId = history.location.state.courseId;
    let userName = history.location.state.name;
    let publicId = history.location.state.publicId;
    let time = moment(new Date()).format("HH:mm");

    let type = "text";
    socket.emit(history.location.state.courseId, {
      message,
      userId,
      userName,
      courseId,
      time,
      publicId,
      type
    });

    setMessage("");
  };
  return (
    <div className="chat__wrapper">
      <h2> Real Time Chat</h2>

      <div className="messages__container">
        {messages &&
          messages.length > 0 &&
          messages.map((m: any, index: any) => (
            <div key={index}>
              {m.time + " "}
              <img
                className="student__profile__modal"
                src={`${cloudinaryFetchUrl}/${m.publicId}`}
                alt="profile"
              />
              {" " + m.message}
            </div>
          ))}
      </div>
      <div className="chat__container">
        <input
          type="text"
          placeholder="Let's start talking"
          value={message}
          onChange={hanleSearchChange}
          onKeyDown={(e: any) => {
            if (e.key === "Enter") {
              e.preventDefault();
              pushSendMessage();
            }
          }}
        />
        <button className="btn btn-primary" onClick={pushSendMessage}>
          {" "}
          <Icon type="enter" />
        </button>
      </div>
    </div>
  );
};
