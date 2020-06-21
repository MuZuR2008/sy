const chalk = require('chalk')
const moment = require('moment')
const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')

var prefix= ayarlar.prefix;

module.exports = client => {
  console.log(`➢Bot bot artık aktif!`);
  console.log(`➢komutlar yüklendi!`);
  console.log(`《kod yapımcısı: OgünSert Kob's`);
  client.user.setStatus("online");
  //idle = boşta
  //dnd = rahatsız etmeyin
  //online = çevrimiçi
    var oyun = [
        "👑 Developers Code",
        "-yardım | -davet",
        "https://sydraa.glitch.me",
        
//Kobs
    ];
  
    setInterval(function() {

        var random = Math.floor(Math.random()*(oyun.length-0+1)+0);

        client.user.setGame(oyun[random], );
        }, 2 * 9000);
  
};