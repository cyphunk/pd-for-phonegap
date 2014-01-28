pd-for-phonegap
===============

PureData ported to the [PhoneGap mobile framework](http://phonegap.com/) (andriod/ios). This is the demo application that runs on iOS devices (see [video sample](https://vimeo.com/85250001)). The demo also contains the PhoneGap plugin. If I had more time I would package this properly. Send me a message to nudge that. This was tested on iOS but could be easily used on other systems. If you have trouble, again pop me a message.

The PureData [sketch test2.pd](https://github.com/cyphunk/pd-for-phonegap/blob/master/pd-for-phonegap/Resources/test2.pd) is just two oscillators. One attached to the left speaker and one attached to the right. 

![PureData sketch](http://github.com/cyphunk/pd-for-phonegap/raw/master/pd-sketch_test2.pd.png)

[Plugins/Pd.m](https://github.com/cyphunk/pd-for-phonegap/blob/master/pd-for-phonegap/Plugins/Pd.m) defines the sketch to be utilized (currently [test2.pd](http://github.com/cyphunk/Grey/raw/master/pd-for-phonegap/Resources/test2.pd)). Idealy a properly packaged PhoneGap plugin would make this more configurable.

Finally the PhoneGap [index.html](https://github.com/cyphunk/pd-for-phonegap/blob/master/pd-for-phonegap/www/index.html) contains the javascript that sends frequencies to the sketch ``Pd.send(x, y);``. The send function is defined in [Pd.js](https://github.com/cyphunk/pd-for-phonegap/blob/master/www/js/Pd.js):

	send: function ( leftval, rightval, success, fail) {
	        return cordova.exec(success, fail, "Pd", "send", [leftval, rightval]);
	}

