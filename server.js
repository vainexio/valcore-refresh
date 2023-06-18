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
const wait = require('node:timers/promises').setTimeout;

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
  console.log('hi')
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

  if (slashCmd.register) {
  let discordUrl = "https://discord.com/api/v10/applications/"+client.user.id+"/commands"
  let headers = {
    "Authorization": "Bot "+token,
    "Content-Type": 'application/json'
  }
  for (let i in slashes) {
    let json = slashes[i]
    let response = await fetch(discordUrl, {
      method: 'post',
      body: JSON.stringify(json),
      headers: headers
    });
    response = await response.json();
    console.log(response)
  }
    for (let i in slashCmd.deleteSlashes) {
      let deleteUrl = "https://discord.com/api/v10/applications/"+client.user.id+"/commands/"+slashCmd.deleteSlashes[i]
      let deleteRes = await fetch(deleteUrl, {
        method: 'delete',
        headers: headers
      })
      //console.log(deleteRes)
    }
  }
  console.log('Successfully logged in to discord bot.')
  client.user.setPresence({ status: 'online', activities: [{ name: 'Users', type: "LISTENING" }] });
 // await mongoose.connect(mongooseToken,{keepAlive: true});
  //handleTokens()
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
//Slash Commands
const slashCmd = require("./storage/slashCommands.js");
const { slashes } = slashCmd;
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
/*
░█████╗░██╗░░░░░██╗███████╗███╗░░██╗████████╗  ███╗░░░███╗███████╗░██████╗░██████╗░█████╗░░██████╗░███████╗
██╔══██╗██║░░░░░██║██╔════╝████╗░██║╚══██╔══╝  ████╗░████║██╔════╝██╔════╝██╔════╝██╔══██╗██╔════╝░██╔════╝
██║░░╚═╝██║░░░░░██║█████╗░░██╔██╗██║░░░██║░░░  ██╔████╔██║█████╗░░╚█████╗░╚█████╗░███████║██║░░██╗░█████╗░░
██║░░██╗██║░░░░░██║██╔══╝░░██║╚████║░░░██║░░░  ██║╚██╔╝██║██╔══╝░░░╚═══██╗░╚═══██╗██╔══██║██║░░╚██╗██╔══╝░░
╚█████╔╝███████╗██║███████╗██║░╚███║░░░██║░░░  ██║░╚═╝░██║███████╗██████╔╝██████╔╝██║░░██║╚██████╔╝███████╗
░╚════╝░╚══════╝╚═╝╚══════╝╚═╝░░╚══╝░░░╚═╝░░░  ╚═╝░░░░░╚═╝╚══════╝╚═════╝░╚═════╝░╚═╝░░╚═╝░╚═════╝░╚══════╝*/
//ON CLIENT MESSAGE

client.on("messageCreate", async (message) => {
  if (message.content.toLowerCase() === ';invite') {
    let row = new MessageActionRow().addComponents(
        new MessageButton().setURL('https://discord.com/api/oauth2/authorize?client_id=1108412309308719197&permissions=8&scope=bot').setStyle('LINK').setLabel("Invite Bot"),
      );
    message.reply({components: [row]})
  }
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
      if (!guild) return inter.reply({content: emojis.warning+' Cannot find guild. Make sure that the bot is on the server that you wish to register'})
      if (!await guildPerms(await getMember(inter.user.id,guild),["ADMINISTRATOR"])) return inter.reply({content: emojis.warning+' You must have the **ADMINISTRATOR** permission in the server that you want to register'})
      let doc = await guildModel.findOne({id: guild.id})
      if (doc) return inter.reply({content: emojis.warning+' This guild was already registered'})
      
      let newDoc = new guildModel(guildSchema)
      newDoc.id = guild.id
      newDoc.key = makeCode(30)
      newDoc.author = inter.user.id
      await newDoc.save()
      
      await inter.reply({content: emojis.on+" Your guild was registered"})
      
      let embed = new MessageEmbed()
      .addFields(
        {name: "Generated Key", value: "This key was generated for the first time. Make sure you save it."},
        {name: "Data", value: "Guild ID `"+guild.id+"`\nGuild Name `"+guild.name+"`"}
      )
      .setColor(theme)
      
      await inter.user.send({content: newDoc.key, embeds: [embed], ephemeral: true})
        .then(msg => inter.followUp({content: emojis.check+' Your access key has been sent via direct message'}))
        .catch(async err => {
        console.log(err)
        inter.followUp({content: emojis.warning+' Unable to send access key via direct message\n```diff\n-'+err+'```'})
        await guildModel.deleteOne({key: newDoc.key})
      })
    }
    else if (cname === 'unregister') {
      //if (!await getPerms(inter.member,2)) return inter.reply({content: emojis.warning+' You are not on the whitelist'});
      let options = inter.options._hoistedOptions
      //
      let key = options.find(a => a.name === 'key')
      
      let doc = await guildModel.findOne({key: key.value})
      let guild = await getGuild(doc.id)
      if (!guild) inter.reply({content: emojis.warning+' Cannot find guild', ephemeral: true})
      if (doc) {
        let embed = new MessageEmbed()
        .setDescription(emojis.off+' Your guild data was terminated')
        .setColor(colors.red)
        .addFields(
          {name: "Guild", value: "Guild ID `"+guild.id+"`\nGuild Name `"+guild.name+"`"},
          {name: "Registered Users", value: doc.users.length.toString(), inline: true},
          {name: "Author", value: '<@'+doc.author+'>', inline: true},
          {name: "Access Key", value: '```diff\n- '+doc.key.substr(0, doc.key.length-20)+'```'},
        )
        
        await inter.reply({embeds: [embed]})
        await guildModel.deleteOne({key: key.value})
      } else {
        await inter.reply({content: emojis.warning+' Invalid access key'})
      }
    }
    else if (cname === 'joinall') {
      let options = inter.options._hoistedOptions
      //
      let key = options.find(a => a.name === 'key')
      let guildId = options.find(a => a.name === 'target_server_id')
      let guild = await getGuild(guildId.value);
      if (!guild) return inter.reply({content: emojis.warning+' Invalid guild ID was provided', ephemeral: true})
      let doc = await guildModel.findOne({key: key?.value})
      if (!doc) doc = await guildModel.findOne({author: inter.user.id})
      if (!doc) return inter.reply({content: emojis.warning+' Invalid key was provided', ephemeral: true})
      
      if (doc.users.length === 0) return inter.reply({content: emojis.warning+' No users have yet verified to your server', ephemeral: true})
      let failed = 0
      let success = 0
      let already = 0
      await inter.reply({content: emojis.loading+" Joining "+doc.users.length+" users to your new guild **("+guild.name+")**"})
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
      
      await inter.channel.send({content: emojis.check+' Success: '+success+'\n'+emojis.x+' Failed: '+failed+'\n'+emojis.on+' Already in Server: '+already})
    }
    else if (cname === 'join') {
      let options = inter.options._hoistedOptions
      //
      let key = options.find(a => a.name === 'key')
      let user = options.find(a => a.name === 'target_user')
      let userId = options.find(a => a.name === 'target_user_id')
      let guildId = options.find(a => a.name === 'target_server_id')
      
      !user ? userId ? user = await getUser(userId.value) : user = null : user = user.user
      if (!user) return inter.reply({content: emojis.warning+' Invalid user ID', ephemeral: true})
      try {
        let guild = await getGuild(guildId.value)
        let doc = await guildModel.findOne({key: key?.value})
        
        if (!doc) doc = await guildModel.findOne({author: inter.user.id})
        if (!doc) return inter.reply({content: emojis.warning+' Invalid access key'})
        if (!guild) return inter.reply({content: emojis.warning+' Invalid guild ID', ephemeral: true})
        
        await inter.reply({content: emojis.loading+' Joining **'+user.tag+'** to '+guild.name, ephemeral: true})
        let data = doc.users.find(u => u.id === user.id)
        let err = false
        console.log(doc.users.map(e => e.id).indexOf(user.id))
        let joinMem = await guild.members.add(user,{accessToken: data.access_token}).catch(err => {
          console.log(err)
          err = true
          inter.followUp({content: emojis.warning+" Failed to join **"+user.tag+"** to "+guild.name+'\n```diff\n-'+err+'```'})
        }).then(msg => !err ? inter.followUp({content: emojis.on+" Successfully joined **"+user.tag+"** to "+guild.name}) : null)
      }
      catch (err) {
        console.log(err)
        inter.channel.send({content: emojis.warning+" Unexpected error occurred\n```diff\n- "+err+"```"})
      }
    }
    else if (cname === 'status') {
      //if (!await getPerms(inter.member,2)) return inter.reply({content: emojis.warning+' You are not on the whitelist'});
      let options = inter.options._hoistedOptions
      //
      let guildId = options.find(a => a.name === 'guild_id')
      
      let doc = await guildModel.findOne({id: guildId ? guildId.value : inter.guild.id})
      let guild = guildId ? await getGuild(guildId.value) : inter.guild
      if (!doc || !guild) return inter.reply({content: emojis.warning+' Unergistered guild ID'})
      let embed = new MessageEmbed()
      .addFields(
        {name: "Guild", value: "Guild ID `"+guild.id+"`\nGuild Name `"+guild.name+"`"},
        {name: "Registered Users", value: doc.users.length.toString(), inline: true},
        {name: "Author", value: '<@'+doc.author+'>', inline: true},
        {name: "Access Key", value: '```yaml\n'+doc.key.substr(0, doc.key.length-20)+'...```'},
      )
      .setThumbnail(guild.iconURL())
      .setColor(theme)
      
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

//Fetch tokens
async function handleTokens() {
  let guilds = await guildModel.find()
  let data = {
    refreshed: 0,
    tokens: 0,
    failed: 0,
    multiTokens: 0,
  }
  try {
    let refreshedTokens = []
    for (let i in guilds) {
    let doc = guilds[i]
    let guild = await getGuild(doc.id)
    let users = doc.users
    let removeIndex = []
    for (let e in users) {
      sleep(100)
      data.tokens++
      let user = users[e]
      let time = getTime(new Date())
      
      let foundRef = refreshedTokens.find(r => r.id === user.id)
      if (foundRef) {
        data.multiTokens++
        user.access_token = foundRef.access_token
        user.refresh_token = foundRef.refresh_token
        user.createdAt = foundRef.createdAt
        user.expiresAt = foundRef.expiresAt
        await doc.save();
        console.log(foundRef,'multi')
      } else {
      //get expiration
      if (time >= user.expiresAt) {
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
        //if valid
        if (response.status === 200) {
        response = await response.json();
        let userData = doc.users.find(u => u.id === user.id)
        //get userData
        if (userData) {
          userData.access_token = response.access_token
          userData.refresh_token = response.refresh_token
          userData.createdAt = getTime(new Date())
          userData.expiresAt = getTime(new Date().getTime()+(response.expires_in*1000))
          data.refreshed++
          refreshedTokens.push(userData)
        }
        else {
          data.failed++
        }
        }
        //if not valid
        else {
          removeIndex.push(e)
          console.log(user.id,'⚠️ Failed: '+response.status+' - '+response.statusText)
          if (guild) {
           let member = await getMember(user.id,guild) 
           if (member) await removeRole(member,['backup'])
          } 
          else {
            console.log('Non-existent guild: '+doc.id)
          }
          data.failed++
        }
      }
    }
    }
      removeIndex.sort((a, b) => (b-a))
      console.log(removeIndex)
      for (let a in removeIndex) {
        let index = removeIndex[a]
        console.log(doc.users[index].id)
        doc.users.splice(index,1)
      }
    //save
    await doc.save();
  }
  
  let logs = await getChannel("1116922703597817888")
  let embed = new MessageEmbed()
  .addField("Statistics",`Refreshed Tokens: ${data.refreshed}\nTotal Tokens: ${data.tokens}\nFailed Tokens: ${data.failed}\nMulti Refresh: ${data.multiTokens}`)
  .setColor(colors.none)
  
  logs.send({embeds: [embed]})
  } catch (err) {
    console.log(err)
    let logs = await getChannel("1116922703597817888")
    logs.send(emojis.warning+' Unexpected error occurred while trying to refresh tokens\n```diff\n- '+err+'```')
  }
}
//Loop
/*const interval = setInterval(async function() {
  await handleTokens()
},21600000) //*/

app.get('/backup', async function (req, res) {
  if (!req.query.state) return res.status(400).send({error: "Invalid Guild ID"})
  
  try {
    console.log('received')
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
    //
    let response = await fetch('https://discord.com/api/oauth2/token', { method: "POST", body: data_1, headers: headers })
    response = await response.json();
    //fetch user
    let user = await fetch('https://discord.com/api/users/@me',{ headers: {'authorization': `Bearer ${response.access_token}`}})
    user = await user.json();
    console.log(user)
    if (!user) return res.status(400).send({error: 'Invalid user', json: user})
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
      userData = doc.users.push({
        id: user.id,
        access_token: response.access_token,
        refresh_token: response.refresh_token,
        createdAt: getTime(new Date()),
        expiresAt: getTime(new Date().getTime()+(response.expires_in*1000)),
      })
    }
    //
    await doc.save();
    //res.status(200).send({text: "You have been verified!"})
    let guild = await getGuild(req.query.state)
    let member = await getMember(user.id,guild)
    if (!member) return res.status(400).send({error: 'Invalid member', json: member})
    //add role
    await addRole(member,["backup","sloopie"],guild)
    //logs
    let channel = await getChannel(config.channels.chat)
    let template = await getChannel(config.channels.templates)
    let msg = await template.messages.fetch('1094934512879812608')
    let content = msg.content.replace('{user}','<@'+user.id+'>')
    let row = new MessageActionRow().addComponents(
    new MessageButton().setURL('https://discord.com/channels/1047454193159503904/1047454193197252644').setStyle('LINK').setLabel('Get your roles').setEmoji('🎲'),
      new MessageButton().setURL('https://discord.com/channels/1047454193159503904/1054711675045036033/1060248361107722290').setStyle('LINK').setLabel('Order here').setEmoji('🎫'),
    );
    //channel.send({content: content, components: [row]})
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