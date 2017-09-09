class Ennemi
{
 constructor(cible, i){
    this.cible = cible;
    this.numMonstre = i;
    this.ennemi = null;

    this.zoneJeu = 800;
    this.bordure = 100;
    this.maxHeight =this.zoneJeu - 2*(this.bordure); // 600px
    this.bordDroitZoneJeu = this.zoneJeu - this.bordure; //700px

    this.vitesse = -(Math.floor(Math.random() * 4) + 3);
}
//create
    create(){
        this.ennemi = document.createElement('div');
        this.ennemi.setAttribute('class', 'ennemiFabrique');
        this.ennemi.setAttribute('id', 'monstre'+this.numMonstre);
        this.ennemi.style.top = -110 + 'px' ;
        var positionEnnemiAleaX = Math.floor(Math.random() * this.maxHeight) + this.bordure;
        this.ennemi.style.left = positionEnnemiAleaX + 'px' ;
        var numEnnemi = Math.floor(Math.random() * 4) + 1;
        this.ennemi.style.backgroundImage="url('images/ennemi"+numEnnemi+".png')";
        //on ajoute l'ennemi dans le DOM
        this.cible.appendChild(this.ennemi);
        //accede proprietes CSS
        this.cibleEnnemi = document.querySelector('#monstre'+this.numMonstre);
        this.ennemiRecupCSS = getComputedStyle(this.cibleEnnemi);
    }
    deplaceEnnemi(){
        //recup la position ennemi
        this.topEnnemi = parseInt(this.ennemiRecupCSS.top.replace("px", ""));
        //deplacement
        this.topEnnemi += this.vitesse;
        this.cibleEnnemi.style.top = this.topEnnemi + 'px';
        //affichage si sort du haut de la zone de jeu qui est a -150px en hauteur
        if(this.topEnnemi < -150){
            this.nouvellePositionEnnemi = Math.floor(Math.random()*this.bordDroitZoneJeu)+this.bordure;
            this.cibleEnnemi.style.left = this.nouvellePositionEnnemi + 'px';
            this.nouvellePositionEnnemiTop = Math.floor(Math.random()*this.maxHeight)+this.zoneJeu ;
            this.cibleEnnemi.style.top = this.nouvellePositionEnnemiTop + 'px';
            this.topEnnemi += -(Math.round(Math.random()*this.bordure) + 1 );
        }
    }
    positionEnnemi(){
        this.leftEnnemi =parseInt(this.ennemiRecupCSS.left.replace("px",""));
        this.largeurEnnemi = parseInt(this.ennemiRecupCSS.width.replace("px",""));
        this.hauteurEnnemi = parseInt(this.ennemiRecupCSS.height.replace("px",""));
        this.droitEnnemi = this.leftEnnemi + this.largeurEnnemi;
        this.bottomEnnemi = this.topEnnemi + this.hauteurEnnemi;

        //autre methode
        //var gauche = parseInt(this.ennemiRecupCSS.left.replace("px",""));
        //on stocke dans tab json
        //return {gauche:this.leftEnnemi, haut:this.topEnnemi, droit:this.droitEnnemi, bas:this.bottomEnnemi};
    }
    replacement(){
        this.leftEnnemi = Math.floor(Math.random()*this.bordDroitZoneJeu) + this.bordure;;
        this.topEnnemi = Math.floor(Math.random()*this.maxHeight) + this.zoneJeu;
        this.ennemi.style.top = this.topEnnemi + 'px' ;
        this.ennemi.style.left = this.leftEnnemi + 'px' ;

    }

    removeEnnemi(){
        this.cible.removeChild(this.ennemi);
    }
//fin de la classe
}
