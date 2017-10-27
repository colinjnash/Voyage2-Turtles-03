/**
	Table of Contents:
		1. Onload Script:
			-Change Background
			-Clock
		2. Nav Menu Scripts
		3. Clock
		4. To Do List
***************************************************************/

// Optional JQUERY load

/* Onload Scripts
 *********************************************/
$(document).ready(function($) {




	$('body').hide().fadeIn('slow');
	$(document).ready(function() {
		$('#welcome').removeClass('hidden');
	});


	changeBackground();
	buildClock();

   
	

	function changeBackground() {
		var arr = ['img0.jpg', 'img1.jpg', 'img2.jpg', 'img3.jpg'];
		document.body.style.background = "url('img/" + arr[Math.floor((Math.random() * 3))] + "')";
	}

	// Fade in the div







	/* Nav Menu
	 *********************************************/
	// Two functions to open and close side menu
	document.getElementById('openMenu').onclick = function() {
		document.getElementById('leftNav').style.width = '250px';
	};
	document.getElementById('closeMenu').onclick = function() {
		document.getElementById('leftNav').style.width = '0';
	};

	/* Clock
	 *********************************************/
	// Web clock on the front page
	function buildClock() {
		let clock = new Date();
		let h = clock.getHours();
		let m = clock.getMinutes();
		// let s = clock.getSeconds();

		m = addZero(m);
		// s = addZero(s);		

		// let t = setTimeout(buildClock, 500);
		let dayNight = ' AM';

		if (h > 12) {
			dayNight = ' PM';
			h -= 12;
		} else if (h == 12) {
			dayNight = ' PM';
		} else if (h == 0) {
			dayNight = ' AM';
		}

		document.getElementById('clock').innerHTML = h + ':' + m + dayNight;
	}

	function addZero(i) {
		if (i < 10) {
			return '0' + i;
		}
		return i;
	}



	/* To Do List
	 *********************************************/
	// Loads data from input to list on right side bar
	$('input#toDoItem').keypress(function(e) {

		if (e.which === 13) {
			
			let toDoText = $(this).val();


			$('#toggleList').append('<li class="todo">' + toDoText + '<span class="delete">' + ' ' + '<i class="fa fa-trash"></i></span>' + '</li>');

			// Clear out the input field
			$(this).val('');
			e.preventDefault();
		}

	});

	$('span').on('click', function(){

	});

	// ToDoToggle Functionality
	 // *****************************************************************/
	$(document).on('click', '.delete', function(event) {
		$(this).parent().fadeOut(300,function(){
			$(this).remove();
		});
		event.stopPropagation();
	});



	// ToDoDiv Toggle

	$('#toDoTitle').on('click', function(){
		$('#toggleList').toggleClass("hidden");
	});


// ********************WEATHER TRIAL *******************************


	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (position, error) {
			if(error) {
				console.log(error);
			} else {
				let lat = position.coords.latitude;
				let long = position.coords.longitude;
				var url = "https://api.darksky.net/forecast/de76a4cf1da02a6495cc56ff1fbcc8cc/" + lat + ',' +
				long + '?units=auto';
				$.ajax({
					url: url,
					type: 'GET',
					dataType: 'jsonp',
					success: function(data) {
						var skycons = new Skycons({"color": "white"});
						var icon = data.currently.icon;
						var temp = Math.round(data.currently.temperature);
						$('#wxtemp').html(temp + '&deg;C');
						skycons.add("wxIcons", icon);
						
						console.log(data);
					
					}
				});
			}

		});
	}


});