<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);

// Local DB credentials
$host = "localhost";
$dbname = "gsap";
$username = "root";
$password = "";

// DB connection
$conn = new mysqli($host, $username, $password, $dbname);
if ($conn->connect_error) {
    die("DB connection failed: " . $conn->connect_error);
}

// Get form inputs
$title = $_POST['title'] ?? 'Untitled';
$stateMachine = $_POST['state_machine'] ?? '';
$tags = $_POST['tags'] ?? null; // ← NEW

// Get files
$riveFile = file_get_contents($_FILES['rive']['tmp_name']);
$fontFile = isset($_FILES['font']) ? file_get_contents($_FILES['font']['tmp_name']) : null;
$audioFile = isset($_FILES['audio']) ? file_get_contents($_FILES['audio']['tmp_name']) : null;

// Insert into DB
$stmt = $conn->prepare("INSERT INTO grid (title, rive_file, font_file, state_machine, audio_file, tags) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssss", $title, $riveFile, $fontFile, $stateMachine, $audioFile, $tags);

if ($stmt->execute()) {
    echo "✅ Grid animation uploaded successfully.";
} else {
    echo "❌ Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
