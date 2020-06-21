const Discord = require('discord.js');
exports.run = (client, message, args) => {
      
   if (!message.guild) {
  return message.author.send(':x: Bu komut özel mesajlarda kullanma kapatılmıştır.'); }  
  if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(`Bu komutu kullanabilmek için **Kullanıcıları At** yetkisine sahip olmalısın.`);
  let sunucu = message.guild;
  let uyarilacak = message.mentions.users.first();
  let sebep = args.slice(1).join(' ');
  if (message.mentions.users.size < 1) return message.channel.send('Uyaracağın kişiyi etiketlemelisin.').catch(console.error);
  if (sebep.length < 1) return message.channel.send('Uyaracağım kişiyi neden uyarmam gerektiğini yazmalısın.');
  message.channel.send('Kişiyi başarıyla uyardım, özel mesajlarında uyarısı gözükecektir.')
  return uyarilacak.send(`${sunucu} sunucusunda \`${sebep}\` sebebiyle uyarıldın.`);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['uyarı', 'uyarıver'],
  permlevel: 0
};

exports.help = {
  name: 'uyar',
  description: 'Belirtilen kullanıcıyı özel mesajlarında gözükecek şekilde uyarır.',
  usage: 'uyarı'
};