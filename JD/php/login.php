<?php
header("access-control-allow-origin: *");
$name=$_POST['name'];
$password=$_POST['password'];
if ($name==100000&$password==100000) {
    echo 1;
}
else{
    echo 2;
}
?>