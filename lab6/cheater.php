<!DOCTYPE html>
<html>
	<head>
		<title>Grade Store</title>
		<link href="http://selab.hanyang.ac.kr/courses/cse326/2015/problems/pResources/gradestore.css" type="text/css" rel="stylesheet" />
	</head>

	<body>
		
		<?php
		# Ex 4 : 
		# Check the existance of each parameter using the PHP function 'isset'.
		# Check the blankness of an element in $_POST by comparing it to the empty string.
		# (can also use the element itself as a Boolean test!)
			if (empty($_POST['name']) || empty($_POST['ID']) || empty($_POST['course']) || empty($_POST['grade']) || empty($_POST['credit']) || empty($_POST['creditcard'])) { 
		?>

		<!-- Ex 4 :
			Display the below error message : -->
			<h1>Sorry</h1>
			<p>You didn't fill out the form completely. <a href="gradestore.html">Try again?</a></p> 

		<?php
		# Ex 5 : 
		# Check if the name is composed of alphabets, dash(-), ora single white space.
			} elseif (preg_match('/^[a-z]+([-]{1}[a-z]+){0,}[ ]?[a-z]+([-]{1}[a-z]+){0,}$/i', $_POST['name']) == false) { 
		?>

		<!-- Ex 5 : 
			Display the below error message : -->
			<h1>Sorry</h1>
			<p>You didn't provide a valid name. <a href="gradestore.html">Try again?</a></p>

		<?php
		# Ex 5 : 
		# Check if the credit card number is composed of exactly 16 digits.
		# Check if the Visa card starts with 4 and MasterCard starts with 5. 
			} elseif ((($_POST['creditcard'] == 'Visa') && !preg_match('/^4\d{15}$/', $_POST['card'])))  {
		?>

		<!-- Ex 5 : 
			Display the below error message : -->
			<h1>Sorry</h1>
			<p>You didn't provide a valid credit card number. <a href="gradestore.html">Try again?</a></p>

		<?php
		# Ex 5 : 
		# Check if the credit card number is composed of exactly 16 digits.
		# Check if the Visa card starts with 4 and MasterCard starts with 5. 
			} elseif ((($_POST['creditcard'] == 'MasterCard') && !preg_match('/^5\d{15}$/', $_POST['card'])))  {
		?>

		<!-- Ex 5 : 
			Display the below error message : -->
			<h1>Sorry</h1>
			<p>You didn't provide a valid credit card number. <a href="gradestore.html">Try again?</a></p>

		<?php
		# if all the validation and check are passed 
			} else {
		?>

		<h1>Thanks, looser!</h1>
		<p>Your information has been recorded.</p>
		
		<!-- Ex 2: display submitted data -->
		<?php
			$name = '';
			$ID = '';
			$course = '';
			$grade = '';
			$credit = '';
			$creditcard = '';
			if(isset($_POST['name'])){
				$name = $_POST['name'];
			}
			if(isset($_POST['ID'])){
				$ID = $_POST['ID'];
			}
			if(isset($_POST['course'])){
				$course = $_POST['course'];
			}
			if(isset($_POST['grade'])){
				$grade = $_POST['grade'];
			}
			if(isset($_POST['credit'])){
				$credit = $_POST['credit'];
			}
			if(isset($_POST['creditcard'])){
				$creditcard = $_POST['creditcard'];
			}
		?>
		<ul> 
			<li>Name: <?= $name ?></li>
			<li>ID: <?= $ID ?></li>
			<!-- use the 'processCheckbox' function to display selected courses -->
			<li>Course: <?= processCheckbox($course) ?></li>
			<li>Grade: <?= $grade ?></li>
			<li>Credit Card: <?= $credit ?> (<?= $creditcard ?>)</li>
		</ul>
		
		<!-- Ex 3 : -->
			<p>Here are all the loosers who have submitted here:</p>
		<?php
			$filename = "loosers.txt";
			/* Ex 3: 
			 * Save the submitted data to the file 'loosers.txt' in the format of : "name;id;cardnumber;cardtype".
			 * For example, "Scott Lee;20110115238;4300523877775238;visa"
			 */
			file_put_contents($filename, $name.';'.$ID.';'.$credit.';'.$creditcard."\n", FILE_APPEND);
		?>
		
		<!-- Ex 3: Show the complete contents of "loosers.txt".
			 Place the file contents into an HTML <pre> element to preserve whitespace -->
		<pre><?= file_get_contents($filename) ?></pre>

		
		<?php
			}
		?>
		
		<?php
			/* Ex 2: 
			 * Assume that the argument to this function is array of names for the checkboxes ("cse326", "cse107", "cse603", "cin870")
			 * 
			 * The function checks whether the checkbox is selected or not and 
			 * collects all the selected checkboxes into a single string with comma seperation.
			 * For example, "cse326, cse603, cin870"
			 */
			function processCheckbox($names){ 
				$courses = '';
				foreach ($names as $course) {
					$courses = $courses.','.$course;
				}
				$courses = substr($courses, 1);
				return $courses;
			}
		?>
		
	</body>
</html>
