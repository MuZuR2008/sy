const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message, args) => {
  
  if(message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(":no_entry: Bu komudu kullanabilmek için `Sunucuyu Yönet` yetkisine sahip olmalısın!")
  
  let tag = args.join(" ");
  
  if(!tag) return message.channel.send("Ototagı ayarlamak için tag belirtmelisin örn: `-ototag 🔱| -uye-`")
  
  db.set(`otoTag_${message.guild.id}`, tag)
  
  message.channel.send("Ototag başarıyla ayarlandı.")
  
  
  }
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ototag',
  description: 'Ototag sistemini kullandırmaya yarar',
  usage: 'ototag'
};