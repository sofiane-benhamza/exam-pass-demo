<?php

session_start();
$_SESSION['userId'] = '3025';


$conn = new mysqli("localhost", "root", "", "blue_dream");

if($conn->connect_error){
	echo "connection failed";
   die();
}
  $arr        = array(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30);
  $chosen_ids = array_rand($arr,11);  //get 11 random questions
  $counter = 0;
  echo "<script>let questions = [[]], userId=".$_SESSION['userId'].";</script>";

  $sql        = "SELECT question, reponseA, reponseB, reponseC, solution, temps FROM maths WHERE id IN ($chosen_ids[1], $chosen_ids[2], 
   $chosen_ids[3], $chosen_ids[4], $chosen_ids[5], $chosen_ids[6], $chosen_ids[7], $chosen_ids[8], $chosen_ids[9], $chosen_ids[10])";
  
  $result     = $conn->query($sql);
  
  unset($arr, $chosen_ids, $sql);

  if ($result->num_rows > 0) {
     while($row = $result->fetch_assoc()) {
        
        echo " 
         <script>

questions[".$counter."] =
 ['".$row['question']."','".$row['reponseA']."','".$row['reponseB']."','".$row['reponseC']."','".$row['solution']."',".$row['temps']."];

         </script>
        ";
        
        $counter++; //index of question infos

     }
  } else {
  echo "0 results";
  }
  include "index.html";
  unset($row, $result, $counter);
?>
