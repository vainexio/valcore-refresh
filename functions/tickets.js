const {getPerms, noPerms, client} = require('../server.js');
const Discord = require('discord.js');
const {Client, Intents, MessageEmbed, MessageActionRow, MessageButton} = Discord;

const sendMsg = require('../functions/sendMessage.js')
const sendChannel = sendMsg.sendChannel
const sendUser = sendMsg.sendUser

const settings = require('../storage/settings_.js')
const {shop, emojis, colors, theme, status} = settings

const cmdHandler = require('../functions/commands.js')
const {getTemplate} = cmdHandler

const get = require('../functions/get.js')
const {getRandom, getChannel} = get

module.exports = {
  makeTicket: async function (data){
    const {guild, user, name, category, support, context, ticket} = data
    //var author = message.author;
    let ticketName = ticket+Math.floor(Math.random() * 1000) + 1
    guild.channels.create(ticketName, {
        type: "text", 
      parent: category,
        permissionOverwrites: [
           {
             id:  guild.roles.everyone, 
             deny: ['VIEW_CHANNEL'] 
		   },
          {
             id: user.id, 
             allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
		   },
         {
             id: guild.roles.cache.find(r => r.id === support), 
             allow: ['VIEW_CHANNEL','SEND_MESSAGES','READ_MESSAGE_HISTORY'],
		   },
        ],
    })
      .then(async channel => {

       let embed = new MessageEmbed()
      .setDescription("Welcome **"+name+"**! Any available <@&"+support+"> will assist you soon. Please be patient!\n\n"+context)
      .setColor(colors.red)
      
       let row = await makeRow('close-ticket','Close Ticket','DANGER','🔒')
      let BotMsg = channel.send({ content: "<@"+user.id+"> / <@&"+support+">", embeds: [embed] , components: [row]})
      
  }).catch(console.error);
}
};