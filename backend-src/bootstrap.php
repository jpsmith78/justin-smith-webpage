<?php
require_once 'etc/Configuration.php';

spl_autoload_register(function($className){
  require_once 'libraries/' . $className . '.php';
});
