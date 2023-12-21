<?php

  require_once '../bootstrap.php';

  $dba = new DBAccessor();

  $query = "SELECT name FROM justin_smith.TEST WHERE age = ?";
  $params = [45];
  $stuff = $dba->getRow($query, $params);
  var_dump($stuff); exit();
?>
