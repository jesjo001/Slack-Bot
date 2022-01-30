import { RTMClient } from  '@slack/rtm-api';
import { WebClient } from '@slack/web-api';

import 'dotenv/config'

const token = process.env.BOT_TOKEN;

const rtm = new RTMClient(process.env.BOT_TOKEN);
const web = new WebClient(process.env.BOT_TOKEN);

rtm.start().catch(console.error)

rtm.on('ready', async() =>{
    console.log("Bot started")
    const response = await sendMEssage(`${process.env.BOT_TESTING_CHANNEL}`, `Bot version ${process.env.BOT_VERSION} is online`)
    console.log(response)
}); 


rtm.on('slack_event', async (eventType, event) => {
    if(event && event.type === 'message'){
        if (event.text === "!hello"){
            hello(event.channel, event.user)
        }
    }
})


const sendMEssage = async( channel, message) =>{

    try {
        const response = await web.chat.postMessage({
            channel: channel,
            text: message
        })
        return response.ok 
    } catch (error) {
        console.log(error)
    }

}

const hello =(channelId, userId)=>{
    sendMEssage(channelId, `!Heya <@${userId}>`)
}