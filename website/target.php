<?php
if (isset($_POST["page"])){
	if (strpos($_POST["page"], "grouptime") !== false){
		echo "I got date (".rawurldecode($_POST["date1"]).")\n";
		echo "I got time (".rawurldecode($_POST["time1"]).")\n";
		echo "I got link (".rawurldecode($_POST["link1"]).")";
	}
}
?>