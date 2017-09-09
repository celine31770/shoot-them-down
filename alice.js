document.addEventListener('DOMContentLoaded', function() {

// console.log(user_pseudo);

// ## DECLARATION DES VARIABLES#####################################
var zoneDeJeux = document.querySelector('#zoneDeJeux');
var bordureG = document.querySelector('#bordureG');
var bordureD = document.querySelector('#bordureD');
var cible = document.querySelector('.jeuxALICE');

// ## taille de le zone de jeux
var zoneDeJeuxRecupCSS = getComputedStyle(zoneDeJeux);
var positionMini;
var tailleZoneDeJeux;
var positionMaxi;
//## DEPLACEMENT DU DECORS##
var bg_Y = 0;
var bordure_Y = 0;
//## DEPLACEMENT ALICE ##
var alice = document.querySelector('#alice');
var aliceRecupCSS = getComputedStyle(alice);
var aliceWidth = parseInt(aliceRecupCSS.width.replace("px", ""));
var pasAlice;
var posAlice = parseInt(aliceRecupCSS.left.replace("px", ""));
var touche = [];
var aliceHeight = parseInt(aliceRecupCSS.height.replace("px", ""));
var demialiceWidth = aliceWidth/2;
var aliceTop; var aliceBottom; var aliceDroit; var aliceGauche;
// ## GESTION DU MISSILE
var missilePresent = false;
var cibleMissile;
var missileRecupCSS;
var missile;
var positionMissileX;
var positionMissileY;
var topMissile;
var hauteurMissile;
var bottomMissile;
var largeurMissile;
var droitMissile;
var gaucheMissile;
// ## GESTION D UN ENNEMI
var tablMonstre = [];
var nbreMonstre = 5;
var enHaut;
var agauche;
var hauteur;
var largeur;
var vitesse;
var vitesseAlea;
var nouvellePositionEnnemi;
var cibleEnnemi;var ennemiRecupCSS;
var topEnnemi;var leftEnnemi;var hauteurEnnemi;var largeurEnnemi;
var droitEnnemi; var bottomEnnemi;
var numEnnemi;
//## AFFICHAGE LEVEL
// var levelUp;
// var cibleLevelUp = document.querySelector(".levelUp");
// var levelUpRecupCSS = getComputedStyle(cibleLevelUp);
//##AFFICHAGE DU SCORE MONSTRES
var affiche_score;
var cibleAfficheScore = document.querySelector(".score");
var afficheScoreRecupCSS = getComputedStyle(cibleAfficheScore);
var score_final;
var button_enregistrer;
// ## GENERATION DES MONSTRES ######################################


//## GENERATION DES MONSTRES DEBUT DE PARTIE
for(var i=0; i<nbreMonstre; i++){
    //on fabrique un ennemi, on defini ces proprietes
    ennemi = document.createElement('div');
    ennemi.setAttribute('class', 'ennemiFabrique');
    ennemi.setAttribute('id', 'monstre'+i);
    ennemi.style.top = -110 + 'px' ;
    positionEnnemiAleaX = Math.floor(Math.random() * 600) + 100;
    ennemi.style.left = positionEnnemiAleaX + 'px' ;
    numEnnemi = Math.floor(Math.random() * 4) + 1;
    ennemi.style.backgroundImage="url('images/ennemi"+numEnnemi+".png')";
    //on ajoute l'ennemi dans le DOM
    cible.appendChild(ennemi);
    //on recupere l'ennemi en question et ces proprietes CSS
    cibleEnnemi= document.querySelector('#monstre'+i);
    ennemiRecupCSS = getComputedStyle(cibleEnnemi);
    //stock les donnees propres a chaque ennemi dans le tableau -> initialisation du tableau
    topEnnemi = parseInt(ennemiRecupCSS.top.replace("px", ""));
    leftEnnemi = parseInt(ennemiRecupCSS.left.replace("px", ""));
    hauteurEnnemi = parseInt(ennemiRecupCSS.height.replace("px", ""));
    largeurEnnemi = parseInt(ennemiRecupCSS.width.replace("px", ""));
    vitesseAlea = Math.floor(Math.random() * 4) + 1;
    tablMonstre[i]= {   'enHaut':topEnnemi,
                        'agauche':leftEnnemi,
                        'hauteur': hauteurEnnemi,
                        'largeur':largeurEnnemi,
                        'imageStyle':numEnnemi,
                        'vitesse':vitesseAlea};
}

//## GESTION DU TEMPS
var tempsDebutJeux;
var tempsFinJeux;
//## LANCEMENT DU JEU
var partieEnCours = true;
var boutonStart;
//## COMPTEUR DE POINTS
var compteurScore = 0;
var pointMonstre = 10;
var dureeJeux;
var affiche_score;
var affiche_temps;
var score_total;
var scoreFinal;



gestion_Clavier();
// ## FONCTION LOOP ################################################
function loop(){
    //## AFFICHAGE DU SCORE MONSTRES
    cibleAfficheScore.textContent = "Votre score " + compteurScore;
    //## POSITION DE LA ZONE DE JEUX A CHAQUE MOMENT ->REACTUALISEE
    positionMini = parseInt(zoneDeJeuxRecupCSS.left.replace("px", ""));
    tailleZoneDeJeux = parseInt(zoneDeJeuxRecupCSS.width.replace("px", ""));
    positionMaxi = parseInt(positionMini + tailleZoneDeJeux - aliceWidth);
    // deplacement_bg();
    //defini le pas de defilement
    bg_Y -= 1;
    //on replace le bg
    if(bg_Y >= 600) {bg_Y = 0;}
    //on redessinne
    zoneDeJeux.style.backgroundPositionY = bg_Y + 'px';
    // deplacement_bordure();
    //on definie le pas
    bordure_Y -= 3;
    //on replace l'image
    if(bordure_Y >= 600) {bordure_Y = 0;}
    //on redessinne les 2 bordures
    bordureG.style.backgroundPositionY = bordure_Y + 'px';
    bordureD.style.backgroundPositionY = bordure_Y + 'px';
    deplacement_Alice();
    //deplacement des missiles et destruction si sort de l'écran
    if(missilePresent){
        //deplacement
        cibleMissile = document.querySelector('.missileTire');
        missileRecupCSS = getComputedStyle(cibleMissile);
        positionMissileY = parseInt(missileRecupCSS.top.replace("px", ""));
        positionMissileY += 6;
        missile.style.top = positionMissileY + 'px';
        //destruction missile en bas
        if(positionMissileY >= 600){
            cible.removeChild(missile);
            missilePresent = false;
        }
    }
    //pas de deplacement des monstres
    vitesse = -3;
    ennemi_F();
    collision();
    //# REFRESH
    if(partieEnCours){
        requestAnimationFrame(loop);
    }

}
//## FONCTIONS JEUX ################################################
function gestion_Clavier() {
  // Détection de touche enfoncée
  document.addEventListener('keydown', function(event) {
        touche[event.which] = true;
        //  ken.style.transform = "scaleX(1)";
        if ((touche[32]===true) && (!missilePresent)) {missile_F();}
  });
  // détection de touche non enfoncée
  document.addEventListener('keyup', function(event) {
    touche[event.which] = false;
    //  ken.style.transform = "scaleX(-1)";
  });
}
function deplacement_Alice(){
    // Gestion des touches du clavier -> ondefinie le pas
    if (touche[37]===true && posAlice > positionMini) {
        posAlice-=8;
    }
    if (touche[39]===true && posAlice < positionMaxi) {
        posAlice+=8;
    }
    //on redessine
    alice.style.left = posAlice + 'px';
}

function missile_F(){
        missilePresent = true;
        //positionnement du missile aux pieds d'alice
        positionMissileX = posAlice + demialiceWidth - 10;
        //création du missile
        missile = document.createElement('div');
        missile.setAttribute('class', 'missileTire');
        missile.style.top = 100 + 'px';
        missile.style.left = positionMissileX + 'px';
        cible.appendChild(missile);

}
function ennemi_F(){
    for(var j=0; j<tablMonstre.length; j++){
        //recup valeur ennemi
        cibleEnnemi= document.querySelector('#monstre'+j);
        ennemiRecupCSS = getComputedStyle(cibleEnnemi);
        topEnnemi = parseInt(ennemiRecupCSS.top.replace("px", ""));
        //deplacement
        vitesse--;
        topEnnemi += vitesse;
        cibleEnnemi.style.top = topEnnemi + 'px';
        //affichage si sort du haut de la zone de jeu
        if(topEnnemi < -150){
            nouvellePositionEnnemi = Math.floor(Math.random()*700)+100;
            cibleEnnemi.style.left = nouvellePositionEnnemi + 'px';
            nouvellePositionEnnemiTop = Math.floor(Math.random()*600)+800;
            cibleEnnemi.style.top = nouvellePositionEnnemiTop + 'px';
            topEnnemi += -(Math.round(Math.random()*100)+1);
            tablMonstre[j]= {'enHaut': topEnnemi};
        }
    }

}
function collision(){
    //on parcours tous les ennemis
    for(var k=0; k<tablMonstre.length ; k++){
        //recup valeur alice
        aliceTop =parseInt(aliceRecupCSS.top.replace("px", ""));
        aliceBottom = aliceTop + aliceHeight;
        aliceGauche = parseInt(aliceRecupCSS.left.replace("px", ""));
        aliceDroit = aliceGauche + aliceWidth;
        //recup valeur ennemi
        cibleEnnemi= document.querySelector('#monstre'+k);
        ennemiRecupCSS = getComputedStyle(cibleEnnemi);
        topEnnemi = parseInt(ennemiRecupCSS.top.replace("px", ""));
        leftEnnemi = parseInt(ennemiRecupCSS.left.replace("px",""));
        largeurEnnemi = parseInt(ennemiRecupCSS.width.replace("px",""));
        droitEnnemi = leftEnnemi + largeurEnnemi;
        hauteurEnnemi = parseInt(ennemiRecupCSS.height.replace("px",""));
        bottomEnnemi = topEnnemi + hauteurEnnemi;
        //collision alice // ennemi
        //collision sur le haut ennemi
        if((topEnnemi < aliceBottom-20) && (topEnnemi > aliceTop)){
            if((droitEnnemi-20>aliceGauche) && (droitEnnemi-20<aliceDroit) ||
                (leftEnnemi+20>aliceGauche) && (leftEnnemi+20<aliceDroit)){
                    youLoose();
            }
        }
        //collision bas ennemi
        if((bottomEnnemi < aliceBottom-20) && (bottomEnnemi > aliceTop)){
            if((droitEnnemi-20>aliceGauche) && (droitEnnemi-20<aliceDroit) ||
                (leftEnnemi+20>aliceGauche) && (leftEnnemi+20<aliceDroit)){
                    youLoose();
            }
        }
        //collision dim alice a l'interieur de l'ennemi
        if (topEnnemi<aliceBottom-20 && bottomEnnemi>aliceTop) {
            if(leftEnnemi+20<aliceGauche && droitEnnemi-20>aliceDroit){
                // console.log("collision dessus alice milieu de ennemi");
            youLoose();}
        }
        //test existance missile
        cibleMissile = document.querySelector('.missileTire');
        if(cibleMissile){
            //recup valeur missile
            missileRecupCSS = getComputedStyle(cibleMissile);
            topMissile = parseInt(missileRecupCSS.top.replace("px", ""));
            hauteurMissile = parseInt(missileRecupCSS.height.replace("px", ""));
            bottomMissile = topMissile + hauteurMissile;
            largeurMissile = parseInt(missileRecupCSS.width.replace("px", ""));
            gaucheMissile = parseInt(missileRecupCSS.left.replace("px", ""));
            droitMissile = gaucheMissile + largeurMissile;
            //collision
            if((topEnnemi < bottomMissile) && (topEnnemi > topMissile)){
                if((gaucheMissile > leftEnnemi-largeurMissile) && (droitMissile < droitEnnemi+largeurMissile)){
                    //replacement ennemi
                    cibleEnnemi= document.querySelector('#monstre'+k);
                    ennemiRecupCSS = getComputedStyle(cibleEnnemi);
                    nouvellePositionEnnemi = Math.floor(Math.random()*700)+100;
                    cibleEnnemi.style.left = nouvellePositionEnnemi + 'px';
                    nouvellePositionEnnemiTop = Math.floor(Math.random()*600)+800;
                    cibleEnnemi.style.top = nouvellePositionEnnemiTop + 'px';
                    //effacement missile
                    cible.removeChild(missile);
                    missilePresent = false;
                    compteurScore += pointMonstre;
                }
            }
        //fin test existance missile
        }
    }
}
function youLoose(){
    //gestion du temps
    tempsFinJeux = Date.now();
    partieEnCours = false;
    dureeJeux = Math.round((tempsFinJeux - tempsDebutJeux)/1000);
    //ciblage du input
    var cibleInput = document.querySelector('input');
    //score en temps
    affiche_temps = document.createElement('div');
    affiche_temps.setAttribute('class', 'temps');
    affiche_temps.style.color = 'white';
    affiche_temps.style.fontSize = 30 + 'px';
    affiche_temps.style.fontFamiy = 'arial';
    affiche_temps.textContent = "Votre bonus temps " + dureeJeux;
    bordureD.appendChild(affiche_temps);
    //calcul du score final
    scoreFinal = dureeJeux + compteurScore;
    score_total= document.createElement('div');
    score_total.setAttribute('class', 'scoreFinal');
    score_total.style.color = 'white';
    score_total.style.fontSize = 35 + 'px';
    score_total.style.fontFamiy = 'arial';
    score_total.textContent = "SCORE FINAL " + scoreFinal;
    bordureD.appendChild(score_total);
    //enregistrement du score / vers php en ajax
    button_enregistrer = document.createElement('div');
    button_enregistrer.addEventListener('click', function(){
        var lesValeurs = "action='saveScore'&score="+scoreFinal+"&user_pseudo="+user_pseudo+"&user_email="+user_email+"";
        console.log(lesValeurs);
        $.ajax({
           url:'http://localhost/projet_alice/traitementScore.php',
           type:'POST',
           data:lesValeurs,
           dataType:'json',
           success: function (data) {
               alert(data.reponse);
           },
           error:function(e){
               alert("erreur" + e);
           }
       });

    });
    //bouton enregistrer
    button_enregistrer.setAttribute('class', 'enregistrer');
    button_enregistrer.style.cursor = 'pointer';
    button_enregistrer.style.color = 'white';
    button_enregistrer.style.fontSize = 30 + 'px';
    button_enregistrer.style.fontFamiy = 'arial';
    button_enregistrer.textContent = "enregistrer";
    bordureD.appendChild(button_enregistrer);
    //bouton rejouer
    button_restart = document.createElement('div');
    button_restart.setAttribute('class', 'restart');
    button_restart.style.color = 'white';
    button_restart.style.fontSize = 30 + 'px';
    button_restart.style.fontFamiy = 'arial';
    button_restart.textContent = "rejouer";
    bordureD.appendChild(button_restart);
    //on relance une nouvelle partie
    button_restart.addEventListener('click', function(){
        bordureD.removeChild(affiche_temps);
        bordureD.removeChild(score_total);
        bordureD.removeChild(button_enregistrer);
        bordureD.removeChild(button_restart);
        //destrucion monstres
        for(var i=0; i<tablMonstre.length; i++){
            //ciblage des monstres existants
            cibleEnnemi= document.querySelector('#monstre'+i);
            ennemiRecupCSS = getComputedStyle(cibleEnnemi);
            //stock les donnees propres a chaque ennemi dans le tableau -> initialisation du tableau
            topEnnemi = parseInt(ennemiRecupCSS.top.replace("px", ""));
            nouvellePositionEnnemiTop = Math.floor(Math.random()*600)+800;
            cibleEnnemi.style.top = nouvellePositionEnnemiTop + 'px';
            tablMonstre[i]= {'enHaut':topEnnemi};
        }
        posAlice.style.left= 475 + 'px';
        //reinitialisation
        scoreFinal = 0;
        compteurScore =0;
        dureeJeux = 0;
        tempsDebutJeux = Date.now();
        partieEnCours = true;



        loop();
    });
}
//coblage du bouton start pour lancement de partie
boutonStart = document.querySelector('input[type=button]');
// lancement de la premiere loop au premier demarrage du jeu
boutonStart.addEventListener('click', function(){
    bordureD.removeChild(boutonStart);
    loop();
    // ## TIMESTAMP ####################################
    tempsDebutJeux = Date.now();
});
// // ### FIN DU DOMContentLoaded ############################
});
