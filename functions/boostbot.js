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

const fingerprints = require('../storage/fingerprints.json')
async function get_cookies(x, useragent, thread) {
  let headers = {
          'accept': '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-US,en;q=0.9',
          'content-type': 'application/json',
          'origin': 'https://discord.com',
          'referer':'https://discord.com',
          'sec-ch-ua': '"Google Chrome";v="108", "Chromium";v="108", "Not=A?Brand";v="8"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent': useragent,
          'x-debug-options': 'bugReporterEnabled',
          'x-discord-locale': 'en-US','x-super-properties': x}
  let proxies = {
          'http://': 'http://{random.choice(open("input/proxies.txt", "r").read().splitlines())}',
          'https://': 'http://{random.choice(open("input/proxies.txt", "r").read().splitlines())}'
        }
    try {
        let response = await fetch('https://discord.com/api/v10/experiments',headers,proxies)
        let cookie = "locale=en; __dcfduid={response.cookies.get('__dcfduid')}; __sdcfduid={response.cookies.get('__sdcfduid')}; __cfruid={response.cookies.get('__cfruid')}"
        return cookie;
    } catch (err) {
      get_cookies(x, useragent, thread)
    }
}
async function get_fingerprint(thread) {
    try {
      let proxies =  {'http://': 'http://{random.choice(open("input/proxies.txt", "r").read().splitlines())}', 'https://': 'http://{random.choice(open("input/proxies.txt", "r").read().splitlines())}'}
      let fingerprint = await fetch("https://discord.com/api/v10/experiments",proxies)
      let fr = await fingerprint.json()['fingerprint']
      return fr
    } catch (err) {
      console.log(err)
    }        
}
module.exports = {
  get_cookies: get_cookies,
  get_headers: async function (token,thread) {
    let x = fingerprints[getRandom(0,fingerprints.length-1)]['x-super-properties']
    let useragent = fingerprints[getRandom(0,fingerprints.length-1)]['useragent']
    let headers = {
        'accept': '*/*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.9',
        'authorization': token,
        'content-type': 'application/json',
        'origin': 'https://discord.com',
        'referer':'https://discord.com',
        'sec-ch-ua': '"Google Chrome";v="108", "Chromium";v="108", "Not=A?Brand";v="8"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'cookie': await get_cookies(x, useragent, thread),
        'sec-fetch-site': 'same-origin',
        'user-agent': useragent,
        'x-context-properties': 'eyJsb2NhdGlvbiI6IkpvaW4gR3VpbGQiLCJsb2NhdGlvbl9ndWlsZF9pZCI6IjY3OTg3NTk0NjU5NzA1NjY4MyIsImxvY2F0aW9uX2NoYW5uZWxfaWQiOiIxMDM1ODkyMzI4ODg5NTk0MDM2IiwibG9jYXRpb25fY2hhbm5lbF90eXBlIjowfQ==',
        'x-debug-options': 'bugReporterEnabled',
        'x-discord-locale': 'en-US',
        'x-super-properties': x,
        'fingerprint': get_fingerprint(thread)
        
        }

    return headers, useragent
  }
};