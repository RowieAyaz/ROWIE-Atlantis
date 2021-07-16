const { MessageEmbed } = require('discord.js')
const mongoose = require('mongoose')
const StaffDB = require('../../ClientModels/StaffData')
const env = require('../../Managment/Inventory.json')
exports.run = async(client, message, args) => {
let yanlisEmbed = new MessageEmbed().setAuthor(message.guild.name, message.guild.avatarURL({dynamic:true})).setColor(env.Colors.red)
if(![env.Staff.register_staff, env.Staff.all_commands].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(yanlisEmbed.setDescription(`Bu komutu sadece (<@&${env.Staff.register_staff}>, <@&${env.Staff.all_commands}>) yetkisine sahip olanlar kullanabilir.`).setFooter(``)).then(m => m.delete({timeout:6500}))
let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

if(!member) {
StaffDB.find({userID: message.author.id}, async(err, data) => {
if(err) return message.channel.send(new MessageEmbed().setDescription(`Kullanıcının statı getirilirken bir sorun ile karşı karşıya kaldık.`).setAuthor(message.member.tag, message.author.avatarURL({dynamic:true})).setColor(env.Colors.red).setFooter(``)).then(x => x.delete({timeout: 6500}))
if(!data){message.channel.send(new MessageEmbed().setDescription(`Kullanıcı hiç erkek/kadın kayıtı yapmamış bundan dolayı veriler aktarılamıyor.`).setAuthor(message.author.tag, message.author.avatarURL({dynamic:true})).setColor(env.Colors.red).setFooter(``)).then(x => x.delete({timeout: 6500}))}
else { 
let RowieStaffScoreData = data.reverse().reverse() //komutta sadxmamy yardımcı olmuştur.
let StaffScoreText = RowieStaffScoreData.map(strg => `**${message.guild.name}** sunucusunda ${message.author} adlı yetkili toplam \`${strg.allRegistry}\` kayıt işlemi gerçekleştirmiş.\n\nYetkilinin daha detaylı kayıt dökümanlarının listesi;\nToplam Kayıtları: \`${strg.allRegistry}\`\nErkek Kayıtları: \`${strg.manRegistry}\`\nKadın Kayıtları: \`${strg.womanRegistry}\``)
let StrgBaslik = 'Yetkilinin Kayıtları.' 
message.channel.send(new MessageEmbed().setDescription(`${StaffScoreText}`).setAuthor(StrgBaslik, message.author.avatarURL({dynamic:true})).setColor(env.Colors.blue).setFooter(``))}})}

if(member) {
let StaffCheck = await StaffDB.findOne({userID: member.id})
StaffDB.find({userID: member.id}, async(err, data) => {
if(err) return message.channel.send(new MessageEmbed().setDescription(`Kullanıcının statı getirilirken bir sorun ile karşı karşıya kaldık.`).setAuthor(member.user.tag, member.user.avatarURL({dynamic:true})).setColor(env.Colors.red).setFooter(``)).then(x => x.delete({timeout: 6500}))
if(data.length < 1) { message.channel.send(new MessageEmbed().setDescription(`Kullanıcı hiç erkek/kadın kayıtı yapmamış bundan dolayı veriler aktarılamıyor.`).setAuthor(member.user.tag, member.user.avatarURL({dynamic:true})).setColor(env.Colors.red).setFooter(``)).then(x => x.delete({timeout: 6500}))}
else { 
let StrgBaslik = 'Yetkilinin Kayıtları.' 
message.channel.send(new MessageEmbed().setDescription(`**${message.guild}** sunucusunda ${member} adlı yetkili toplam \`${StaffCheck.allRegistry}\` kayıt işlemi gerçekleştirmiş.\n\nYetkilinin daha detaylı kayıt dökümanlarının listesi;\nToplam Kayıtları: \`${StaffCheck.allRegistry}\`\nErkek Kayıtları: \`${StaffCheck.manRegistry}\`\nKadın Kayıtları: \`${StaffCheck.womanRegistry}\``).setAuthor(StrgBaslik, member.user.avatarURL({dynamic:true})).setColor(env.Colors.anlik).setFooter(``))}})};

}

exports.config = {name: 'kayıtlarım', aliases:['kayıt-kontrol', 'kayıtlar', 'staff-registeries', 'staff-check', 'registeries', 'teyit']}