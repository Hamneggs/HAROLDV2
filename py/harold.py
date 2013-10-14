# Import dependencies.
print "Loading dependencies..."
import pydub
import serial
import os
#import cshldap

def loadSong(filename):
	"""
	Loads an audio segment independent of file type, as long as the
	file's type matches its extension.

	Prerequisites:
		File type must match extension.

	Parameters:
		filename (String):	The full name of the file, with a local path.

	Returns:
		A Pydub Audio Segment filled with the requested song.
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
		All passed parameters are valid.

	Parameters:
		songSegment (AudioSegment):	The Pydub AudioSegment that contains the song.

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
	
		
	

# connect to LDAP.
# construct dictionary of iButton ids to user names.
# disconnect from LDAP.

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
	
	# open mySql connection.
	# get list of current songs and playtimes.
	# close mySql connection.
	
	# pick a song from the selection of current songs.
	
	# load the song.
	song = loadSong("placeholder.wav")
	
	# get the timing parameters from the song listing.
	# play it, using the parameters associated with the song.
	# Clear serial input so stacking doesn't occur.