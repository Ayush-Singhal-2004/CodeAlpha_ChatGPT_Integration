import axios from "axios";
import "dotenv/config"

async function ChatGptPrompt(prompt) 
{
    const options = {
        method: 'POST',
        url: 'https://chatgpt-42.p.rapidapi.com/conversationgpt4',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': process.env.API_KEY,
            'X-RapidAPI-Host': 'chatgpt-42.p.rapidapi.com'
        },
        data: {
            messages: [
                {
                    role: 'user',
                    content: prompt
                }
            ],
            system_prompt: '',
            temperature: 0.9,
            top_k: 5,
            top_p: 0.9,
            max_tokens: 256,
            web_access: false
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
        return response.data;
    } 
    catch (error) {
        console.error(error);
    }
}

export default ChatGptPrompt;