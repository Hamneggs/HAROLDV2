
// An array created to store every song the user has uploaded.
var allSongs = new Array();

// An array created to store every song the user has selected.
var selSongs = new Array();

/*
	Loads the songs from whatever method we are going to use.. (Not yet, though.)
*/
function loadSongs()
{
	// Get the DOM element where the entirety of the user's songs shalt be displayed.
	var allSongList = $("#all_list");
	
	// Nuke that jive ass honky mothafucka.
	allSongList.empty();
	
	// Do some stuff to load songs, and for each song, set up the play/pause, stop, and delete buttons.
	for(var i = 0; i < 50; i++)
	{
		if(i > 2)
			var newSong = new Song("Song "+i, "LavaReef.mp3", 100, i, i+20, .8);
		else
			var newSong = new Song("Song "+i, "Sagat.mp3", 100, i, i+20, .8);			
			
		allSongList.append("<li class='ui-widget-content selectable_song' index="+i+"'>\n"+
							newSong.t+" ("+newSong.f+")\n"+
							"<div class='button_container'>"+
								"<audio class='whole_song' preload='none' src='"+newSong.f+"'/>"+
								"<button title='Play entire song' class='play'>play</button>\n"+
								"<button title='Stop playback' class='stop'>stop</button>\n"+
								"<button title='Delete song from server' class='del'>delete</button>\n"+
							"</div>"+
							"</li>\n");
		allSongs.push(newSong);
	}
		
	$(".selectable_song").each(function()
	{
		// Get the index of the current selectable_song.
		var index  	= parseInt( $(this).attr("index") );
		
		// Get the button container for this song.
		var buttons	= $(this).children(".button_container");
		
		// Get the three buttons.
		var play   	= $(buttons).children(".play");
		var stop   	= $(buttons).children(".stop");
		var del		= $(buttons).children(".del");
		
		// Set up the play button.
		$(play).button({
			text: false,						// Don't want text.
			icons: {primary: "ui-icon-play"}	// Want the play button though.
		}).click(function(event, ui){
			var options;
			if($(this).text()==="play")			// If we were clicked when the button's text read play,
			{
				options = {								// Set up our new options to that of a pause button.
					label: "pause",
					icons: {primary: "ui-icon-pause"}
				};
				onWholePlay(this);						// Also call the 'play whole song' callback.
			}
			else								// Otherwise, we set the options to that of a play button...
			{
				options = {
					label: "play",
					icons: {primary: "ui-icon-play"}
				};
				onWholePause(this);				// And call the pause callback.
			}
			$(this).button("option", options);	// Finally, we push those new options right into the button's lap.
		});
		
		// Set up the stop button.
		$(stop).button({
			text: false,
			icons: {primary: "ui-icon-stop"}
		}).click(function(event, ui){	// When we click stop, we reset the song's play button as well.
			options = {
					label: "play",
					icons: {primary: "ui-icon-play"}
				};
			onWholeStop(this);
			$(this).siblings(".play").button("option", options);
		});
		
		// Set up the delete button.
		$(del).button({
			text: false,
			icons: {primary: "ui-icon-trash"}
		}).click(function(event, ui){
			onWholeDelete(this);
		});

	});
}

/*
	Populates the Edit Themes tab with the songs the user selected from the all_songs list.
*/
function populateSelectedList()
{
	var selSongList = $("#sel_songs");	// Store a JQuery object of the Selected Songs tab for easy use.
	if(selSongs.length == 0)			// If the user hasn't selected any songs, well...
	{
		selSongList.append("You haven't selected any songs, my friend!");
	}
	else	// But if the user has done so...
	{
		for(var i = 0; i < selSongs.length; i++)	// We go through all the selected songs,
		{
			var curSong = selSongs[i];				// Create a copy of the song so that we can more easily access it.
			if(!curSong) continue;					// If the song is removed from the whole-song list, and the songs
													// are not reloaded from the database, then it may leave a null
													// entry in the songs array.
													
			// Now we hardcore-style add a new accordion tab to the selected song list.
			selSongList.append(
				"<h3 class='sel_song_header' index='"+i+"'>"+curSong.t+" ("+curSong.f+")</h3>"+
				"<div class='selected_song' index='"+i+"'>"+
					"<div class='slider_container'>"+
						"<p class='interval_label'>Interval:"+
							"<p class='interval_data'>From: "+curSong.b+"(s), to: "+curSong.e+"(s)</p>"+
						"</p>"+
						"<p class='interval_slider'></p>"+
						"<p class='volume_label'>Volume:"+
							"<p class='volume_data'>"+(curSong.v*100)+"(%)</p>"+
						"</p>"+
						"<p class='volume_slider'></p>"+
					"</div>"+
					"<div class='button_container'>"+
						"<audio class='partial_song' preload='none' src='"+curSong.f+"'/>"+
						"<p class='time_display'>"+curSong.b.toFixed(2)+"(s) ~ "+curSong.e.toFixed(2)+"(s)</p>"+
						"<button title='Play selected interval' class='play'>play</button>\n"+
						"<button title='Stop playback' class='stop'>stop</button>\n"+
						"<button title='Remove song from selection' class='del'>delete</button>\n"+
					"</div>"+
				"</div>"
			);
		}
		
		$(".selected_song").each(function()
		{
			// Get the index of the current song.
			var index = parseInt($(this).attr("index"));
			
			// Get the current song. If the current song is null, we skip it.
			var curSong = selSongs[index];
			if(!curSong)return;
			
			// Get the button and slider containers.
			var buttons = $(this).children(".button_container");
			var sliders = $(this).children(".slider_container");
			
			// Get the buttons.
			var play = $(buttons).children(".play");
			var stop = $(buttons).children(".stop");
			var del  = $(buttons).children(".del");
			
			// Get the timing slider.
			var timing = $(sliders).children(".interval_slider");
			
			// Get also the volume slider.
			var volume = $(sliders).children(".volume_slider");
			
			// Initialize the play button.
			// Same deal as before with these.
			$(play).button({
				text: false,
				icons: {primary: "ui-icon-play"}
			}).click(function(){
				var options;
				if($(this).text()==="play")
				{
					options = {
						label: "pause",
						icons: {primary: "ui-icon-pause"}
					};
					onSegmentPlay(this);
				}
				else
				{
					options = {
						label: "play",
						icons: {primary: "ui-icon-play"}
					};
					onSegmentPause(this);
				}
				$(this).button("option", options);
			});
			
			// Initialize the stop button.
			$(stop).button({
				text: false,
				icons: {primary: "ui-icon-stop"}
			}).click(function(){
				options = {
					label: "play",
					icons: {primary: "ui-icon-play"}
				};
				onSegmentStop(this);
				$(this).siblings(".play").button("option", options);
			});
			
			// Initialize the delete button.
			$(del).button({
				text: false,
				icons: {primary: "ui-icon-trash"}
			}).click(function()
			{
				onSegmentDelete(this);
			});
			
			// Initialize the song's interval slider.
			$(timing).slider({
				range: 	true,
				min:	0,
				max:	curSong.l,
				values: [curSong.b, curSong.e],
				slide: 	function(){onTimeSlide(this);}
			});
			
			// As well as the timing slider.
			$(volume).slider({
				range: "min",
				min: 0,
				max: 100,
				step: 1,
				value: curSong.v * 100,
				slide: function(){onVolSlide(this);}
			});
		});
		
		// Make the text size, well, reasonable.
		$(".sel_song_header").css({"font-size":"12px"});
		$(".sel_song_element").css({"font-size":"12px"});
	}
}
		
/*
	Initializes the JS portion of the interface.
*/	
function init()
{
	// Load the songs.
	loadSongs();
	
	// Set up the tooltips for the user.
	$( document ).tooltip({
			show: { delay: 1000, duration: 2000, easing: 400},
			tooltipClass: "tooltip_styling",
			position: {my: "right center", at: "left top"}
	});
	// Make the all song list user-selectable.
	$( "#all_list" ).selectable({
			stop: onSelectFromAll,
	});
	// Set up the tabs.
	$( "#tabs" ).tabs();
	
	// Make the submit button a more proper button.
	$( "#submit" ).button({
	}).click( function(){
		onSubmitChanges();
	});
	
	// Make the submit dialog into a dialog.
	$( "#submitting_dialog" ).dialog({
      autoOpen: false,
	  modal: true,
      show: {
        duration: 1000
      },
      hide: {
        duration: 400
      },
	  position: {
		my: "center center", at: "center top+5%"
	  }
    });
	
	// Do the same with the deletion confirmation dialog.
	$( "#del_confirm_dialog" ).dialog({
      autoOpen: false,
	  modal: true,
      show: {
        duration: 400
      },
      hide: {
        duration: 400
      },
	  position: {
		my: "center center", at: "center top+5%"
	  }
    }).children("#del_confirm_button").button(); 
	// Even through we recreate the button each time we delete something, we create it here for robustness.
}

/*
	Deletes a whole song from the interface, and soon, the server.
	
	Parameters:
		index: The numerical index of the song to be deleted.
*/
function deleteWholeSong(index)
{
	// For now we just delete the list index, and the array index.
	$("#selectable_song_"+index).remove();
	allSongs[index] = null;
}
