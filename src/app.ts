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

app.command('joke', async ({ say, ack }) => {
  await ack()
  const jokeText = await fetchJoke()
  await say(jokeText.attachments[0].text)
})

export const sendDailyJoke = async (): Promise<void> => {
  const attachments = (await fetchJoke()).attachments
  attachments.map((attachment) => (attachment.footer = 'Daily Joke'))
  app.client.chat.postMessage({
    channel: <string>process.env.CHANNEL,
    attachments
  })
}

export const fetchJoke = async (): Promise<Joke> => {
  return <Joke>(await axios.get('https://icanhazdadjoke.com/slack')).data
}
