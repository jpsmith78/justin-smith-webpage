<?php

class Maps extends Controller {
    private $db;

    public function __construct() {
        $this->db = new Database();
    }

    public function getState($state_code) {
        $params = [];
        $params[] = $state_code;
        
        $query = "SELECT * FROM justin_smith.states WHERE code = ?";
        $state = $this->db->getArray($query, $params);

        if (isset($state[0])) {
            print_r(json_encode($state[0]));
        } else {
            print_r(json_encode('failed to get response'));
        }
    }
    public function getAllStates() {
        $query = "SELECT * FROM justin_smith.states";
        $states = $this->db->getArray($query, []);

        if (!empty($states)) {
            print_r(json_encode($states));
        } else {
            print_r(json_encode('failed to get response'));
        }
    }

    public function getAllUserStates($user_id) {
        $params = [];
        $params[] = $user_id;

        $query = "
            SELECT 
                s.name, 
                s.code,
                IF (us.state_code IS NOT NULL, 'Yes', 'No') as selected
            FROM justin_smith.states s
            LEFT JOIN justin_smith.user_states us ON (s.code = us.state_code AND us.user_id = ?)
        ";

        $user_states = $this->db->getArray($query, $params);

        if (!empty($user_states)) {
            print_r(json_encode($user_states));
        } else {
            print_r(json_encode('failed to get response'));
        }
    }

    public function addUserState($user_id, $state_code) {
        $params = [
            $user_id,
            $state_code
        ];

        $query = "
            INSERT IGNORE INTO justin_smith.user_states (user_id, state_code)
            VALUES (?, ?)
        ";

        if ($this->db->execute($query, $params)) {
            $result = 'insert succesful';
        } else {
            $result = 'insert failed';
        }

       print_r(json_encode($result));
    }

    public function removeUserState($user_id, $state_code) {
        $params = [
            $user_id,
            $state_code
        ];

        $query = "
            DELETE FROM justin_smith.user_states 
            WHERE user_id = ?
            AND state_code = ?
        ";

        if ($this->db->execute($query, $params)) {
            $result = 'delete succesful';
        } else {
            $result = 'delete failed';
        }

        print_r(json_encode($result));
    }

}