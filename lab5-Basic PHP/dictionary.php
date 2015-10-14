<!DOCTYPE html>
<html>
<head>
    <title>Dictionary</title>
    <meta charset="utf-8" />
    <link href="dictionary.css" type="text/css" rel="stylesheet" />
</head>
<body>
<div id="header">
    <h1>My Dictionary</h1>
<!-- Ex. 1: File of Dictionary -->
    <?php
        $filename = "dictionary.tsv";
        $lines = file($filename);
    ?>
    <p>
        My dictionary has <?= count($lines) ?> total words
        and
        size of <?= filesize($filename) ?> bytes.
    </p>
</div>
<div class="article">
    <div class="section">
        <h2>Today's words</h2>
<!-- Ex. 2: Today’s Words & Ex 6: Query Parameters -->
        <?php
            function getWordsByNumber($listOfWords, $numberOfWords){
                $resultArray = array();
                shuffle($listOfWords);
                for($i = 0; $i < $numberOfWords; $i++){
                    $resultArray[$i] = $listOfWords[$i];
                }
                return $resultArray;
            }
        ?>
        <ol>
            <?php 
                $numberOfWords = 3;
                if(isset($_GET["number_of_words"])){
                    $numberOfWords = $_GET["number_of_words"];
                }
                $todaysWords = getWordsByNumber($lines, $numberOfWords);
                foreach ($todaysWords as $line) {
                    $token = explode("\t", $line);
                    $todaysWords = implode(" - ", $token);
            ?>
            <li> <?= $todaysWords ?> </li>
            <?php } ?>
        </ol>
    </div>
    <div class="section">
        <h2>Searching Words</h2>
<!-- Ex. 3: Searching Words & Ex 6: Query Parameters -->
        <?php
            function getWordsByCharacter($listOfWords, $startCharacter){
                $resultArray = array();
                foreach ($listOfWords as $line) {
                    $first = substr($line, 0, 1);
                    if($first == $startCharacter){
                        array_push($resultArray, $line);
                    }
                }
                return $resultArray;
            }
        ?>
        <p>
            <?php
                $startCharacter = 'C';
                if(isset($_GET["character"])){
                    $startCharacter = $_GET["character"];
                }
                $searchedWords = getWordsByCharacter($lines, $startCharacter);
            ?>
            Words that started by <strong><?= $startCharacter ?></strong> are followings :
        </p>
        <ol>
            <?php
                foreach ($searchedWords as $line) {
                    $token = explode("\t", $line);
                    $searchedWords = implode(" - ", $token);
            ?>
            <li> <?= $searchedWords ?> </li>
            <?php } ?>
        </ol>
    </div>
    <div class="section">
        <h2>List of Words</h2>
<!-- Ex. 4: List of Words & Ex 6: Query Parameters -->
        <?php
            function getWordsByOrder($listOfWords, $orderby){
                $resultArray = $listOfWords;
                if($orderby == 0){
                    sort($listOfWords);
                }
                elseif($orderby == 1){
                    rsort($listOfWords);
                }
                $resultArray = $listOfWords;
                return $resultArray;
            }
        ?>
        <p>
            <?php 
                $orderby = 0; 
                if(isset($_GET["orderby"])){
                    $orderby = $_GET["orderby"];
                }
            ?>
            All of words ordered by <strong>alphabet <?php if($orderby == 1){ ?>reverse<?php } ?> order</strong> are followings :
        </p>
        <ol>
            <?php 
                $get_words_by_order = getWordsByOrder($lines, $orderby);
                foreach ($get_words_by_order as $line) {
                    $token = explode("\t", $line);
                    $line = implode(" - ", $token);
                    $wordsLength = strlen($token[0]);
            ?>
            <li <?php if($wordsLength > 6){ ?>class="long"<?php } ?>><?= $line ?></li>
            <?php } ?>
        </ol>
    </div>
    <div class="section">
        <h2>Adding Words</h2>
<!-- Ex. 5: Adding Words & Ex 6: Query Parameters -->
        <?php 
            $newWord = "";
            $meaning = "";
            if(isset($_GET["new_word"])){
                $newWord = $_GET["new_word"];
            }
            if(isset($_GET["meaning"])){
                $meaning = $_GET["meaning"];
            }
            if($newWord == "" || $meaning == ""){
        ?>
        <p>Input word or meaning of the word doesn't exist.</p>
        <?php } else{ 
            $text = "\n".$newWord."\t".$meaning;
            file_put_contents("dictionary.tsv", $text, FILE_APPEND);?>
        <p>Adding a word is success!</p>
        <?php } 

        ?>
    </div>
</div>
<div id="footer">
    <a href="http://validator.w3.org/check/referer">
        <img src="http://selab.hanyang.ac.kr/courses/cse326/2015/problems/images/w3c-html.png" alt="Valid HTML5" />
    </a>
    <a href="http://jigsaw.w3.org/css-validator/check/referer">
        <img src="http://selab.hanyang.ac.kr/courses/cse326/2015/problems/images/w3c-css.png" alt="Valid CSS" />
    </a>
</div>
</body>
</html>