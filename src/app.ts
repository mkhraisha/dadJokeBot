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

app.message('hi', async ({ say }) => {
  const jokeText = await fetchJoke()
  await say(jokeText.attachments[0].text)
})

export const fetchJoke = async (): Promise<Joke> => {
  return <Joke>(await axios.get('https://icanhazdadjoke.com/slack')).data
}
