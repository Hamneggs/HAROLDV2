<HTML>
<head>
	<title>HAROLD Profile Manager</title>
	<link rel="stylesheet" type="text/css" href="css/ui-darkness/jquery-ui-1.10.3.css"/>
	<link rel="stylesheet" type="text/css" href="css/base.css"/>
	<script type="text/javascript" src="js/jquery-1.9.1.js"></script>
	<script type="text/javascript" src="js/jquery-ui-1.10.3.js"></script>
	<script type="text/javascript" src="js/song.js"></script>
	<script type="text/javascript" src="js/song_button_callbacks.js"></script>
	<script type="text/javascript" src="js/song_slider_callbacks.js"></script>
	<script type="text/javascript" src="js/tab_callbacks.js"></script>
	<script type="text/javascript" src="js/app.js"></script>
	<script>
	  $(function() {
		init();
	  });
	</script>
</head>
<body>
	<div id="tab_container">
		<div id="tabs">
			<ul>
				<li><a class="tab_title" href="#all_songs" title="A listing of all your uploaded songs.">Your Uploaded Songs</a></li>
				<li><a class="tab_title" href="#sel_songs" title="A listing of the songs you've selected.">Edit Themes</a></li>
				<button id="submit" title="Submit your changes to the HAROLD server, so that you can use your new themes in the lobby.">Submit changes to <b>HAROLD</b></button>
			</ul>
			<div id="all_songs">
				<div id="upload_container" class="ui-widget-content">
					<p id="upload_label">Upload new song:</p>
					<input id="upload_button" onchange="onFileSelected()" type="file" title="Upload a new song for use with HAROLD. (*.mp3, *.wav, and *.ogg are accepted.)" accept="audio/*" name="upload_button" placeholder="" value="Upload new song!" id="upload_button"/>
					<div id="upload_progress"></div>
				</div>
				<div class="list_container" title="These are the songs that you've uploaded. You can select one or more by clicking and dragging, or by ctrl-clicking. When using multiple songs, the server will play one at random when you use your iButton.">
					<ol id="all_list" class="song_list">
					</ol>
				</div>
			</div>
			<div id="sel_songs" title="These are the songs that you've selected for use with Harold. You can adjust the volume and play intervals here. Note, however, that the server will only play the first 20 seconds of whatever interval you choose.">
				<div class="list_container">
					<ol id="sel_list" class="song_list">You haven't selected any songs yet, my friend.</ol>
				</div>
			</div>
		</div>
	</div>
	<div id="submitting_dialog" title="Submission in progress...">
		<div id="submitting_progress"></div>
		<p id="submitting_text"></p>
	</div>
	<div id="del_confirm_dialog" title="Confirm deletion...">
		<p id="del_confirm_text">Are you sure you want to delete this song from your profile, and the server?</p>
		<button id="del_confirm_button" title="Confirm that you are willing to delete this file from the server.">Yup</button>
	</div>
</body>
