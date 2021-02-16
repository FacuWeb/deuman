function eskSlide(options = {}) {

    let defaults = {
        container: null,
		element: false,
        isPlaying: false,
        continuePlaying: false,
        delay: 5000,
        previous: null,
        current: null,
        next: null,
        closeBtn: null,
        nextBtn: '-->',
        prevBtn: '<--',
        playBtn: null,
        stopBtn: null,
        takeOver: false,
        currentAction: null,
		printCaptionTo: false,
		hoverStop: false,
		dots: false,
		transition: false,
        hasControls: null
    };
    
    let actual = Object.assign({}, defaults, options);
    
    if (actual.continuePlaying) {}
    
	if (actual.container) {
        
        var slider = document.querySelector(actual.container),
            player,
			slideCount,
			slideIndex = 0,
			theDots,
			dotsArr,
			next = false,
			previous = false,
			reverse = false;
        
        if (slider) {
            
            slider.classList.add('slider');
			
			if (actual.transition) {
				slider.classList.add('transition-' + actual.transition);
			}
            
            if (actual.takeOver){
                document.documentElement.classList.add('slider-active');
            }
            
            var slides = Array.from(slider.children);
			
			slides.forEach(function(el){
				el.classList.add('slider-item');
			});
			slideCount = slides.length;
            
                        
            var current = actual.current ? actual.current : slides[slideIndex];
			
            
            if (current) {
                
				current.classList.add('slider-current');				                
               
            }
            
        }
		
		if (slideCount > 1) {
			
			let select = function(index) {
				
				if (reverse){
					slider.classList.add('reverse');
				} else {
					slider.classList.remove('reverse');
				}
			
				var index = slideIndex = (index > (slideCount -1)) ? 0 : index;
				
				if (previous) {
					previous.classList.remove('slider-previous');
				}
				
				if (current) {
					current.classList.remove('slider-current');
					current.classList.add('slider-previous');
					previous = current;
				}
								
				current = slides[index];
				current.classList.add('slider-current');
				
				if (actual.dots) {
					
					var dotSelected = dots.querySelector('.slider-dot-selected');
					
					if (dotSelected) {
						dotSelected.classList.remove('slider-dot-selected');
					}
					
					dotSelected = dotsArr[index];
					dotSelected.classList.add('slider-dot-selected');
				}
				
//				console.log(slideIndex);
			
			}
			
//			next = slides[slideIndex + 1];
//			if ((slideIndex + 1) > (slideCount - 1)) {
//				 next = slides[0];
//			}
//			next.classList.add('slider-next');
						
			
			
			let toNext = function () {
									  
				slideIndex++;
				reverse = false;
                				
                if (slideIndex > (slideCount - 1)) {
			    	slideIndex = 0;
                } 
				
				select(slideIndex);
			                          
            }
			
			let toPrev = function () {
				
				slideIndex--;
				reverse = true;
								
				if (slideIndex < 0) {
					slideIndex = slideCount - 1;
				} 
				
				select(slideIndex);	  
						   
           }
           
           
            
            function play() {
                
                clearInterval(player);
                
                actual.isPlaying = true;
                slider.classList.add('is-playing');
                
                player = setInterval(function(){ toNext() }, actual.delay);
            
            }
						
            function stop() {
            
                clearInterval(player);
                
                actual.isPlaying = false;
                slider.classList.remove('is-playing');
            
            }
            
            function playStop(){
                
                if (actual.isPlaying) {
                    
                    stop();
                    
                } else {
                    
                    play();
                    
                }
                
            }
            
            function close(){
                
                if (actual.isPlaying) stop();
                if (current) {
                    current.classList.remove('slider-current');
                    current = null;
                }
                if (previous) {
                    previous.classList.remove('slider-previous');
                    previous = null;
                }
                
                slider.removeChild(slider.lastChild);
                close = null;
                slider.classList.remove('slider');
                if (actual.takeOver){
                    document.documentElement.classList.remove('slider-active');
                }
                while (slider.querySelector('.slider-item')) {
                    slider.querySelector('.slider-item').classList.remove('slider-item');
                }
                
				slider.removeEventListener('click', sliderEvents);
                slider.removeEventListener('mouseover', sliderMouseOver);
                slider.removeEventListener('mouseout', sliderMouseOut);
                actual = null;
                slider = null;
                
            }
			
			if (actual.isPlaying) {
				play();
			}
			
			if (actual.dots) {
			    
			    var dots = thedots = document.createElement("div");
			    dots.classList.add('slider-dots');
			    slider.appendChild(dots);
				
				for (var i = 0; i < slideCount; i++) {
					
					var dot = document.createElement("a");
					dot.classList.add('slider-dot');
					if (i == slideIndex) {
						dot.classList.add('slider-dot-selected');
					}
					dot.href = '#';
					dot.title = 'Slide #' + (i + 1);
					dot.setAttribute('data-index', i);
					dots.appendChild(dot);
				}
				
				dotsArr = Array.from(dots.children);
			
			}
			
			if (actual.hasControls) {
			    
			    var controls = document.createElement("div");
			    controls.classList.add('slider-controls');
			    controls = slider.appendChild(controls);
			    
				if (actual.closeBtn) {
					var closeBtn = document.createElement("button");
					closeBtn.classList.add('slider-controls-close');
					closeBtn.innerHTML = actual.closeBtn;
					closeBtn.name = 'Close Slider';
					closeBtn = controls.appendChild(closeBtn);
				}
			    
			    
				if (actual.prevBtn) {
					var prevBtn = document.createElement("button");
					prevBtn.classList.add('slider-controls-previous');
					prevBtn.innerHTML = actual.prevBtn;
					prevBtn.name = 'Previous';
					prevBtn = controls.appendChild(prevBtn);
				}
			    
			    
				if (actual.nextBtn) {
					var nextBtn = document.createElement("button");
					nextBtn.classList.add('slider-controls-next');
					nextBtn.innerHTML = actual.nextBtn;
					nextBtn.name = 'Next';
					nextBtn = controls.appendChild(nextBtn);
				}
			    
			    
				if (actual.playBtn) {
					var playBtn = document.createElement("button");
					playBtn.classList.add('slider-controls-play');
					playBtn.innerHTML = actual.playBtn;
					playBtn.name = 'Play';
					playBtn = controls.appendChild(playBtn);
				}
			    
			    
				if (actual.stopBtn) {
					var stopBtn = document.createElement("button");
					stopBtn.classList.add('slider-controls-stop');
					stopBtn.innerHTML = actual.stopBtn;
					stopBtn.name = 'Stop';
					stopBtn = controls.appendChild(stopBtn);
				}
			   
			    
			}
            
            function sliderEvents(e) {
                
                if (e.target.classList.contains('slider-current')){ 
                    
//                    close();
//                    console.log('current');
                    
                    
                } else if (e.target.classList.contains('slider-controls-previous')) {
                    
                    if (actual.isPlaying) {
                        
                        clearInterval(player);
                        stop();
                        toPrev();
                        
                    } else {
                        
                        toPrev();
                        
                    }
                    
                
                } else if (e.target.classList.contains('slider-controls-next')){ 
                                        
                    if (actual.isPlaying) {
                        
                        clearInterval(player);
                        stop();
                        toNext();
                        
                    } else {
                        
                        toNext();
                        
                    }
                    
                } else if (e.target.classList.contains('slider-controls-close')) {
                   
                    close();
                    
                } else if (e.target.classList.contains('slider-controls-play')){ 
                    
                    playStop();
                    
                } else if (e.target.classList.contains('slider-controls-stop')){ 
                    
                    playStop();
                    
                } else if (e.target.classList.contains('slider-dot')){ 
                    e.preventDefault();
                    
					
					if (actual.isPlaying) {
					    
					    clearInterval(player);
					    stop();
					    
					} 
					
					var ind = e.target.getAttribute('data-index');
					if (ind < slideIndex){
						reverse = true;
					} else {
						reverse = false
					}
					select(ind);
                    
                } 
            }
            
            function sliderMouseOver(e) {
				
				slider.classList.add('is-hover');
				
				if (actual.hoverStop) {
					playStop();
				}
				
            }
            
            function sliderMouseOut(e) {
                
				slider.classList.remove('is-hover');
				
				if (actual.hoverStop) {
					playStop();
				}
					
            }
			
			slider.addEventListener('click', sliderEvents);
			slider.addEventListener('mouseover', sliderMouseOver);
			slider.addEventListener('mouseout', sliderMouseOut);
			
		}

    }
    
}