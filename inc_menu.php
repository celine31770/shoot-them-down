
<?php

if (isset($_SESSION['ident'])) {
  echo 'Bonjour '.$_SESSION['ident'];
} else {
  echo 'Bonjour inconnu';
}

?>
