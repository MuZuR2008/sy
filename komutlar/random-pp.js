const Discord = require("discord.js");

exports.run = function(client, message, args) {
  if(!message.member.hasPermission("ADMINISTRATOR")) return;
  setInterval(() => {
    const dcss = message.guild.members.random().user.avatarURL;
    const dcs = new Discord.RichEmbed()
      .setImage('' + dcss + '')
      .setColor("RANDOM")
      .setTimestamp();
    message.channel.send(dcs);
  }, 5000); //Bu Zaman Aralığıdır! Her 1000 = 1 Saniye 
}; //Not: Bot Resetlenince Durur!

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: "random-pp"
};