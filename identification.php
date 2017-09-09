<?php
  session_start();
// Initialisation
$_SESSION['ident'] ="";
$erreur = false;

  // Récupération des données du formulaire
  // user_prenom
  if (empty($_POST['user_email'])) {
    // Champ vide ou inexistant
    $erreur = true;
  } else {
    if (strlen($_POST['user_email'])>50) {
      $erreur = true;
    } else {
        //if verif format avec regex
            $user_email = htmlentities($_POST['user_email']);
      //}
    }
  }
  // MOT DE PASSE
  if (empty($_POST['user_mdp'])) {
    // Champ vide ou inexistant
    $erreur = true;
  } else {
        if (strlen($_POST['user_mdp'])>20) {
          $erreur = true;
        } else {
          $user_mdp = md5(htmlentities($_POST['user_mdp']));
        }
  }

  // echo $user_mdp.' / '.$user_email;

if ($erreur==false) {
  // chek dans la BdD pour Identification
  // Préparation des informations nécessaires
  define('DSN','mysql:host=127.0.0.1;dbname=alice_bd');
  define('USER','root');
  define('MDP','');

  // Création d'un objet PDO et connexion
  $connDB = new PDO(DSN,USER,MDP);

  // Extraction des données avec fetch()
  $requete = "SELECT * FROM users WHERE user_email='".$user_email."' AND user_mdp='".$user_mdp."'";
  $resultat = $connDB->query($requete);
  $donnees = $resultat->fetch(PDO::FETCH_ASSOC);
      if($donnees==false) {
        // Retour à l'accueil

        // header('Location:projet_alice.php');
      } else {
        // header('Location:alice.php');
        //echo "Bienvenue ".$donnees['user_prenom'];
        // Identification OK$_SESSION['ident'] = $user_prenom;
        $_SESSION['ident'] = $donnees['user_prenom'];
        $_SESSION['mail'] = $user_email;




         header('Location:alicePOO.php');
      }

  // Fermeture de la connexion
  if ($connDB) {
      $connDB = NULL;
  }
} else {
  // Retour à l'accueil
  header('Location:projet_alice.php');
}

 ?>
