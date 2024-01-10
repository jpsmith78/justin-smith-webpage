<?php

class Database {

  private $host;
  private $username;
  private $password;
  private $dbname;

  private $pdo;
  private $stmt;
  private $error;

  public function __construct(){

    $this->host = Configuration::$host;
    $this->username = Configuration::$username;
    $this->password = Configuration::$password;
    $this->dbname = Configuration::$dbname;

    $dsn = 'mysql:host=' . $this->host . ';dbname=' . $this->dbname;
    $options = array(
      PDO::ATTR_PERSISTENT => true,
      PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    );

    // Create PDO instance
    try{
      $this->pdo = new PDO($dsn, $this->username, $this->password, $options);
      $this->pdo->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, false);
    } catch(PDOException $e){
      $this->error = $e->getMessage();
      echo $this->error;
    }
  }

  public function getArray($query, $params) {
    $stmt = $this->pdo->prepare($query);
    $stmt->execute($params);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function getRow($query, $params) {
    $stmt = $this->pdo->prepare($query);
    $stmt->execute($params);
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function execute($query, $params){
    $stmt = $this->pdo->prepare($query);
    if ($stmt->execute($params)) {
      return TRUE;
    } else {
      return FALSE;
    }
  }

}
