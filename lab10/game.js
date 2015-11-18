"use strict";
var interval = 3000;
var numberOfBlocks = 9;
var numberOfTarget = 3;
var targetBlocks = [];
var selectedBlocks = [];
var timer;

document.observe('dom:loaded', function(){
	$("start").onclick = stopToStart;
	$("stop").onclick = stopGame;
});

function stopToStart(){
    stopGame();
    startToSetTarget();
}

function stopGame(){
	$("state").textContent = "Stop";
	$("answer").textContent = "0/0";
	targetBlocks = [];
	selectedBlocks = [];
	clearInterval(timer);
	var blocks = $$(".block");
	for (var i = 0; i < numberOfBlocks; i++) {
		blocks[i].removeClassName("target");
		blocks[i].removeClassName("selected");
		blocks[i].stopObserving("click");
	}
}

function startToSetTarget(){
	$("state").textContent = "Ready!";
	targetBlocks = [];
	selectedBlocks = [];
	clearInterval(timer);
	var blocks = $$(".block");
	for (var i = 0; i < targetBlocks.length; i++) {
		blocks[targetBlocks[i]].removeClassName("target");
	}
	while(1){
		for(var i =0; i < numberOfTarget; i++){
			targetBlocks[i] = Math.floor((Math.random() * 10));
		}
		if((targetBlocks[0] != targetBlocks[1]) && (targetBlocks[0] != targetBlocks[2]) && (targetBlocks[1] != targetBlocks[2]) && (targetBlocks[0] < 9) && (targetBlocks[1] < 9) && (targetBlocks[2] < 9) && (targetBlocks[0] >= 0) && (targetBlocks[1] >= 0) && (targetBlocks[2] >= 0)){
			break;
		}
   	}
	timer = setInterval(setTargetToShow, interval);
}

function setTargetToShow(){
	clearInterval(timer);
	$("state").textContent = "Memorize!";
	var blocks = $$(".block");
	for(var i = 0; i < numberOfTarget; i++){
		blocks[targetBlocks[i]].addClassName("target");
	}	
	timer = setInterval(showToSelect, interval);
}

function showToSelect(){
	clearInterval(timer);
	$("state").textContent = "Select!";
	var blocks = $$(".block");
	for(var i = 0; i < numberOfTarget; i++){
		blocks[targetBlocks[i]].removeClassName("target");
	}
	for(var j = 0; j < blocks.length; j++){
		blocks[j].observe("click", calSelectedBlock);
	}
	timer = setInterval(selectToResult, interval);
}

function selectToResult(){
	clearInterval(timer);
	var correct = 0;
	$("state").textContent = "Checking";
	var blocks = $$(".block");
	for(var i = 0; i < selectedBlocks.length; i++){
		blocks[selectedBlocks[i]].removeClassName("selected");
	}
	for(var j = 0; j < numberOfBlocks; j++){
		blocks[j].stopObserving("click");
	}
	for(var k = 0; k < numberOfTarget; k++){
		for(var l = 0; l < numberOfTarget; l++){
			if(selectedBlocks[k] == targetBlocks[l]){
				correct++;
			}
		}
	}
	var current_answer = $("answer").innerHTML;
	var display = current_answer.split("/");
	$("answer").textContent = (display[0] * 1 + correct * 1) + "/" + (display[1] * 1 + numberOfTarget * 1);
	timer = setInterval(startToSetTarget, interval);
}

function calSelectedBlock(){
	var selectedBlockNum = this.readAttribute("data-index");
	if(selectedBlocks.length < numberOfTarget){
		this.addClassName("selected");
		this.stopObserving("click");
		selectedBlocks.push(selectedBlockNum);
	}
}