const TelegramBot = require('node-telegram-bot-api');

const token = '7687369254:AAGi7yfP8oau8eKgHLA7Oy63SLlGm6uFyHs';
const params = {
  polling: true
}
const bot = new TelegramBot(token, params);

const recipients = [
  { chatId: '987391019', message: 'Твой друг прислал ссылку: ' },
  { chatId: '1091236278', message: 'Привет толина баба лови ссылку: ' }
];

function modifyLink(link) {
  return link.replace('instagram.com', 'ddinstagram.com');
}

function sendModifiedLinkToContacts(modifiedLink) {
  recipients.forEach(recipient => {
    bot.sendMessage(recipient.chatId, `${recipient.message}${modifiedLink}`);
  });
}

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;
  console.log(`Chat ID of the user is: ${chatId}`);

  const instagramLinkRegex = /https:\/\/www.instagram.com\/.+/;
  if (instagramLinkRegex.test(messageText)) {
    const modifiedLink = modifyLink(messageText);

    bot.sendMessage(chatId, `Вот твоя измененная ссылка: ${modifiedLink}`);

    sendModifiedLinkToContacts(modifiedLink);
  } else {
    bot.sendMessage(chatId, 'Пожалуйста, отправь ссылку на Instagram.');
  }
});