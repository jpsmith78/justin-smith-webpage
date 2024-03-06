<?php

class Application {
    protected string $current_controller_name = '';
    protected ?object $current_controller;
    protected string $current_method = '';
    protected array $params = [];

    public function __construct() {
        $params = $this->getParams();
        $base_route = dirname(__DIR__);

        if ($this->current_controller_name && $this->current_method) {

            // Look in controllers for first value
            if(file_exists($base_route . '/controllers/' . $this->current_controller_name . '.php')){
                // Require the controller
                require_once $base_route . '/controllers/'. $this->current_controller_name . '.php';
    
                // Instantiate controller class
                $this->current_controller = new $this->current_controller_name;
                // Check to see if method exists in controller
                if(method_exists($this->current_controller, $this->current_method)){
                    // Call a callback with array of params
                    call_user_func_array([$this->current_controller, $this->current_method], $params);
                } else {
                    echo 'invalid method provided';
                }

            } else {
                echo 'invalid controller provided';
            }
        
        } else {
            echo 'no parameters provided';
        }

    }

    public function getParams() {
      $params = $_REQUEST ?? [];

      if (isset($params['url'])) {
        unset($params['url']);
      }

      if (isset($params['controller'])) {
        $this->current_controller_name = ucwords($params['controller']);
        unset($params['controller']);
      }

      if (isset($params['method'])) {
        $this->current_method = $params['method'];
        unset($params['method']);
      }

      return $params;
    }

}