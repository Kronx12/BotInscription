const Discord = require("discord.js");
const bot = new Discord.Client();
var tabAdmis = [];
var tabReserviste = [];
var max = 10;

bot.on('ready', function () {
    console.log("bot ready !")
})

bot.login('NDYyMzk1NDU4OTQ2NTk2OTA1.DhhT6Q.qtwwO7W-ur7nUhdUAjy5cdHGHic')

const channel = new Discord.Channel()
bot.on('message', msg => {
  if (msg.content === "!help") {
    text = "!ajoute-moi => S'inscrire \n!enleve-moi => Se désinscrire \n!afficher-liste => Afficher les membres inscrit \n!reset-liste => Vide la liste des membres inscrit"
    msg.channel.sendMessage(text)
  }
  if (msg.content === "!ajoute-moi") {
    if (tabAdmis.length < max) {
      msg.channel.sendMessage(":white_check_mark: Participation de " + msg.author.username + " confirmé !")
      if(!tabAdmis.includes(msg.author.username) && !tabReserviste.includes(msg.author.username)) {
        for (i = 0; i <= max; i++) {
          if (tabAdmis[i] == undefined) {
            tabAdmis[i] = msg.author.username
            break
          }
        }
      }
      printUpdate(msg)
    } else {
      msg.channel.sendMessage(":heavy_check_mark: Participation de " + msg.author.username + " confirmé en tant que réserviste !")
      if(!tabAdmis.includes(msg.author.username) && !tabReserviste.includes(msg.author.username)) {
        tabReserviste.push(msg.author.username)
      }
      printUpdate(msg)
    }
  }

  if (msg.content === "!enleve-moi") {
    msg.channel.sendMessage(":x: Participation de " + msg.author.username + " annulé !")
    for (i = 0; i <= max; i++) {
      if (tabAdmis[i] == msg.author.username) {
        tabAdmis.splice(i, 1);
      }
    }
    for (i = 0; i < tabReserviste.length; i++) {
      if (tabReserviste[i] == msg.author.username) {
        tabReserviste.splice(i, 1);
      }
    }
    if(tabAdmis.length < max) {
      tabAdmis.push(tabReserviste[0])
      tabReserviste.shift()
    }
    printUpdate(msg)
  }
  if (msg.content === "!afficher-liste") {
    printUpdate(msg)
    printReservist(msg)
  }
  if(msg.content === "!reset-liste") {
    if(msg.member.hasPermission("MANAGE_GUILD")) {
      tabAdmis = [];
      tabReserviste = [];
      printUpdate(msg)
      printReservist(msg)
    }else{
      msg.channel.sendMessage(":x: Vous n'avez pas la permissions d'executer cette commande !")
    }
  }
})

function printUpdate(mess) {
  text = "Confirmé :\n";
  if (tabAdmis.length == 0) {
    text += ":heavy_multiplication_x: Aucun inscrit à afficher !"
  } else {
    for (i = 0; i < tabAdmis.length; i++) {
      text += (i+1 + ". " + tabAdmis[i] + "\n");
    }
  }
  mess.channel.sendMessage(text)
}
function printReservist(mess) {
  text = "Reserviste :\n";
  if (tabReserviste.length == 0) {
    text += ":heavy_multiplication_x: Aucun inscrit à afficher !"
  } else {
    for (i = 0; i < tabReserviste.length; i++) {
      text += (i+1 + ". " + tabReserviste[i] + "\n");
    }
  }
  mess.channel.sendMessage(text)
}
