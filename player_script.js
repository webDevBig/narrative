function create_player() {
	const player_container = document.getElementById("player_here");
	const player_section = document.createElement("div");
	player_section.setAttribute('class', 'player_section')


	// add title box
	const title_box = document.createElement("div");
	title_box.setAttribute('class', 'title_box');

	const img = document.createElement("img");
	img.setAttribute('class', 'current_photo');
	img.setAttribute('src', 'img/Current-Playing-Photo.png');
	img.setAttribute('alt', 'current playing photo');

	const current_title = document.createElement("p");
	current_title.setAttribute('class', 'current_title');
	current_title.textContent = "TOP 10 BINGE-WORTHY SERIES"

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

	const speed = document.createElement("div");
	speed.setAttribute("class", "speed")

	const speedValue = document.createElement("p");
	speedValue.setAttribute("class", "speedValue")
	speedValue.setAttribute("id", "openSpeedPopUp")
	speedValue.textContent = '1x';
	// 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2


	// create list of speed value
	const speedPop_Up = document.createElement("div");
	speedPop_Up.setAttribute("class", "speedPop_Up")
	var directory = ['0.5x', '0.75x', '1x', '1.25x', '1.5x', '1.75x', '2x'];

	for (var i = 0; i <= directory.length-1; i++) {
		const speedValueItem = document.createElement("a");
		speedValueItem.setAttribute("class", "speedValueItem speedValue")
		speedValueItem.textContent = directory[i];
		speedPop_Up.append(speedValueItem)
	}

	speed.append(speedValue, speedPop_Up)




	// speedPop_Up.append(speedValueItem)

	// add btn's
	// return_back
	const return_back = document.createElement("div");
	return_back.setAttribute("class", "return return_back");
	return_back.setAttribute("id", "return_back")

	// play
	const play_btn = document.createElement("div");
	play_btn.setAttribute("class", "play_btn toggle-play play");
	play_btn.setAttribute("id", "playToggle")

	// return_forward
	const return_forward = document.createElement("div");
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
	// audio.setAttribute("src", "https://narrativ-audio-bucket.s3.amazonaws.com/ad_1.mp3");

	const durationTime = document.createElement("span");
	durationTime.setAttribute("id", "durationTime")
	durationTime.setAttribute("class", "current")

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

	player_section.append(title_box, player_box, volume_box)

	player_container.append(player_section)
}


function play_music() {
	const audioPlayer = document.querySelector(".audio_player");
	const audio = new Audio(
		// "https://narrativ-audio-bucket.s3.amazonaws.com/930157e4-995a-42de-af4b-8c30ab58f42d/fcf6c846-a10b-473b-9745-f475137aab25-nina.mp3"
	);

	const songs = [
		'Juice WRLD Ft Benny Blanco - Real Shit',
		'Lil Baby, Lil Durk ft Rodwave - Rich Off Pain',
		'Polo G – I Know'
	];
	let songIndex = 1;
	loadSong(songs[songIndex]);

	function loadSong(song) {
		audio.src = `music/${song}.mp3`;
	}

	function nextSong() {
		songIndex++;

		if (songIndex > songs.length - 1) {
			songIndex = 0;
		}

		loadSong(songs[songIndex]);
		audio.play();
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
		audio.currentTime = timeToSeek;
	}, false);


	//check audio percentage and update time accordingly
	setInterval(() => {
		const progressBar = audioPlayer.querySelector(".progress");
		progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
		document.querySelector("#currentTime").textContent = "-" + getTimeCodeFromNum(audio.duration - audio.currentTime);
	}, 100);

	//toggle between playing and pausing on button click
	const playBtn = document.querySelector("#playToggle");
	playBtn.addEventListener(
		"click",
		() => {
			const progressBar = audioPlayer.querySelector(".progress");
			progressBar.classList.add('show')
			if (audio.paused) {
				playBtn.classList.remove("play");
				playBtn.classList.add("pause");
				audio.play();
			} else {
				playBtn.classList.remove("pause");
				playBtn.classList.add("play");
				audio.pause();
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
	var return_forward = document.getElementById("return_forward");
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
	var return_back = document.getElementById("return_back");
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

	function volume_iconClick() {
		// var value = volume.value
		// console.log(value)
		if (!volume_icon.classList.contains('mute')) {
			volume_icon.classList.add("mute")
			audio.muted = true;
			volume.classList.add('mute')
		} else {

			volume_icon.classList.remove("mute")
			volume.classList.remove('mute')
			audio.muted = false
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



	const speepPopUP = document.querySelector("#openSpeedPopUp");


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

}

const timeoutObject = setTimeout(create_player, 1000);
const timeoutMusic = setTimeout(play_music, 1000);



