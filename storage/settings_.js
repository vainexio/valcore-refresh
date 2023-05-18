//const others = require('../functions/others.js')
const Discord = require('discord.js');
const {Client, Intents, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu} = Discord;
let colors = {
  red: "#ea3737",
  blue: "#1200ff",
  green: "#00ff04",
  yellow: "#fff4a1",
  orange: "#ff6300",
  purple: "#b200ff",
  pink: "#ff00d6",
  cyan: "#00feff",
  black: "#000000",
  white: "#ffffff",
  lime: "#7ebb82",
  none: "#2B2D31",
}
let emojis = {
  gude_cheer: '<:gude_cheer:1056588910794387466>',
  gude_smile: '<:gude_smile:1056580031536697424>',
  //
  check: '<a:check:969936488739512340> ',
  x: '<a:Xmark:969401924736651284>',
  loading: '<a:loading2:976650648600854538>',
  warning: '⚠️',
  online: '<:online_:1004014930959286342>',
  idle: '<:Idle_:1004014897417424938>',
  dnd: '<:dnd_:1004017480613773422>',
  offline: '<:offline_:1004015005282340916>',
  on: '<:on:1107664866484953178>',
  off: '<:off:1107664839372964010>',
}
let keys = [
  'basic',
  'netflix',
  'nf',
  'spoti',
  'nitro',
  'nb',
  'swc',
  'robux',
  'pending',
  'prem',
  'comm',
  'noted',
  'sb',
  'badge',
  'db',
  'canva',
]
module.exports = {
  config: {
    channels: {
      chat: '1047454193595732055',
      templates: '1079712339122720768',
    },
  },
  auth: {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer '+process.env.COC,
      'Content-Type': 'application/json'
    }
  },
  permissions: [
    {
      id: '477729368622497803', //vai
      level: 5,
    },
    {
      id: '530549578802659350', //syn
      level: 5,
    },
    {
      id: "1108411719434375240", //backy user
      level: 5,
    },
    {
      id: "1108422397431918592", //whitelist
      level: 2,
    },
    {
      id: '1047454193184682040', //handler
      level: 2
    },
    {
      id: '',
      level: 2
    },
    {
      id: '',
      level: 2
    },
    {
      id: '',
      level: 2
    },
    {
      id: '',
      level: 2
    },
    {
      id: '',
      level: 2
    },
  ],
  botlog: '901759430457167872',
  prefix: ';',
  filteredWords: [],
  AI: {
    filter: function(string) {
      string = string.replace('As an AI language model, ','')
      string = string.replace(' As an AI language model, ','')
      string = string.replace('an AI language model','gudetama')
      string = string.replace('OpenAI','Sloopies')
      return string;
    },
    chatAPI: 'https://api.openai.com/v1/chat/completions',
    imageAPI: 'https://api.openai.com/v1/images/generations',
    model: "gpt-3.5-turbo"//  
  },
  colors: colors,
  theme: colors.none,
  emojis: emojis,
};