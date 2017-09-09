<?php session_start(); ?>

<?php
 $_SESSION['ident'] = "";
 $_SESSION['mail'] = "";
  // Récupération des informations du formulaire
  // (+ VÉRIFICATIONS)
  $user_prenom = $_POST['user_prenom'];
  $user_mdp = $_POST['user_mdp'];
  $user_email = $_POST['user_email'];
// VERIFICATIONS DES DONNEES ENVOYEES PAR UTILISATEUR



  // Formatage
  $user_mdp = md5($user_mdp);

  // Connexion à la DB
  define ('DSN','mysql:host=localhost;dbname=alice_bd');
  define ('USER','root');
  define ('MDP','');

  // Création d'un objet PDO et test de la connexion
  $connDB = new PDO(DSN,USER,MDP);

  // Test d'existence du mail
  $requete = "SELECT * FROM users WHERE user_email='".$user_email."' LIMIT 1";
  $resultat = $connDB->query($requete);
  $donnees = $resultat->fetch(PDO::FETCH_ASSOC);

  if ($donnees===false) {
        // Insertion dans la DB
        $requete = "INSERT INTO users (user_prenom, user_mdp, user_email) VALUES ('".$user_prenom."','".$user_mdp."','".$user_email."')";

        $resultat = $connDB->exec($requete);
            if($resultat==1) {
              echo "Félicitations !";
              // Connexion via SESSION
              $_SESSION['ident'] = $user_prenom;
              $_SESSION['mail'] = $user_email;
                header('Location:alicePOO.php');

            } else {
              echo "Une erreur s'est produite, veuillez recommencer";
            }
      } else {
        echo "Apparement vous êtes déjà inscrit dans notre DB...<br>";
        echo "<a href='projet_alice.php'>RETOUR</a>";
      }

      // Fermeture de la Connexion
      $connDB = Null;

?>
