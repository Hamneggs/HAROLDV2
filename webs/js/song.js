function Song(title, filename, length, begin, end, volume)
{
	this.t = title;		// Song title.
	this.f = filename;	// Song file path.
	this.l = length;	// Total length of song.
	this.b = begin;		// Beginning point (in seconds) of selected interval.
	this.e = end;		// Ending point (in seconds) of selected interval.
	this.v = volume;	// The overall volume of the track.
}