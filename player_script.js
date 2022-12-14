function create_player() {
	const player_container = document.createElement("div");
	player_container.setAttribute('id', "player_here")

	const player_section = document.createElement("div");
	player_section.setAttribute('class', 'player_section')

	// add arrow
	const arrow = document.createElement("div");
	arrow.setAttribute('class', 'arrow');

	// add title box
	const title_box = document.createElement("div");
	title_box.setAttribute('class', 'title_box');

	// add song img
	const img = document.createElement("div");
	img.setAttribute('class', 'current_photo');

	// create music bar animation
	const musicBar_animation = document.createElement("div");
	musicBar_animation.setAttribute('class', 'musicBar_animation');

	for (var i = 0; i <= 7; i++) {
		const musicBar_item = document.createElement("span");
		musicBar_item.setAttribute("class", "musicBar_item")
		musicBar_animation.append(musicBar_item)
	}

	img.appendChild(musicBar_animation)

	// add track name
	const current_title = document.createElement("p");
	current_title.setAttribute('class', 'current_title');

	// add title under volume
	const volume_text = document.createElement("p");
	volume_text.setAttribute('class', 'volume_text');
	const volume_textM = document.createElement("p");
	volume_textM.setAttribute('class', 'volume_text');

	const imgV = document.createElement("img");
	imgV.setAttribute('src', 'img/Logo-Narrativ-Letter.svg');
	imgV.setAttribute('alt', '');

	const imgVM = document.createElement("img");
	imgVM.setAttribute('src', 'img/Logo-Narrativ-Letter.svg');
	imgVM.setAttribute('alt', '');

	volume_text.append('Powered by', imgV)
	volume_textM.append('Powered by', imgVM)

	const info_box = document.createElement("div");
	info_box.setAttribute('class', 'info_box');

	info_box.append(current_title, volume_textM)
	title_box.append(img, info_box);


	// add player box 
	const player_box = document.createElement("div");
	player_box.setAttribute("class", "player_box");

	// add controler box 
	const controler_box = document.createElement("div");
	controler_box.setAttribute("class", "controler_box");

	// add speed section with pop up
	const speed = document.createElement("div");
	speed.setAttribute("class", "speed")

	const speedValue = document.createElement("button");
	speedValue.setAttribute("class", "speedValue")
	speedValue.setAttribute("id", "openSpeedPopUp")
	speedValue.textContent = '1x';
	// 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2


	// create list of speed value
	const speedPop_Up = document.createElement("div");
	speedPop_Up.setAttribute("class", "speedPop_Up")
	var directory = ['0.5x', '0.75x', '1x', '1.25x', '1.5x', '1.75x', '2x'];

	for (var i = 0; i <= directory.length - 1; i++) {
		const speedValueItem = document.createElement("a");
		speedValueItem.setAttribute("class", "speedValueItem speedValue")
		speedValueItem.textContent = directory[i];
		speedPop_Up.append(speedValueItem)
	}

	speed.append(speedValue, speedPop_Up)


	// add btn's
	// return_back
	const return_back = document.createElement("button");
	return_back.setAttribute("class", "return return_back");
	return_back.setAttribute("id", "return_back")

	// play
	const play_btn = document.createElement("button");
	play_btn.setAttribute("class", "play_btn toggle-play play");
	play_btn.setAttribute("id", "playToggle")

	// return_forward
	const return_forward = document.createElement("button");
	return_forward.setAttribute("class", "return return_forward");
	return_forward.setAttribute("id", "return_forward")

	controler_box.append(speed, return_back, play_btn, return_forward)

	// ******** finish controler box

	// add audio player
	const audio_player = document.createElement("div");
	audio_player.setAttribute("class", "audio_player");
	audio_player.setAttribute("id", "player");

	const audio = document.createElement("audio");
	audio.setAttribute("id", "audio");
	audio.setAttribute("autoplay", "true");

	// add duration time of track
	const durationTime = document.createElement("span");
	durationTime.setAttribute("id", "durationTime")
	durationTime.setAttribute("class", "current")

	// add current time for track
	const currentTime = document.createElement("span");
	currentTime.setAttribute("id", "currentTime")
	currentTime.setAttribute("class", "current")

	const timeline = document.createElement("div");
	timeline.setAttribute("class", "timeline")

	const progress = document.createElement("div");
	progress.setAttribute("class", "progress")

	timeline.appendChild(progress);
	audio_player.append(audio, durationTime, timeline, currentTime)
	// **** finish audio player

	// add volume slider
	const volume_box = document.createElement("div");
	volume_box.setAttribute("class", "volume_box")

	const volume = document.createElement("div");
	volume.setAttribute("class", "volume")

	const volumeIcon = document.createElement("div");
	volumeIcon.setAttribute("class", "volume_icon")

	const volumeInput = document.createElement("input");
	volumeInput.setAttribute("type", "range")
	volumeInput.setAttribute("value", "70")
	volumeInput.setAttribute("min", "0")
	volumeInput.setAttribute("max", "100")
	volumeInput.setAttribute("step", "1")

	volume.append(volumeIcon, volumeInput)
	volume_box.append(volume, volume_text)

	player_box.append(controler_box, audio_player)

	player_section.append(title_box, player_box, volume_box, arrow)

	player_container.append(player_section)

	// insert player section
	const article_title_box = document.getElementById('article_title_box')

	function insertAfter(newNode, existingNode) {
		existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
	}

	insertAfter(player_container, article_title_box);


}


function play_music() {
	const audioPlayer = document.querySelector(".audio_player");
	const current_title = document.querySelector('.current_title');
	const musicBar_animation = document.querySelector('.musicBar_animation')
	const audio = new Audio();

	const playBtn = document.querySelector("#playToggle");
	var return_back = document.getElementById("return_back");
	var return_forward = document.getElementById("return_forward");
	const speepPopUP = document.querySelector("#openSpeedPopUp");

	const player_box = document.querySelector(".player_box");


	const songs = [
		'https://www2.cs.uic.edu/~i101/SoundFiles/gettysburg10.wav',
		'https://narrativ-audio-bucket.s3.amazonaws.com/930157e4-995a-42de-af4b-8c30ab58f42d/fcf6c846-a10b-473b-9745-f475137aab25-nina.mp3'
	];

	let songIndex = 0;
	loadSong(songs[songIndex]);

	function loadSong(song) {
		audio.src = `${song}`;
		current_title.textContent = "TOP 10 BINGE-WORTHY SERIES " + `${songIndex}`;
	}

	function nextSong() {
		songIndex++;
		if (songIndex > songs.length - 1) {
			songIndex = 0;
		}
		loadSong(songs[songIndex]);
		audio.play();
		if (songIndex == 1) {
			playBtn.disabled = false;
			return_back.disabled = false;
			return_forward.disabled = false;
			speepPopUP.disabled = false;
			player_box.classList.remove('inActive')
		} else {
			playBtn.disabled = true;
			return_back.disabled = true;
			return_forward.disabled = true;
			speepPopUP.disabled = true;
			player_box.classList.add('inActive')
		}
	}
	audio.addEventListener('ended', nextSong);



	audio.addEventListener(
		"loadeddata",
		() => {
			document.querySelector("#durationTime").textContent = getTimeCodeFromNum(
				audio.duration
			);
			audio.volume = .5;
		},
		false
	);


	//click on timeline to skip around
	const timeline = audioPlayer.querySelector(".timeline");

	timeline.addEventListener("click", e => {
		const timelineWidth = window.getComputedStyle(timeline).width;
		const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
		console.log(timeToSeek)
		audio.currentTime = timeToSeek;
	}, false);

	// Set progress bar
	function setProgress(e) {
		const width = this.clientWidth;
		const clickX = e.offsetX;
		const duration = audio.duration;

		audio.currentTime = (clickX / width) * duration;
	}
	timeline.addEventListener('touchmove', setProgress);



	//check audio percentage and update time accordingly
	setInterval(() => {
		const progressBar = audioPlayer.querySelector(".progress");
		progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
		document.querySelector("#currentTime").textContent = "-" + getTimeCodeFromNum(audio.duration - audio.currentTime);
	}, 100);


	//toggle between playing and pausing on button click

	playBtn.addEventListener(
		"click",
		() => {
			const progressBar = audioPlayer.querySelector(".progress");
			progressBar.classList.add('show')
			if (audio.paused) {
				playBtn.classList.remove("play");
				playBtn.classList.add("pause");
				musicBar_animation.classList.add('play')
				audio.play();
			} else {
				playBtn.classList.remove("pause");
				playBtn.classList.add("play");
				musicBar_animation.classList.remove('play')
				audio.pause();
			}
			if (songIndex == 1) {
				console.log('n')
				playBtn.disabled = false;
				return_back.disabled = false;
				return_forward.disabled = false;
				speepPopUP.disabled = false;
				player_box.classList.remove('inActive')
			} else {
				playBtn.disabled = true;
				return_back.disabled = true;
				return_forward.disabled = true;
				speepPopUP.disabled = true;
				player_box.classList.add('inActive')
			}
		},
		false
	);



	//turn 128 seconds into 2:08
	function getTimeCodeFromNum(num) {
		let seconds = parseInt(num);
		let minutes = parseInt(seconds / 60);
		seconds -= minutes * 60;
		const hours = parseInt(minutes / 60);
		minutes -= hours * 60;

		if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
		return `${String(hours).padStart(2, 0)}:${minutes}:${String(seconds % 60).padStart(2, 0)}`;
	}

	return_forward.addEventListener("click", return_forwardClick, false);

	function return_forwardClick() {
		audio.currentTime = audio.currentTime + 15;
		const progressBar = audioPlayer.querySelector(".progress");
		progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";


		timeline.addEventListener("click", e => {
			const timelineWidth = window.getComputedStyle(timeline).width;
			const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
			audio.currentTime = timeToSeek;
		}, false);
	}

	return_back.addEventListener("click", return_backClick, false);

	function return_backClick() {
		audio.currentTime = audio.currentTime - 15;
		const progressBar = audioPlayer.querySelector(".progress");
		progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";

		timeline.addEventListener("click", e => {
			const timelineWidth = window.getComputedStyle(timeline).width;
			const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
			audio.currentTime = timeToSeek;
		}, false);
	}




	//* sound volume control
	const volume_icon = document.querySelector(".volume_icon");
	const volume = document.querySelector(".volume input");


	volume_icon.addEventListener("click", volume_iconClick, false);

	let muteState = 'unmute';
	var currentVolume = 1;

	function volume_iconClick() {
		if (muteState === 'unmute') {
			currentVolume = volume.value;
			volume.value = 0;
			audio.muted = true;
			muteState = 'mute';
			volume_icon.classList.add("mute")
			volume.classList.add('mute')
		} else {
			volume_icon.classList.remove("mute")
			volume.classList.remove('mute')
			volume.value = currentVolume;
			audio.muted = false;
			muteState = 'unmute';
		}
	}
	volume.addEventListener("change", () => {
		audio.volume = volume.value / 100;
		audio.muted = false
		if (audio.volume == 0) {
			volume_icon.classList.add("mute")
			volume.classList.add('mute')
		} else {
			volume_icon.classList.remove("mute")
			volume.classList.remove('mute')
		}
	});

	const rangeInputs = document.querySelector('.volume input[type="range"]');


	function handleInputChange(e) {
		let target = e.target;
		if (e.target.type !== "range") {
			target = document.getElementById("range");
		}
		const min = target.min;
		const max = target.max;
		const val = target.value;

		target.style.backgroundSize = ((val - min) * 100) / (max - min) + "% 100%";
	}

	rangeInputs.addEventListener("input", handleInputChange);


	speepPopUP.addEventListener("click", speepPopUPClick, false);

	function speepPopUPClick() {
		this.parentNode.querySelector(".speedPop_Up").classList.toggle('show')
	}


	var speedValue = document.querySelectorAll('.speedValueItem');
	[].forEach.call(speedValue, function (el) {
		el.onclick = function (e) {
			for (var i = 0; i < speedValue.length; i++) {
				speedValue[i].classList.remove('active');

			}
			el.classList.toggle('active');
			speepPopUP.textContent = el.innerHTML;
			audio.playbackRate = parseFloat(el.innerHTML);
			document.querySelector(".speedPop_Up").classList.toggle('show')
		}
	});


	const accordion = document.querySelector(".arrow");
	const player_section = document.querySelector(".player_section");

	accordion.addEventListener("click", accordionClick, false);

	function accordionClick() {
		player_section.classList.toggle('resize')
		this.classList.toggle('colapse')
	}

}

function stikyPlayer() {
	window.onscroll = function () {
		myFunction()
	};

	var player = document.getElementById("player_here");
	var sticky = player.offsetTop + player.clientHeight + 70;

	function myFunction() {
		if (window.pageYOffset > sticky) {
			player.classList.add("sticky");
		} else {
			player.classList.remove("sticky");
		}
	}
}


const timeoutObject = setTimeout(create_player, 1000);
const timeoutMusic = setTimeout(play_music, 1000);
const timeoutStiky = setTimeout(stikyPlayer, 1000);