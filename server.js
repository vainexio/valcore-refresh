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
    author: String,
    users: [
      {
        id: String,
        access_token: String,
        refresh_token: String,
        createdAt: String,
        expiresAt: String,
      }
    ],
  })
  guildModel = mongoose.model("GuildBackup_Model", guildSchema);

  if (cmd) {
  let discordUrl = "https://discord.com/api/v10/applications/"+client.user.id+"/commands"
  let deleteUrl = "https://discord.com/api/v10/applications/"+client.user.id+"/commands/"
  let json = {
    "name": "join",
    "type": 1,
    "description": "Joins a specific user to your guild",
    "options": [
      {
        name: 'key',
        description: "Access key",
        type: 3,
        required: true
      },
      {
        name: 'user',
        description: 'User you want to override',
        type: 6,
        required: true,
      },
      {
        "name": 'guild_id',
        "description": 'Guild ID',
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
  client.user.setPresence({ status: 'online', activities: [{ name: 'to users', type: "LISTENING" }] });
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
const {config, auth, prefix, colors, status, theme, commands, permissions, emojis} = settings
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
async function guildPerms(member, perms) {
  if (member.permissions.has(perms)) {
	return true;
} else {
  return false;
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
      let guild = await getGuild(guildId.value)
      if (!guild) return inter.reply({content: emojis.warning+' Cannot find guild. Make sure that the bot is on the server that you wish to register.'})
      if (!await guildPerms(inter.member,["ADMINISTRATOR"])) return inter.reply({content: emojis.warning+' You must have the **ADMINISTRATOR** permission within the guild in order to register it.'})
      let doc = await guildModel.findOne({id: guild.id})
      if (doc) return inter.reply({content: emojis.warning+' This guild was already registered.'})
      
      let newDoc = new guildModel(guildSchema)
      newDoc.id = guild.id
      newDoc.key = makeCode(30)
      newDoc.author = inter.user.id
      await newDoc.save()
      
      let embed = new MessageEmbed()
      .addField("Generated Key","Your key was generated for the first time. Make sure you save it before you dismiss this message. This key will not be sent again.")
      .addField("Data","Guild ID `"+guild.id+"`\nGuild Name `"+guild.name+"`")
      .setColor(colors.none)
      
      await inter.reply({content: newDoc.key, embeds: [embed], ephemeral: true})
    }
    else if (cname === 'backup') {
      if (!await getPerms(inter.member,2)) return inter.reply({content: emojis.warning+' You are not on the whitelist'});
      let options = inter.options._hoistedOptions
      //
      let key = options.find(a => a.name === 'key')
      let guildId = options.find(a => a.name === 'new_guild')
      let guild = await getGuild(guildId.value);
      if (!guild) return inter.reply({content: emojis.warning+' Invalid guild'})
      let doc = await guildModel.findOne({key: key.value})
      if (!doc) return inter.reply({content: emojis.warning+' Invalid Key'})
      
      if (doc.users.length === 0) return inter.reply({content: emojis.warning+' No users have yet verified to access your token'})
      let failed = 0
      let success = 0
      let already = 0
      await inter.reply({content: emojis.loading+" Joining "+doc.users.length+" users to your new guild ("+guild.name+")"})
      for (let i in doc.users) {
        let data = doc.users[i]
        try {
          let user = await getUser(data.id);
          let member = await getMember(user.id,guild)
          if (member) already++
          else {
          if (user) await guild.members.add(user,{accessToken: data.access_token})
            .then(suc => {
            console.log(suc)
            success++
          })
            .catch(err => {
            console.log(err)
            failed++
          })
          }
        } catch(err) {
          failed++
        }
      }
      //doc.id = guild.id
      doc.key = makeCode(30)
      doc.author = inter.user.id
      await doc.save();
      let embed = new MessageEmbed()
      .addField("Generated Key","Your key was revoked as a one-time use policy. As a result, new key was generated.")
      .addField("Data",'Guild ID `'+guild.id+'`\nGuild Name `'+guild.name+'`')
      .addField("Registered Users",doc.users.length.toString())
      .setColor(colors.none)
      inter.user.send({content: doc.key, embeds: [embed]})
      inter.channel.send({content: emojis.check+' Success: '+success+'\n'+emojis.on+' Already in Server: '+already+'\n'+emojis.x+' Failed: '+failed})
    }
    else if (cname === 'join') {
      if (!await getPerms(inter.member,2)) return inter.reply({content: emojis.warning+" You are not on the whitelist"})
      let options = inter.options._hoistedOptions
      //
      let key = options.find(a => a.name === 'key')
      let user = options.find(a => a.name === 'user')
      let guildId = options.find(a => a.name === 'guild_id')
      try {
        let guild = await getGuild(guildId.value)
        let doc = await guildModel.findOne({key: key.value})
        //let data = doc.users.find(u => u.id === user.user.id)
        
        if (!guild) return inter.reply(emojis.warning+' Invalid guild ID')
        if (!doc) return inter.reply(emojis.warning+' Invalid key was provided')
        
        let data = doc.users.find(u => u.id === user.user.id)
        let joinMem = await guild.members.add(user.user,{accessToken: data.access_token})
        await inter.reply({content: emojis.on+" Successfully joined **"+user.user.tag+"** to "+guild.name})
        
        doc.key = makeCode(30)
        doc.author = inter.user.id
        await doc.save();
        let embed = new MessageEmbed()
        .addField("Generated Key","Your key was revoked as a one-time use policy. As a result, new key was generated.")
        .addField("Data",'Guild ID `'+guild.id+'`\nGuild Name `'+guild.name+'`')
        .addField("Registered Users",doc.users.length.toString())
        .setColor(colors.none)
        
        inter.user.send({content: doc.key, embeds: [embed]})
      }
      catch (err) {
        console.log(err)
        inter.reply({content: emojis.warning+" Unexpected error occurred\n```diff\n- "+err+"```"})
      }
    }
    else if (cname === 'status') {
      //if (!await getPerms(inter.member,2)) return inter.reply({content: emojis.warning+' You are not on the whitelist'});
      let options = inter.options._hoistedOptions
      //
      let guildId = options.find(a => a.name === 'guild_id')
      
      let doc = await guildModel.findOne({id: guildId ? guildId.value : inter.guild.id})
      let guild = guildId ? await getGuild(guildId.value) : inter.guild
      if (!doc || !guild) return inter.reply({content: emojis.warning+' Unregistered Guild ID'})
      let embed = new MessageEmbed()
      .setAuthor({ name: guild.name, iconURL: guild.iconURL() })
      .addField("Registered Users",doc.users.length.toString())
      .addField("Key Holder",'<@'+doc.author+'>')
      .addField("Key",doc.key.substr(0, doc.key.length-20)+'...')
      .setThumbnail(guild.iconURL())
      .setColor(colors.none)
      
      let row = new MessageActionRow().addComponents(
        new MessageButton().setURL('https://discord.com/api/oauth2/authorize?client_id=1108412309308719197&redirect_uri='+process.env.live+'&response_type=code&scope=identify%20guilds.join&state='+doc.id).setStyle('LINK').setLabel("Verify"),
      );
      
      await inter.reply({embeds: [embed], components: [row]})
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
let one = true
const interval = setInterval(async function() {
  let guilds = await guildModel.find()
  let data = {
    refreshed: 0,
    tokens: 0,
    failed: 0,
  }
  for (let i in guilds) {
    let doc = guilds[i]
    let users = doc.users
    for (let i in users) {
      data.tokens++
      let user = users[i]
      let time = getTime(new Date())
      //get expiration
      if (time >= user.expiresAt) {
        console.log('expired',user)
        let data_1 = new URLSearchParams();
        data_1.append('client_id', client.user.id);
        data_1.append('client_secret', process.env.clientSecret);
        data_1.append('grant_type', 'refresh_token');
        data_1.append('refresh_token', user.refresh_token);
        let headers = {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
        //fetch token
        let response = await fetch('https://discord.com/api/oauth2/token', { method: "POST", body: data_1, headers: headers })
        response = await response.json();
        let userData = doc.users.find(u => u.id === user.id)
        //
        if (userData) {
          userData.access_token = response.access_token
          userData.refresh_token = response.refresh_token
          userData.createdAt = getTime(new Date())
          userData.expiresAt = getTime(new Date().getTime()+(response.expires_in*1000))
          data.refreshed++
        } else {
          data.failed++
        }
      }
    }
    //save
    await doc.save();
  }
  
  let logs = await getChannel("1102770742799650896")
  let embed = new MessageEmbed()
  .addField("Statistics",`Refreshed Tokens: ${data.refreshed}\nTotal Tokens: ${data.tokens}\nFailed Tokens: ${data.failed}`)
  .setColor(colors.none)
  
  logs.send({embeds: [embed]})
},21600000)

app.get('/backup', async function (req, res) {
  if (!req.query.state) return res.status(400).send({error: "Invalid Guild ID"})
  
  try {
    
    let data_1 = new URLSearchParams();
    data_1.append('client_id', client.user.id);
    data_1.append('client_secret', process.env.clientSecret);
    data_1.append('grant_type', 'authorization_code');
    data_1.append('redirect_uri', process.env.live);
    data_1.append('scope', 'identify');
    data_1.append('code', req.query.code);
    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
    //fetch token
    let response = await fetch('https://discord.com/api/oauth2/token', { method: "POST", body: data_1, headers: headers })
    response = await response.json();
    //fetch user
    let user = await fetch('https://discord.com/api/users/@me',{ headers: {'authorization': `Bearer ${response.access_token}`}})
    user = await user.json();
    //fetch model
    let doc = await guildModel.findOne({id: req.query.state})
    if (!doc) return res.status(400).send({error: "Invalid Guild Model"})
    let userData = doc.users.find(u => u.id === user.id)
    //
    if (userData) {
      userData.access_token = response.access_token
      userData.refresh_token = response.refresh_token
      userData.createdAt = getTime(new Date())
      userData.expiresAt = getTime(new Date().getTime()+(response.expires_in*1000))
    }
    //
    else {
      doc.users.push({
        id: user.id,
        access_token: response.access_token,
        refresh_token: response.refresh_token,
        createdAt: getTime(new Date()),
        expiresAt: getTime(new Date().getTime()+(response.expires_in*1000)),
      })
      userData = doc.users.find(u => u.id === user.id)
    }
    //
    await doc.save();
    //res.status(200).send({text: "You have been verified!"})
    let guild = await getGuild(req.query.state)
    let member = await getMember(user.id,guild)
    //add role
    await addRole(member,["backup","sloopie"],guild)
    //logs
    //let logs = await getChannel("1102770742799650896")
    //await logs.send(member.user.toString()+"\nCA: <t:"+userData.createdAt+":f> (<t:"+userData.createdAt+":R>)\nEA: <t:"+userData.expiresAt+":f> (<t:"+userData.expiresAt+":R>)")
    //await ghostPing(member.id,config.channels.chat)
    let channel = await getChannel(config.channels.chat)
    let template = await getChannel(config.channels.templates)
    let msg = await template.messages.fetch('1094934512879812608')
    let content = msg.content.replace('{user}','<@'+user.id+'>')
    let row = new MessageActionRow().addComponents(
    new MessageButton().setURL('https://discord.com/channels/1047454193159503904/1047454193197252644').setStyle('LINK').setLabel('Get your roles').setEmoji('🎲'),
      new MessageButton().setURL('https://discord.com/channels/1047454193159503904/1054711675045036033/1060248361107722290').setStyle('LINK').setLabel('Order here').setEmoji('🎫'),
    );
    channel.send({content: content, components: [row]})
    //redirect
    res.status(200).send({text: 'You have been verified!'})
    //res.redirect('https://discord.com/channels/@me/'+req.query.state)
  }
  catch (err) {
    console.log(err)
    res.status(400).send({'error': err.message})
  }
  //
});