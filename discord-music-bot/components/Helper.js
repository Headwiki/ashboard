// Source: https://stackoverflow.com/questions/55153125/fetch-more-than-100-messages

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
async function getYoutubeTitle(message) {
    const youtubeRegex = /http(?:s)?:\/\/(?:www\.)?youtube.*watch\?v=([a-zA-Z0-9\-_]+)/
      let matches = youtubeRegex.exec(message.content)
      if (matches) {
        request(`https://www.googleapis.com/youtube/v3/videos?key=${process.env.YOUTUBE_API_KEY}&part=snippet&id=${matches[1]}`, (err, res, body) => {
          if (!err && res.statusCode == 200) {
            return JSON.parse(body).items[0].snippet.title // Title
          }
        })
      }
}

exports.getAllMessages = getAllMessages
exports.getYoutubeTitle = getYoutubeTitle