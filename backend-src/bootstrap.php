<?php

spl_autoload_register(function($className){
  require_once 'classes/db/' . $className . '.php';
});

?>
