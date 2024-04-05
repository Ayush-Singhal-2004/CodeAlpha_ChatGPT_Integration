import { useContext, createContext } from "react";

export const MessageContext = createContext({
    messages: []
});

export const MessageProvider = MessageContext.Provider;

export default function useMessages()
{
    return useContext(MessageContext);
}