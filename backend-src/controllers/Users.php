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

    public function getAllUsers() {
        $query = "
            SELECT user_id, user_name, email 
            FROM justin_smith.users
        ";
        
        $users = $this->db->getArray($query, []);

        print_r(json_encode($users));
    }

    public function addUser($user_name, $email) {
        $params = [
            $user_name,
            $email
        ];

        $query = "INSERT INTO justin_smith.users (user_name, email)
        VALUES (?, ?)
        ";
        
        if ($this->db->execute($query, $params)) {
            $result = 'registration successful';
        } else {
            $result = 'registration failed';
        }

        print_r(json_encode($result));
    }

}