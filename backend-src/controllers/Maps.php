<?php

class Maps extends Controller {
    private $db;

    public function __construct() {
        $this->db = new Database();
    }

    public function getState($param) {
        $params = [];
        $params[] = $param;
        
        $query = "SELECT * FROM justin_smith.states WHERE code = ?";
        $state = $this->db->getArray($query, $params);

        print_r(json_encode($state[0]));
    }
    public function getAllStates() {
        $query = "SELECT * FROM justin_smith.states";
        $states = $this->db->getArray($query, []);
        print_r(json_encode($states));
    }
}