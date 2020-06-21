const Discord = require("discord.js");

exports.run = async (client,message,args) => {
if(message.author.id !== "717411894897672212")return message.channel.send("Bunu Kullanmak için Yeterli Yetkiye sahip Değilsin");
if(args[0] === "rahatsız") {
client.user.setStatus("dnd");
message.channel.send('Durumum artık **Rahatsız Etmeyin**.');
}
if(args[0] === "boşta") {
  client.user.setStatus("idle");
  message.channel.send('Durumum artık **Boşta**.');
  }
  if(args[0] === "çevrimiçi") {
    client.user.setStatus("online");
    message.channel.send('Durumum artık **Çevrimiçi**.');
    }
    /*if(args[0] === "çevrimdışı") {
      message.channel.send('Durumum Artık **Offline**');
      }*/
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'durum-değiştir',
  description: 'BOTUN DURUMUNU Değiştirirsiniz(Kodu Paylaşan Annesiz).',
  usage: '!durum-değiştir <durum>'
};