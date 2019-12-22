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

exports.getAllMessages = getAllMessages