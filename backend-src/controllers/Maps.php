<?php

class Maps extends Controller {
    
    public function getMap($param) {
        $params = [];
        $params[] = $param;
        $db = new Database();
        
        $query = "SELECT * FROM justin_smith.TEST WHERE age = ?";
        $map = $db->getArray($query, $params);

        var_dump(json_encode($map));
    }
}