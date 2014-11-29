/*
   raspberry-coke/ontd/js/parser.js
   Parses ONTDs XML file and gets hold of details including title, users, post etc
*/

var ontd = ontd || {};
ontd.parser = ontd.parser || {};
// ontd.parser.rada = ontd.parser.rada || {};
// ontd.parser.invokeReadyState = ontd.parser.invokeReadyState || {};

(function () {
  //  var parser = new DOMParser();
    var xhr = new XMLHttpRequest();
    var url = "http://ohnotheydidnt.livejournal.com/data/atom";
    
    // Variables to hold ontd post data
    var entry = "";
    var noEntries = "";
    var feed = "";
    var title = "";
    var author = "";
    var date = "";
    var tags = ""; //category
    var content = "";
    var entries = [];
    var id = '';
    
    ontd.parser.rada = function () {
	console.log("mwememem");
    };

/*
    ontd.parser.invokeReadyState = function (callback) {

	xhr.onreadystatechange = function () {
	    console.log("in parser");
	    if (xhr.readyState == 4){
		console.log("ready state");
		if (xhr.status == 200) {
		    console.log(xhr.responseXML);
		    //removed return
		    console.log(callback(xhr.responseXML) + " invoked");

		} else {
		    console.log("xhr error");
		}
	    } else {
		console.log("xhr not ready");
	    }
	    // return false;
	};
	xhr.open("get", url, true);
	xhr.send(null);
	// console.log("nothing to send");
	return "yaaaaheh";

    }; 
  */  
    // extracts data from given xml
    ontd.parser.stripData = function(data) {
	var parser = new DOMParser();
	var xml = parser.parseFromString(data, "text/html");
	var result = data.evaluate("/", data.documentElement, resolver, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);

	
	if (result != null) {
	    var element = result.iterateNext();

	    // Begins parsing ontd xml feed data and retrieves each entry
	    while(element) {
		console.log("here " + element.getElementsByTagName("feed")[0].nodeName);
		feed = element.getElementsByTagName("feed")[0];
		entry = feed.getElementsByTagName("entry"); // retrieved data is held in variable
		noEntries = entry.length;
		console.log("Number of Entries " + noEntries);		
		element = result.iterateNext();
	    }

	    ontd.parser.parseEntry(entry);
	    var tes = "there are entries shsssssssssss " + entries.length;
	    if (entries.length > 0)
		return entries; 
		// return entries[0].title + " hey";
	}
	
	return false;

    };

    // Loops through each entry element and extracts data
    ontd.parser.parseEntry = function(entryData) {
	// var pattern = /(?:(ohnotheydidnt:))?([0-9]+)$/g;
	for (var i = 0; i < entry.length; i++) {
	    id = entry[i].getElementsByTagName("id")[0].firstChild.nodeValue;
	    id = id.split(":").pop(); // Gets last part of id and removes the rest
	    // id.split("");
	    
	    title = entry[i].getElementsByTagName("title")[0].firstChild.nodeValue;
	    author = entry[i].getElementsByTagName("author")[0].getElementsByTagName("name")[0].firstChild.nodeValue;
	    tags = entry[i].getElementsByTagName("category");
	    content = entry[i].getElementsByTagName("content")[0].firstChild.nodeValue;
	    date = entry[i].getElementsByTagName("published")[0].firstChild.nodeValue;
	    
	    /*  console.log("\n Title: " +  title[0].firstChild.nodeValue
		+ "\n Poster: " + author[0].getElementsByTagName("name")[0].firstChild.nodeValue
		+ "\n Date: " + entry[i].getElementsByTagName("published")[0].firstChild.nodeValue
		);
		
		console.log("\n Tags: " + tags.length); */

	    // Each new entry saved as entry model type and added to the entries array
	    entries[i] = new ontd.Model.entry(title, author, date, tags, content, id);
	    /* for (var j = 0; j<tags.length;j++) {
	       console.log(tags[j].getAttributeNode("term").nodeValue);
	       } */
	}

	for (var i = 0; i < entries.length; i++) {
	    console.log(entries[i].title + "\n" + entries[i].poster + "\n"
			+ entries[i].date + "\n"
			+ entries[i].id
			/*+ tags.getAttributeNode("term").nodeValue*/);
	    
	}
	// return "hwehewhehehehelllll";
	
    };
    
    var resolver = function (prefix) {
	switch(prefix) {
		case "lj": return "http://www.livejournal.com";
		default: return "http://www.w3.org/2005/Atom";
	}
    };

    // getter for number of entries
    ontd.parser.getNoEntries = function () {
	return noEntries;
    };

    
})();


