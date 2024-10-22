<?php

class Books extends Controller {
    private $db;

    public function __construct() {
        $this->db = new Database();
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

    public function getAllUserBooksByAuthor($author, $user_id) {
        $query = "
            SELECT 
                b.book_id,
                b.cover_id,
                b.title,
                b.authors,
                b.categories,
                b.page_count,
                b.publish_year,
                b.publish_order,
                b.description,
                IF (ub.completed IS NOT NULL, ub.completed, 'N') as completed,
                IF (ub.in_progress IS NOT NULL, ub.in_progress, 'N') as in_progress,
                IF (ub.owned IS NOT NULL, ub.owned, 'N') as owned
            FROM justin_smith.books b
            LEFT JOIN justin_smith.user_books ub ON (b.book_id = ub.book_id AND ub.user_id = ?)
            WHERE b.authors LIKE ?
            ORDER BY b.publish_order;
        ";

        $params = [
            $user_id,
            "%" . $author . "%"
        ];

        $user_books = $this->db->getArray($query, $params);
        print_r(json_encode($user_books));
    }

    public function getAllUserShortStoriesByAuthor($author, $user_id) {
        $query = "
            SELECT ss.book_id, ss.story_name
                FROM justin_smith.short_stories ss
            INNER JOIN justin_smith.books b ON (ss.book_id = b.book_id AND b.authors LIKE ?)
            INNER JOIN justin_smith.user_books ub ON (ss.book_id = ub.book_id AND ub.user_id = ?)
        ";

        $params = [
            "%" . $author . "%",
            $user_id
        ];

        $short_stories = $this->db->getArray($query, $params);
        print_r(json_encode($short_stories));
    }

    public function updateUserBook($book_id, $user_id, $completed, $in_progress, $owned) {
        $query = "
            INSERT INTO justin_smith.user_books (book_id, user_id, completed, in_progress, owned)
                VALUES (?,?,?,?,?)
            ON DUPLICATE KEY UPDATE
                completed = ?,
                in_progress = ?,
                owned = ?
        ";

        $params = [
            $book_id,
            $user_id,
            $completed,
            $in_progress,
            $owned,
            $completed,
            $in_progress,
            $owned
        ];

        if ($this->db->execute($query, $params)) {
            $result = 'user book insert succesful';
        } else {
            $result = 'user book insert failed';
        }

        print_r(json_encode($result));
    }

}