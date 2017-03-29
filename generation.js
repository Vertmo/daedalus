exports.generer = function genererLaby(_tailleMax){
    var map = new Array(_tailleMax);
    var pile = new Array();
    var x, y , k, l, temp,fin, nbVoisins, dir;
    var voisins = new Array(4); 
	
    var maxTailleMax = _tailleMax-1;
     
    for(x = 0; x < _tailleMax; x++){
        map[x] = new Array(_tailleMax);
        map[0][x] = map[x][0] = 2;
    }
     
    for(y = 2; y < _tailleMax; y=y+2){
        for(x = 2; x < _tailleMax; x=x+2){
            map[x][y-1] = 2;
            map[x-1][y] = 2;
            map[x][y] = 2;
             
        }
    }
    temp = Math.floor((_tailleMax-2)/2);
    x = Math.floor(Math.random()*temp)*2+1;
    y = Math.floor(Math.random()*temp)*2+1;
    do{
        fin = false;
        while(!fin){
            map[x][y] = 1;
            nbVoisins = 0;
            if (( y-2 >= 1)&&( map[x][y-2] != 1 ))               voisins[nbVoisins++] = 0;
            if (( y+2 <= maxTailleMax)&&( map[x][y+2] != 1 ))    voisins[nbVoisins++] = 2;
            if (( x+2 <= maxTailleMax)&&( map[x+2][y] != 1 ))    voisins[nbVoisins++] = 1;
            if (( x-2 >= 1)&&( map[x-2][y] != 1 ))               voisins[nbVoisins++] = 3;
             
            if(nbVoisins == 0 ) fin = true;
            
            else{
                k = l = 0;
                pile.push(x);
                pile.push(y);
                dir = voisins[Math.floor(Math.random()*nbVoisins)];
                switch(dir){
                    case 0 :
                        l -= 2;
                        break;
                    case 1 :
                        k += 2;
                        break;
                    case 2 :
                        l += 2;
                        break;
                    case 3 : 
                        k -= 2;
                        break;
                    default :
                        break;
                }
                map[x+k/2][y+l/2] = 0;
                x += k;
                y += l;
            }
        }
        y = pile.pop();
        x = pile.pop();
    }
    while(pile[0]);
    
	for(x = 1; x < 4; x++) {
		for(y = 1; y < 4; y++) {
			map[x][y] = 3;
		}
	}
	
	for(x = _tailleMax-4; x < _tailleMax-1; x++) {
		for(y = _tailleMax-4; y < _tailleMax-1; y++) {
			map[x][y] = 7;
		}
	}
	
	/*for(y = 0; y < _tailleMax; y++){
		for(x = 0; x < _tailleMax; x++){
			if(map[x][y] != 2 && map[x][y] != 3 && map[x][y] != 7 && Math.random() > 0.98) {
				map[x][y] = 5;
			}
		}
	}*/
     
    return map;
}

exports.genererPowerups = function genererPowerups(map) {
	var powerups = [];
	switch(Math.floor(Math.random()*10) + 1) {
	}
	
	return powerups;
}