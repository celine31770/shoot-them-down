document.addEventListener('DOMContentLoaded', function() {
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
var aliceTop;
var aliceBottom;
var aliceDroit;
var aliceGauche;


// ## GESTION DU MISSILE
// var nbreMissilePresent = 0;
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

//##AFFICHAGE DU SCORE MONSTRES
var affiche_score;
var cibleAfficheScore = document.querySelector(".score");
var afficheScoreRecupCSS = getComputedStyle(cibleAfficheScore);
var score_final;
var button_enregistrer;

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
var levelUp = 1;
//## BONUS
var bonus; // score du random
//## ETOILE
var etoile;
var vitesseEtoile;
var positionEtoile;
var cibleEtoile;
var etoileRecupCSS;

// ## GENERATION DES MONSTRES POO   ######################################
var tabEnnemi = [];
var nbreEnnemiDepart =4;
var nbreEnnemiEnPlus = 0;
//on peut generer 50 ennemis au debut
for(i=0; i<50; i++){
    tabEnnemi[i] = new Ennemi(cible, i);
    tabEnnemi[i].create();
}
//creation bouton levelup
level = document.createElement('div');
level.setAttribute('class', 'level');
level.style.top = 100 + 'px';
level.style.left = 100 + 'px';

// nbreEnnemiTotal
gestion_Clavier();
function loop (){
//etoile bonus
bonus = Math.floor(Math.random() * 1000);
if(bonus<2){
    //appel createEtoile
}
//deplacementEtoile
//colisionEtoile -> replacementEtoile
//levelUp
    level.textContent="Level " + levelUp;
    bordureD.appendChild(level);
    //on peut changer le nbre ennemi present si levelup
    for(i=0; i<(nbreEnnemiDepart+nbreEnnemiEnPlus); i++){
        tabEnnemi[i].deplaceEnnemi();
        tabEnnemi[i].positionEnnemi();
        collision(i);
    }
    cibleAfficheScore.textContent = "Votre score " + compteurScore;
    //## POSITION DE LA ZONE DE JEUX A CHAQUE MOMENT ->REACTUALISEE################################################
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

       //## GESTION DES MISSILES#####################################################################################
       //deplacement des missiles et destruction si sort de l'écran
           if(missilePresent){
               //deplacement
               cibleMissile = document.querySelector('.missileTire');
               missileRecupCSS = getComputedStyle(cibleMissile);
               positionMissileY = parseInt(missileRecupCSS.top.replace("px", ""));
               positionMissileY += 15;
               missile.style.top = positionMissileY + 'px';
               //destruction missile en bas
               if(positionMissileY >= 600){
                   cible.removeChild(missile);
                   missilePresent = false;
                //    nbreMissilePresent--;
               }
           }



    // console.log(nbreMissilePresent);
    //# REFRESH
      if(partieEnCours){
          requestAnimationFrame(loop);
      }
//fin de loop
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

    // if(nbreMissilePresent<4){
        // nbreMissilePresent++;
            missilePresent = true;
            //positionnement du missile aux pieds d'alice
            positionMissileX = posAlice + demialiceWidth - 10;
            //création du missile
            missile = document.createElement('div');
            missile.setAttribute('class', 'missileTire');
            missile.style.top = 100 + 'px';
            missile.style.left = positionMissileX + 'px';
            cible.appendChild(missile);
    //}

}
function collision(k){
    //recup valeur alice
    aliceTop =parseInt(aliceRecupCSS.top.replace("px", ""));
    aliceBottom = aliceTop + aliceHeight;
    aliceGauche = parseInt(aliceRecupCSS.left.replace("px", ""));
    aliceDroit = aliceGauche + aliceWidth;
        if((tabEnnemi[k].topEnnemi < aliceBottom-20) && (tabEnnemi[k].topEnnemi > aliceTop)){
            var droiteMoins = tabEnnemi[k].droitEnnemi-20;
            if((droiteMoins>aliceGauche) && (droiteMoins<aliceDroit) ||
                (tabEnnemi[k].leftEnnemi+20>aliceGauche) && (tabEnnemi[k].leftEnnemi+20<aliceDroit)){
                    youLoose();

            }
        }
        //collision bas ennemi
        if((tabEnnemi[k].bottomEnnemi < aliceBottom-20) && (tabEnnemi[k].bottomEnnemi > aliceTop)){
            if((tabEnnemi[k].droitEnnemi-20>aliceGauche) && (tabEnnemi[k].droitEnnemi-20<aliceDroit) ||
                (tabEnnemi[k].leftEnnemi+20>aliceGauche) && (tabEnnemi[k].leftEnnemi+20<aliceDroit)){
                    youLoose();
            }
        }
        //collision dim alice a l'interieur de l'ennemi
        if (tabEnnemi[k].topEnnemi<aliceBottom-20 && tabEnnemi[k].bottomEnnemi>aliceTop) {
            if(tabEnnemi[k].leftEnnemi+20<aliceGauche && tabEnnemi[k].droitEnnemi-20>aliceDroit){
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
            if((tabEnnemi[k].topEnnemi < bottomMissile) && (tabEnnemi[k].topEnnemi > topMissile)){
                if((gaucheMissile > tabEnnemi[k].leftEnnemi-largeurMissile) && (droitMissile < tabEnnemi[k].droitEnnemi+largeurMissile)){
                    //replacement ennemi
                    tabEnnemi[k].replacement();
                    //effacement missile
                    cible.removeChild(missile);
                    missilePresent = false;
                    compteurScore += pointMonstre;
                    // nbreMissilePresent--;
                    if(compteurScore%100 == 0){
                        if(nbreEnnemiEnPlus<46){
                            nbreEnnemiEnPlus++;
                            levelUp++;
                        }

                    }
                }
            }
        //fin test existance missile
        }
    //}fin de collision
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
    scoreFinal = (dureeJeux*100) + compteurScore;
    score_total= document.createElement('div');
    score_total.setAttribute('class', 'scoreFinal');
    score_total.style.color = 'white';
    score_total.style.fontSize = 35 + 'px';
    score_total.style.fontFamiy = 'arial';
    score_total.textContent = "SCORE FINAL " + scoreFinal;
    bordureD.appendChild(score_total);
    //enregistrement du score / vers php en ajax
    button_enregistrer = document.createElement('div');
    //bouton enregistrer
    button_enregistrer.setAttribute('class', 'enregistrer');
    button_enregistrer.style.cursor = 'pointer';
    button_enregistrer.style.color = 'white';
    button_enregistrer.style.fontSize = 30 + 'px';
    button_enregistrer.style.fontFamiy = 'arial';
    button_enregistrer.textContent = "enregistrer";
    bordureD.appendChild(button_enregistrer);
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

        for(i=0; i<20; i++){
            tabEnnemi[i].removeEnnemi();
        }

        nbreEnnemiEnPlus = 0;
        for(i=0; i<20; i++){
            tabEnnemi[i] = new Ennemi(cible, i);
            tabEnnemi[i].create();
        }

        //reinitialisation
        scoreFinal = 0;
        compteurScore =0;
        dureeJeux = 0;
        tempsDebutJeux = Date.now();
        partieEnCours = true;
        levelUp = 1;

        // alice.style.left = 475 + 'px';
        //remettre nbre missile a 0
        loop();
    });
}
//ciblage du bouton start pour lancement de partie
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
