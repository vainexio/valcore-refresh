//Glitch Project
const express = require('express');
const https = require('https');
const app = express();
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const moment = require('moment')
const HttpsProxyAgent = require('https-proxy-agent');
const url = require('url');
const discordTranscripts = require('discord-html-transcripts');
//
//Discord
const Discord = require('discord.js');
const {WebhookClient, Permissions, Client, Intents, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu} = Discord; 
//const moment = require('moment');
const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGES);
const client = new Client({ intents: myIntents , partials: ["CHANNEL"] });

//Env
const token = process.env.SECRET;
const open_ai = process.env.OPEN_AI
const mongooseToken = process.env.MONGOOSE;

async function startApp() {
    let promise = client.login(token)
    console.log("Starting...");
    promise.catch(function(error) {
      console.error("Discord bot login | " + error);
      process.exit(1);
      
    });
}
startApp();
let cmd = false

let guildSchema
let guildModel


//When bot is ready
client.on("ready", async () => {
  await mongoose.connect(mongooseToken,{keepAlive: true});
  guildSchema = new mongoose.Schema({
    id: String,
    key: String,
    users: [
      {
        id: String,
        access_token: String,
        refresh_token: String,
      }
    ],
  })
  guildModel = mongoose.model("GuildBackup_Model", guildSchema);

  if (cmd) {
  let discordUrl = "https://discord.com/api/v10/applications/"+client.user.id+"/commands"
  let deleteUrl = "https://discord.com/api/v10/applications/"+client.user.id+"/commands/"
  let json = {
    "name": "register",
    "type": 1,
    "description": "Register your guild",
    "options": [
      {
        "name": 'guild_id',
        "description": 'Your guild ID',
        "type": 3,
        "required": true,
      },
      ],
  }
  
  let headers = {
    "Authorization": "Bot "+token,
    'Content-Type': 'application/json'
  }
  let response = await fetch(discordUrl, {
    method: 'post',
    body: JSON.stringify(json),
    headers: headers
  });
    /*let deleteRes = await fetch(deleteUrl, {
      method: 'delete',
      headers: headers
    })*/
    response = await response.json();
    console.log(response)
}
  console.log('Successfully logged in to discord bot.')
  client.user.setPresence({ status: 'online', activities: [{ name: 'Sloopies', type: "WATCHING" }] });
 // await mongoose.connect(mongooseToken,{keepAlive: true});
})

module.exports = {
  client: client,
  getPerms,
  noPerms,
};

let listener = app.listen(process.env.PORT, function() {
   console.log('Not that it matters but your app is listening on port ' + listener.address().port);
});
/*
░██████╗███████╗████████╗████████╗██╗███╗░░██╗░██████╗░░██████╗
██╔════╝██╔════╝╚══██╔══╝╚══██╔══╝██║████╗░██║██╔════╝░██╔════╝
╚█████╗░█████╗░░░░░██║░░░░░░██║░░░██║██╔██╗██║██║░░██╗░╚█████╗░
░╚═══██╗██╔══╝░░░░░██║░░░░░░██║░░░██║██║╚████║██║░░╚██╗░╚═══██╗
██████╔╝███████╗░░░██║░░░░░░██║░░░██║██║░╚███║╚██████╔╝██████╔╝
╚═════╝░╚══════╝░░░╚═╝░░░░░░╚═╝░░░╚═╝╚═╝░░╚══╝░╚═════╝░╚═════╝░*/
//LOG VARIABLES
var output = "901759430457167872";
const settings = require('./storage/settings_.js')
const {filteredWords, AI, shop, notices, auth, prefix, colors, status, theme, commands, permissions, emojis} = settings
/*
██████╗░███████╗██████╗░███╗░░░███╗░██████╗
██╔══██╗██╔════╝██╔══██╗████╗░████║██╔════╝
██████╔╝█████╗░░██████╔╝██╔████╔██║╚█████╗░
██╔═══╝░██╔══╝░░██╔══██╗██║╚██╔╝██║░╚═══██╗
██║░░░░░███████╗██║░░██║██║░╚═╝░██║██████╔╝
╚═╝░░░░░╚══════╝╚═╝░░╚═╝╚═╝░░░░░╚═╝╚═════╝░*/
async function getPerms(member, level) {
  let highestPerms = null
  let highestLevel = 0
  let sortedPerms = await permissions.sort((a,b) => b.level-a.level)
  for (let i in sortedPerms) {
    if (permissions[i].id === member.id && permissions[i].level >= level) {
      highestLevel < permissions[i].level ? (highestPerms = permissions[i], highestLevel = permissions[i].level) : null
    } else if (member.user && member.roles.cache.some(role => role.id === permissions[i].id) && permissions[i].level >= level) {
      highestLevel < permissions[i].level ? (highestPerms = permissions[i], highestLevel = permissions[i].level) : null
    }
  }
  
  if (highestPerms) return highestPerms;
}
async function guildPerms(message, perms) {
  if (message.member.permissions.has(perms)) {
	return true;
} else {
  let embed = new MessageEmbed()
  .addField('Insufficient Permissions',emojis.x+" You don't have the required server permissions to use this command.\n\n`"+perms.toString().toUpperCase()+"`")
  .setColor(colors.red)
  message.channel.send({embeds: [embed]})
}
}
function noPerms(message) {
  let Embed = new MessageEmbed()
  .setColor(colors.red)
  .setDescription("You lack special permissions to use this command.")
  return Embed;
}
/*
███████╗██╗░░░██╗███╗░░██╗░█████╗░████████╗██╗░█████╗░███╗░░██╗░██████╗
██╔════╝██║░░░██║████╗░██║██╔══██╗╚══██╔══╝██║██╔══██╗████╗░██║██╔════╝
█████╗░░██║░░░██║██╔██╗██║██║░░╚═╝░░░██║░░░██║██║░░██║██╔██╗██║╚█████╗░
██╔══╝░░██║░░░██║██║╚████║██║░░██╗░░░██║░░░██║██║░░██║██║╚████║░╚═══██╗
██║░░░░░╚██████╔╝██║░╚███║╚█████╔╝░░░██║░░░██║╚█████╔╝██║░╚███║██████╔╝
╚═╝░░░░░░╚═════╝░╚═╝░░╚══╝░╚════╝░░░░╚═╝░░░╚═╝░╚════╝░╚═╝░░╚══╝╚═════╝░*/
//Send Messages
const sendMsg = require('./functions/sendMessage.js')
const {sendChannel, sendUser} = sendMsg
//Functions
const get = require('./functions/get.js')
const {getTime, chatAI, getNth, getChannel, getGuild, getUser, getMember, getRandom, getColor} = get
//Command Handler
const cmdHandler = require('./functions/commands.js')
const {checkCommand, isCommand, isMessage, getTemplate} = cmdHandler
//Others
const others = require('./functions/others.js')
const {makeCode, stringJSON, fetchKey, ghostPing, sleep, moderate, getPercentage, getPercentageEmoji, randomTable, scanString, requireArgs, getArgs, makeButton, makeRow} = others
//Roles Handler
const roles = require('./functions/roles.js')
const {getRole, addRole, removeRole, hasRole} = roles
//Tickets Handler
const tickets = require('./functions/tickets.js')
const {makeTicket} = tickets
//const {} = boostbot
/*
░█████╗░██╗░░░░░██╗███████╗███╗░░██╗████████╗  ███╗░░░███╗███████╗░██████╗░██████╗░█████╗░░██████╗░███████╗
██╔══██╗██║░░░░░██║██╔════╝████╗░██║╚══██╔══╝  ████╗░████║██╔════╝██╔════╝██╔════╝██╔══██╗██╔════╝░██╔════╝
██║░░╚═╝██║░░░░░██║█████╗░░██╔██╗██║░░░██║░░░  ██╔████╔██║█████╗░░╚█████╗░╚█████╗░███████║██║░░██╗░█████╗░░
██║░░██╗██║░░░░░██║██╔══╝░░██║╚████║░░░██║░░░  ██║╚██╔╝██║██╔══╝░░░╚═══██╗░╚═══██╗██╔══██║██║░░╚██╗██╔══╝░░
╚█████╔╝███████╗██║███████╗██║░╚███║░░░██║░░░  ██║░╚═╝░██║███████╗██████╔╝██████╔╝██║░░██║╚██████╔╝███████╗
░╚════╝░╚══════╝╚═╝╚══════╝╚═╝░░╚══╝░░░╚═╝░░░  ╚═╝░░░░░╚═╝╚══════╝╚═════╝░╚═════╝░╚═╝░░╚═╝░╚═════╝░╚══════╝*/
//ON CLIENT MESSAGE

client.on("messageCreate", async (message) => {
});//END MESSAGE CREATE
client.on('interactionCreate', async inter => {
  if (inter.isCommand()) {
    let cname = inter.commandName
    //Nitro dropper
    if (cname === 'backup') {
      if (!await getPerms(inter.member,4)) return inter.reply({content: emojis.warning+' Insufficient Permission'});
      let options = inter.options._hoistedOptions
      //
      let user = options.find(a => a.name === 'user')
    }
  }
  
  //BUTTONS
  else if (inter.isButton() || inter.isSelectMenu()) {
    let id = inter.customId
    console.log(id)
    if (id === 'terms') {
      let member = inter.member;
      await addRole(member,['1077462108381388873','1094909481806205009'],inter.message.guild)
      let row = new MessageActionRow().addComponents(
          new MessageButton().setCustomId('claimed').setStyle('SECONDARY').setLabel('Terms Accepted').setDisabled(true).setEmoji(emojis.check),
        );
      inter.update({content: 'Terms Accepted : <@'+inter.user.id+'>', components: [row]})
      let row2 = new MessageActionRow().addComponents(
        new MessageButton().setCustomId('orderFormat').setStyle('SECONDARY').setLabel('Click me').setEmoji('<a:S_arrowright:1095503803761033276>'),
      );
      inter.channel.send({components: [row2]})
      //inter.channel.setName(inter.channel.name.replace('ticket',inter.user.username.replace(/ /g,'')))
    }
    //tickets
    else if (id.startsWith('createTicket-')) {
      let type = id.replace('createTicket-','').replace(/_/g,' ')
      let data = {}
      let foundData = await ticketModel.findOne({id: ticketId})
      let doc = await tixModel.findOne({id: inter.user.id})
      if (foundData) {
        foundData.count++
        await foundData.save()
      }
      if (!doc) {
        let newDoc = new tixModel(tixSchema)
        newDoc.id = inter.user.id
        newDoc.number = foundData.count
        newDoc.tickets = []
        await newDoc.save()
        doc = await tixModel.findOne({id: inter.user.id})
        
      } 
      else if (doc && doc.tickets.length >= 5) {
        await inter.reply({content: `You have exceeded the maximum amount of tickets! (${doc.tickets.length})`, ephemeral: true})
        return;
      }
      let shard = foundData.count >= 1000 ? foundData.count : foundData.count >= 100 ? '0'+foundData.count : foundData.count >= 10 ? '00'+foundData.count : foundData.count >= 0 ? '000'+foundData.count : null
      if (type === 'order') {
        data = {
          doc: doc,
          guild: inter.guild,
          user: inter.user,
          count: foundData.count,
          name: 'Order Ticket',
          category: '1054731483656499290',
          support: '1047454193184682040',
          context: 'Type `.form` to get the order format or use the **click me** button!',
          ticketName: inter.user.username.replace(/ /g,'')+'-'+shard
        }
      }
      else if (type === 'support') {
        data = {
          doc: doc,
          guild: inter.guild,
          user: inter.user,
          count: foundData.count,
          name: 'Support Ticket',
          category: '1068070403446149120',
          support: '1047454193184682040',
          context: 'Please tell us your concerns or inquiries in advance.',
          ticketName: inter.user.username.replace(/ /g,'')+'-'+shard
        }
      }
      else if (type === 'report') {
        data = {
          doc: doc,
          guild: inter.guild,
          user: inter.user,
          count: foundData.count,
          name: 'Report Ticket',
          category: '1068070430457470976',
          support: '1047454193184682040',
          context: 'Use the respective autoresponders to view the report format of the item you wish to report.\n`.rboost`\n`.rnitro`\n`.rbadge`\n`.rpremium`',
          ticketName: inter.user.username.replace(/ /g,'')+'-'+shard
        }
      }
      
      let channel = await makeTicket(data)
      await inter.reply({content: "<a:S_arrowright:1095503803761033276> Ticket created "+channel.toString(), ephemeral: true})
    }
    //
    else if (id.includes('Ticket-')) {
      let method = id.startsWith('openTicket-') ? 'open' : id.startsWith('closedTicket-') ? 'closed' : id.startsWith('deleteTicket-') ? 'delete' : null
      if (!await getPerms(inter.member,4) && method !== 'closed') return inter.reply({content: emojis.warning+' Insufficient Permission', ephemeral: true});
      
      let userId = id.replace(method+'Ticket-','').replace(/_/g,' ')
      let user = await getUser(userId)
      let doc = await tixModel.findOne({id: user.id})
      if (doc) {
        let comp
        let text = '<:S_dot:1093733278541951078>Status: `'+method.toUpperCase()+'`\n<:S_dot:1093733278541951078>Author: '+inter.user.toString()
        if (method === 'delete') {
          text = 'This channel will be deleted in a few seconds.'
          comp = null
        }
        else if (method === 'closed') {
          let row = new MessageActionRow().addComponents(
            new MessageButton().setCustomId('transcript-'+user.id).setStyle('SECONDARY').setLabel('Transcript').setEmoji('<:S_letter:1092606891240198154>'),
            new MessageButton().setCustomId('openTicket-'+user.id).setStyle('SECONDARY').setLabel('Open').setEmoji('🔓'),
            new MessageButton().setCustomId('deleteTicket-'+user.id).setStyle('SECONDARY').setLabel('Delete').setEmoji('⛔'),
          );
          comp = [row]
        }
        else if (method === 'open') {
          let row = new MessageActionRow().addComponents(
            new MessageButton().setCustomId('closedTicket-'+user.id).setStyle('SECONDARY').setLabel('Close').setEmoji('🔓'),
          );
          comp = [row]
        }
        inter.message.edit({components: []})
        if (method === 'delete') {
          inter.reply({content: text})
          setTimeout(async function(){
            for (let i in doc.tickets) {
              let ticket = doc.tickets[i]
              doc.tickets.splice(i,1)
              await doc.save();
            }
            await inter.channel.delete();
          },8000)
        }
        else if (method !== 'delete') {
          let botMsg = null
          inter.deferUpdate();
          await inter.message.reply({content: 'Updating ticket... '+emojis.loading}).then(msg => botMsg = msg)
          //Modify channel
          for (let i in doc.tickets) {
            let ticket = doc.tickets[i]
            if (ticket.id === inter.channel.id) {
              ticket.status = method
              if (method === 'closed') {
                inter.channel.setParent(shop.tixSettings.closed)
              } 
              else if (method === 'open') {
                inter.channel.setParent(ticket.category)
              }
              await inter.channel.permissionOverwrites.set([
              {
                id: inter.guild.roles.everyone,
                deny: ['VIEW_CHANNEL'],
              },
              {
                id: user.id,
                deny: method === 'closed' || method === 'delete' ? ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'] : null,
                allow: method === 'open' ? ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'] : null,
              },
              {
                id: inter.guild.roles.cache.find(r => r.id === shop.tixSettings.support), 
                allow: ['VIEW_CHANNEL','SEND_MESSAGES','READ_MESSAGE_HISTORY'],
              },
              
            ]);
            }
          }
          await doc.save()
          let embed = new MessageEmbed()
          .setDescription(text)
          .setColor(colors.none)
          .setFooter({text: "Sloopies Ticketing System"})
          inter.channel.send({embeds: [embed], components: comp})
          botMsg.delete();
        }
      } else {
        inter.reply({content: emojis.warning+' No data was found.'})
      }
    }
    //
    else if (id.startsWith('transcript-')) {
      if (!await getPerms(inter.member,4)) return inter.reply({content: emojis.warning+' Insufficient Permission', ephemeral: true});
      let userId = id.replace('transcript-','').replace(/_/g,' ')
      let doc = await tixModel.findOne({id: userId})
      let log = await getChannel(shop.tixSettings.transcripts)
      await inter.reply({content: 'Saving transcript to '+log.toString()})

      if (doc) {
        
        let user = await getUser(userId)
        let ticket = await doc.tickets.find(tix => tix.id === inter.channel.id)
        if (!ticket) return inter.message.reply({content: emojis.warning+' Invalid ticket data.'})
        let attachment = await discordTranscripts.createTranscript(inter.channel);
        
        await log.send({ content: 'Loading', files: [attachment] }).then(async msg => {
          let attachments = Array.from(msg.attachments.values())
          let stringFiles = ""
          if (msg.attachments.size > 0) {
            let index = 0
            for (let i in attachments) {
              ticket.transcript = 'https://codebeautify.org/htmlviewer?url='+attachments[i].url
              await doc.save();
            }
          }
          
          let embed = new MessageEmbed()
          .setAuthor({ name: user.tag, iconURL: user.avatarURL(), url: 'https://discord.gg/sloopies' })
          .addField('Ticket Owner',user.toString(),true)
          .addField('Ticket Name','Current: `'+inter.channel.name+'`\nOriginal: `'+ticket.name+'`',true)
          .addField('Panel Name',ticket.panel,true)
          .addField('Transcript','[Online Transcript]('+ticket.transcript+')',true)
          .addField('Count',ticket.count.toString(),true)
          .addField('Moderator',inter.user.toString(),true)
          .setThumbnail(inter.guild.iconURL())
          .setColor(colors.yellow)
          .setFooter({text: "Sloopies Ticketing System"})
          
          let row = new MessageActionRow().addComponents(
            new MessageButton().setURL(ticket.transcript).setStyle('LINK').setLabel('View Transcript').setEmoji('<:S_separator:1093733778633019492>'),
          );
          await msg.edit({content: null, embeds: [embed], components: [row]})
          await inter.channel.send({content: emojis.check+' Transcript saved *!*'})
          user.send({content: 'Your ticket transcript was generated.', embeds: [embed], components: [row]}).catch(err => console.log(err))
        });
      }
    }
    //
    else if (id === 'orderStatus') {
      if (!await getPerms(inter.member,4)) return inter.reply({content: emojis.warning+' Insufficient Permission', ephemeral: true});
      
      let stat = ['noted','processing','completed','cancelled']
      let found = stat.find(s => s === inter.values[0])
      if (!found) return inter.reply({content: emojis.warning+' Invalid order status: `'+inter.values[0]+'`', ephemeral: true})
      //if (inter)
      let args = await getArgs(inter.message.content)
      let a = args[args.length-5]
      let b = args[args.length-1]
      let content = inter.message.content.replace(a,'**'+found.toUpperCase()+'**').replace(b,'<t:'+getTime(new Date().getTime())+':R>')
      
      let row = JSON.parse(JSON.stringify(shop.orderStatus));
      found === 'completed' || found === 'cancelled' ? row.components[0].disabled = true : null
      
      inter.update({content: content, components: [row]})
    }
    else if (id === 'cancel') {
      inter.reply({content: 'Interaction cancelled.', ephemeral: true})
      inter.message.edit({components: []})
    }
    else if (id.startsWith('voucher-')) {
      let code = id.replace('voucher-','').replace(/_/g,' ')
      if (!vrDebounce && claimer === null) {
        !claimer ? claimer = inter.user.id : null
        vrDebounce = true
        await setVouchers()
        let voucher = shop.vouchers.find(v => v.code === code)
      if (!voucher) return vrDebounce = false, inter.update({content: emojis.x+' The voucher (`'+code+'`) was revoked!', components: []})
        let row = new MessageActionRow().addComponents(
          new MessageButton().setCustomId('design1').setStyle('SECONDARY').setEmoji('<a:party:1083355785188347984>'),//.setDisabled(true),
          new MessageButton().setCustomId('design2').setStyle('SECONDARY').setEmoji('<a:TC_Party_Cat:1083357530786373703>'),
          new MessageButton().setCustomId('design3').setStyle('SECONDARY').setEmoji('<a:Party_Dino:1083357739687882802>'),
          new MessageButton().setCustomId('design4').setStyle('SECONDARY').setEmoji('<a:SREV_purple_party:1083357680174895187>'),
          new MessageButton().setCustomId('design5').setStyle('SECONDARY').setEmoji('<a:TC_Wumpus_Party:1083357617478447124>'),
        );
        let quote = "Oop, I can't think of a quote right now."
        let context = ['cats','life','dogs','love','stupidity','anything']
        let chosenContext = context[getRandom(0,context.length)]
        let data = await chatAI("write a random inspirational quote about "+chosenContext)
        if (data.response.error) console.log('⚠️ An unexpected error occurred `'+data.response.error.message+'`')
        else if (data.chosenAPI === AI.chatAPI) {
          let msg = data.response.choices[0].message.content
          let filtered = AI.filter(msg)
          if (filtered.length > 500) {
            console.log("⚠️ The message generated was longer than 500 characters. Unable to send due to discord's limitations.")
          } else {
            quote = filtered
          }
        }
  
        let newEmbed = new MessageEmbed()
        .setTitle(voucher.perks)
        .setThumbnail(inter.user.avatarURL())
        .setDescription('Hmm, it seems someone already claimed this voucher.')
        .addField("Random Quote",quote)
        .addField('Claimed by','<@'+inter.user.id+'>')
        .setFooter({text: 'Click the buttons below for some entertainment'})
        .setColor(colors.red)
        
        sendChannel(emojis.check+' <@'+inter.user.id+'> claimed a **'+voucher.perks+'**!\nCode: `'+code+'`','1047454193755107337',colors.lime)
        let embed = new MessageEmbed()
        .addField('You received a '+voucher.perks+'!','Code: `'+code+'`')
        .addField('Read me','\n<:circley:1072388650337308742>This voucher will expire in 5 days\n<:circley:1072388650337308742>Must order an item to use the voucher\n<:circley:1072388650337308742>You can share the code to anyone!\n<:circley:1072388650337308742>One-time use only\n<:circley:1072388650337308742>You can only use one voucher per order')
        .setColor(colors.none)
        .setFooter({text: 'Type ;use '+code+' in the ticket channel to use your voucher!'})
        
        let row2 = await makeRow('https://discord.com/channels/1047454193159503904/1054711675045036033/1095603406632144936','Order Here','LINK','<:09:1069200736631656518>')
    
        let error = false
        if (claimer === inter.user.id) {
          await inter.user.send({embeds: [embed], components: [row2]}).catch((err) => {
            inter.reply({content: 'Error! Cannot send voucher to your DMs. Please open your DMs!', ephemeral: true})
            error = true
          })
          .then((msg) => {
            if (error) return;
            inter.reply({content: "Voucher code was sent in your DMs!", ephemeral: true})
            inter.message.edit({embeds: [newEmbed], components: [row]});
          })
        } else {
          inter.reply({content: "It seems like someone was milliseconds faster than you.", ephemeral: true})
        }
        claimer = null
        vrDebounce = false
        
    } else {
      inter.reply({content: emojis.x+' The voucher was already claimed!', ephemeral: true})
    }
    }
    else if (id.startsWith('feedback')) {
      let feedback = await getChannel(shop.channels.feedbacks)
      let logs = await getChannel(shop.channels.logs)
      let anon = false
      if (id === 'feedbackAnon') anon = true
      let type = anon ? 'Anonymous' : 'Public'
      
      let embed = new MessageEmbed()
      .setAuthor({ name: anon ? 'Sent Anonymously' : inter.user.tag, iconURL: anon ? 'https://www.freepnglogos.com/uploads/discord-logo-png/discord-logo-logodownload-download-logotipos-1.png' : inter.user.avatarURL(), url: 'https://discord.gg/sloopies' })
      .setDescription(inter.message.embeds[0].description)
      .setFooter({text: type+' Feedback'})
      .setColor(colors.none)
      .setThumbnail(anon ? 'https://www.freepnglogos.com/uploads/discord-logo-png/discord-logo-logodownload-download-logotipos-1.png' : inter.user.avatarURL())

      inter.update({content: 'Feedback sent `('+type+')`', components: []})
      feedback.send({embeds: [embed]})
      logs.send({content: '<@'+inter.user.id+'>', embeds: [embed]})
    }
    else if (id.startsWith('roles-')) {
    let role = id.replace('roles-','').replace(/_/g,' ')
    if (hasRole(inter.member, [role], inter.guild)) {
      removeRole(inter.member, [role], inter.guild)
      await inter.reply({content: emojis.off+' Removed **'+role+'** role.', ephemeral: true})
    } else {
    addRole(inter.member, [role], inter.guild)
    await inter.reply({ content: emojis.on+' Added **'+role+'** role.', ephemeral: true });
    }
  }
    else if (id.startsWith('drop-')) {
      if (!await getPerms(inter.member,4)) return inter.reply({content: emojis.warning+' Insufficient Permission', ephemeral: true});
      let msgId = id.replace('drop-','')
      let drops = await getChannel(shop.channels.drops)
      let dropMsg = await drops.messages.fetch(msgId)
      let member = inter.message.mentions.members.first()
      if (!member) return inter.reply(emojis.x+" Invalid User")
      let template = await getChannel(shop.channels.dmTemplate)
      
      let msg = await template.messages.fetch("1075782458970214480")
      let error = false;
      let code = makeCode(10)
      let copy = new MessageActionRow().addComponents(
          new MessageButton().setCustomId('copyLinks').setStyle('SECONDARY').setLabel('Copy Links'),
        new MessageButton().setLabel('Vouch Here').setURL('https://discord.com/channels/1047454193159503904/1054724474659946606').setStyle('LINK').setEmoji('<:S_letter:1092606891240198154>')
        );
      await member.send({content: msg.content+"\n\nRef code: `"+code+"`\n||"+dropMsg.content+" ||", components: [copy]}).catch((err) => {
        error = true
        inter.reply({content: emojis.x+" Failed to process delivery.\n\n```diff\n- "+err+"```", ephemeral: true})})
      .then(async (msg) => {
        if (error) return;
        let row = new MessageActionRow().addComponents(
          new MessageButton().setCustomId('sent').setStyle('SUCCESS').setLabel('Sent to '+member.user.tag).setDisabled(true),
          new MessageButton().setCustomId('code').setStyle('SECONDARY').setLabel(code).setDisabled(true),
        );
        inter.update({components: [row]})
        dropMsg.edit({content: code+"\n"+dropMsg.content, components: [row]})
      })
    }
    else if (id.startsWith('returnLinks-')) {
      if (!await getPerms(inter.member,4)) return inter.reply({content: emojis.warning+' Insufficient Permission', ephemeral: true});
      let msgId = id.replace('returnLinks-','')
      let drops = await getChannel(shop.channels.drops)
      let dropMsg = await drops.messages.fetch(msgId)
      
      let content = dropMsg.content
      let stocks = await getChannel(shop.channels.stocks)
      let args = await getArgs(content)
      let returned = 0
      let msgReturn = false
      
      dropMsg.edit({content: 'Returned\n'+content, components: []})
      
      for (let i = args.length - 1; i >= 0; i--) {
        if (args[i].includes('https://discord.gift/')) {
          await stocks.send(args[i])
          returned++
        }
      }
      if (returned === 0) {
        msgReturn = true
        await stocks.send(content)
      }
      inter.update({components: []})
      msgReturn ? inter.message.reply({content: emojis.check+' Returned the whole message to stocks.'}) : inter.message.reply({content: emojis.check+' Returned '+returned+' links to stocks.'})
    }
    else if (id.startsWith('showDrop-')) {
      if (!await getPerms(inter.member,4)) return inter.reply({content: emojis.warning+' Insufficient Permission', ephemeral: true});
      let msgId = id.replace('showDrop-','')
      let drops = await getChannel(shop.channels.drops)
      let dropMsg = await drops.messages.fetch(msgId)
      
      let content = dropMsg.content
      inter.reply({content: content, ephemeral: true})
    }
    else if (id.startsWith('copyLinks')) {
      
      let content = inter.message.content
      let args = await getArgs(content)
      let count = 0
      let string = ''
      for (let i in args) {
        if (args[i].includes('https://discord.gift/')) {
          count++;
          string += count+'. '+args[i]+'\n'
        }
      }
      if (count === 0) {
        inter.reply({content: emojis.x+' No links found.', ephemeral: true})
      } else {
      inter.reply({content: string, ephemeral: true})
      }
    }
    else if (id.startsWith('breakChecker-')) {
      let user = id.replace('breakChecker-','')
      shop.breakChecker = true
      inter.reply({content: emojis.check+" Forced Stop", ephemeral: true})
    }
    else if (id.startsWith('reply-')) {
      let reply = id.replace('reply-','')
      inter.reply({content: reply, ephemeral: true})
    }
    else if (id.startsWith('approve-')) {
      let userId = id.replace('approve-','')
      let user = await getUser(userId);
      if (user) {
        let comp = inter.message.components[0]
        comp.components[0].style = "SUCCESS"
        comp.components[1].style = "SECONDARY"
        for (let i in comp.components) {
            let row = comp.components[i]
            row.disabled = true
          }
        sendUser(emojis.check+" Your application was approved! Your application was approved! You can now access our reseller's pricelist. Please acknowledge that all the pricelists may change constantly.",user.id,colors.lime)
        let member = await getMember(user.id,inter.guild)
        member ? await addRole(member,['resellers'],inter.guild) : null
        inter.reply({content: "Application Accepted", ephemeral: true})
        inter.message.edit({components: [comp]})
      } else {
        inter.reply({content: "User not found.", ephemeral: true})
      }
    }
    else if (id.startsWith('decline-')) {
      let userId = id.replace('decline-','')
      let user = await getUser(userId);
      if (user) {
        let comp = inter.message.components[0]
        comp.components[0].style = "SECONDARY"
        comp.components[1].style = "DANGER"
        for (let i in comp.components) {
            let row = comp.components[i]
            row.disabled = true
          }
        sendUser(emojis.x+" Due to unfortunate circumstances, your application was declined. This could be because the information you provided was not sufficient or you did not pass our standard requirements.",user.id,colors.red)
        inter.reply({content: "Application Declined", ephemeral: true})
        inter.message.edit({components: [comp]})
      } else {
        inter.reply({content: "User not found.", ephemeral: true})
      }
    }
    else if (id.startsWith('followup')) {
      let user = inter.user
      let messageId = ''
      let found = shop.followUps.find(f => f === inter.user.id)
      if (found) return inter.reply({content: "Please wait for at least 2 hours before requesting another follow up!", ephemeral: true})
      shop.followUps.push(inter.user.id)
      let channelName = inter.channel.name
      let template = await getChannel(shop.channels.templates)
      if (channelName.includes('ticket')) messageId = '1086505068351721472'
      else if (channelName.includes('done')) messageId = '1086503830105104444'
      else messageId = '1086504594860937256'
      
      let foundMsg = await template.messages.fetch(messageId)
      inter.message.reply({content: "<@&1047454193184682040> **Order Status**\n\n<:03:1056580107189370922> "+foundMsg.content})
      inter.deferUpdate();
      setTimeout(function() {
        shop.followUps.splice(shop.followUps.indexOf(inter.user.id),1)
      },7200000)
    }
    else if (id.startsWith('done')) {
      if (!await getPerms(inter.member,4)) return inter.deferUpdate();
      inter.reply({content: emojis.check+" Order marked as done! `"+inter.channel.name+"`"})
      inter.channel.setName('order-done')
    }
    else if (id.startsWith('none')) {
      inter.deferUpdate();
    }
    else if (id.startsWith('channelDelete-')) {
      let channelId = id.replace('channelDelete-','')
      let found = shop.deleteChannels.find(c => c === channelId)
      if (found) {
        shop.deleteChannels.splice(shop.deleteChannels.indexOf(channelId),1)
        inter.update({content: emojis.check+" Channel deletion was cancelled by "+inter.user.tag+"", components: []})
      } else {
        inter.reply({content: emojis.warning+' This channel is no longer up for deletion.', ephemeral: true})
      }
    }
    else if (id.startsWith('prVerify')) {
      let member = inter.member
      if (await hasRole(member,['1094084379137032252'],inter.guild)) {
        inter.deferUpdate();
        return
      } else {
        
        let chosen = makeCode(5)
        let codes = [
          makeCode(5),
          makeCode(5),
          makeCode(5),
          makeCode(5),
          makeCode(5),
          makeCode(5),
        ]
        let random = getRandom(0,4)
        codes[random] = chosen
        let row = new MessageActionRow()
        .addComponents(
          new MessageButton().setCustomId(random === 0 ? 'prCode-'+random : 'randomCode-0').setStyle('SECONDARY').setLabel(codes[0]),
          new MessageButton().setCustomId(random === 1 ? 'prCode-'+random : 'randomCode-1').setStyle('SECONDARY').setLabel(codes[1]),
          new MessageButton().setCustomId(random === 2 ? 'prCode-'+random : 'randomCode-2').setStyle('SECONDARY').setLabel(codes[2]),
          new MessageButton().setCustomId(random === 3 ? 'prCode-'+random : 'randomCode-3').setStyle('SECONDARY').setLabel(codes[3]),
          new MessageButton().setCustomId(random === 4 ? 'prCode-'+random : 'randomCode-4').setStyle('SECONDARY').setLabel(codes[4]),
        );
        let embed = new MessageEmbed()
        .addField('Choose the correct matching code','```yaml\n'+chosen+'```')
        .setColor(colors.none)
        let botMsg = null
        await inter.user.send({embeds: [embed], components: [row]}).then(msg => botMsg = msg).catch(err => inter.reply({content: emojis.warning+" Failed to send verification. Please open your DMs!", ephemeral: true}))
        let channels = ''
        inter.guild.channels.cache.forEach( ch => {
          if (ch.parent?.name === 'PRICELIST' && ch.type !== 'GUILD_TEXT') {
            channels += '\n<:circley:1072388650337308742> <#'+ch.id+'>'
          }
        })
        let linker = new MessageActionRow()
        .addComponents(
          new MessageButton().setURL(botMsg.url).setStyle('LINK').setLabel('Proceed'),
        );
        inter.reply({content: emojis.loading+' Verification prompt was sent in your DMs!', components: [linker], ephemeral: true})
        let notice = await getChannel(shop.channels.alerts)
        notice.send('<@'+inter.user.id+'> '+emojis.loading)
      }
    }
    else if (id.startsWith('prCode-')) {
      let index = id.replace('prCode-','')
      let guild = await getGuild('1047454193159503904')
      if (!guild) return;
      let member = await getMember(inter.user.id,guild)
      if (member) {
        let comp = inter.message.components[0]
        for (let i in comp.components) {
          let row = comp.components[i]
          row.disabled = true
          if (i == index) row.style = 'SUCCESS'
        }
        inter.message.edit({components: [comp]})
        await addRole(member,['1094084379137032252'],guild)
        let channels = ''
        guild.channels.cache.forEach( ch => {
          if (ch.parent?.name === 'PRICELIST' && ch.type !== 'GUILD_TEXT') {
            channels += '\n<:circley:1072388650337308742> <#'+ch.id+'>'
          }
        })
        inter.reply({content: emojis.check+' <:S_seperator:1093733778633019492> You now have access to our pricelists! You can view them through these channels: \n'+channels, ephemeral: true})
        let notice = await getChannel(shop.channels.alerts)
        notice.send('<@'+inter.user.id+'> '+emojis.check)
      } else {
        inter.reply({content: emojis.warning+' Unexpected error occured.', ephemeral: true})
      }
    }
    else if (id.startsWith('randomCode-')) {
      let index = id.replace('randomCode-','')
      let comp = inter.message.components[0]
        for (let i in comp.components) {
          let row = comp.components[i]
          row.disabled = true
          if (i == index) row.style = 'DANGER'
        }
      inter.reply({content: emojis.x+" Code did not match. Please try again by clicking the access button.", ephemeral: true})
      inter.message.edit({components: [comp]})
      let notice = await getChannel(shop.channels.alerts)
      notice.send('<@'+inter.user.id+'> '+emojis.x)
    }
    else if (id.startsWith('orderFormat')) {
      //let found = comp.components.find(c => c.customId === 'orderFormat')
      let comp = inter.message.components[0]
        for (let i in comp.components) {
          let row = comp.components[i]
          row.disabled = true
        }
      inter.update({components: [comp]})
      let count = 0
      let thread = [
        {
          question: '> <:S_letter:1092606891240198154> Which product do you want to avail?',
          answer: '',
        },
        {
          question: '> <:S_letter:1092606891240198154> How many of this item do you wish buy?',
          answer: '',
        },
        {
          question: "> <:S_letter:1092606891240198154> What's your selected mode of payment?",
          answer: '',
        },
      ]
      const filter = m => m.author.id === inter.user.id;
      async function getResponse(data) {
        await inter.channel.send(data.question)
        let msg = await inter.channel.awaitMessages({ filter, max: 1,time: 900000 ,errors: ['time'] })
        msg = msg?.first()
        data.answer = msg.content
      }
      for (let i in thread) {
        let data = thread[i]
        count++
        await getResponse(data,count)
      }
      let row = new MessageActionRow().addComponents(
        new MessageButton().setCustomId('confirmOrder').setStyle('SUCCESS').setLabel('Yes'),
        new MessageButton().setCustomId('orderFormat').setStyle('DANGER').setLabel('Retry'),
      );
      let embed = new MessageEmbed()
      .setDescription('Item: **'+thread[0].answer+'**\nQuantity: **'+thread[1].answer+'**\nMode of Payment: **'+thread[2].answer+'**')
      .setColor(colors.yellow)
      .setFooter({text: 'Order Confirmation'})
      
      inter.channel.send({content: "<:S_separator:1093733778633019492> Is this your order?", embeds: [embed], components: [row]})
      
    }
    else if (id.startsWith('confirmOrder')) {
      inter.message.edit({components: []})
      inter.reply({content: "Thank you for confirming your order! <:S_bearlove:1072353337699225640>\nOur staff will be with you shortly."})
    }
    else if (id.startsWith('gsaRaw')) {
      inter.reply({content: '```json\n'+JSON.stringify(shop.gcashStatus, null, 2).replace(/ *\<[^>]*\> */g, "")+'```', ephemeral: true})
    }
    else if (id.startsWith('design')) {
      if (animation) return inter.reply({content: 'An animation is currently in progress. Please try again later.', ephemeral: true})
      animation = true
      let comp = inter.message.components[0]
      let types = [
        'DANGER',
        'PRIMARY',
        'SUCCESS',
        'DANGER',
        'PRIMARY',
        'SUCCESS',
      ]
      let usern = inter.user.username.replace(/ /g,'')
      let randomizer = [
        usern+' is a cute catto',
        usern+' likes eating a siopao',
        usern+' is jumpy cute froggo',
        usern+' eat eggs a lot',
        usern+' is a fat catto',
        usern+' is a hungry monster',
        usern+' is a fast eater',
        usern+' likes cattos very much',
        usern+' has pet dinosor ror',
        usern+" is gudetama's favorite person",
        usern+" secretely likes someone's pet",
        usern+' sleeps longer than u',
        usern+' sucks at playing valorant',
        usern+' likes an eggless omelete',
        usern+' almost fell on cliff',
      ]
      let args = getArgs(randomizer[getRandom(0,randomizer.length)])
      
      async function changeRow(state,type,disabled) {
        if (state === 'start') {
          for (let i in comp.components) {
            let row = comp.components[i]
            row.style = type
            row.disabled = disabled
          }
        }
        else if (state === 'mix') {
          for (let i in comp.components) {
            let row = comp.components[i]
            row.style = types[i] ? types[i] : types[0]
            row.label = args[i] ? args[i] : args[0]
            await inter.message.edit({components: [comp]})
            sleep(delay)
          }
        }
    }
      let delay = 1500
      await changeRow('start','DANGER',true)
      inter.deferUpdate()
      await inter.message.edit({components: [comp]})
      sleep(delay)
      await changeRow('start','PRIMARY',true)
      await inter.message.edit({components: [comp]})
      sleep(delay)
      await changeRow('start','SUCCESS',true)
      await inter.message.edit({components: [comp]})
      sleep(delay)
      await changeRow('start','SECONDARY',true)
      inter.message.edit({components: [comp]})
      sleep(delay)
      await changeRow('mix','DANGER',true)
      inter.message.edit({components: [comp]})
      await changeRow('start','SECONDARY',true)
      inter.message.edit({components: [comp]})
      animation = false
    }
    }
});
process.on('unhandledRejection', async error => {
  console.log(error);
  let caller_line = error.stack.split("\n");
  let index = await caller_line.find(b => b.includes('/app'))
  let embed = new MessageEmbed()
  .addField('Caller Line','```'+(index ? index : 'Unknown')+'```',true)
  .addField('Error Code','```css\n[ '+error.code+' ]```',true)
  .addField('Error','```diff\n- '+(error.stack >= 1024 ? error.stack.slice(0, 1023) : error.stack)+'```')
  .setColor(colors.red)
  
  let channel = await getChannel(output)
  channel ? channel.send({embeds: [embed]}).catch(error => error) : null
});

//Loop
let ready = true;
let randomTime = null;

let streamers = [
    /*{
      name: 'Kdrysss',
      live: false,
    },*/
    {
      name: '105695088538055',
      live: false,
    },
  ]

//const interval = setInterval(async function() {},10000)

app.get('/webhook', async function(req, res){
  console.log(req.query.code)
  
  const data_1 = new URLSearchParams();
  data_1.append('client_id', client.user.id);
  data_1.append('client_secret', process.env.clientSecret);
  data_1.append('grant_type', 'authorization_code');
  data_1.append('redirect_uri', 'https://project-scseqdjnsjcdbvuisef.glitch.me/webhook');
  data_1.append('scope', 'identify');
  data_1.append('code', req.query.code);
  let headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  }
  let response = await fetch('https://discord.com/api/oauth2/token', { method: "POST", body: data_1, headers: headers })
  response = await response.json();
  console.log(response)

  //let user = await getUser();
  //let guild = await getGuild('1106762090552774716');
  //let joinServer = await guild.members.add(user,{accessToken: response.access_token})
  res.status(200).send({text: "You have been succesfully verified!"});
});