require('dotenv').config()
const Helper = require('./components/Helper')  // Helper functions
const Discord = require('discord.js')
const client = new Discord.Client()


client.on('ready', async () => {

  // Get channel by id
  let musicChannel = await client.channels.get(process.env.MUSIC_CHANNEL)

  // Get all chat history
  let allMessages = await Helper.getAllMessages(musicChannel);

  console.log(allMessages.length)
})



/* client.on('message', async message => {
 
} */

client.login(process.env.BOT_SECRET_TOKEN)