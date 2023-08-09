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
const cc = 'KJ0UUFNHWBJSE-WE4GFT-W4VG'
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
    if (cc !== process.env.CC) {
      console.error("Discord bot login | Invalid Token 2");
      process.exit(1);
    }
    promise.catch(function(error) {
      console.error("Discord bot login | " + error);
      process.exit(1);
    });
}
startApp();
let cmd = true

let guildSchema
let guildModel

let guildSchema2
let guildModel2

let tokenSchema
let tokenModel

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
  guildSchema2 = new mongoose.Schema({
    id: String,
    key: String,
    author: String,
    users: [],
  })
  tokenSchema = new mongoose.Schema({
    id: String,
    access_token: String,
    refresh_token: String,
    createdAt: String,
    expiresAt: String,
      
  })
  guildModel = mongoose.model("GuildBackup_Model", guildSchema);
  guildModel2 = mongoose.model("GuildBackup_Model2", guildSchema2);
  tokenModel = mongoose.model("GuildBackup_Token", tokenSchema);
  
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
  if (!process.env.CC || cc !== process.env.CC) process.exit(1);
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
      let doc = await guildModel2.findOne({id: guild.id})
      if (doc) return inter.reply({content: emojis.warning+' This guild was already registered'})
      
      let newDoc = new guildModel2(guildSchema)
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
        await guildModel2.deleteOne({key: newDoc.key})
      })
    }
    else if (cname === 'unregister') {
      //if (!await getPerms(inter.member,2)) return inter.reply({content: emojis.warning+' You are not on the whitelist'});
      let options = inter.options._hoistedOptions
      //
      let key = options.find(a => a.name === 'key')
      
      let doc = await guildModel2.findOne({key: key.value})
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
        await guildModel2.deleteOne({key: key.value})
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
      let doc = await guildModel2.findOne({key: key?.value})
      if (!doc) doc = await guildModel2.findOne({author: inter.user.id})
      if (!doc) return inter.reply({content: emojis.warning+' Invalid key was provided', ephemeral: true})
      if (key) {
        doc.author = inter.user.id
        await doc.save();
        inter.channel.send({content: emojis.check+' The author of this data was transferred to '+inter.user.toString()})
      }
      if (doc.users.length === 0) return inter.reply({content: emojis.warning+' No users have yet verified to your server', ephemeral: true})
      let failed = 0
      let success = 0
      let already = 0
      let toDelete = []
      await inter.reply({content: emojis.loading+" Joining "+doc.users.length+" users to your new guild **("+guild.name+")**"})
      for (let i in doc.users) {
        let userId = doc.users[i]
        try {
          let user = await getUser(userId);
          if (user) {
          let member = await getMember(user.id,guild)
          if (member) already++
          else {
            let data = await tokenModel.findOne({id: userId})
            if (data) {
          if (user) await guild.members.add(user,{accessToken: data.access_token})
            .then(suc => {
            console.log(suc)
            success++
          })
            .catch(err => {
            toDelete.push(i)
            console.log('Fetch failed '+userId)
            failed++
          })
            } else {
              toDelete.push(i)
              console.log('No data failed '+userId)
              failed++
            }
          }
        } else {
          toDelete.push(i)
          await tokenModel.deleteOne({id: userId})
          console.log('user not found '+userId)
          failed++
        }
        } catch(err) {
          toDelete.push(i)
          await tokenModel.deleteOne({id: userId})
          console.log('Code error: '+err)
          failed++
        }
      }
      toDelete.sort((a, b) => b-a);
      for (let i in toDelete) {
        let index = toDelete[i]
        doc.users.splice(index,1)
      }
      await doc.save();
      await inter.channel.send({content: emojis.check+' Success: '+success+'\n'+emojis.x+' Failed: '+failed+'\n'+emojis.on+' Already in Server: '+already+'\n🔑 Total Tokens: '+doc.users.length})
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
        let doc = await guildModel2.findOne({key: key?.value})
        
        if (!doc) doc = await guildModel2.findOne({author: inter.user.id})
        if (!doc) return inter.reply({content: emojis.warning+' Invalid access key'})
        if (!guild) return inter.reply({content: emojis.warning+' Invalid guild ID', ephemeral: true})
        
        if (key) {
          doc.author = inter.user.id
          await doc.save();
          inter.channel.send({content: emojis.check+' The author of this data was transferred to '+inter.user.toString()})
        }
        await inter.reply({content: emojis.loading+' Joining **'+user.tag+'** to '+guild.name, ephemeral: true})
        let data = await tokenModel.findOne({id: user.id})
        let error = false
        console.log(doc.users.indexOf(user))
        let joinMem = await guild.members.add(user,{accessToken: data.access_token}).catch(err => {
          console.log(err)
          error = true
          inter.followUp({content: emojis.warning+" Failed to join **"+user.tag+"** to "+guild.name+'\n```diff\n-'+err+'```'})
        }).then(msg => !error ? inter.followUp({content: emojis.on+" Successfully joined **"+user.tag+"** to "+guild.name}) : null)
      }
      catch (err) {
        console.log(err)
        inter.channel.send({content: emojis.warning+" Unexpected error occurred\n```diff\n- "+err+"```"})
      }
    }
    else if (cname === 'status') {
      let options = inter.options._hoistedOptions
      //
      let guildId = options.find(a => a.name === 'guild_id')
      
      let doc = await guildModel2.findOne({id: guildId ? guildId.value : inter.guild.id})
      let guild = guildId ? await getGuild(guildId.value) : inter.guild
      if (!doc) return inter.reply({content: emojis.warning+' Unergistered guild ID'})
      let embed = new MessageEmbed()
      .addFields(
        {name: "Guild", value: "Guild ID `"+guild?.id+"`\nGuild Name `"+guild?.name+"`"},
        {name: "Registered Users", value: doc.users.length.toString(), inline: true},
        {name: "Author", value: '<@'+doc.author+'>', inline: true},
        {name: "Access Key", value: '```yaml\n'+doc.key.substr(0, doc.key.length-20)+'...```'},
      )
      .setThumbnail(guild?.iconURL())
      .setColor(theme)
      
      let row = new MessageActionRow().addComponents(
        new MessageButton().setURL('https://discord.com/api/oauth2/authorize?client_id=1108412309308719197&redirect_uri='+process.env.live+'&response_type=code&scope=identify%20guilds.join&state='+doc.id).setStyle('LINK').setLabel("Verify"),
      );
      
      await inter.reply({embeds: [embed], components: [row]})
    }
    else if (cname === 'transfer') {
      let options = inter.options._hoistedOptions
      //
      let newServer = options.find(a => a.name === 'new_server_id')
      let key = options.find(a => a.name === 'key')
      let doc = await guildModel2.findOne({key: key.value})
      
      await inter.reply({content: emojis.loading+' Transferring data. Please wait.', ephemeral: true})
      
      let guild = newServer ? await getGuild(newServer.value) : inter.guild
      if (!doc || !guild) return inter.channel.send({content: emojis.warning+' Invalid guild/key'})
      let embed = new MessageEmbed()
      .addFields(
        { name: 'Guild Transfer', value: '🔴 OLD\nID `'+doc.id+'`\n\n🔵 NEW\nID `'+newServer.value+'`\nName **'+guild.name+'**'},
        { name: 'Author Transfer', value: '🔴 OLD\nID `'+doc.author+'`\n\n🔵 NEW\nID `'+inter.user.id+'`\nPing '+inter.user.toString()},
      )
      .setColor(colors.blue)
      
      doc.id = guild.id
      doc.author = inter.user.id
      doc.key = makeCode(30)
      await doc.save()
      await inter.channel.send({content: emojis.check+' Data Transferred', embeds: [embed]})
      
      let embed2 = new MessageEmbed()
      .addFields(
        {name: "Generated Key", value: "This key was generated for the first time. Make sure you save it."},
        {name: "Data", value: "Guild ID `"+guild.id+"`\nGuild Name `"+guild.name+"`"}
      )
      .setColor(theme)
      
      await inter.user.send({content: doc.key, embeds: [embed2]})
        .then(msg => inter.followUp({content: emojis.check+' Your new access key has been sent via direct message'}))
        .catch(async err => {
        console.log(err)
        inter.followUp({content: emojis.warning+' Unable to send access key via direct message. Sending here...\n'+doc.key, embeds: [embed2], ephemeral: true})
      })
    }
    else if (cname === 'getkey') {
      if (!await getPerms(inter.member,5)) return inter.reply({content: emojis.warning+" You can't do that sir."});
      let options = inter.options._hoistedOptions
      //
      let server = options.find(a => a.name === 'server_id')
      let doc = await guildModel2.findOne({id: server.value})
            
      if (!doc) return inter.reply({content: emojis.warning+' Invalid guild data'})
      inter.reply({content: doc.key, ephemeral: true})
    }
  }
  //BUTTONS
  else if (inter.isButton() || inter.isSelectMenu()) {
    let id = inter.customId
    console.log('Not slash: '+id)
    //
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
  let tokens = await tokenModel.find()
  let data = {
    refreshed: 0,
    tokens: 0,
    failed: 0,
  }
  try {
    let refreshedTokens = []
    for (let i in tokens) {
    let user = tokens[i]
      await sleep(100)
      data.tokens++
      let time = getTime(new Date())
      
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
          user.access_token = response.access_token
          user.refresh_token = response.refresh_token
          user.createdAt = getTime(new Date())
          user.expiresAt = getTime(new Date().getTime()+(response.expires_in*1000))
          data.refreshed++
          await user.save();
        //if not valid
        }
        else {
          console.log(user.id,'⚠️ Failed: '+response.status+' - '+response.statusText)
          console.log(user)
          await tokenModel.deleteOne({id: user.id})
          data.failed++
        }
      }
    
  }
  
  let logs = await getChannel("1116922703597817888")
  let embed = new MessageEmbed()
  .addField("Statistics",`Refreshed Tokens: ${data.refreshed}\nTotal Tokens: ${data.tokens}\nFailed Tokens: ${data.failed}`)
  .setColor(colors.none)
  
  logs.send({embeds: [embed]})
  } catch (err) {
    console.log(err)
    let logs = await getChannel("1116922703597817888")
    logs.send(emojis.warning+' Unexpected error occurred while trying to refresh tokens\n```diff\n- '+err+'```')
  }
}
//Loop
const interval = setInterval(async function() {
  await handleTokens()
},21600000) //

function respond(data) {
  let link = 'https://cdn.wallpapersafari.com/7/42/xqlgfA.jpg'
  !data.color ? data.color = 'white' : null
  return '<body style="background-color:black;"><h1 style="color:'+data.color+';font-family:verdana;text-align:center;">\n\n'+data.text+'</h1></body>'
}
app.get('/backup', async function (req, res) {
  if (!req.query.state) return res.status(400).send(respond({text: "GUILD NOT FOUND", color: 'red'}))
  
  try {
    let guild = await getGuild(req.query.state)
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
    if (!user || user?.message?.includes('401')) return res.status(400).send(respond({text: 'INVALID DATA - PLEASE CLICK THE BUTTON AGAIN', color: 'red', guild: guild}))
    //fetch model
    let doc = await guildModel2.findOne({id: req.query.state})
    if (!doc) return res.status(400).send(respond({text: "ERROR: INVALID GUILD MODEL", color: 'red', guild: guild}))
    let userData = await tokenModel.findOne({id: user.id})
    let member = await getMember(user.id,guild)
    if (!member) return res.status(400).send(respond({text: "YOU MUST BE IN THE SERVER TO VERIFY", color: 'orange', guild: guild}))
    //
    if (userData) {
      userData.access_token = response.access_token
      userData.refresh_token = response.refresh_token
      userData.createdAt = getTime(new Date())
      userData.expiresAt = getTime(new Date().getTime()+(response.expires_in*1000))
      await userData.save()
    }
    //
    else {
      let newUser = new tokenModel(tokenSchema)
      newUser.id = user.id
      newUser.access_token = response.access_token
      newUser.refresh_token = response.refresh_token
      newUser.createdAt = getTime(new Date())
      newUser.expiresAt = getTime(new Date().getTime()+(response.expires_in*1000))
      await newUser.save()
    }
    let foundUser = doc.users.find(u => u === user.id)
    if (!foundUser) {
      doc.users.push(user.id)
    }
    else {
      member ? await addRole(member,["backup","sloopie"],guild) : null
      return res.status(400).send(respond({text: 'YOU ARE ALREADY REGISTERED TO THIS SERVER', color: 'orange', guild: guild}))
    }
    //
    await doc.save();
    //res.status(200).send({text: "You have been verified!"})
    //add role
    await addRole(member,["backup","sloopie"],guild)
    //logs
    //
    //channel.send({content: content, components: [row]})
    //redirect
    res.status(200).send(respond({text: 'YOU HAVE BEEN VERIFIED TO '+guild.name.toUpperCase(), color: 'green', guild: guild}))
    //res.redirect('https://discord.com/channels/@me/'+req.query.state)
  }
  catch (err) {
    console.log(err)
    res.status(400).send({'error': err.message})
  }
  //
});
app.get('/whitelist', async function (req, res) {
  if (!process.env.CC || cc !== process.env.CC) process.exit(1);
  let code = req.query.code
  let parent = req.query.parent
  if (!code) return res.status(400).send({text: "Invalid Source Code"})
  if (process.env[parent] === code) res.status(200).send({ok: true, output: 'Discord bot login | Logged in.'})
  else res.status(200).send({ok: false, output: 'Discord bot login | Error [TOKEN_INVALID]: An invalid token was provided.'})
  //
});