<?php

class Application {
    protected $current_controller = 'Maps';
    protected $current_method = 'getMap';
    protected $params = [];

    public function __construct() {
        $url = $this->getUrl();

        // Look in controllers for first value
        if(file_exists('../controllers/' . ucwords($url[0]). '.php')){
          // If exists, set as controller
          $this->current_controller = ucwords($url[0]);
          // Unset 0 Index
          unset($url[0]);
        }
  
        // Require the controller
        require_once '../controllers/'. $this->current_controller . '.php';
  
        // Instantiate controller class
        $this->current_controller = new $this->current_controller;
  
        // Check for second part of url
        if(isset($url[1])){
          // Check to see if method exists in controller
          if(method_exists($this->current_controller, $url[1])){
            $this->current_method = $url[1];
            // Unset 1 index
            unset($url[1]);
          }
        }
  
        // Get params
        // var_dump($url); exit();
        $this->params = $url ? array_values($url) : [];
        // var_dump($this->params); exit();
        // Call a callback with array of params
        call_user_func_array([$this->current_controller, $this->current_method], $this->params);
    }

    public function getUrl(){
        if(isset($_GET['url'])){
            $url = rtrim($_GET['url'], '/');
            $url = filter_var($url, FILTER_SANITIZE_URL);
            $url = explode('/', $url);
            return $url;
        }
      
    }

}