
const qrcode = require('qrcode-terminal');

const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const client = new Client({authStrategy : new LocalAuth()});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', async () => {
    console.log('Client is ready!');
    async function sendMediaToContacts() {
        const chats = await client.getChats();
        const contactNames = ["Lunch bot", "Airtel Number"]; // Names of the contacts you want to send messages to
        const contacts = [];
      
        chats.forEach((chat) => {
          if (contactNames.includes(chat.name)) {
            contacts.push(chat);
          }
        });
      
        const mediaUrl = 'https://media.giphy.com/media/QGzPdYCcBbbZm/giphy.gif'; // Replace with the actual URL of your media file
      
        const media = await MessageMedia.fromUrl(mediaUrl); // Create a MessageMedia object from the URL
      
        if(media) {
            contacts.forEach(async (contact) => {
                await client.sendMessage(
                  contact.id._serialized,
                 media
                );
              });
        }
       
      }
      
      sendMediaToContacts();
      
      
      
      
      
      
      
      
});

client.initialize();
