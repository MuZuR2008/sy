const Discord = require('discord.js');
const db = require('quick.db');
const djstürkiye = require('../ayarlar.json');

exports.run = async(client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply('Bu komutu kullanabilmek için `Yönetici` iznine sahip olmalısın!')
  let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || djstürkiye.prefix;
  let kanal = message.mentions.channels.first()
  if(!kanal) return message.reply('Kayıt işleminin loglanacağı kanalı etiketlemelisin!')
  await db.set(`kayitlogkanali_${message.guild.id}`, kanal.id)
  message.reply(`Kayıt log kanalı başarıyla ${kanal} olarak ayarlandı!`)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kayit-log'],
  permLevel: 0
};

exports.help = {
  name: 'kayıt-log',
  description: 'Kayıt log kanalı ayarlama - Kayıt sistemi ',
  usage: 'kayıt-log #kanal',
  kategori: 'yetkili'
};