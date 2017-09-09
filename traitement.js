//
document.addEventListener('DOMContentLoaded', function() {
var inscription = document.querySelector('input[value=valider]');
inscription.addEventListener('click', function() {
 //alert('au clique de la sooouris');
 //recup des données
 var identifiant = document.forms[0].user_prenom.value;
 var email = document.forms[0].user_email.value;
 var password = document.forms[0].user_mdp.value;
//     // ########## Vérifications
 var erreur = "";
//     // vérification du pseudo
if ((identifiant=='') || (identifiant.length>24)) {
    erreur += "- Vous devez renseigner votre nom\n";
  erreur += 1;
  }
  //console.log(erreur);
//     //  vérification du mot de passe
   if ((password=='') || (password.length>12)) {
      erreur += "-le mot de passe doit contenir des maj/min et/ou chiffre uniquement";
      erreur += 1;
 }
 //verification email
 if((email == "") || (email.length>50) || (email.length<6)){
     erreur += "-format d'email non conforme";
     erreur += 1;
 }


//     // Conséquences
    if (erreur==0) {

     // document.forms[0].submit();

          var lesValeurs = "action='saveUser'&user_prenom="+identifiant+"&user_email="+email+"&user_mdp="+password+"";
          console.log(lesValeurs);
          $.ajax({
             url:'http://localhost/projet_alice/inscription.php',
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





  }else{
      alert(erreur);
  }
//fin de la function
    });
//fin du DOMContentLoaded
});

//
//
//
//
// $.ajax
