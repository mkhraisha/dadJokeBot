import { app } from './app'

// app.start(parseInt(<string>process.env.PORT) || 3000)
;(async () => {
  await app.start(parseInt(<string>process.env.PORT) || 3000)
  console.log('⚡️ Bolt app is running!')
})()
