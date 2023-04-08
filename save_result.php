<?php

$conn = new mysqli("localhost", "root", "", "blue_dream");

if($conn->connect_error){

   echo "connection failed";
   die('connect_error');

}

$id = intval($_POST['id']);
$subject = $_POST['subject'];
$date = $_POST['date'];
$note = intval($_POST['note']);

$sql = $conn->prepare("INSERT INTO `results`(`id`, `subject`, `date`, `note`) VALUES (?, ?, ?, ?)");
$sql->bind_param("issi", $id, $subject, $date, $note);
$sql->execute();

$sql->close();
$conn->close();
 

?>
