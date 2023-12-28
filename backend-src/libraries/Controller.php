<?php

class Controller {
        // Load model
        public function model($model){
            // Require model file
            require_once '../app/models/' . $model . '.php';
      
            // Instatiate model
            return new $model();
          }
      
}