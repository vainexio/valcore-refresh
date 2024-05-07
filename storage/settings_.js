//const others = require('../functions/others.js')
const Discord = require('discord.js');
const {Client, Intents, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu} = Discord;
let colors = {
  red: "#ff5e5e",
  blue: "#6b8eff",
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
  check: '<a:check:969936488739512340> ',
  x: '<a:Xmark:969401924736651284>',
  loading: '<a:loading2:976650648600854538>',
  warning: '<:S_warning:1108743925012902049>',
  online: '<:online_:1004014930959286342>',
  idle: '<:Idle_:1004014897417424938>',
  dnd: '<:dnd_:1004017480613773422>',
  offline: '<:offline_:1004015005282340916>',
  on: '<:on:1107664866484953178>',
  off: '<:off:1107664839372964010>',
}
module.exports = {
  config: {
    customMessages: [
      {
        id: '497918770187075595', //
        msg: '!?@?!@?!?@',
      },
      {
        id: '748461950605852723', //
        msg: 'Welkam chasoer',
      },
      {
        id: '772339611523350568', //
        msg: 'Bonjur chris',
      },
      {
        id: '1214504712829931550', //
        msg: 'Bonjor nard',
      },
      {
        id: '1202864381537554495', //
        msg: 'Belo pinzot',
      },
      {
        id: '1214564759219736598', //
        msg: 'Ho mikel',
      },
      {
        id: '563578598766805022', //
        msg: 'Welkam sir Mojica',
      },
      {
        id: '711514337205944371', //
        msg: 'Hola totoy na black',
      },
      {
        id: '1146368770084982847', //
        msg: 'Hai bea',
      },
      {
        id: '761368188419047434', //
        msg: 'Halo nikowel',
      },
      {
        id: '786805099908825088', //
        msg: 'Welkam classmeta',
      },
    ],
    backupVouches: [
      {
        original: '',
        backup: 'https://discord.com/api/webhooks/1212757258820259960/K69rjfqN3vipcbyn_YjQxgUFbODGOfaLBpXgFv5V8ipLU12GWwmsard2peZArVRU_CbW',
        condition: function(msg) { if (msg.attachments.size !== 0) return true }
      },
      {
        original: '',
        backup: 'https://discord.com/api/webhooks/1212767455269748826/HX6l5OTKVcsSJ7Yc8GYK70K3FdjOKxuIoVzpbcdkBg6rg3QMUm5dyI9rKl2NEKXdueTt',
        condition: function(msg) { if (msg.content.toLowerCase().includes('vouch')) return true }
      },
    ],
    version: '2',
    guildMaxtokens: 500,
    guildTokens: [
      { id: '1109020434449575936', maxTokens: 100000},
    ],
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
      id: '1066284097879670824', //vai
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
      id: "1111647165928964117", //whitelist
      level: 2,
    },
    {
      id: '1047454193184682040', //handler
      level: 2
    },
    {
      id: '1109342180918702090', //whitelist 2
      level: 2
    },
    {
      id: '497918770187075595', //ian alt hehe
      level: 5
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
  theme: colors.red,
  emojis: emojis,
};