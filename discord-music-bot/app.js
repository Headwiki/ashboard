require('dotenv').config()
const Helper = require('./components/Helper')  // Helper functions
const Discord = require('discord.js')
const { request } = require('graphql-request');
const client = new Discord.Client()

const args = process.argv.slice(2);

client.on('ready', async () => {

  // Get channel by id
  const musicChannel = await client.channels.get(process.env.MUSIC_CHANNEL)

  // If parameter "--older" is passed to script get older messages as well
  if (args[0] == "--older") {

    // Get all chat history
    const allMessages = await Helper.getAllMessages(musicChannel);

    console.log(`Got ${allMessages.length} messages!`)

    // Get Youtube info for older messages
    allMessages.forEach(message => {
      Helper.handleYoutube(message)
    })
 
    //Helper.handleYoutube(allMessages[558])
    //console.log(allMessages[560])

    // Finds all users in channels and adds them to users collection in db
    /* Can remove this if user insertion is implemented when song is inserted */
  } else if (args[0] == "--getMembers") {
    const users = musicChannel.members

    users.forEach(async (user) => {
      const query = `mutation{ 
        addUser(discordId: "${user.user.id}", username: "${user.user.username}"){ 
          id
          discordId
          username 
        } 
      }`

      await request('http://localhost:4000/graphql', query)

      console.log(`Added user ${user.user.username} - ${user.user.id}!`);

    })

  }

  console.log("Waiting for new songs...")

  // Awaiting new messages
  client.on('message', async (message) => {
    Helper.handleYoutube(message)
  })
})

client.login(process.env.BOT_SECRET_TOKEN)