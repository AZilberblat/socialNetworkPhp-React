<?php

require_once 'dbconnect.php';
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Content-Type');
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
echo ("jee");
echo ($_POST);
if (empty($_POST['username'])) {
    die();
}

if ($_POST) {
    $sql = "SELECT * from tictac Where username = '" . $_POST['username'] . "'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        echo json_encode(
            [
                "sent" => false,

            ]
        );
    } else {
        $sql2 = "INSERT into tictac (username) values('" . $_POST['username'] . "')";
        if ($conn->query($sql2) === true) {

            echo json_encode(
                [
                    "sent" => true,
                ]
            );
        } else {

            echo json_encode(
                [
                    "sent" => false,
                    "message" => $conn->error,
                ]
            );
        }

    }

}
