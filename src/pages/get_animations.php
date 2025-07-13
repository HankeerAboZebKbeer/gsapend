<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$host = "localhost";
$dbname = "gsap";
$username = "root";
$password = "";

$conn = new mysqli($host, $username, $password, $dbname);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "DB connection failed"]);
    exit();
}

$sql = "SELECT id, title, state_machine, rive_file, font_file, audio_file FROM animations";
$result = $conn->query($sql);

$animations = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $animations[] = [
            "id" => (int)$row["id"],
            "title" => $row["title"],
            "state_machine" => $row["state_machine"],
            "rive_file" => base64_encode($row["rive_file"]),
            "font_file" => $row["font_file"] ? base64_encode($row["font_file"]) : null,
            "audio_file" => $row["audio_file"] ? base64_encode($row["audio_file"]) : null,
        ];
    }
}

echo json_encode($animations);
$conn->close();
?>
