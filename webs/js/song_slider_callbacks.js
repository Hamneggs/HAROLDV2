/*
	Called when a handle of an interval slider is moved.
	Updates the time attributes of the relevant song.
	
	Parameters:
	event (JQuery event): 	The JQuery event that was triggered.
	ui (JQuery ui element): The actual handle element that
							was moved.
*/
function onTimeSlide(event, ui)
{
	// Get the index of the time slider in the list, so that
	// we can know which song it ties to.
	var index = parseInt(this.id.split("_")[2]);
	
	// Use the index to get the current song.
	var curSong = selSongs[index];
	
	// Get the appropriate slider and label.
	var curSlider = $("#interval_slider_"+index);
	var curLabel = $("#interval_data_"+index);
	
	// Update the current song.
	curSong.b = ui.values[0];
	curSong.e = ui.values[1];
	
	// Update the time display. Gosh, this is ugly.
	$(curSlider).siblings(".button_container").children(".time_display").html(curSong.b.toFixed(2)+"(s) ~ "+curSong.e.toFixed(2)+"(s)");
	
	// Update the slider's label.
	curLabel.text("Start: "+curSong.b+"(s), End: "+curSong.e+"(s)");
}

/*
	Called when the handle of a volume slider is moved.
	
	Parameters:
	event (JQuery event): 	The JQuery event that was triggered.
	ui (JQuery ui element): The actual handle element that
							was moved.	
*/
function onVolSlide(event, ui)
{
	// Get the index of the slider in the list.
	var index = parseInt(this.id.split("_")[2]);
	
	// Get the relevant song object.
	var curSong = selSongs[index];
	
	// Get the slider's label data element.
	var curLabel = $("#volume_data_"+index);
	
	// Update the song's volume, making it a normalized float.
	curSong.v = ui.value/100.0;
	
	// Update the label data.
	curLabel.text(parseInt(curSong.v*100)+"(%)");
}
	