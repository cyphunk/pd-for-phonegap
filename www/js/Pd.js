var Pd = {
  
setup: function ( success, fail) {
    return cordova.exec(success, fail, "Pd", "setup", [null]);
},
    
send: function ( leftval, rightval, success, fail) {
        return cordova.exec(success, fail, "Pd", "send", [leftval, rightval]);
}

};
