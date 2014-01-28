var Logger = (function(){	
	var original = console.log;
	var container; 
	var num = 0;

	function initDOM(){
		if (container === undefined){
			container = document.createElement("div");
			
	    	container.style.position = 'absolute';
	    	container.style.left = '10px';
	    	container.style.right = '10px';
	    	container.style.bottom = '0px';
	    	container.style.top = '180px';
	    	container.style.backgroundColor = 'rgba(0,0,0,0.5)';
	    	container.style.color = 'rgb(255,255,255)';
	    	container.style.padding = '10px';
			container.style.overflow = 'hidden';
			container.style.zIndex = '1000';
			container.style.fontSize = '9px';
			container.style.fontFamily = 'HelveticaNeue';
			container.style.fontWeight = 'bold';

			document.body.appendChild(container);
			container.onclick = function(){
				hide();
			}

			container.addEventListener( 'mousedown', function ( e ) { e.preventDefault(); disable();} );
			container.addEventListener( 'touchstart', function ( e ) { e.preventDefault(); disable();} );
		}
	}

	function disable(){
		if (container !== undefined){
			document.body.removeChild(container);
			container = undefined;
			console.log = original;
		}
	}

	function show() {
		if (container.style.display !== 'block') container.style.display = 'block';
	}

	function hide() {
		container.style.display = 'none';
	}

	function init(){
		initDOM();
		console.log = function(msg){
			show();
			container.innerHTML = num++ + ': ' + msg + '<br/>' + container.innerHTML;
		}
	}

	return {
		disable : disable,
		enable : init,
		hide : hide,
		show : show
	}

})();