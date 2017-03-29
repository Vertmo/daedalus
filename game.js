//var ws = new WebSocket('ws://localhost:8080', 'echo-protocol');
var ws = new WebSocket('wss://daedalus-appserveur.rhcloud.com:8443', 'echo-protocol');

if (sessionStorage.tempsMusique != null) {
var musique = new Audio("sons/welcomeTheme.wav");
musique.loop = true;
//musique.currentTime = sessionStorage.tempsMusique;
musique.play();
}

mute = sessionStorage.mute;

if (mute == "true") {
	musique.volume = 0;
	document.getElementById("imageSon").src = "images/mute.png";
}

var changerSon = function() {
	if (mute == "true") {
		mute = "false";
		musique.volume = 1;
		document.getElementById("imageSon").src = "images/son.png";
	} else {
		mute = "true";
		musique.volume = 0;
		document.getElementById("imageSon").src = "images/mute.png";
	}
	sessionStorage.mute = mute;
}
		
var id = 0;

var couleurs = ["green","orange","red","blue"];

var joueurs = {
id: [0,0,0,0],
pseudo: ["indéfini","indéfini","indéfini","indéfini"],
couleur: ["vert","jaune","rouge","bleu"],
score: [0,0,0,0],
x: [0,0,0,0],
y: [0,0,0,0],
direction: [3,3,1,1]};

var partieEnCours = 0;
var tailleCase = 120;
var taille = 0;

var envoyerMessage = function(message) {
	if(ws.readyState == 1) {
		ws.send(JSON.stringify(message));
	}
}

var canvas = document.getElementById("jeu");
	canvas.width = window.innerWidth/2.3;
	canvas.height = window.innerHeight/1.2;
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#FFFFFF";
ctx.fillRect(0, 0, canvas.width, canvas.height);

var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.jpg";

var logoReady = false;
var logoImage = new Image();
logoImage.onload = function () {
	logoReady = true;
	ctx.drawImage(logoImage, canvas.width/2 - 200, canvas.height/2 - 177);
};
logoImage.src = "images/PoD.png";


var joueurReadyBas = [false, false, false, false];
var joueurReadyHaut = [false, false, false, false];
var joueurReadyGauche = [false, false, false, false];
var joueurReadyDroite = [false, false, false, false];
var joueurImageBas = [];
var joueurImageHaut = [];
var joueurImageGauche = [];
var joueurImageDroite = [];

joueurImageBas[0] = new Image();
joueurImageBas[0].onload = function () {
	joueurReadyBas[0] = true;
};
joueurImageBas[0].src = "images/persos/Knight1Bas.png";

joueurImageHaut[0] = new Image();
joueurImageHaut[0].onload = function () {
	joueurReadyHaut[0] = true;
};
joueurImageHaut[0].src = "images/persos/Knight1Haut.png";

joueurImageGauche[0] = new Image();
joueurImageGauche[0].onload = function () {
	joueurReadyGauche[0] = true;
};
joueurImageGauche[0].src = "images/persos/Knight1Gauche.png";

joueurImageDroite[0] = new Image();
joueurImageDroite[0].onload = function () {
	joueurReadyDroite[0] = true;
};
joueurImageDroite[0].src = "images/persos/Knight1Droite.png";

joueurImageBas[1] = new Image();
joueurImageBas[1].onload = function () {
	joueurReadyBas[1] = true;
};
joueurImageBas[1].src = "images/persos/Knight2Bas.png";

joueurImageHaut[1] = new Image();
joueurImageHaut[1].onload = function () {
	joueurReadyHaut[1] = true;
};
joueurImageHaut[1].src = "images/persos/Knight2Haut.png";

joueurImageGauche[1] = new Image();
joueurImageGauche[1].onload = function () {
	joueurReadyGauche[1] = true;
};
joueurImageGauche[1].src = "images/persos/Knight2Gauche.png";

joueurImageDroite[1] = new Image();
joueurImageDroite[1].onload = function () {
	joueurReadyDroite[1] = true;
};
joueurImageDroite[1].src = "images/persos/Knight2Droite.png";

joueurImageBas[2] = new Image();
joueurImageBas[2].onload = function () {
	joueurReadyBas[2] = true;
};
joueurImageBas[2].src = "images/persos/Knight3Bas.png";

joueurImageHaut[2] = new Image();
joueurImageHaut[2].onload = function () {
	joueurReadyHaut[2] = true;
};
joueurImageHaut[2].src = "images/persos/Knight3Haut.png";

joueurImageGauche[2] = new Image();
joueurImageGauche[2].onload = function () {
	joueurReadyGauche[2] = true;
};
joueurImageGauche[2].src = "images/persos/Knight3Gauche.png";

joueurImageDroite[2] = new Image();
joueurImageDroite[2].onload = function () {
	joueurReadyDroite[2] = true;
};
joueurImageDroite[2].src = "images/persos/Knight3Droite.png";

joueurImageBas[3] = new Image();
joueurImageBas[3].onload = function () {
	joueurReadyBas[3] = true;
};
joueurImageBas[3].src = "images/persos/Knight4Bas.png";

joueurImageHaut[3] = new Image();
joueurImageHaut[3].onload = function () {
	joueurReadyHaut[3] = true;
};
joueurImageHaut[3].src = "images/persos/Knight4Haut.png";

joueurImageGauche[3] = new Image();
joueurImageGauche[3].onload = function () {
	joueurReadyGauche[3] = true;
};
joueurImageGauche[3].src = "images/persos/Knight4Gauche.png";

joueurImageDroite[3] = new Image();
joueurImageDroite[3].onload = function () {
	joueurReadyDroite[3] = true;
};
joueurImageDroite[3].src = "images/persos/Knight4Droite.png";


var murReady = false;
var murImage = new Image();
murImage.onload = function () {
	murReady = true;
};
murImage.src = "images/mur.png";

var solReady = false;
var solImage = new Image();
solImage.onload = function () {
	solReady = true;
};
solImage.src = "images/sol.png";

var spawnReady = false;
var spawnImage = new Image();
spawnImage.onload = function () {
	spawnReady = true;
};
spawnImage.src = "images/spawn.png";

var centreReady = false;
var centreImage = new Image();
centreImage.onload = function () {
	centreReady = true;
};
centreImage.src = "images/centre.png";

var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

window.addEventListener('resize', function(event){
	canvas.width = window.innerWidth/2.3;
	canvas.height = window.innerHeight/1.2;
	if (partieEnCours == 0) {
		ctx.fillStyle = "#FFFFFF";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}
}); 


var debut = function () {
	tempsDébut = Date.now();
	then = Date.now();
	partieEnCours = 1;
	musique.pause();
	//var tempsMusique = musique.currentTime;
	musique = new Audio("sons/theme.mp3");
	//musique.currentTime = (tempsMusique - tempsMusique%2)/2;
	musique.loop = true;
	musique.play();
	if (mute == "true") {
		musique.volume = 0;
		document.getElementById("imageSon").src = "images/mute.png";
	}
	switch(joueurs.id.indexOf(id)) {
		case 0:
			joueurs.x[joueurs.id.indexOf(id)] = 1.5*tailleCase;
			joueurs.y[joueurs.id.indexOf(id)] = 1.5*tailleCase;
			joueurs.direction[joueurs.id.indexOf(id)] = 3;
			break;
		case 1:
			joueurs.x[joueurs.id.indexOf(id)] = 3.5*tailleCase
			joueurs.y[joueurs.id.indexOf(id)] = 1.5*tailleCase;
			joueurs.direction[joueurs.id.indexOf(id)] = 3;
			break;
		case 2:
			joueurs.x[joueurs.id.indexOf(id)] = 1.5*tailleCase;
			joueurs.y[joueurs.id.indexOf(id)] = 3.5*tailleCase;
			joueurs.direction[joueurs.id.indexOf(id)] = 1;
			break;
		case 3:
			joueurs.x[joueurs.id.indexOf(id)] = 3.5*tailleCase;
			joueurs.y[joueurs.id.indexOf(id)] = 3.5*tailleCase;
			joueurs.direction[joueurs.id.indexOf(id)] = 1;
			break;
	}
};

var update = function (modifier) {
	var speed = 256;
	if (38 in keysDown) { // On monte
		joueurs.direction[joueurs.id.indexOf(id)] = 1;
		if ((map[(joueurs.x[joueurs.id.indexOf(id)] - (joueurs.x[joueurs.id.indexOf(id)]%tailleCase))/tailleCase][(joueurs.y[joueurs.id.indexOf(id)] - (joueurs.y[joueurs.id.indexOf(id)]%tailleCase))/tailleCase - 1] == 2 || map[((joueurs.x[joueurs.id.indexOf(id)] + 39 - (joueurs.x[joueurs.id.indexOf(id)] + 39)%tailleCase))/tailleCase][(joueurs.y[joueurs.id.indexOf(id)] - (joueurs.y[joueurs.id.indexOf(id)]%tailleCase))/tailleCase - 1] == 2) && joueurs.y[joueurs.id.indexOf(id)]%tailleCase - speed*modifier <= 0) {
			joueurs.y[joueurs.id.indexOf(id)] -= joueurs.y[joueurs.id.indexOf(id)]%tailleCase;
		} else {
			joueurs.y[joueurs.id.indexOf(id)] -= speed * modifier;
		}
	}
	if (40 in keysDown) { // On descend
		joueurs.direction[joueurs.id.indexOf(id)] = 3;
		if ((map[(joueurs.x[joueurs.id.indexOf(id)] - (joueurs.x[joueurs.id.indexOf(id)]%tailleCase))/tailleCase][(joueurs.y[joueurs.id.indexOf(id)] - (joueurs.y[joueurs.id.indexOf(id)]%tailleCase))/tailleCase + 1] == 2 || map[((joueurs.x[joueurs.id.indexOf(id)] + 39 - (joueurs.x[joueurs.id.indexOf(id)] + 39)%tailleCase))/tailleCase][(joueurs.y[joueurs.id.indexOf(id)] - (joueurs.y[joueurs.id.indexOf(id)]%tailleCase))/tailleCase + 1] == 2) && joueurs.y[joueurs.id.indexOf(id)]%tailleCase + speed*modifier >= tailleCase - 40) {
			joueurs.y[joueurs.id.indexOf(id)] += tailleCase - 40 - joueurs.y[joueurs.id.indexOf(id)]%tailleCase;
		} else {
		joueurs.y[joueurs.id.indexOf(id)] += speed * modifier;
		}
	}
	if (37 in keysDown) { // Vers la gauche
		joueurs.direction[joueurs.id.indexOf(id)] = 4;
		if ((map[(joueurs.x[joueurs.id.indexOf(id)] - (joueurs.x[joueurs.id.indexOf(id)]%tailleCase))/tailleCase - 1][(joueurs.y[joueurs.id.indexOf(id)] - (joueurs.y[joueurs.id.indexOf(id)]%tailleCase))/tailleCase] == 2 || map[(joueurs.x[joueurs.id.indexOf(id)] - joueurs.x[joueurs.id.indexOf(id)]%tailleCase)/tailleCase - 1][(joueurs.y[joueurs.id.indexOf(id)] + 39 - (joueurs.y[joueurs.id.indexOf(id)] + 39)%tailleCase)/tailleCase] == 2) && joueurs.x[joueurs.id.indexOf(id)]%tailleCase - speed*modifier <= 0) {
			joueurs.x[joueurs.id.indexOf(id)] -= joueurs.x[joueurs.id.indexOf(id)]%tailleCase;
		} else {
			joueurs.x[joueurs.id.indexOf(id)] -= speed * modifier;
		}
	}
	if (39 in keysDown) { // Vers la droite
		joueurs.direction[joueurs.id.indexOf(id)] = 2;
		if ((map[(joueurs.x[joueurs.id.indexOf(id)] - (joueurs.x[joueurs.id.indexOf(id)]%tailleCase))/tailleCase + 1][(joueurs.y[joueurs.id.indexOf(id)] - (joueurs.y[joueurs.id.indexOf(id)]%tailleCase))/tailleCase] == 2 || map[(joueurs.x[joueurs.id.indexOf(id)] - joueurs.x[joueurs.id.indexOf(id)]%tailleCase)/tailleCase + 1][(joueurs.y[joueurs.id.indexOf(id)] + 39 - (joueurs.y[joueurs.id.indexOf(id)] + 39)%tailleCase)/tailleCase] == 2) && joueurs.x[joueurs.id.indexOf(id)]%tailleCase + speed*modifier >= tailleCase - 40) {
			joueurs.x[joueurs.id.indexOf(id)] += tailleCase - 40 - joueurs.x[joueurs.id.indexOf(id)]%tailleCase;
		} else {
			joueurs.x[joueurs.id.indexOf(id)] += speed * modifier;
		}
	}

	var position = {type: "coordonnees"};
	position.direction = joueurs.direction[joueurs.id.indexOf(id)];
	position.id = id;
	position.x = joueurs.x[joueurs.id.indexOf(id)];
	position.y = joueurs.y[joueurs.id.indexOf(id)];
	envoyerMessage(position);
	
	if (map[(joueurs.x[joueurs.id.indexOf(id)] - (joueurs.x[joueurs.id.indexOf(id)]%tailleCase))/tailleCase][(joueurs.y[joueurs.id.indexOf(id)] - (joueurs.y[joueurs.id.indexOf(id)]%tailleCase))/tailleCase] == 7) {
		var message = {type: "victoire"};
		message.id = id;
		envoyerMessage(message);
		partieEnCours = 0;
	}
}


var rendu = function () {
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fill();
	/*if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}*/

	var c;
    ctx.save();
	ctx.translate(-joueurs.x[joueurs.id.indexOf(id)]+canvas.width / 2 - 20, -joueurs.y[joueurs.id.indexOf(id)]+canvas.height / 2 - 20);
    for(var y = 0; y < taille; y++){
        for(var x = 0; x < taille; x++){
            switch(map[x][y]){
                case 2 :
                    //c = "#242424";
					if (murReady) {
						ctx.drawImage(murImage, 0, 0);
					}
                    break;
                case 3 :
					if (x == 1 && y == 1 && spawnReady) {
						ctx.drawImage(spawnImage, 21, 21);
					}
                    break;
                case 7 :
					if (x == (taille - 4) && y == (taille - 4) && centreReady) {
						ctx.drawImage(centreImage, 21, 21);
					}
                    c = "#E81C3C";
                    break;
                case 5 :
                    ctx.fillStyle = "#E8FF3C";
					ctx.fillRect(21,21,120,120);
                    break;
                     
                default :
					if (solReady) {
						ctx.drawImage(solImage, 21, 21);
					}
                    break;
            }
            ctx.translate(tailleCase,0);
        }
    ctx.translate(-tailleCase*(x), tailleCase);
    }
	
    ctx.restore();
     
	for (i = 0; i < joueurs.id.length; i++) {
		if (joueurReadyBas[i]) {
			if (i == joueurs.id.indexOf(id)) {
				switch(joueurs.direction[joueurs.id.indexOf(id)]) {
					case 1:
						ctx.drawImage(joueurImageHaut[i], canvas.width / 2 - 31, canvas.height / 2 - 31);
						break;
					case 2:
						ctx.drawImage(joueurImageDroite[i], canvas.width / 2 - 31, canvas.height / 2 - 31);
						break;
					case 3:
						ctx.drawImage(joueurImageBas[i], canvas.width / 2 - 31, canvas.height / 2 - 31);
						break;
					case 4:
						ctx.drawImage(joueurImageGauche[i], canvas.width / 2 - 31, canvas.height / 2 - 31);
						break;
				}
			} else if (joueurs.id[i] != 0) {
				switch(joueurs.direction[i]) {
					case 1:
						ctx.drawImage(joueurImageHaut[i], canvas.width / 2 + (joueurs.x[i]-joueurs.x[joueurs.id.indexOf(id)]) - 31, canvas.height / 2 + (joueurs.y[i]-joueurs.y[joueurs.id.indexOf(id)]) - 31);
						break;
					case 2:
						ctx.drawImage(joueurImageDroite[i], canvas.width / 2 + (joueurs.x[i]-joueurs.x[joueurs.id.indexOf(id)]) - 31, canvas.height / 2 + (joueurs.y[i]-joueurs.y[joueurs.id.indexOf(id)]) - 31);
						break;
					case 3:
						ctx.drawImage(joueurImageBas[i], canvas.width / 2 + (joueurs.x[i]-joueurs.x[joueurs.id.indexOf(id)]) - 31, canvas.height / 2 + (joueurs.y[i]-joueurs.y[joueurs.id.indexOf(id)]) - 31);
						break;
					case 4:
						ctx.drawImage(joueurImageGauche[i], canvas.width / 2 + (joueurs.x[i]-joueurs.x[joueurs.id.indexOf(id)]) - 31, canvas.height / 2 + (joueurs.y[i]-joueurs.y[joueurs.id.indexOf(id)]) - 31);
						break;
				}
			}
		}
	}
	
	var temps = (Date.now() - tempsDébut)/1000;
	
	var secondes = Math.floor(temps).toString().substr(Math.floor(temps).toString().length - 1);
	var dixSecondes = Math.floor((temps/10)%6).toString().substr(Math.floor((temps/10)%6).toString().length - 1);
	var minutes = Math.floor(temps/60).toString().substr(Math.floor(temps/60).toString().length - 1);
	var dixMinutes = Math.floor(temps/600).toString().substr(Math.floor(temps/600).toString().length - 1);
	
	var tempsAffichage = dixMinutes + minutes + ":" + dixSecondes + secondes;
	ctx.font="45px Helvetica";
	ctx.strokeStyle = 'black';
	ctx.lineWidth = 3;
	ctx.strokeText(tempsAffichage, canvas.width - 120,50);
	ctx.fillStyle="white";
	ctx.fillText(tempsAffichage, canvas.width - 120,50);
}

var main = function () {
	if (partieEnCours == 1) {
		var now = Date.now();
		var delta = now - then;
	
		update(delta / 1000);
		rendu();
	
		then = now;
	
		requestAnimationFrame(main);
	}
};

var commencer = function () {
	var message = {
	type: "commencer"};
	try {
	message.taille = parseInt(document.getElementById("taille").value);
	} catch(e) {
	window.alert(e);
	}
	envoyerMessage(message);
};

var envMsgChat = function () {
	if (document.getElementById("messageChat").value != "") {
		var message = {
		type: "messageChat",
		origine: "joueur" };
		message.id = id;
		message.text = document.getElementById("messageChat").value;
		envoyerMessage(message);
		document.getElementById("messageChat").value = "";
	}
}

ws.addEventListener("message", function(e) {
	var message = JSON.parse(e.data);
	switch(message.type) {
		case "messageId":
			id = message.id;

			var message = {
			type: "pseudo"}
			message.id = id;
			message.pseudo = "";
			if (sessionStorage.pseudo != null) {
				message.pseudo = sessionStorage.pseudo;
			} else {
				window.location = './index.html'
			}
			envoyerMessage(message);
			break;
			
			case "commencer":
				taille = message.taille;
				map = message.map;
				debut();
				main();
				break;
		
		case "message":
			switch(message.text) {
				case "Désolé, mais il n'y a pas de place sur le serveur":
					window.alert(message.text);
					self.close;
					break;
				case "Désolé, mais la partie est déja commencée":
					window.alert(message.text);
					self.close;
					break;
			}
			break;
		
		case "pseudos":
			for (i = 0; i < joueurs.id.length; i++) {
				if(joueurs.id[i] != message.id[i]) {
					if(message.pseudo[i] == "indéfini") {
						document.getElementById("contenuChat").innerHTML = document.getElementById("contenuChat").innerHTML + "<p><em> <span style='color: " + couleurs[i] +"'>" + joueurs.pseudo[i] + "</span> s'est déconnecté !</em></p>";
					} else {
						document.getElementById("contenuChat").innerHTML = document.getElementById("contenuChat").innerHTML + "<p><em> <span style='color: " + couleurs[i] +"'>" + message.pseudo[i] + "</span> s'est connecté !</em></p>";
					}
					joueurs.id[i] = message.id[i];
					joueurs.pseudo[i] = message.pseudo[i];
				}
			}
			
			if(message.pseudo[0] == "indéfini") {
			document.getElementById("pseudo1").innerHTML = "Joueur non connecté";
			document.getElementById("pseudo1").style.color = "#000000";
			} else {
			document.getElementById("pseudo1").innerHTML = message.pseudo[0] + " Score : 0";
			document.getElementById("pseudo1").style.color = "green";
			}
			if(message.pseudo[1] == "indéfini") {
			document.getElementById("pseudo2").innerHTML = "Joueur non connecté";
			document.getElementById("pseudo2").style.color = "#000000";
			} else {
			document.getElementById("pseudo2").innerHTML = message.pseudo[1] + " Score : 0";
			document.getElementById("pseudo2").style.color = "orange";
			}
			if(message.pseudo[2] == "indéfini") {
			document.getElementById("pseudo3").innerHTML = "Joueur non connecté";
			document.getElementById("pseudo3").style.color = "#000000";
			} else {
			document.getElementById("pseudo3").innerHTML = message.pseudo[2] + " Score : 0";
			document.getElementById("pseudo3").style.color = "red";
			}
			if(message.pseudo[3] == "indéfini") {
			document.getElementById("pseudo4").innerHTML = "Joueur non connecté";
			document.getElementById("pseudo4").style.color = "#000000";
			} else {
			document.getElementById("pseudo4").innerHTML = message.pseudo[3] + " Score : 0";
			document.getElementById("pseudo4").style.color = "blue";
			}
			break;
		
		case "coordonnees":
			if (joueurs.id[joueurs.id.indexOf(message.id)] != 0) {
				joueurs.x[joueurs.id.indexOf(message.id)] = message.x;
				joueurs.y[joueurs.id.indexOf(message.id)] = message.y;
				joueurs.direction[joueurs.id.indexOf(message.id)] = message.direction;
			}
			break;
			
		case "messageChat":
			if (message.origine = "joueur") {
				document.getElementById("contenuChat").innerHTML = document.getElementById("contenuChat").innerHTML + "<p> <span style='color: " + couleurs[joueurs.id.indexOf(message.id)] +"'>" + joueurs.pseudo[joueurs.id.indexOf(message.id)] + "</span> : " + message.text + "</p>";
			}
			break;
			
		case "victoire":
			ctx.fillStyle = "#FFFFFF";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			if(logoReady) {
				ctx.drawImage(logoImage, canvas.width/2 - 200, canvas.height/2 - 177);
			}
			keysDown = [];
			musique.pause();
			musique = new Audio("sons/welcomeTheme.wav");
			//musique.currentTime = 0;
			musique.play();
			musique.loop = true;
			if (mute == "true") {
				musique.volume = 0;
				document.getElementById("imageSon").src = "images/mute.png";
			}
			document.getElementById("contenuChat").innerHTML = document.getElementById("contenuChat").innerHTML + "<p> <span style='color: " + couleurs[joueurs.id.indexOf(message.id)] +"'>" + joueurs.pseudo[joueurs.id.indexOf(message.id)] + "</span> a gagné !</p>";
			joueurs.score[joueurs.id.indexOf(id)] = message.score;
			switch(joueurs.id.indexOf(message.id)) {
				case 0:
					document.getElementById("pseudo1").innerHTML = joueurs.pseudo[0] + " Score : " + message.score;
					break;
				case 1:
					document.getElementById("pseudo2").innerHTML = joueurs.pseudo[1] + " Score : " + message.score;
					break;
				case 2:
					document.getElementById("pseudo3").innerHTML = joueurs.pseudo[2] + " Score : " + message.score;
					break;
				case 3:
					document.getElementById("pseudo4").innerHTML = joueurs.pseudo[3] + " Score : " + message.score;
					break;
			}
			partieEnCours = 0;
			break;
	}
});
