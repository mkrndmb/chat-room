import io from "socket.io-client";
import { useSearchParams, Link, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Input from "./Input";
import "./chat.css";

let socket;

export default function Chat({ name }) {
  // const [params] = useSearchParams()
  // let name  = params.get('name')
  // const [params] = useParams()
  // const [name,setName] = useState('')
  const [message, setMessage] = useState("");
  const [msgs, setMsgs] = useState([]);
  const ENDPOINT = "localhost:5000";
  const r = useRef(0);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    console.log("eff 1st");
    // let namePara = params.get('name')
    socket = io(ENDPOINT);
    socket.emit("join", { name });
    socket.on("err", (err) => {
      alert(err.err + ".. Sign out to rejoin");
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, []);

  useEffect(() => {
    console.log("eff 2nd");

    socket.on("message", (message) => {
      setMsgs((prev) => [...prev, message]);
    });
    scrollToBottom();
    return () => {
      socket.off("message");
    };
  }, [msgs]);

  const sendMessage = (e) => {
    e.preventDefault();

    if (message) {
      console.log("msg:", message);
      socket.emit("sendMessage", { message });
      setMessage("");
    }
  };

  console.log("msgs", msgs);
  // console.log('name',name)

  return (
    <div className="chat">
      {console.log("render", r.current++)}
      <h2 className="room">Chat Room</h2>

      <ul>
        {msgs.map((msg, id) => (
          <li
            key={id}
            className={
              msg.user === name
                ? "self"
                : msg.user === "admin"
                ? "admin"
                : "other"
            }
          >
            {msg.text} -{msg.user}
          </li>
        ))}
        <div ref={messagesEndRef} />
      </ul>

      <hr />
      <div className="inputbox">
        <Input
          message={message}
          sendMessage={sendMessage}
          setMessage={setMessage}
          placeholder='Type message here ..'
        />
        <button className="send" onClick={(e) => sendMessage(e)} type="button">
          Send
        </button>

        <Link
          onClick={() => {
            socket.emit("disconnect");
            socket.off();
          }}
          to={"/"}
        >
          <button className="signout" type="button">
            Sign out
          </button>
        </Link>
      </div>
    </div>
  );
}
