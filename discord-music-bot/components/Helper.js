// Source: https://stackoverflow.com/questions/55153125/fetch-more-than-100-messages
const fetch = require('node-fetch')
const { request } = require('graphql-request');

async function getAllMessages(channel) {
  console.log("Fetching all messages...");

  const sum_messages = [];
  let last_id;

  while (true) {
    const options = { limit: 100 };
    if (last_id) {
      options.before = last_id;
    }

    const messages = await channel.fetchMessages(options);
    sum_messages.push(...messages.array());
    last_id = messages.last().id;

    if (messages.size != 100) {
      break;
    }
  }
  console.log("Fetched all messages!");

  return sum_messages;
}

// Returns title of youtube link in message
async function getYoutubeInfo(message) {
  const youtubeRegex = /http(?:s)?:\/\/(?:www\.)?youtube.*watch\?v=([a-zA-Z0-9\-_]+)/
  let matches = youtubeRegex.exec(message.content)
  if (matches) {
    const url = `https://www.googleapis.com/youtube/v3/videos?key=${process.env.YOUTUBE_API_KEY}&part=snippet&id=${matches[1]}`
    try {
      const response = await fetch(url);
      const json = await response.json();
      const title = encodeURI(json.items[0].snippet.title) // Encoding to prevent escaping of JSON data
      return JSON.parse(`
        {
          "url": "${matches[0]}",
          "title": "${title}"
        }
      `)
    } catch (error) {
      console.error(error);
      console.log(`Error on message ${message.content}`)
      console.log(`Error on matcher ${matches[0]}`)
      console.log(`Error on title ${title}`)
      console.log(`Error on json ${JSON.stringify(json)}`)
    }
  }
}

async function handleYoutube(message) {
  let ytInfo = await getYoutubeInfo(message)

  // If message contains youtube link/info
  if (ytInfo) {
    try {
      // Fetch objectId from db given discordId
      const getUserQuery = `{ 
        user(discordId: "${message.author.id}"){ 
          id
        } 
      }`

      // Execute query
      let userData = await request('http://localhost:4000/graphql', getUserQuery)

      // Insert new song in db
      const addSongQuery = `mutation{ 
        addSong(title: "${ytInfo.title}", url: "${ytInfo.url}", userId: "${userData.user.id}"){ 
          title
          url
        } 
      }`

      // Execute db insert
      let songData = await request('http://localhost:4000/graphql', addSongQuery)
      console.log(`Added song ${JSON.stringify(songData.addSong.title)}`)
    } catch (error) {
      console.error(error);
    }
  }
}

exports.getAllMessages = getAllMessages
exports.handleYoutube = handleYoutube