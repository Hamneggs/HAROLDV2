
/*
	Called when the play button of a whole 
	song (in the all-song list) is pressed.
	Starts playback of the relevant song.
	
	Parameters:
	propElement (JQuery object): The JQuery object that
		is calling the callback. This should be the play
		button that was pressed.
*/
function onWholePlay(propElement)
{
	// The audio tag is a sibling of the buttons.
	var audio = $(propElement).siblings(".whole_song");
	
	// Stop all other audio streams.
	$(".stop").click();
	
	// If the audio stream has loaded no data, we tell it to do so.
	if(audio[0].readyState == 0)
		audio[0].load();
	
	// The audio will play when ready.
	audio[0].play();
}

/*
	Called when the pause button of a whole
	song (in the all-song list) is pressed.
	Pauses the relevant song's playback.
	
	Parameters:
	propElement (JQuery object): The JQuery object that
		is calling the callback. This should be the pause
		button that was pressed.
*/
function onWholePause(propElement)
{
	// The audio tag is a sibling of the buttons.
	var audio = $(propElement).siblings(".whole_song");
	
	// Pause the audio. You don't need to worry if there is
	// any data in the stream to stop it.
	audio[0].pause();
}

/*
	Called when the stop button of a whole
	song (in the all-song list) is pressed.
	Pauses the relevant song, and resets its
	cursor to 0 seconds.
	
	Parameters:
	propElement (JQuery object): The JQuery object that
		is calling the callback. This should be the stop
		button that was pressed.
*/
function onWholeStop(propElement)
{

	// The audio tag is a sibling of the buttons.
	var audio = $(propElement).siblings(".whole_song");
	
	// The song needs to be loaded or loading to access its currentTime property.
	// If its not loaded, well, um, we don't need to pause it, do we?
	if(audio[0].readyState != 0)
	{
		audio[0].pause();
		audio[0].currentTime = 0;
	}
}

/*
	Called when the user clicks the delete button of a whole song.
	
	Parameters:
	propElement (JQuery object): The JQuery object that
		is calling the callback. This should be the delete
		button that was pressed.
*/
function onWholeDelete(propElement)
{
	// Initialize the delete button with a function that can reference the current song.
	$( "#del_confirm_button" ).button().click(function(){
											deleteWholeSong( 
												parseInt(
													$(propElement).closest(".selectable_song").attr("id").split("_")[2]
												)
											);
											$( "#del_confirm_dialog" ).dialog("close");
										});
										
	// Open the confirmation dialog.
	$( "#del_confirm_dialog" ).dialog("open");
}

/*
	Called when the play button of a song 
	segment is pressed. Starts playback of
	the relevant song at the specfied start
	point, and creates an interval to stop
	playback when the end time is reached, 
	or when the song ends.
	
	Parameters:
	propElement (JQuery object): The JQuery object that
		is calling the callback. This should be the play
		button that was pressed.
*/
function onSegmentPlay(propElement)
{
	
	// Get the parent container of the pressed button.
	var parentContainer = $(propElement).closest(".button_container");
	
	// Get the audio element, it being a child of the audio tag.
	var audio = parentContainer.children(".partial_song");
	
	// The sliders are siblings to the button container. Here we get the start
	// and stop times set by the user. (Observer chaining is naughty. Song object->Slider->here)
	var start = parentContainer.siblings(".interval_slider").slider("values", 0);
	var stop = parentContainer.siblings(".interval_slider").slider("values", 1);
	
	// The time display is a nephew of the sliders.
	var display = parentContainer.children(".time_display");
	
	// Make sure we only play 20 seconds.
	if(stop > start+20) stop = start+20;
	
	// Stop all other audio streams.
	$(".stop").click();
	
	// If the audio stream hasn't started loading, we tell it do so.
	if(audio[0].readyState == 0)
	{
		audio[0].load();
	}
	
	// Now that we have a loading stream, we can set the 
	// current time and be all like yo, play biatch.
	audio[0].currentTime = start;
	audio[0].play();
	
		
	// Make sure that we aren't playing more than we should, by setting an
	// interval to continually check how much of the song we've played.
	// This really is the only way to do it.
	int = setInterval(function(){
		// Update the time display.
		display.html(audio[0].currentTime.toFixed(2) + "(s) ~ " + stop.toFixed(2)+"(s)");
		// If we've played more audio than the amount prescribed, or if the song ends,
		if(audio[0].currentTime > stop || audio[0].ended)
		{	
			audio[0].pause();				// We stop the audio stream,
			audio[0].currentTime = start;	// Reset its cursor to the start time,
											// Reset the time display,
			display.html(audio[0].currentTime.toFixed(2) + "(s) ~ " + stop.toFixed(2)+"(s)");
			$(propElement).button({
					label: "play",
					icons: {primary: "ui-icon-play"}
				});// Reset the button's appearance.
			
			clearInterval(int);				// And clear the interval.
		}
		// If the user has merely paused the audio, we simply kill off the interval.
		// It will be recreated when the user presses play again.
		else if(audio[0].paused) clearInterval(int);
	}, 20/*milliseconds*/);
	
	
}

/*
	Called when the pause button of a song 
	segment is pressed. Pauses playback of the
	song segment. This action is seen by the
	interval created in onSegementPlay, and is
	used to clear the interval.
	
	Parameters:
	propElement (JQuery object): The JQuery object that
		is calling the callback. This should be the pause
		button that was pressed.
*/
function onSegmentPause(propElement)
{
	// Get the audio element...
	var audio = $(propElement).siblings(".partial_song");
	// ...and pause it.
	audio[0].pause();
}

/*
	Called when the stop button of a song 
	segment is pressed. Stops the playback
	of the relevant song segment, and resets
	its cursor back to the start point of 
	the segment.
	
	Parameters:
	propElement (JQuery object): The JQuery object that
		is calling the callback. This should be the stop
		button that was pressed.
*/
function onSegmentStop(propElement)
{
	// Get the audio element,
	var audio = $(propElement).siblings(".partial_song");
	// and if it has been loaded in any capacity...
	if(audio[0].readyState != 0)
	{
		// stop it and reset its cursor.
		audio[0].pause();
		audio[0].currentTime = 0;
	}
}

/*
	Called when the delete button of a song
	segment is pressed. Removes the song'
	
	Parameters:
	propElement (JQuery object): The JQuery object that
		is calling the callback. This should be the delete
		button that was pressed.
*/
function onSegmentDelete(propElement)
{
	// Get the nearest selected song element.
	var curSong = $(propElement).closest(".selected_song");
	console.log(curSong);
	// Get the index of that selected song element.
	var index = parseInt(curSong.attr("id").split("_")[2]);
	
	// Get the header of the current song.
	var curSongHeader = $(curSong).siblings("#sel_song_header_"+index);
	console.log(curSongHeader);
	
	// Remove the current song.
	$(curSong).remove();
	// Remove the current song's header as well, getting rid of the tab.
	$(curSongHeader).remove();

	// Refresh the accordion, so the interface reflects the changes.
	$("#sel_songs").accordion( "refresh" );
	
	// It's important to notice that the indices don't change, either
	// in the accordion, or in the song array.
}
