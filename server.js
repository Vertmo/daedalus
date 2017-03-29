var http = require('http');

var port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'


var server = http.createServer(function(request, response) {
// On s'occuperait d'une requête http ici, mais on en aura pas besoin
	response.writeHeader(200, {"Content-Type": "text/plain"});  
    response.write("Hello World");  
    response.end();  
});
server.listen(1337, function() {
	console.log((new Date()) + "Serveur démarré sur le port 1337");
});

var WebSocketServer = require('websocket').server;

wsServer = new WebSocketServer({
	httpServer: server
});
var nombreConnectes = 0;
var clients = {};

var joueurs = {
id: [0,0,0,0],
pseudo: ["indéfini","indéfini","indéfini","indéfini"],
score: [0,0,0,0],
x: [0,0,0,0],
y: [0,0,0,0],
direction: [3,3,1,1]};

var partieCommencee = 0;

wsServer.on('request', function(request) {
	//On accepte la connection du client
	var connection = request.accept('echo-protocol', request.origin); 
	//On attribue un numéro au client
	nombreConnectes++;
	var id = nombreConnectes;
	//On stock maintenant les infos de connection dans un array au numéro du client
	clients[id] = connection;
	
	console.log((new Date()) + ' Connection acceptée[' + id + ']');
	
	if(joueurs.id.indexOf(0) == -1) {
							var message = {
							type: "message",
							text:"Désolé, mais il n'y a pas de place sur le serveur" };
							connection.send(JSON.stringify(message));
						} else if (partieCommencee == 1) {
							var message = {
							type: "message",
							text:"Désolé, mais la partie est déja commencée" };
							connection.send(JSON.stringify(message));
						} else {
							joueurs.id[joueurs.id.indexOf(0)] = id;
							console.log(joueurs.id);
							var message = {
							type: "messageId",
							text:"C'est bon, y'a la place !" };
							message.id = id;
							connection.send(JSON.stringify(message));
						}
	
	connection.on('message', function(recu) {
		var message = JSON.parse(recu.utf8Data);

		switch(message.type) {
			case "pseudo":
				joueurs.pseudo[joueurs.id.indexOf(message.id)] = message.pseudo;
				console.log(joueurs.pseudo);
				for (i = 0; i < joueurs.id.length; i++) {
					if(joueurs.id[i] != 0) {
						var message = {
						type: "pseudos",
						id: [0,0,0,0],
						pseudo: ["indéfini","indéfini","indéfini","indéfini"] };
						for (j = 0; j < joueurs.id.length; j++) {
							message.id[j] = joueurs.id[j];
							message.pseudo[j] = joueurs.pseudo[j];
						}
						clients[joueurs.id[i]].send(JSON.stringify(message));
					}
				}
				break;
			case "commencer":
				if (partieCommencee == 0) {
					var taille = message.taille;
					var map = require('./generation.js').generer(taille);
					//var powerups = require('./generation.js').genererPowerups(map);
					message.map = map;
					message.taille = taille;
					for (i = 0; i < joueurs.id.length; i++) {
						if(joueurs.id[i] != 0 && joueurs.id[i] != message.id) {
							clients[joueurs.id[i]].send(JSON.stringify(message));
						}
					}
					partieCommencee = 1;
				}
				break;
				
			case "messageChat":
				console.log("Chat : " + joueurs.pseudo[joueurs.id.indexOf(message.id)] + " : " + message.text);
				for (i = 0; i < joueurs.id.length; i++) {
					if(joueurs.id[i] != 0) {
						clients[joueurs.id[i]].send(JSON.stringify(message));
					}
				}
				break;
				
			case "coordonnees":
				joueurs.x[joueurs.id.indexOf(message.id)] = message.x;
				joueurs.y[joueurs.id.indexOf(message.id)] = message.y;
				joueurs.direction[joueurs.id.indexOf(message.direction)] = message.y;
				for (i = 0; i < joueurs.id.length; i++) {
					if(joueurs.id[i] != 0 && joueurs.id[i] != message.id) {
						clients[joueurs.id[i]].send(JSON.stringify(message));
						}
					}
				break;
				
			case "victoire":
				console.log("gagne");
				joueurs.score[joueurs.id.indexOf(message.id)] = joueurs.score[joueurs.id.indexOf(message.id)] + 1;
				message.score = joueurs.score[joueurs.id.indexOf(message.id)];
				for (i = 0; i < joueurs.id.length; i++) {
					if(joueurs.id[i] != 0) {
						clients[joueurs.id[i]].send(JSON.stringify(message));
					}
				}
				partieCommencee = 0;
				break;
		}
	});
	
	connection.on('close', function(connection) {

	joueurs.pseudo[joueurs.id.indexOf(id)] = "indéfini";
	joueurs.score[joueurs.id.indexOf(id)] = 0;
	joueurs.id[joueurs.id.indexOf(id)] = 0;

	for (i = 0; i < joueurs.id.length; i++) {
		if(joueurs.id[i] != 0) {
			var message = {
			type: "pseudos",
			id: [0,0,0,0],
			pseudo: ["indéfini","indéfini","indéfini","indéfini"] };
			for (j = 0; j < joueurs.id.length; j++) {
				message.id[j] = joueurs.id[j];
				message.pseudo[j] = joueurs.pseudo[j];
			}
			clients[joueurs.id[i]].send(JSON.stringify(message));
		}
	}
	
	if (joueurs.id[0] == 0 && joueurs.id[1] == 0 && joueurs.id[2] == 0 && joueurs.id[3] == 0)
	{
		partieCommencee = 0;
	}
	delete clients[id];
	console.log(joueurs.id);
	console.log(joueurs.score);
    console.log((new Date()) + ' Client ' + id + ' est déconnecté.');
	});
});
