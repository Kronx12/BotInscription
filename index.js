const Discord = require("discord.js");
const bot = new Discord.Client();
var tabAdmis = [];
var tabReserviste = [];
var max = 10;

bot.on('ready', function () {
    console.log("bot ready !")
})

bot.login('NDc3NjEzMDI2NzcwNjgxODU5.Dk-reA.LjXNLjl-EY5ZwqD9f12EMB2Nwl4')

const channel = new Discord.Channel()
bot.on('message', msg => {
    if (msg.content === "!help") {
        text = "!ajoute-moi => S'inscrire \n!enleve-moi => Se désinscrire \n!afficher-liste => Afficher les membres inscrit \n!reset-liste => Vide la liste des membres inscrit"
        msg.channel.send(text)
    }

    if (msg.content === "!ajoute-moi") {
        if (getRealSize(tabAdmis) < max) {
            if(!tabAdmis.includes(msg.author.username) && !tabReserviste.includes(msg.author.username)) {
                msg.channel.send(":white_check_mark: Participation de " + msg.author.username + " confirmé !")
                for (i = 0; i <= max; i++) {
                    if (tabAdmis[i] == undefined) {
                        tabAdmis[i] = msg.author.username
                        break
                    }
                }
            }else{
                msg.channel.send(":white_check_mark: Vous êtes déjà comfirmé !")
            }
            printUpdate(msg)
        } else {
            if(!tabAdmis.includes(msg.author.username) && !tabReserviste.includes(msg.author.username)) {
                msg.channel.send(":heavy_check_mark: Participation de " + msg.author.username + " confirmé en tant que réserviste !")
                tabReserviste.push(msg.author.username)
            }else{
                msg.channel.send(":white_check_mark: Vous êtes déjà comfirmé !")
            }
            printUpdate(msg)
        }
    }

    if (msg.content === "!enleve-moi") {
        msg.channel.send(":x: Participation de " + msg.author.username + " annulé !")
        for (i = 0; i <= max; i++) {
            if (tabAdmis[i] == msg.author.username) {
                tabAdmis.splice(i, 1);
                break
            }
        }
        for (i = 0; i < tabReserviste.length; i++) {
            if (tabReserviste[i] == msg.author.username) {
                tabReserviste.splice(i, 1);
                break
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
            msg.channel.send(":x: Vous n'avez pas la permissions d'executer cette commande !")
        }
    }
})

function printUpdate(mess) {
    text = "Confirmé :\n";
    dec = 0;
    if (tabAdmis.length == 0) {
        text += ":heavy_multiplication_x: Aucun inscrit à afficher !"
    } else {
        for (i = 0; i < tabAdmis.length; i++) {
            if (tabAdmis[i] !== undefined) {
                text += (i+1-dec + ". " + tabAdmis[i] + "\n");
            }else{
                dec++;
            }
        }
    }
    mess.channel.send(text)
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
    mess.channel.send(text)
}
function getRealSize(tab) {
    var l = 0;
    for (i=0; i < tab.length; i++)
    {
        if (tab[i] !== undefined) {
            l++;
        }
    }
    return l;
}
