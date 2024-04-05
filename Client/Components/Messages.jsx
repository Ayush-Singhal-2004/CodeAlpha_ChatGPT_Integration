import { useEffect } from "react";
import useMessages from "../context/MessageContext";

function Messages() 
{
    const messages = useMessages().messages;

    return (
        <div className="messages-container">
            {
                messages.map((mssg) => (
                    mssg.from == "user" ? 
                    <div className="message">
                        <div className="message-heading">
                            <img 
                            src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg" alt="" />
                            <p>You</p>
                        </div>
                        <div className="message-content">
                            <p>{mssg.message}</p>
                        </div>
                    </div>
                    : 
                    <div className="message">
                        <div className="message-heading">
                            <img 
                            src="https://static.vecteezy.com/system/resources/previews/021/059/825/non_2x/chatgpt-logo-chat-gpt-icon-on-green-background-free-vector.jpg" alt="" />
                            <p>ChatGPT</p>
                        </div>
                        <div className="message-content">
                            <p>{mssg.message}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Messages;