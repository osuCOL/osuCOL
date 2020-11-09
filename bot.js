const { Client } = require('discord.js');
const bot = new Client();
const { createCanvas, loadImage, registerFont } = require('canvas');
registerFont('./utility/LemonMilkbold.otf', { family: 'Cute Fonts' });
const canvas = createCanvas(1000, 400);
const ctx = canvas.getContext('2d');
const { token, prefix } = require('./config');

bot.on('ready', () => {
   console.log('Conectado!');
   let statuses = [
      `osu!`,
      `osu!Ripple`,
      `osu!Gatari`
   ];
   let i = 0;
   setInterval(() => {
      let status = statuses[i];
      bot.user.setActivity(status, {
         type: "PLAYING"
      });
      i++;
      if (i >= statuses.length) i = i - statuses.length;
   }, 20000);
});

bot.on('guildMemberAdd', member => {
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   let avatar = member.user.displayAvatarURL({
      format: 'png',
      dynamic: true,
      size: 2048
   });
   loadImage(avatar)
   .then(ava => {
      ctx.drawImage(ava, 144, 81, 245, 245);
      loadImage('https://i.imgur.com/5VN7KoC.png')
      .then(bg => {
         ctx.drawImage(bg, 0, 0, 1000, 400);
         ctx.font = '45px "Cute Fonts"';
         ctx.fillStyle = '#ffffff';
         ctx.textAlign = 'center';
         ctx.fillText(member.user.username, 696, 270);
         bot.channels.cache.get('756767384169349133')
         .send(member.user, {
            files: [{
               attachment: canvas.toBuffer(),
               name: 'welcome.png'
            }]
         });
      });
   });
});

bot.on('guildMemberRemove', member => {
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   let avatar = member.user.displayAvatarURL({
      format: 'png',
      dynamic: true,
      size: 2048
   });
   loadImage(avatar)
   .then(ava => {
      ctx.drawImage(ava, 144, 81, 245, 245);
      loadImage('https://puu.sh/GFbrs.png')
      .then(bg => {
         ctx.drawImage(bg, 0, 0, 1000, 400);
         ctx.font = '45px "Cute Fonts"';
         ctx.fillStyle = '#ffffff';
         ctx.textAlign = 'center';
         ctx.fillText(member.user.username, 696, 270);
         bot.channels.cache.get('756767384169349133')
         .send(member.user.tag, {
            files: [{
               attachment: canvas.toBuffer(),
               name: 'joder.png'
            }]
         });
      });
   });
});

bot.login(token);