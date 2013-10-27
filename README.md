HAROLDV2
========

An updated version of RIT's Computer Science House's HAROLD system.

New features
------------
* Selection for use of multiple themes is possible, and when the user uses his/her iButton
  HAROLD will herald a random theme from his/her set of selections.
* The user can specify the interval and volume of an uploaded song to be used for a theme through
  the web interface.
* The interface is actually pretty sweet this time 'round.

Dependencies
------------
* Apache and PHP or other hosting software.
* Node.js, for web backend goodness
* Python 2(.7), for iButton interaction
* Redis (and associated libraries for Node.js and Python) for userdata storage
* PyDub, for audio splitting
* PyAudio, for audio playback
