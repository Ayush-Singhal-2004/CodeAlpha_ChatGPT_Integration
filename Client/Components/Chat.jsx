import { useState, useEffect } from "react";
// import SideBar from "./SideBar";
import Messages from "./Messages";

import { io } from "socket.io-client"
import useMessages from "../context/MessageContext";

const socket = io("http://localhost:8000")

function Chat()
{
    const [prompt, setPrompt] = useState("");
    const [isInput, setIsInput] = useState(false);
    const [output, setOutput] = useState("");

    const messages = useMessages();

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Client Connected");
        })
    });

    useEffect(() => {
        socket.on("response", (res) => {
            messages.messages.push({
                from: "gpt",
                message: res.result
            });
            setOutput(res.result);
        });
    }, []);

    const handleClick = () => {
        socket.emit("chatgpt-interaction" , prompt)
        setPrompt("");
        setIsInput(true);
        messages.messages.push({
            from: "user",
            message: prompt
        });
    };

    return (
        <div className="container">
            {/* <SideBar /> */}
            <div className="main">
                <div className="head">
                    <h3>ChatGPT</h3>
                </div>
                <div className="content">
                    {
                        isInput ? 
                        <Messages />
                        : 
                        <div className="hero-section">
                            <img src="https://static.vecteezy.com/system/resources/previews/021/059/827/non_2x/chatgpt-logo-chat-gpt-icon-on-white-background-free-vector.jpg" alt="" />
                            <h2>How can I help you today?</h2>
                        </div>
                    }
                    <div className="input">
                        <input type="text" placeholder="Message ChatGPT..." value={prompt} onChange={e => setPrompt(e.target.value)}/>
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" 
                        className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16" 
                        fill={prompt.length > 0 ? "white" : "#333333"} 
                        onClick={prompt.length > 0 ? handleClick : ()=>{}}
                        style={prompt.length > 0 ? {cursor:"pointer"} : {}}
                        >
                        <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}   

export default Chat;