var Stats = function() {

	var lastT = new Date().getTime();
	var T = [];
	var numFrames = 0;
	var numSamples = 100;
	var height = 50;

	var canvas = document.createElement("canvas");
	canvas.style.width = numSamples + 'px';
	canvas.style.height = height + 'px';

	canvas.width = numSamples * 2;
	canvas.height = height * 2;
	var ctx = canvas.getContext('2d');
	ctx.font = 'normal bold 9px "HelveticaNeue"';
	ctx.textAlign = 'left';			
	ctx.textBaseline = 'top';
	
	var container = document.createElement( 'div' );
	container.id = 'stats';
	container.addEventListener( 'mousedown', function ( e ) { e.preventDefault(); container.style.display = 'none';} );
	container.addEventListener( 'touchstart', function ( e ) { e.preventDefault(); container.style.display = 'none';} );
	container.appendChild(canvas);

	function run(){
		numFrames++;
		var t = new Date().getTime();
		T.push(t - lastT);
		lastT = t;
		if (T.length > numSamples){
			T.shift();
		}
	};

	function draw(){
		ctx.setTransform(2, 0, 0, 2, 0, 0);
		ctx.fillStyle = 'rgb(255,0,0)';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		ctx.fillStyle = 'rgb(255,255,255)';
		ctx.fillText("FPS : " + getCurrentFPS().toFixed(0) + " / " + getAverageFPS().toFixed(0), 10, 1); 

		ctx.strokeStyle = 'rgb(255,255,255)';
		ctx.beginPath();
		var i;
		var d = 1000 / 60;						
		for (i =0; i<T.length; ++i){
			ctx.lineTo(i+0.5, Math.min(height, map(T[i], d, d * 4, 0, height/2)+height/2));
			//ctx.lineTo(i+0.5, 50);
		}
		ctx.stroke();		
	};

	function getCurrentFPS(){
		if (T.length < 1) return 0;
		return 1000 / (T[T.length - 1]);
	};

	function getAverageFPS(){
		if (T.length < numSamples) return 0;
		var i, a = 0;			
		for (i = 0; i<T.length; ++i){
			a += T[i];
		}
		a = a / T.length ;
		return 1000 / a;
	}

	function map(value, inA, inB, outA, outB){
		return outA+(outB-outA)*((value-inA)/(inB-inA));
	}

	return {
		DOMElement: container,
		update : function(){
			run();
			draw();
		}
	}
}