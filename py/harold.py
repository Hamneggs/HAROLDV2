# Import dependencies.
print "Loading dependencies..."
import pydub
import pyaudio
import redis
import serial
import cshldap
import os

def loadSong(filename):
	"""
	Loads an audio segment independent of file type, as long as the
	file's type matches its extension.

	Prerequisites:
		-File type must match extension.

	Parameters:
		-filename (String):	The full name of the file, with a local path.

	Returns:
		-A Pydub Audio Segment filled with the requested song.
	"""
	# Split off the file extension from the file name.
	name, extension = os.path.splitext(filename)
	
	# Use the original file name, along with the extension
	# to properly load the audio segment.
	return AudioSegment.from_file(filename, extension[1:])
	
def splitSong(songSegment, start, finish):
	"""
	Splits an AudioSegment, making sure that the start and finish bounds are safe.

	Prerequisites:
		-All passed parameters are valid.

	Parameters:
		-songSegment (AudioSegment):	The PyDub AudioSegment that contains the song.

	Returns:
		The song, split properly.
	"""
	# First we make sure that the start time is less than the finish time.
	if(finish < start):
		(start, finish) = (finish, start)
	
	# Next we check that the song segment is at least 20 seconds long in total.
	if(len(songSegment) < 20000):
		return songSegment
	
	# Then we range check the start and stop.
	else if(start*1000 >= len(songSegment) or finish*1000 >= len(songSegment)):
		return songSegment[len(songSegment)-20000:]
	
	# Finally we return the selection.
	else:
		return songSegment[start*1000:finish*1000]
	
def playSong(songSegment):
	"""
	Plays a PyDub AudioSegment.
	
	Prerequisites:
		-The given AudioSegment has already been loaded and split.
	
	Parameters:
		-songSegment (AudioSegment): 	The PyDub AudioSegement that contains the
										audio to be played.
		
	Returns:
		-None
	"""
	# Store the number of frames to write to the stream each time.
	framesPer = 1024;
	
	# Open a stream with our PyAudio instance to play the song selection.
	stream = audio.open(format=p.get_format_from_width(songSegment.sample_width),
						channels=songSegment.channels,
						rate=songSegment.frame_rate,
						output=True)
	
	# You know this shit is sweet.
	for frame in range(0, len(songSegment), framesPer):
		stream.write( songSegment[frame:(frame+framesPer)] );
		
def getSongRandomly(userID):
	"""
	Opens a connection to the local Redis server, and gets a random song
	selection.
	
	Prerequisites:
		-UserID is properly formed.
	
	Parameters:
		-userID (String): 	The ID of the current user, used in querying the 
							Redis database.
	
	Returns:
		-A dictionary containing the various properties of a random song
		that the user has saved as selected. The keys of the dictionary are:
			-"name":	The name of the song. This is stored mainly for the interface.
			-"path":	The file path to where the file is stored.
			-"start": 	The starting point within the song.
			-"stop":	The stopping point within the song.
			-"volume":	The volume at which to play the song.
	"""
	# Open up a Redis connection.
	r = redis.StrictRedis(host='localhost', port=6379, db='Harold')
	
	# Get a random song from the user's selection.. Note that songs are
	# stored independent of users. Each userID key points to a 'set' of
	# keys that point to songs, which are hashes.
	songFromSet = r.SRANDMEMBER(userID, 1);
	
	# Now that we have a key to a song has, we get all the data from it
	# return it.
	songProperties = r.HGETALL(songFromSet);
	
	# If we can't get a song from the user, we just return a dictionary
	# full of the place holder song's properties.
	if songProperties == None:
		return {"name": 'placeholderSong.wav', "path": 'usr/Harold/songs/placeholderSong.wav', "start":0, "stop":20, "volume":1}
	else return songProperties;
	
def main():
	"""
	The main execution of Harold's Python naughty-bits. 
	"""
	# connect to LDAP.
	# construct dictionary of iButton ids to user names.
	# disconnect from LDAP.

	# Create PyAudio instance, and a stream to pump sound through.
	audio = pyaudio.PyAudio();
	
	# Create serial connection.
	print "Creating serial connection..."
	ser = serial.Serial( port='/dev/ttyUSB0', baudrate=4800 )

	# Open and verify serial port.
	print "Opening serial connection..."
	ser.open()

	if( ser.isOpen() ):
		print "Serial port is open and ready for use."
	else:
		print "Serial port was not opened correctly."
		input("Press any key to exit.")
		exit()

	# Clear existing data.
	print "Flushing pre-existing serial data."
	ser.flushInput()

	# Enter serial waiting loop.
	while True:

		# read serial number.
		id = ser.readline()
		id = id[1:] # trim first character.
		id = id.rstrip() # remove leading and trailing white space.
		
		# plug it in to the dictionary so that we can the the user name.
		
		# pick a song listing from the selection of current songs.
		print "Selecting song..."
		selection = getSongRandomly(id)
		print "Song: "+selection["name"]+"( "+selection["path"]+" )"
		
		# load the song.
		print "Loading song data..." 
		song = loadSong(selection["path"])
		
		# Trim the song.
		print "Trimming song..."
		splitSong(song, selection["start"], selection["stop"])
		
		# Play the pruned song.
		print "Playing song..."
		playSong(song);
		
		# Clear serial input so stacking doesn't occur.
		ser.flushInput();
		
# Execute that shit!
main()