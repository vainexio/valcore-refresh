//const others = require('../functions/others.js')
const Discord = require('discord.js');
const {Client, Intents, MessageEmbed, MessageActionRow, MessageButton} = Discord;
let colors = {
  red: "#ea3737",
  blue: "#1200ff",
  green: "#00ff04",
  yellow: "#fff700",
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
  bk: '<:BK:1009051859052408934>',
  troop: '<:barbarian:1009052124044341318>',
  ragedTroop: '<:ragedbarbarian:316157730735915009>',
  superTroop: '<:superpekka:316157731302146050>',
  spell: '<:haste:1009052232395796510>',
  clanLvl: '<:clanlvl:1009008695964872785>',
  xp: '<:xp:1008993739831771228>',
  capital: '<:capitalgold:1008993244383821874>',
  castle: '<:clancastle:1008981082047250462>',
  empty1: '<:first_empty:997879999174549514>',
  empty2: '<:middle_empty:997879976093294622>',
  empty3: '<:last_empty:997880276363526294> ',
  half1: '<:first_half:997879008517705738>',
  half2: '<:middle_half:997879179603365971>',
  half3: '<:last_half:997879147856662548>',
  full1: '<:first_full:997879046560034906>',
  full2 : '<:middle_full:997879113522090064>',
  full3: '<:last_full:997879088553414736>',
  valorant: '<:VALORANT:993795757738045530>',
  eye: '👁️',
  like: '<:like:979589193653166080>',
  like2: '<:like2:1007978935411298305>',
  like3: '<:like3:1007979257772916877>',
  like4: '<:like4:1007978969208979466>',
  like5: '<:like5:1007978989903687832>',
  like6: '<:like6:1007979036607266897>',
  valcore: '<:valcore:977737649794195456>',
  check: '<a:check:969936488739512340>',
  x: '<a:Xmark:969401924736651284>',
  loading: '<a:loading:968743431528669210>',
  prefix: '\\❕',
  warning: '⚠️',
  lock: '🔒',
  scale: '⚖️',
  unlock: '🔓',
  badge3: '<:badge3:1007991213649051678>',
  badge2: '<:badge2:1007991209664454677>',
  badge: '<:badge:1007990502546743336> ',
  topBadge: '\\🎗️',
  redBox: '\\🟥',
  blueBox: '\\🟦',
  greenBox: '\\🟩',
  blueCircle: '\\🔵',
  redCircle: '\\🔴',
  greenCircle: '\\🟢',
  online: '<:online_:1004014930959286342>',
  idle: '<:Idle_:1004014897417424938>',
  dnd: '<:dnd_:1004017480613773422>',
  offline: '<:offline_:1004015005282340916>',
}
let keys = [
  'netflix',
  'spotify',
  'nitro',
  'swc',
  'robux',
  'gc',
  'gs',
  'pending',
  'prem',
  'comm',
  'noted',
  'sb',
]
//const {makeButton} = others
module.exports = {
  filteredWords: [
    'iglipa',
    'justin',
    '1glipa',
    'lipa',
    'paolo',
    'elsa',
    'ramil',
  ],
  AI: {
    filter: function(string) {
      //string = string.replace('as an ai language model, ','')
      string = string.replace('As an AI language model, ','')
      string = string.replace(' As an AI language model, ','')
      string = string.replace('an AI language model','I am a clueless egg')
      string = string.replace('OpenAI','Sloopies')
      return string;
    },
    chatAPI: 'https://api.openai.com/v1/completions',
    chatAPI: 'https://api.openai.com/v1/chat/completions',
    imageAPI: 'https://api.openai.com/v1/images/generations',
    model: "gpt-3.5-turbo",
    
  },
  shop: {
    followUps: [],
    customRoles: [
      {
        user: '482603796371865603', //mimi
        role: '1070267838922752060',
      },
    ],
    scanner: [],
    randomVouchers: {
      amount: [1,2,3,4,5,1,2,3,4,5,6,7,8,9,10],
      type: [
        "dev badge",
        "game creds",
        "premium",
        "global",
        "nitro",
      ]
    },
    vouchers: [
      {
        code: 'kjsansuH82edLDKEn2',
        perks: '₱5 voucher',
      },
      {
        code: 'KJCNAEIixdfe93289djc',
        perks: 'Free dev badge on next purchase',
      },
    ],
    channels: {
      announcements: '1071049104001601586',
      status: '1054766857552396419',
      vouch: '1054724474659946606',
    },
    stickyChannels: [
      {
        id: '1047454193595732049',
        message: '<a:nitroboost:1057999297787985960> __**Server Boost Perks**__\n— ₱5 voucher on next purchase\n— Image/Gif perms in <#1047454193595732055> \n— **Sloopier** role\n— **Sloopiest** role (2x boost)\n— 2x giveaway entries',
      },
      {
        id: '1054724474659946606',
        message: '<a:catpet:1054020868650578081> __**Vouch here!**__\n\n• Send any message of acknowledgement\n• Send screenshot of your purchase\n\n<:mark:1056579773989650543> **Void warranty if:**\n• no vouch/improper vouch\n• no screenshot/proof of login\n• did not vouch within 12 hours\n• reference code is not visible',
      },
      {
        id: '1054731027240726528',
        message: '<:gude1:1056579657828417596> — Noted\n<:gude2:1056579660353372160> — Processing\n<:gude3:1056579662572179586> — Completed',
      },
      {
        id: '1055030500508569620',
        message: '<:gude1:1056579657828417596> — Noted\n<:gude2:1056579660353372160> — Ready to claim\n<:gude3:1056579662572179586> — Claimed',
      },
      {
        id: '1063760992686841887',
        message: '<:gude1:1056579657828417596> — Noted\n<:gude2:1056579660353372160> — Fixing\n<:gude3:1056579662572179586> — Fixed',
      },
      {
        id: '1054720449835171900',
        message: '',
        comp: new MessageActionRow()
        .addComponents(
          new MessageButton().setLabel('Order Here').setURL('https://discord.com/channels/1047454193159503904/1054711675045036033/1060248361107722290').setStyle('LINK').setEmoji('<:09:1069200736631656518>')
        ),
      },
      {
        id: '1071049104001601586',
        message: '',
        order: true,
        comp: new MessageActionRow()
        .addComponents(
          new MessageButton().setLabel('Order Here').setURL('https://discord.com/channels/1047454193159503904/1054711675045036033/1060248361107722290').setStyle('LINK').setEmoji('<:09:1069200736631656518>')
        )
      },
      {
        id: '0',
        message: '**Notification Roles** <:07:1069200743959109712>',
        roles: true,
        comp: null,
      },
      {
        id: '0',
        message: '**Notification Roles** <:07:1069200743959109712>',
        roles: true,
        comp: null,
      },
      {
        id: '1054731483656499290',
        message: 'You can request for follow up, if you think that your order is taking too long.',
        condition: message => keys.find(k => message.channel.name.includes('iu3rhd3wudn')),
        comp: new MessageActionRow()
        .addComponents(
          new MessageButton().setLabel('Request Follow-up').setStyle('SECONDARY').setEmoji('<:rules1:1054722952899342377>').setCustomId('followup'),
          new MessageButton().setLabel('Mark as Done').setStyle('PRIMARY').setEmoji('📬').setCustomId('done'),
        ),
      },
      {
        id: '1047454193197252644',
        message: '*Pick your age*',
        comp: new MessageActionRow()
        .addComponents(
          new MessageButton().setLabel('13-15').setStyle('DANGER').setEmoji('🐣').setCustomId('roles-13-15'),
          new MessageButton().setLabel('16-18').setStyle('DANGER').setEmoji('🐥').setCustomId('roles-16-18'),
          new MessageButton().setLabel('19-21').setStyle('DANGER').setEmoji('🐔').setCustomId('roles-19-21'),
          new MessageButton().setLabel('22+').setStyle('DANGER').setEmoji('🍗').setCustomId('roles-22+')
        ),
      },
      {
        id: '1047454193197252644',
        message: '*Pick which games you play*',
        comp: new MessageActionRow()
        .addComponents(
          new MessageButton().setLabel('Minecraft').setStyle('SECONDARY').setEmoji('🎮').setCustomId('roles-Minecraft'),
          new MessageButton().setLabel('Valorant').setStyle('SECONDARY').setEmoji('🎮').setCustomId('roles-Valorant'),
          new MessageButton().setLabel('Roblox').setStyle('SECONDARY').setEmoji('🎮').setCustomId('roles-Roblox'),
          new MessageButton().setLabel('Genshin').setStyle('SECONDARY').setEmoji('🎮').setCustomId('roles-Genshin'),
          new MessageButton().setLabel('COD').setStyle('SECONDARY').setEmoji('🎮').setCustomId('roles-COD')
        ),
      },
      {
        id: '1047454193197252644',
        message: '*Pick which games you play (2)*',
        comp: new MessageActionRow()
        .addComponents(
          new MessageButton().setLabel('CSGO').setStyle('SECONDARY').setEmoji('🎮').setCustomId('roles-CSGO'),
          new MessageButton().setLabel('DOTA').setStyle('SECONDARY').setEmoji('🎮').setCustomId('roles-DOTA'),
          new MessageButton().setLabel('Overwatch').setStyle('SECONDARY').setEmoji('🎮').setCustomId('roles-Overwatch'),
          new MessageButton().setLabel('LOL').setStyle('SECONDARY').setEmoji('🎮').setCustomId('roles-LOL'),
          new MessageButton().setLabel('Mobile Legends').setStyle('SECONDARY').setEmoji('🎮').setCustomId('roles-Mobile_Legends')
        ),
      },
      {
        id: '1047454193197252644',
        message: '*Pick your pronouns*',
        comp: new MessageActionRow()
        .addComponents(
          new MessageButton().setLabel('He/Him').setStyle('SECONDARY').setEmoji('♂️').setCustomId('roles-He/Him'),
          new MessageButton().setLabel('She/Her').setStyle('SECONDARY').setEmoji('♀️').setCustomId('roles-She/Her'),
          new MessageButton().setLabel('They/Them').setStyle('SECONDARY').setEmoji('👥').setCustomId('roles-They/Them'),
        ),
      },
      {
        id: '1047454193197252644',
        message: '*Pick which notifications you want to get*',
        comp: new MessageActionRow()
        .addComponents(
          new MessageButton().setLabel('Announcements').setStyle('SECONDARY').setEmoji('🔔').setCustomId('roles-Announcement'),
          new MessageButton().setLabel('Stocks').setStyle('SECONDARY').setEmoji('🔔').setCustomId('roles-Stocks'),
          new MessageButton().setLabel('Shop Status').setStyle('SECONDARY').setEmoji('🔔').setCustomId('roles-Shop_Status')
        ),
      }
    ],
  },
  notices: {
    n1: "You were temporarily stripped from the **Sloopie** role. We detected a presence activity that is prohibited from our server!\n\n- We do not allow off-server advertisements through custom status.\n- We do not allow NSFW/inap usernames.\n- Other reasons specified in <#1047454193197252643>\n\nIf you removed the said prohibitions, feel free to reclaim your role in <#1047454193197252643>!",
  },
  interExpire: 300000,
  auth: {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer '+process.env.COC,
      'Content-Type': 'application/json'
    }
  },
  commands: [
    {
      Command: "forceall",
      Template: "",
      Alias: [],
      Category: "Misc",
      Desc: 'Unset.',
      ex: [''],
      level: 0,
    },
    {
      Command: "use",
      Template: "",
      Alias: [],
      Category: "Misc",
      Desc: 'Unset.',
      ex: [''],
      level: 0,
    },
    {
      Command: "help",
      Template: "",
      Alias: [],
      Category: "Misc",
      Desc: 'Unset.',
      ex: [''],
      level: 0,
    },
  ],
  permissions: [
  {
    id: "920903240617451581", //collateral
    level: 5,
  },
  {
    id: "1047454193184682040", //collateral
    level: 3,
  },
    {
      id: "1060181927723814972", //sloopie mod
      level: 5,
    },
    {
      id: "477729368622497803",
      level: 5,
    },
    {
      id: '1060780494909870230',
      level: 5
    }
],
  botlog: '901759430457167872',
  prefix: ';',
  assets: {},
  status: {
  enabled: true,
  valorant: true,
  ping: true,
},
  colors: colors,
  theme: colors.yellow,
  emojis: emojis,
};