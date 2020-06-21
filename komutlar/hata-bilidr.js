const Discord = require('discord.js');

exports.run = (client, message, args) => {

    let mesaj = args.slice(0).join(" ")
    if(!mesaj) return message.channel.send(`Bır Mesaj Gır`)
  
  message.react('✅')
  
const embed = new Discord.RichEmbed()

.setColor('RANDOM')
.addField('Bir Mesaj Var',`<@${message.author.id}> Sana Bır Mesaj Gonderdı İşte Mesaj -> ${mesaj}`)

 message.guild.owner.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'hata-bildir',
  description: 'Kurucuya Mesaj Yollar',
  usage: '-hata-bilidr [mesajınız]'
}