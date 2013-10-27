/*
	Called when the user selects elements from the
	all_song list.
*/
function onSelectFromAll()
{
	
	// Clear out the previous contents of the selected song array.
	selSongs.length = 0;
	
	// Empty out the selected songs element.
	$("#sel_songs").empty();
	
	// Get all of the selected elements.
	var selected = $(".ui-selected");
	
	// For each of the selected elements,
	$(".ui-selected", this).each(function() {
		// if its class is that of a selectable song,
		if($(this).attr("class").indexOf("selectable_song") > -1)
		{
			// We get the element's index, 
			var index = $( "#all_list .selectable_song" ).index( this );
			// and use it to get to transfer over a song from the allSongs array.
			selSongs.push(allSongs[index]);
		}
	});
	
	// Now that we've filled out the selected songs array,
	// we can populate the selected list.
	populateSelectedList();
	
	// Accordionify the selected songs tab.
	$("#sel_songs").accordion({
								animate:	 100,
								collapsible: true,
								heightStyle: "content"
							});
	// Refresh it, for good measure.
	$("#sel_songs").accordion( "refresh" );
}

/*
	Called when the user finishes selecting a file through the
	upload dialog.
*/
function onFileSelected(event, element)
{
	// Hide the upload button.
	$("#upload_button").hide();
	// Set up the upload label text.
	$("#upload_progress").siblings("#upload_label").text("Uploading...");
	// Turn the upload_progressbar into, well, a progressbar, and make it fade in.
	$("#upload_progress").progressbar({
		value: false
	}).fadeIn(1000);
	
	var file = element.files[0];
	
	if(file.size > 10000000)
	{
		alert("File too large. Max size is 10 storage-industry megabytes. Don't be a little bitch about fidelity next time.");
		return;
	}
	
	console.log(element.files[0]);
	var xhr = new XMLHttpRequest();
	xhr.file = file;
	
	xhr.addEventListener('progress', function(e) {
		var done = e.position || e.loaded
		var total = e.totalSize || e.total;
		$("#upload_progress").progressbar({
			max: 1,
			value: done/total
		});
		console.log("progress: "+done/total);
	}, false);
	
	if ( xhr.upload ) {
		xhr.upload.onprogress = function(e) {
			var done = e.position || e.loaded
			var total = e.totalSize || e.total;
			$("#upload_progress").progressbar({
				max: 1,
				value: done/total
			});
			console.log("progress: "+done/total);
		};
	}
	
	xhr.onreadystatechange = function(e) {
        if ( 4 == this.readyState ) 
		{
			$("#upload_progress").siblings("#upload_label").text("Upload complete!!!");
			$("#upload_progress").fadeOut(1000);
			int = setInterval(function() {
				$("#upload_progress").siblings("#upload_label").text("Upload new song:");
				$("#upload_button").show();
				clearInterval(int);
			}, 1000);
        }
		else
		{
			$("#upload_progress").siblings("#upload_label").text("Error during upload.");
			$("#upload_progress").fadeOut(1000);
			int = setInterval(function() {
				$("#upload_progress").siblings("#upload_label").text("Upload new song:");
				$("#upload_button").show();
				clearInterval(int);
			}, 1000);
		}
    };	
	
    xhr.open('post', SERVER_URL, true);
    xhr.send(file);
}

/*
	Called when the user clicks the submit button.
	If done in javascript, this is where server access should happen.
*/
function onSubmitChanges()
{
	$( "#submitting_dialog" ).dialog("open");
	$( "#submitting_text" ).html("Connecting to <b>HAROLD</b>...");
	$( "#submitting_progress" ).progressbar({
		value: false
	});
}