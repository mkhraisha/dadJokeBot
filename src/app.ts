import { App, ExpressReceiver } from '@slack/bolt'
import axios from 'axios'
import * as dotenv from 'dotenv'
dotenv.config()

interface Joke {
  attachments: [
    {
      fallback: string
      footer: string
      text: string
    }
  ]
}

const expressReceiver = new ExpressReceiver({
  signingSecret: <string>process.env.SIGNING_SECRET,
  processBeforeResponse: true
})

export const app = new App({
  token: process.env.BOT_TOKEN,
  receiver: expressReceiver
})

app.message('hi', async ({ say, message }) => {
  const jokeText = await fetchJoke()
  console.log(message.channel)
  await say(jokeText.attachments[0].text)
})

app.command('joke', async ({ say, command }) => {
  const jokeText = await fetchJoke()
  console.log(command.channel)
  await say(jokeText.attachments[0].text)
})

export const sendDailyJoke = async (): Promise<void> => {
  app.client.chat.postMessage({
    channel: '#dadjokebottest',
    text: (await fetchJoke()).attachments[0].text
  })
}

export const fetchJoke = async (): Promise<Joke> => {
  return <Joke>(await axios.get('https://icanhazdadjoke.com/slack')).data
}
