import { App, ExpressReceiver } from '@slack/bolt'
import axios from 'axios'
import * as dotenv from 'dotenv'
dotenv.config()

const expressReceiver = new ExpressReceiver({
  signingSecret: <string>process.env.SIGNING_SECRET,
  processBeforeResponse: true
})

const app = new App({
  token: process.env.BOT_TOKEN,
  receiver: expressReceiver
})

app.message('hi', async ({ say }) => {
  const jokeText = await fetchJoke()
  await say(jokeText.attachments[0].text)
})

const fetchJoke = async () => {
  return (await axios.get('https://icanhazdadjoke.com/slack')).data
}

;(async () => {
  await app.start(parseInt(<string>process.env.PORT) || 3000)

  console.log('⚡️ Bolt app is running!')
})()
