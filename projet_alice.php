<?php

  session_start();

 ?>
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8">
    <title>Projet Alice</title>
    <link rel="stylesheet" href="accueil.css">
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <script type="text/javascript" src="modal.js"></script>
    <script src="traitement.js"></script>
  </head>


  <body class="accueil">
    <div class="modal-bg"></div>
    <nav>
        <a href="#" class="modal-click">Les règles</a>
        <a href="#" class="modal-click1">Le top 10</a>
    </nav>

    <div class="formulaires">
        <form action="inscription.php" method="post" id="inscription">
          <fieldset>
              INSCRIPTION
          </fieldset>
          <input type="text" name="user_prenom" value="" placeholder="prénom ou pseudo">
          <input type="email" name="user_email" value="" placeholder="adresse mail">
          <input type="password" name="user_mdp" value="" placeholder="mot de passe">
          <input type='button' value='valider'>
          <!-- <input type='submit' value='soumettre'> -->
        </form>
        <h2>AU PAYS DES MERVEILLES</h2>
        <form action="identification.php" method="post" id="connexion">
            <fieldset>
                CONNEXION
            </fieldset>
            <input type='mail' name='user_email' placeholder='email' value=''>
            <input type='password' name='user_mdp' placeholder='mot de passe' value=''>
            <!-- <input type='button' value='connexion'> -->
            <input type="submit" value="Connexion">
        </form>
    </div>

<!-- ## BOITES MODALES################################# -->
    <div class="modal-content">
        <strong>Reste en vie le plus longtemps possible en évitant les ennemis...</strong><br>
        Appuie sur les flêches gauche et droite pour te déplacer et sur la barre d'espace pour tirer.<br>
        Lances des missiles pour détruire les ennemis et gagner plus de points...<br>
        Attention : un seul missile à la fois<br>
        Attrape l'étoile bonus pour enlever tous les ennemis de l'écran<br>
        Penses à enregistrer ton score en fin de partie !<br>
        <span class="modal-close">Fermer</span>
    </div>

    <div class="modal-content1">
        <?php
        define ('DSN','mysql:host=localhost;dbname=alice_bd');
        define ('USER','root');
        define ('MDP','');
        // // Création d'un objet PDO et test de la connexion
        $connDB = new PDO(DSN,USER,MDP);

            // préparation de la requête
            $requete ="SELECT user_score, user_prenom FROM users ORDER BY user_score DESC LIMIT 10";
            $resultat = $connDB->query($requete);
            $donnees = $resultat->fetchAll();
            //on se deconnecte de la base
            if($connDB){
              $connDB = NULL;
            }

            echo "<table>";
              echo "<tr>";
                echo '<th>NOM</th>';
                echo '<th>SCORE</th>';
              echo "</tr>";
                  foreach($donnees as $ligne) {

                      echo "<tr>";
                        echo '<td>'.$ligne['user_prenom']."</td>";
                        echo '<td>'.$ligne['user_score']."</td>";
                      echo "</tr>";
                    }
            echo "</table>";

                 ?>
            <span class="modal-close1">Fermer</span>
       </div>
  </body>
</html>
