import React, { useEffect, useRef } from "react";
import { useState } from "react";
import "./chat.scss";
import { userList } from "../../services/BaseGetRes";
import { userDp } from "./userImages";
import { ChatAiSession } from "../../services/BasePostRes";
import { toast } from "react-toastify";

export default function Chat() {
  // const [listAi, setlistAi] = useState([]);
  const [message, setmessage] = useState("");
  const [chatLog, setchatLog] = useState([]);
  const [isnewMsg, setisnewMsg] = useState(false);
  const [isloading, setisloading] = useState(false);
  const [AiModel, setAiModel] = useState("text-davinci-002");
  const [AiModelName, setAiModelName] = useState("Scarlett Johansson");

  const bottomRef = useRef(null);
  const sentMessage = (e) => {
    e.preventDefault();

    if (message.trim() === "") {
      toast.error("Please type a message");
    } else {
      setchatLog([...chatLog, { user: "me", message: `${message}` }]);
      setisnewMsg(true);
    }
  };
  const toBottom = () => {
    bottomRef.current?.scrollTo(0, bottomRef.current?.scrollHeight);
  };

  const getModelName = (id, name) => {
    setAiModel(id);
    setAiModelName(name);
    setchatLog([]);
  };

  useEffect(() => {
    if (isnewMsg) {
      const data = {
        message: chatLog.map((message) => message.message).join(""),
        model: AiModel,
      };
      ChatAiSession(data, setchatLog, chatLog, setisloading);
      setisnewMsg(false);
      setmessage("");
    }
  }, [isnewMsg, AiModel, chatLog, message]);

  useEffect(() => {
    toBottom();
  }, [isloading]);

  const clearChat = () => {
    setchatLog([]);
  };

  return (
    <aside className="container-fluid mainChatConatiner">
      <div className="row mb-3">
        <div className="col-md-12 d-flex flex-row-reverse">
          <button className="clearBtn" onClick={() => clearChat()}>
            Clear Chat
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 p-2 ">
          <div className="chatModelSection">
            {userList?.map((model, index) => (
              <div className="modelView d-flex align-items-center" key={index}>
                <div
                  className="modelimgConatiner"
                  onClick={() => getModelName(model.id, model.name)}
                >
                  <img
                    // src="https://images.unsplash.com/photo-1621317911081-f123294e86c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Z2lybCUyMGFsb25lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                    src={userDp[index]?.image}
                    alt="DP"
                  />
                </div>
                <div
                  className="modeltextConatiner ms-3"
                  onClick={() => getModelName(model.id, model.name)}
                >
                  <section className="d-flex justify-content-between">
                    <h6>{model.name}</h6>
                    <small>9:00</small>
                  </section>
                  <small className="onlineSection">
                    {model.ready ? `Online` : `Offline`}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-8 p-2">
          <div className="chatMessageSection">
            <div className="messageViewSection" ref={bottomRef}>
              <h6 className="p-3">{AiModelName} (chat with AI )</h6>
              {chatLog?.map((message) => (
                <div
                  key={message.message}
                  className={`messageTypeCheck ${
                    message.user === "me" && `senterText`
                  }`}
                >
                  <div className="messageContent p-3">
                    <p>{message.message}</p>
                  </div>
                </div>
              ))}
              {isloading && (
                <div className={`messageTypeCheck `}>
                  <div className="messageContent p-3">
                    <p>Typing...</p>
                  </div>
                </div>
              )}
            </div>
            <form action="" onSubmit={(e) => sentMessage(e)}>
              <div className="d-flex p-3 justify-content-between messageSentSection">
                <input
                  type="text"
                  placeholder="Ask me / Message"
                  value={message}
                  onChange={(e) => setmessage(e.target.value)}
                />

                <button className="p-1 ml-1 Sentbutton">
                  <i className="fa-solid fa-paper-plane"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </aside>
  );
}
