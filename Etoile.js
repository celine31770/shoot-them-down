class Etoile
{
    constructor(cible){
        this.cible = cible; // endroit ou on injecte l'etoile
        this.zoneJeu = 800;
        this.bordure = 100;
        this.maxHeight =this.zoneJeu - 2*(this.bordure); // 600px
        this.bordDroitZoneJeu = this.zoneJeu - this.bordure; //700px

        this.vitesseEtoile = -10;
    }

    createEtoile(){
        this.etoile = document.createElement('div');
        this.etoile.setAttribute('class', 'etoile');
        this.etoile.style.top = 800 + 'px' ;
        var positionEtoile = Math.floor(Math.random() * this.maxHeight) + this.bordure;
        this.etoile.style.left = positionEtoile + 'px' ;
        //on ajoute l'etoile dans le DOM
        this.cible.appendChild(this.etoile);
        //accede proprietes CSS
        this.cibleEtoile = document.querySelector('etoile');
        this.etoileRecupCSS = getComputedStyle(this.cibleEtoile);
    }
//deplacementEtoile
//replacementEtoile


 //fin de la class
 }
