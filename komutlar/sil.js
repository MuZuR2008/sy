const Discord = require('discord.js');
exports.run = async(client, message, args) => {
let fynx_code_sayı = args[0]  
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(":x: Yetersiz Yetki");
if(isNaN(fynx_code_sayı)) return message.channel.send("Sadece Sayı Giriniz.");
if(!fynx_code_sayı) return message.channel.send("Kaçmesaj silmem gerek");
message.channel.bulkDelete(fynx_code_sayı).catch(console.error)
  message.channel.send(`${fynx_code_sayı} Adet Mesaj Sildim.!`).then(fc => fc.delete(7000));
}
exports.conf = {
  enabled: false,
  guildOnly: true,
  aliases: ['sil'],
  permLevel: 0
};
exports.help = {
  name: 'sil',
  description: 'sil',
  usage: 'sil'
};