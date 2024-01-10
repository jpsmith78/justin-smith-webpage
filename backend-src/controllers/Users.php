<?php

class Users extends Controller {
    private $db;

    public function __construct() {
        $this->db = new Database();
    }

    public function getUser($user_id) {
        $params = [];
        $params[] = $user_id;
        
        $query = "SELECT * FROM justin_smith.users WHERE user_id = ?";
        $user = $this->db->getArray($query, $params);

        if (isset($user[0])) {
            print_r(json_encode($user[0]));
        } else {
            print_r(json_encode('failed to get response'));
        }
    }
}