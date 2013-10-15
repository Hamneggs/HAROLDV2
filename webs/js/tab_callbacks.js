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
		if($(this).attr("class").contains("selectable_song"))
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
function onFileSelected()
{
	// Hide the upload button.
	$("#upload_button").hide();
	// Set up the upload label text.
	$("#upload_progress").siblings("#upload_label").text("Uploading...");
	// Turn the upload_progressbar into, well, a progressbar, and make it fade in.
	$("#upload_progress").progressbar({
		value: false
	}).fadeIn(1000);
	
}

/*
	Called when the user clicks the submit button.
*/
function onSubmitChanges()
{
	$( "#submitting_dialog" ).dialog("open");
	$( "#submitting_text" ).empty();
	$( "#submitting_text" ).html("Connecting to <b>HAROLD</b>...");
	$( "#submitting_progress" ).progressbar({
		value: false
	});
}

/*
	Called when the user clicks the whole-song
	deletion confirmation button.
*/
function onDeleteConfirmation()
{
	alert("You would have just deleted that song.");
}