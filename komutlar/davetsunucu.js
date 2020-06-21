const Discord = require(`discord.js`)

exports.run = async (bot, message, args) => {
  try {
    let invite = await message.channel.createInvite({
      maxAge: args.age * 60,
      maxUses: args.uses
    });
      const sunucubilgi = new Discord.RichEmbed()
    .setColor("BLACK")
    .setTimestamp()
        .setDescription(`**Davet kodu oluşturuldu!** (https://discord.gg/${invite.code})`)
      .setFooter(bot.user.username, bot.user.avatarURL)
    return message.channel.sendEmbed(sunucubilgi).catch(e => {
return
    });
  }
  catch (e) {
return
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['sunucudavet'],
  permLevel: 0
};

exports.help = {
  name: 'dc',
  description: 'sunucudavet',
  usage: 'sunucudavet'
};
//Lord Creative