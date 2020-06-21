const discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, msg, args) => {
  
  let kullanıcı = msg.guild.members.get(msg.author.id)
  const isim = kullanıcı.displayName;
  
let sebep = args[0]
if(!sebep) return msg.channel.send('AFK olma sebebini girmedin')
 var embed = new discord.RichEmbed()
.setColor("BLUE")
.setDescription(`<@${msg.author.id}> Başarıyla **${sebep}** nedeniyle AFK oldu!`)
msg.channel.send(embed)
msg.member.setNickname(`[AFK] ` + isim)
  db.set(`afkK_${msg.author.id}`, isim);
  db.set(`afk_${msg.author.id}`, sebep);
  };
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
};

exports.help = {
  name: 'afk',
  description: 'Sunucuda afk olmaya yarar.',
  usage: 'n!afk <sebep>'
};