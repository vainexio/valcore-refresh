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
let cmd = true

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
    "name": "backup",
    "type": 1,
    "description": "Join your members to your backed up server",
    "options": [
      {
        "name": 'key',
        "description": 'Your backup key',
        "type": 3,
        "required": true,
      },
      {
        "name": 'new_guild',
        "description": 'The guild id of your new guild',
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
  client.user.setPresence({ status: 'online', activities: [{ name: 'Backup', type: "WATCHING" }] });
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
    //Back up
    if (cname === 'register') {
      if (!await getPerms(inter.member,2)) return inter.reply({content: emojis.warning+" You are not on the whitelist"});
      let options = inter.options._hoistedOptions
      //
      let guildId = options.find(a => a.name === 'guild_id')
      let guild = await getGuild(guildId)
      if (!guild) return inter.reply({content: emojis.warning+' Invalid guild'})
      let doc = await guildModel.findOne({id: guild.id})
      if (doc) return inter.reply({content: emojis.warning+' Guild already registered.'})
      
      let guildSchema = new mongoose.Schema({
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
      let newDoc = new guildModel(guildSchema)
      newDoc.id = guild.id,
        
      
    }
    else if (cname === 'backup') {
      if (!await getPerms(inter.member,2)) return inter.reply({content: emojis.warning+' You are not on the whitelist'});
      let options = inter.options._hoistedOptions
      //
      let key = options.find(a => a.name === 'key')
      let guildId = options.find(a => a.name === 'new_guild')
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