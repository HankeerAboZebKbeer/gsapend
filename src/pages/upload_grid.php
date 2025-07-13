<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);

$host = "localhost";
$dbname = "gsap";
$username = "root";
$password = "";

$conn = new mysqli($host, $username, $password, $dbname);
if ($conn->connect_error) {
    die("DB connection failed: " . $conn->connect_error);
}

// Get POST inputs
$title = $_POST['title'] ?? 'Untitled';
$stateMachine = $_POST['state_machine'] ?? '';
$tags = $_POST['tags'] ?? ''; // CSV string expected

// Get files
$riveFile = file_get_contents($_FILES['rive']['tmp_name']);
$fontFile = isset($_FILES['font']) ? file_get_contents($_FILES['font']['tmp_name']) : null;
$audioFile = isset($_FILES['audio']) ? file_get_contents($_FILES['audio']['tmp_name']) : null;

// Prepare statement (tags as VARCHAR)
$stmt = $conn->prepare("INSERT INTO grid (title, tags, rive_file, font_file, state_machine, audio_file) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssss", $title, $tags, $riveFile, $fontFile, $stateMachine, $audioFile);

if ($stmt->execute()) {
    echo "✅ Grid item uploaded successfully.";
} else {
    echo "❌ Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
