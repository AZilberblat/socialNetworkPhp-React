<?php
require_once 'dbconnect.php';
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Content-Type');
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
echo ("PHP server running");
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $vs = $_POST["username2"];
    $sql = "SELECT username from users Where username = '" . $username . "'";
    $result = $conn->query($sql);
    $sql2 = "SELECT username from users Where username = '" . $vs . "'";
    $result2 = $conn->query($sql2);
    if ($result->num_rows > 0 && $result2->num_rows > 0) {
        echo json_encode(
            [
                "sent" => true,

            ]
        );
    } else {
        echo json_encode(
            [
                "sent" => false,
            ]
        );

    }
}
