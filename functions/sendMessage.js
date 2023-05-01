const client = require('../server.js').client;
const Discord = require('discord.js');
const {Client, Intents, MessageEmbed, MessageActionRow, MessageButton} = Discord;

module.exports = {
  sendChannel: async function (content, cc, color, limited, icon, row) {
  
    let log = client.channels.cache.get(cc) || client.channels.cache.find(channel => channel.name.includes(cc));
    let message = null
    
    let embed = new MessageEmbed()
    .setDescription(content)
    .setColor(color)
    
    if (icon && icon !== false) {
      embed = new MessageEmbed(embed)
        .setThumbnail(icon)
    }
    if (row) {
      let newRow = new MessageActionRow()
      for (let i in row) {
        newRow = new MessageActionRow(newRow)
        .addComponents(row[i]);
      }
      await log.send({ embeds: [embed], components: [newRow] }).then((msg) => {
        message = msg
      });
    }
    else {
      await log.send({ embeds: [embed]}).then((msg) => {
        message = msg
      });
    }
    
    if (limited && limited === true) {
      setTimeout(function() { message.delete() }, 20000)
    }
    return message;
},
  sendUser: async function (content, user, color, limited, icon, row) {
    
    let log = await client.users.fetch(user).catch(console.error);
    let message = null
    
    let embed = new MessageEmbed()
    .setDescription(content)
    .setColor(color)
    
    if (icon) {
      embed = new MessageEmbed(embed)
        .setThumbnail(icon)
    } 
    
    if (row) {
      await log.send({ embeds: [embed], components: row }).then((msg) => {
        message = msg
      });
    }
    else {
      await log.send({ embeds: [embed]}).then((msg) => {
        message = msg
      });
    }
    
    if (limited && limited === true) {
      setTimeout(function() { message.delete() }, 20000)
    }
    
    return message;
},
};