<?php

class Books extends Controller {
    private $db;

    public function __construct() {
        $this->db = new Database();
    }

    public function addBook($book_id, $cover_id, $title, $authors, $page_count, $publish_year) {
        $params = [
            $book_id,
            $cover_id,
            $title,
            $authors,
            $page_count,
            $publish_year
        ];
    
        $query = "
            INSERT INTO justin_smith.books 
            SET 
                book_id = ?,
                cover_id = ?,
                title = ?,
                authors = ?,
                page_count = ?,
                publish_year = ?
        ";
        
        if ($this->db->execute($query, $params)) {
            $result = 'Book Upload Successful';
        } else {
            $result = 'Book Upload Failed';
        }

        print_r(json_encode($result));
    }

    public function addBookDescription($book_id, $description) {
        $params = [
            $description,
            $book_id
        ];

        $this->db->execute("
            UPDATE justin_smith.books 
            SET description = ?
            WHERE book_id = ?
        ", $params);
    }

    public function getAllBooksByAuthor($author) {

        $query = "
            SELECT * FROM justin_smith.books 
            WHERE authors LIKE ?
            ORDER BY publish_order
        ";
        
        $books = $this->db->getArray($query, ["%" .$author . "%"]);
        print_r(json_encode($books));
    }

}