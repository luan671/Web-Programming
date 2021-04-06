<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<!-- saved from url=(0057)https://codd.cs.gsu.edu/~lhenry23/06-Forms&PHP/sucker.php -->
<html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>Buy Your Way to a Better Education!</title>
		<link href="./sucker_files/buyagrade.css" type="text/css" rel="stylesheet">
	</head>

	<body>
		<h1>Thanks, sucker!</h1>

		<p>Your information has been recorded.</p>
		
		Name:<br>
		<?php echo $_POST["name"]; ?><br>
		Selection:<br>
		<?php echo $_POST["selection"]; ?><br>
		Credit Card:<br>
		<?php echo $_POST["card"]; ?> <?php echo $_POST["cardtype"]; ?><br>

	<p>Here are all the suckers who have submitted here</p>
	<pre>
		<?php

		foreach ($_POST as $key=>$val)
		{		
			if(empty($val)) {
				echo "You didn't fill out the form compeletly";
			}
			else {
				echo "$val ";
			}
		}
		?>
	</pre>
		

 </body></html>