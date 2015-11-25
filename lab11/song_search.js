document.observe("dom:loaded", function() {
    $("b_xml").observe("click", function(){
    	//construct a Prototype Ajax.request object
    	new Ajax.Request("songs_xml.php", {
    		method: "get",
    		parameters: {top: $F("top")},
    		onSuccess: showSongs_XML,
    		onFailure: ajaxFailed,
    		onException: ajaxFailed
    	});
    });
    $("b_json").observe("click", function(){
        //construct a Prototype Ajax.request object
        new Ajax.Request("songs_json.php", {
        	method: "get",
        	parameters: {top: $F("top")},
        	onSuccess: showSongs_JSON,
        	onFailure: ajaxFailed,
        	onException: ajaxFailed
        });
    });
});

function showSongs_XML(ajax) {
	alert(ajax.responseText);
    while ($("songs").firstChild) {
        $("songs").removeChild($("songs").firstChild);
    }
    var songs = ajax.responseXML.getElementsByTagName("song"); 
    for (var i = 0; i < songs.length; i++) {
        var li = document.createElement("li");
        var title = songs[i].getElementsByTagName("title")[0].firstChild.nodeValue;
        var artist = songs[i].getElementsByTagName("artist")[0].firstChild.nodeValue;
        var genre = songs[i].getElementsByTagName("genre")[0].firstChild.nodeValue;
        var time = songs[i].getElementsByTagName("time")[0].firstChild.nodeValue;
        li.innerHTML = title + " - " + artist + " [" + genre + "] (" + time + ")";
        $("songs").appendChild(li);
    }
}

function showSongs_JSON(ajax) {
	alert(ajax.responseText);
    while ($("songs").firstChild) {
        $("songs").removeChild($("songs").firstChild);
    }
    var data = JSON.parse(ajax.responseText);
    var top = $F("top");
    for (var i = 0; i < top; i++) {
        var li = document.createElement("li");
        var title = data.songs[i].title;
        var artist = data.songs[i].artist;
        var genre = data.songs[i].genre;
        var time = data.songs[i].time;
        li.innerHTML = title + " - " + artist + " [" + genre + "] (" + time + ")";
        $("songs").appendChild(li);
    }
	
}

function ajaxFailed(ajax, exception) {
	var errorMessage = "Error making Ajax request:\n\n";
	if (exception) {
		errorMessage += "Exception: " + exception.message;
	} else {
		errorMessage += "Server status:\n" + ajax.status + " " + ajax.statusText + 
		                "\n\nServer response text:\n" + ajax.responseText;
	}
	alert(errorMessage);
}
