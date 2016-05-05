<?php

function randomColor(){
	$color = sprintf("#%06x",rand(0,16777215));
	return $color;
}

function consoleLog($text){
	echo '<script>console.log("' . $text . '");</script>';
}

?>
