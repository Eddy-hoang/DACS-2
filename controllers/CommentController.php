<?php
class CommentController {

    // CREATE COMMENT
    public function create($db) {
        $data = json_decode(file_get_contents("php://input"));

        if (!isset($data->user_id) || !isset($data->food_id) || !isset($data->rating)) {
            http_response_code(400);
            echo json_encode(["message" => "Missing required fields"]);
            return;
        }

        $comment = new Comment($db);
        $comment->user_id = $data->user_id;
        $comment->food_id = $data->food_id;
        $comment->rating = $data->rating;
        $comment->comment_text = $data->comment_text ?? "";

        if ($comment->create()) {
            echo json_encode(["message" => "Comment created successfully"]);
        } else {
            echo json_encode(["message" => "Failed to create comment"]);
        }
    }

    // GET COMMENTS
    public function getByFood($db, $food_id) {
        $comment = new Comment($db);
        $result = $comment->getByFood($food_id);

        $comments = [];
        while ($row = $result->fetch_assoc()) {
            $comments[] = $row;
        }

        echo json_encode($comments);
    }

    // DELETE COMMENT
    public function delete($db, $id) {
        $comment = new Comment($db);

        if ($comment->delete($id)) {
            echo json_encode(["message" => "Comment deleted"]);
        } else {
            echo json_encode(["message" => "Delete failed"]);
        }
    }
}
