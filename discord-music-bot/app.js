require('dotenv').config()
const Helper = require('./components/Helper')  // Helper functions
const Discord = require('discord.js')
const request = require('request');
const client = new Discord.Client()

const args = process.argv.slice(2);

client.on('ready', async () => {

  // Get channel by id
  let musicChannel = await client.channels.get(process.env.MUSIC_CHANNEL)

  // If parameter "--older" is passed to script get older messages as well
  if (args[0] == "--older") {

    // Get all chat history
    let allMessages = await Helper.getAllMessages(musicChannel);

    console.log(`Got ${allMessages.length} messages!`)

    // Get Youtube titles for older messages
    allMessages.forEach(message => {
      console.log(`Found Title: ${Helper.getYoutubeTitle(message)}`)
    })

  } // end of if --older

  console.log("Waiting for new songs...")

  // Awaiting new messages
  client.on('message', async message => {
    console.log(`Found Title: ${Helper.getYoutubeTitle(message)}`)
  })
})


client.login(process.env.BOT_SECRET_TOKEN)