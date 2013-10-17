/*
	Called when a handle of an interval slider is moved.
	Updates the time attributes of the relevant song.
	
	Parameters:
	propElement: 	The element that triggers this callback, most
					expectedly the relevant interval slider.
*/
function onTimeSlide(propElement)
{
	// Get the index of the time slider in the list, so that
	// we can know which song it ties to.
	var index = parseInt($(propElement)closest(".selected_song").attr("index"));
	
	// Use the index to get the current song.
	var curSong = selSongs[index];
	
	// Get the label of the propagating element.
	var curLabel = $(propElement).siblings(".interval_label").children(".interval_data");
	
	// Update the current song.
	curSong.b = ui.values[0];
	curSong.e = ui.values[1];
	
	// Update the time display. Gosh, this is ugly.
	$(curSlider).nearest(".button_container").children(".time_display").html(
		curSong.b.toFixed(2)+"(s) ~ "+curSong.e.toFixed(2)+"(s)"
	);
	
	// Update the slider's label.
	curLabel.text("Start: "+curSong.b+"(s), End: "+curSong.e+"(s)");
}

/*
	Called when the handle of a volume slider is moved.
	
	Parameters:
	propElement: 	The element that triggers this callback, most
					expectedly the relevant interval slider.	
*/
function onVolSlide(propElement)
{
	// Get the index of the slider in the list.
	var index = parseInt($(propElement).nearest("selected_song").attr("index"));
	
	// Get the relevant song object.
	var curSong = selSongs[index];
	
	// Get the slider's label data element.
	var curLabel = $(propElement).siblings(".volume_label").children(".volume_data_");
	
	// Update the song's volume, making it a normalized float.
	curSong.v = $(propElement).slider("value")/100.0;
	
	// Update the label data.
	curLabel.text(parseInt(curSong.v*100)+"(%)");
}
	