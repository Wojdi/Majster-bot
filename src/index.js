const Discord = require('discord.js')
const { Client, MessageEmbed } = require('discord.js')
const chalk = require('chalk')
const config = require('./config/config.js')
const client = new Discord.Client()
const prefix = config.prefix
const author = config.author
const version = config.version
const description = config.description

client.on('debug', (msg) => {
  //console.log(client.info)
})
client.on('warn', (msg) => {
  console.log(chalk.yellow(client.info))
})
client.on('error', (msg) => {
  console.log(chalk.red(client.error))
})

client.on('ready', () => {
  console.log(chalk.blue(`Majster bot startuje...`))
  console.log(chalk.green(`Zalogowano jako ${client.user.tag}`))
})

client.on('message', msg => {
  if (msg.content === '🥙') {
    msg.react('🌮')
  }
  if (msg.author.bot || !msg.guild) return
  if (!msg.content.startsWith(prefix)) return

  const args = msg.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g)
  const cmd = args.shift().toLocaleLowerCase()
  
  //console.log(cmd)

  if (cmd === 'ping') {
    msg.reply('Pong!')
  }
  if (cmd === 'prefix') {
    msg.channel.send(`Prefix bota to: **${prefix}**`)
  }
  if (cmd === 'info') {
    const info = new MessageEmbed()
      .setTitle('Majster-bot Info')
      .setColor(0xff6100)
      .setDescription('Najważniejsze informacje o bocie')
      .addField('Nick: ', client.user.tag, true)
      .addField('Autor: ', author, true)
      .addField('Wersja: ', version, true)
      .addField('Prefix: ', prefix)
      .addField('Opis: ', description)
      .setURL('https://github.com/Wojdi/Majster-bot')
      .setFooter('Zgłoś błąd: https://github.com/Wojdi/Majster-bot/issues')
    msg.channel.send(info)
  }
})

client.login(config.token)