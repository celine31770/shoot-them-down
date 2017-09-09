<?php
session_start();
//on créer un fichier txt dans lequel on ecrit la requete SQL, permet de verif requete conforme en testant dans PHPmyAdmin
$fp = fopen("debug.txt", "w+");

if(isset($_POST['action'])){
    if(isset($_POST['user_email'])){
        if(isset($_POST['score'])){
            if(isset($_POST['user_pseudo'])){
                //prepare la requete
                $requete2 = "UPDATE users SET user_score = ".$_POST['score']." WHERE  user_email='".$_POST['user_email']."'; ";
                fwrite($fp, $requete2);
                // //connect DB
                define ('DSN','mysql:host=localhost;dbname=alice_bd');
                define ('USER','root');
                define ('MDP','');
                // // Création d'un objet PDO et test de la connexion
                $connDB = new PDO(DSN,USER,MDP);
                // //exec requete sous condition du score deja enregistre 
                $resultat2 = $connDB->query($requete2);
                // //deco DB
                $connDB = Null;
                //2 lignes qui renvoies une reponse a ajax pour afficher l'alerte ca c'est bien passe. On doit renvoyer une reponses obliger, donc a decaler apres requete SQL si bien passe
                $tab['reponse'] = 'ok en php';
                echo json_encode($tab);
            }
        }
    }
}

fclose($fp);

 ?>
