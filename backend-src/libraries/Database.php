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

    $this->host = config::$host;
    $this->username = config::$username;
    $this->password = config::$password;
    $this->dbname = config::$dbname;

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
    $return = [];
    $stmt = $this->pdo->prepare($query);
    $stmt->execute($params);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    return $result;
  }

}
