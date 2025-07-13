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

// Assuming 'grid' table has columns including 'tags' (CSV string)
$sql = "SELECT id, title, tags, state_machine, rive_file, font_file, audio_file FROM grid";
$result = $conn->query($sql);

$gridItems = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $gridItems[] = [
            "id" => (int)$row["id"],
            "title" => $row["title"],
            "tags" => $row["tags"] ? explode(',', $row["tags"]) : [],
            "state_machine" => $row["state_machine"],
            "rive_file" => base64_encode($row["rive_file"]),
            "font_file" => $row["font_file"] ? base64_encode($row["font_file"]) : null,
            "audio_file" => $row["audio_file"] ? base64_encode($row["audio_file"]) : null,
        ];
    }
}

echo json_encode($gridItems);
$conn->close();
?>
