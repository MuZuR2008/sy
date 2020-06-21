const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');////////fynx
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const weather = require('weather-js')
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');////////fynx
const request = require('request');
const snekfetch = require('snekfetch');
const queue = new Map();
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
////////fynx

const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`https://trusted-foremost-holiday.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {////////fynx
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);/////////fynx
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });////////fynx
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });/////////lordcreative
            resolve();
        } catch (e) {
            reject(e);
        }////////fynx
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};/////////lordcreative




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {////////fynx
            reject(e);
        }/////////lordcreative
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};/////////lordcreative
//YAPAMIYAN OLURSA LORD CREATİVE'E SORABİLİRSİNİZ VEYA FYNX DİSCORDUNDAN YARDIM ALABİLİRSİNİZ

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   l0RDconsole.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// }); //DEVİLHOUSE//

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);////////fynx

//---------------------------------KOMUTLAR---------------------------------\\


client.on('guildMemberAdd', member => {
  let guild = member.guild;
  const channel = member.guild.channels.find('name', 'KAYIT KANAL İSMİ');
  if (!channel) return;
  const embed = new Discord.RichEmbed()
  .setColor('RED')
        .setAuthor(`Fynx| Kayıt Sistemi`)
            .addField(`Fynx Sınır Kapısına Hoş Geldin`,`**Hoşgeldin** ${member} **Seninle \`${member.guild.memberCount}\` Kişiyiz**`)
         .addField(`Kayıt Olmak İçin`,`**İsmini ve Yaşını Yaz │ Kayıt Ekibimiz  İlgilenecektir**`)
  channel.sendEmbed(embed); 
});



	client.on("message", async message => {
    let uyarisayisi = await db.fetch(`reklamuyari_${message.author.id}_${message.guild.id}`);
    let reklamkick = await db.fetch(`reklamkick_${message.guild.id}`)
    let kullanici = message.member;
    if (reklamkick == 'kapali') return;
    if (reklamkick == 'acik') {
        const reklam = ["discord.app", "discord.gg", "invite", "discordapp", "discordgg", ".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az",];
        if (reklam.some(word => message.content.toLowerCase().includes(word))) {
            if (!message.member.hasPermission("ADMINISTRATOR")) {
                message.delete();
                db.add(`reklamuyari_${message.author.id}_${message.guild.id}`, 1)
                if (uyarisayisi === null) {
             
                  message.channel.send(`<@${message.author.id}>  Reklam Kick Sistemine Yakalandın! Reklam Yapmaya Devam Edersen \`Atılma ve Banlanma\` İhtimalin Var! (1/5)`)
              .then(msg => msg.delete(5000)) 
}
                if (uyarisayisi === 1) {
           
                      message.channel.send(`<@${message.author.id}>  Reklam Kick Sistemine Yakalandın! Reklam Yapmaya Devam Edersen \`Atılma ve Banlanma\` İhtimalin Var! (2/5)`)
                 .then(msg => msg.delete(5000)) 
                }
              
              if (uyarisayisi === 2) {
           
                      message.channel.send(`<@${message.author.id}>  Reklam Kick Sistemine Yakalandın! Reklam Yapmaya Devam Edersen \`Atılma ve Banlanma\` İhtimalin Var! (3/5)`)
               .then(msg => msg.delete(5000))   
              }
              
              if (uyarisayisi === 3) {
           
                      message.channel.send(`<@${message.author.id}> Reklam Kick Sistemine Yakalandın! Reklam Yapmaya Devam Edersen \`Atılma ve Banlanma\` İhtimalin Var! (4/5)`)
               .then(msg => msg.delete(5000))   
              }
              
                if (uyarisayisi === 4) {
                    message.delete();
                    await kullanici.kick({
                        reason: `REKLAM`,
                    })
           
                       message.channel.send(`<@${message.author.id}> 5 Defa Reklam Yaptığı İçin Sunucudan Attım! Bir Daha Yaprsa **Banlıcam.**`)
         .then(msg => msg.delete(60000))     
                }
                if (uyarisayisi === 5) {
                    message.delete();
                    await kullanici.ban({
                        reason: `REKLAM`,
                    })
                    db.delete(`reklamuyari_${message.author.id}_${message.guild.id}`)
                
                       message.channel.send(`<@${message.author.id}> Reklam Yaptığı İçin Önce **Atıldı.** Fakat Tekrardan Gelip Reklam Yaptığı İçin **Banladım.**`)
                .then(msg => msg.delete(60000)) 
                  
}
}
}
}
});

///otorol///
client.on("guildMemberAdd", async (member, guild, message) => {
  let role = db.fetch(`otorolisim_${member.guild.id}`);
  let otorol = db.fetch(`autoRole_${member.guild.id}`);//Lord Creative
  let i = db.fetch(`otorolKanal_${member.guild.id}`);
  if (!otorol || otorol.toLowerCase() === "yok") return;
  else {
    try {
      if (!i) return;
      if (!role) {
        member.addRole(member.guild.roles.get(otorol));
        var embed = new Discord.RichEmbed()
          .setDescription(
            "**Sunucuya Yeni Katılan** @" +
              member.user.tag +
              " **Kullanıcısına** <@&" +
              otorol +
              ">  **Rolü verildi:white_check_mark:**"
          )
          .setColor("0x36393E")
          .setFooter(`wonders Otorol Sistemi`);
        member.guild.channels.get(i).send(embed);
      } else if (role) {
        member.addRole(member.guild.roles.get(otorol));
        var embed = new Discord.RichEmbed()
          .setDescription(
            `**Sunucuya Yeni Katılan** \`${member.user.tag}\` **Kullanıcısına** \`${role}\` **Rolü verildi. <a:blobjoining:696373472431177781>**`
          )
          .setColor("0x36393E")
          .setFooter(`Fays Otorol Sistemi`);
        member.guild.channels.get(i).send(embed);
      }
    } catch (e) {
      console.log(e);
    }
  }
});
///küfür///
client.on("message", async msg => {
  if (msg.author.bot) return;
  if (msg.channel.type === "dm") return;

  let i = await db.fetch(`küfürFiltre_${msg.guild.id}`);
  if (i == "acik") {
    const küfür = [
      "amcık",
      "yarrak",
      "orospu",
      "piç",
      "sikerim",
      "sikik",
      "amına",
      "pezevenk",
      "yavşak",
      "ananı",
      "anandır",
      "orospu",
      "evladı",
      "göt",
      "pipi",
      "sokuk",
      "yarak",
      "bacını",
      "karını",
      "amk",
      "aq",
      "mk",
      "anaskm"
    ];
    if (küfür.some(word => msg.content.toLowerCase().includes(word))) {
      try {
        if (!msg.member.hasPermission("MANAGE_WEBHOOKS")) {
          msg.delete();
          let embed = new Discord.RichEmbed()
            .setColor(0xffa300)
            .setFooter("Küfür Sistemi", client.user.avatarURL)
            .setAuthor(
              msg.guild.owner.user.username,
              msg.guild.owner.user.avatarURL
            )
            .setDescription(
              "PinkCode, " +
                `***${msg.guild.name}***` +
                " adlı sunucunuzda küfür yakaladım."
            )
            .addField(
              "Küfür Eden Kişi",
              "Kullanıcı: " + msg.author.tag + "\nID: " + msg.author.id,
              true
            )
            .addField("Engellenen mesaj", msg.content, true)
            .setTimestamp();
          msg.guild.owner.user.send(embed);
          return msg.channel
            .send(
              `${msg.author}, Küfür Etmek Yasak! Senin Mesajını Özelden Kurucumuza Gönderdim.`
            )
            .then(msg => msg.delete(25000));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!i) return;
});
///reklam///
client.on("message", async msg => {
  let antoxd = await db.fetch(`antoxd${msg.guild.id}`);
  if (antoxd === "acik") {//Lord Creative
    const reklam = ["discord.gg", "https://discordapp.com/invite/"];
    if (reklam.some(word => msg.content.includes(word))) {
      msg.delete();
    }
  }
});

client.on("message", async msg => {
  if (msg.author.bot) return;
  if (msg.channel.type === "dm") return;

  let i = await db.fetch(`reklamFiltre_${msg.guild.id}`);
  if (i == "acik") {
    const reklam = [
      "discord.app",
      "discord.gg",
      "invite",
      "discordapp",
      "discordgg",
      ".com",
      ".net",//Lord Creative
      ".xyz",
      ".tk",
      ".pw",
      ".io",
      ".me",
      ".gg",
      "www.",
      "https",
      "http",
      ".gl",
      ".org",
      ".com.tr",
      ".biz",
      ".party",
      ".rf.gd",
      ".az"
    ];
    if (reklam.some(word => msg.content.toLowerCase().includes(word))) {
      try {
        if (!msg.member.hasPermission("MANAGE_GUILD")) {
          msg.delete();
          let embed = new Discord.RichEmbed()
            .setColor(0xffa300)
            .setFooter(
              "Reklam engellendi.",
              client.user.avatarURL
            )
            .setAuthor(
              msg.guild.owner.user.username,
              msg.guild.owner.user.avatarURL
            )
            .setDescription(
              " Reklam Sistemi, " +
                `**${msg.guild.name}**` +
                " Adlı Sunucuda Reklam Yakaladım."
            )
            .addField(
              "Reklamı yapan kişi",
              "Kullanıcı: " + msg.author.tag + "\nID: " + msg.author.id,
              true
            )
            .addField("Engellenen mesaj", msg.content, true)
            .setTimestamp();
          msg.guild.owner.user.send(embed);
          return msg.channel
            .send(`${msg.author.tag}, Reklam Yapmak Yasak!`)
            .then(msg => msg.delete(25000));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!i) return;
});

client.on("message", async message => {
    const ms = require("ms");
    const prefix =
      (await require("quick.db").fetch(`prefix_${message.guild.id}`)) ||
      ayarlar.prefix;
    const args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g);
    const command = args.shift().toLowerCase();
    let u = message.mentions.users.first() || message.author;
    if (command === "sunucu-kur") {
      if (
        message.guild.channels.find(channel => channel.name === "Bot Kullanımı")
      )
        return message.channel.send(" Bot Paneli Zaten Ayarlanmış.");
      if (!message.member.hasPermission("ADMINISTRATOR"))
        return message.channel.send(
          " Bu Kodu `Yönetici` Yetkisi Olan Kişi Kullanabilir."
        );
      message.channel.send(
        `Bot Bilgi Kanallarının kurulumu başlatılsın mı? başlatılacak ise **evet** yazınız.`
      );
      message.channel
        .awaitMessages(response => response.content === "evet", {
          max: 1,
          time: 10000,
          errors: ["time"]
        })
        .then(collected => {
          message.guild.createChannel("|▬▬|ÖNEMLİ KANALLAR|▬▬|", "category", [
            {
              id: message.guild.id,
              deny: ["SEND_MESSAGES"]
            }
          ]);

          message.guild
            .createChannel("「📃」kurallar", "text", [
              {
                id: message.guild.id,
                deny: ["SEND_MESSAGES"]
              }
            ])//Lord Creative
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|"
                )
              )
            );
          message.guild
            .createChannel("「🚪」gelen-giden", "text", [
              {
                id: message.guild.id,
                deny: ["SEND_MESSAGES"]
              }
            ])
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|"
                )
              )
            );
          message.guild
            .createChannel("「✅」sayaç", "text", [
              {
                id: message.guild.id,
                deny: ["SEND_MESSAGES"]
              }
            ])
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|"
                )
              )
            );
          message.guild
            .createChannel("「💾」log-kanalı", "text", [
              {
                id: message.guild.id,
                deny: ["SEND_MESSAGES"]
              }
            ])
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|"
                )
              )
            );
          message.guild
            .createChannel("「📢」duyuru-odası", "text", [
              {
                id: message.guild.id,
                deny: ["SEND_MESSAGES"]
              }
            ])//Lord Creative
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|"
                )
              )
            );
        })
        .then(collected => {
          message.guild.createChannel("|▬▬|GENEL KANALLAR|▬▬|", "category", [
            {
              id: message.guild.id
            }
          ]);

          message.guild
            .createChannel(`「💡」şikayet-ve-öneri`, "text")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|"
                )
              )
            );
          message.guild
            .createChannel(`「👥」pre-arama-odası`, "text")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|"
                )
              )
            );
          message.guild
            .createChannel(`「📷」görsel-içerik`, "text")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|"
                )
              )
            );
          message.guild
            .createChannel(`「🤖」bot-komutları`, "text")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|"
                )
              )
            );
          message.guild
            .createChannel(`「💬」sohbet`, "text")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(//Lord Creative
                  channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|"
                )
              )
            );

          message.guild
            .createChannel(`🏆》Kurucu Odası`, "voice")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|SES KANALLARI|▬▬|"
                )
              )
            )
            .then(c => {
              let role = message.guild.roles.find("name", "@everyone");
              let role2 = message.guild.roles.find("name", "Kurucu");

              c.overwritePermissions(role, {
                CONNECT: false
              });
              c.overwritePermissions(role2, {
                CONNECT: true
              });
            });

          message.guild.createChannel("|▬▬|SES KANALLARI|▬▬|", "category", [
            {
              id: message.guild.id
            }
          ]);

          message.guild
            .createChannel(`🏆》Yönetici Odası`, "voice")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|SES KANALLARI|▬▬|"
                )
              )
            )
            .then(c => {
              let role = message.guild.roles.find("name", "@everyone");
              let role2 = message.guild.roles.find("name", "Kurucu");
              let role3 = message.guild.roles.find("name", "Yönetici");
              c.overwritePermissions(role, {
                CONNECT: false
              });
              c.overwritePermissions(role2, {
                CONNECT: true
              });
              c.overwritePermissions(role3, {
                CONNECT: true
              });
            });

          message.guild//Lord Creative
            .createChannel(`💬》Sohbet Odası`, "voice")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|SES KANALLARI|▬▬|"
                )
              )
            )
            .then(c => {
              let role = message.guild.roles.find("name", "@everyone");
              c.overwritePermissions(role, {
                CONNECT: true
              });
            });

          message.guild.createChannel("|▬▬|OYUN ODALARI|▬▬|", "category", [
            {
              id: message.guild.id
            }
          ]);

          message.guild
            .createChannel(`🎮》LOL`, "voice")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
                )
              )
            );
          message.guild
            .createChannel(`🎮》ZULA`, "voice")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
                )
              )
            );
          message.guild
            .createChannel(`🎮》COUNTER STRİKE`, "voice")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
                )
              )
            );
          message.guild
            .createChannel(`🎮》PUBG`, "voice")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
                )//Lord Creative
              )
            );
          message.guild
            .createChannel(`🎮》FORTNİTE`, "voice")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
                )
              )
            );
          message.guild
            .createChannel(`🎮》MİNECRAFT`, "voice")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
                )
              )
            );
          message.guild
            .createChannel(`🎮》ROBLOX`, "voice")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
                )
              )
            );
          message.guild
            .createChannel(`🎮》WOLFTEAM`, "voice")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
                )
              )
            );

          message.guild.createRole({
            name: "Kurucu",
            color: "RED",
            permissions: ["ADMINISTRATOR"]
          });

          message.guild.createRole({
            name: "Yönetici",
            color: "BLUE",
            permissions: [
              "MANAGE_GUILD",
              "MANAGE_ROLES",
              "MUTE_MEMBERS",
              "DEAFEN_MEMBERS",
              "MANAGE_MESSAGES",
              "MANAGE_NICKNAMES",
              "KICK_MEMBERS"
            ]
          });
//Lord Creative
          message.guild.createRole({
            name: "Moderatör",
            color: "GREEN",
            permissions: [
              "MANAGE_GUILD",
              "MANAGE_ROLES",
              "MUTE_MEMBERS",
              "DEAFEN_MEMBERS",
              "MANAGE_MESSAGES",
              "MANAGE_NICKNAMES"
            ]
          });

          message.guild.createRole({
            name: "V.I.P",
            color: "00ffff"
          });

          message.guild.createRole({
            name: "Üye",
            color: "WHITE"
          });

          message.guild.createRole({
            name: "Bot",
            color: "ORANGE"
          });
//Lord Creative
          message.channel.send("Gerekli Odalar Kuruldu!");
        });
    }
  });
//Lord Creative
client.on('ready', () =>{
client.channels.get('722540071684800583').join()
})

client.on("message", async message => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || ayarlar.prefix;

  let kullanıcı = message.mentions.users.first() || message.author;
  let afkdkullanıcı = await db.fetch(`afk_${message.author.id}`);
  let afkkullanıcı = await db.fetch(`afk_${kullanıcı.id}`);
  let sebep = afkkullanıcı;
   let isim = db.fetch(`afkK_${message.author.id}`);

  if (message.author.bot) return;
  if (message.content.includes(`${prefix}afk`)) return;

  if (message.content.includes(`<@${kullanıcı.id}>`)) {
    if (afkdkullanıcı) {
    const embed = new Discord.RichEmbed()
      .setColor('BLUE')
      .setDescription(`<@${message.author.id}> adlı kullanıcı artık AFK değil!`)
       message.channel.send(embed)
      db.delete(`afk_${message.author.id}`);
  }
    if (afkkullanıcı) {
      const embed = new Discord.RichEmbed()
      .setColor('BLUE')
      .setDescription(`<@${kullanıcı.id}> adlı kullanıcı şuan **${sebep}** nedeniyle AFK!`)
      message.channel.send(embed)
    }
  }

  if (!message.content.includes(`<@${kullanıcı.id}>`)) {
    if (afkdkullanıcı) {
      const embed = new Discord.RichEmbed()
      .setColor('BLUE')
      .setDescription(`<@${message.author.id}> adlı kullanıcı artık AFK değil!`)
      message.channel.send(embed)
      db.delete(`afk_${message.author.id}`);
      message.member.setNickname(isim)
  }
    }
});

client.on("guildMemberAdd", async member => {
  let frenzysayı = await db.fetch(`FrenzyCode+SayaçSayı_${member.guild.id}`);
  let frenzykanal = await db.fetch(`FrenzyCode+SayaçKanal_${member.guild.id}`);
  if (!frenzysayı || !frenzykanal) return;
  let sonuç = frenzysayı - member.guild.memberCount;
  client.channels
    .get(frenzykanal)
    .send(
      `<a:blobjoining:698617723684519967> | O Sunucumuza Yeni Biri Geldi Ve İsmi ${member}, Hoşgeldin  **${frenzysayı}** Kişiye Ulaşmak İçin  **${sonuç}** Kişi Kaldı.`
    );
});
client.on("guildMemberRemove", async member => {
  let frenzysayı = await db.fetch(`FrenzyCode+SayaçSayı_${member.guild.id}`);
  let frenzykanal = await db.fetch(`FrenzyCode+SayaçKanal_${member.guild.id}`);
  if (!frenzysayı || !frenzykanal) return;
  let sonuç = frenzysayı - member.guild.memberCount;

  client.channels
    .get(frenzykanal)
    .send(
      `<a:ablobleaving:698617725936861214> | Olamaz ${member}, Sunucudan Ayrıldı! **${frenzysayı}** Kişiye Ulaşmak İçin  **${sonuç}** Kişi Kaldı.`
    );
  return;
});

client.on("roleDelete", async(role , channel , message , guild) => {
  let rolkoruma = await db.fetch(`rolk_${role.guild.id}`);
    if (rolkoruma == "acik") {
  role.guild.createRole({name: role.name, color: role.color,  permissions: role.permissions}) 
        role.guild.owner.send(` **${role.name}** Adlı Rol Silindi Ve Ben Rolü Tekrar Oluşturdum `)
      
  
}
})

client.on("message", msg => {
  var dm = client.channels.get("723978308835868716"); //mesajın geleceği kanal idsi//
  if (msg.channel.type === "dm") {
    if (msg.author.id === client.user.id) return;
    const botdm = new Discord.RichEmbed()
      .setTitle(`${client.user.username} Dm`)
      .setTimestamp()
      .setColor("BLUE")
      .setThumbnail(`${msg.author.avatarURL}`)
      .addField(":boy: Gönderen ", msg.author.tag)
      .addField(":id:  Gönderen ID :", msg.author.id)
      .addField(":globe_with_meridians: Gönderilen Mesaj", msg.content);
 
    dm.send(botdm);
  }
  if (msg.channel.bot) return;
});


client.on('guildMemberAdd', async member => {
  let tag = await db.fetch(`otoTag_${member.guild.id}`)
  let kanal = await db.fetch(`ototagK_${member.guild.id}`)
  if (!tag) return
  member.setNickname(tag.replace('{uye}', member.user.username))
})

client.on('guildMemberAdd', async(member) => {
  let kayitkanali = await db.fetch(`kayitkanali_${member.guild.id}`);
  let kayithosgeldinmesaji = await db.fetch(`kayithosgeldinmesaji_${member.guild.id}`);
  try {
    if(client.channels.has(kayitkanali)) { await client.channels.get(kayitkanali).send(kayithosgeldinmesaji.replace('(uye)', member)) };
  } catch(err) { }
});

client.on(`guildMemberAdd`, async member => {
  const e = new Discord.RichEmbed()
    .setColor(`RANDOM`)
    .setImage(`https://media.discordapp.net/attachments/723602295668998248/724186025680961536/maxresdefault_1.jpg?width=845&height=475`)
    .addField(`Sunucuya Hoş Geldin!`, `Mesaj`)
    .setFooter(`mesaj`)
  member.send(e);
});