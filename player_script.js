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

	const imgV = document.createElement("img");
	imgV.setAttribute('src', 'img/Logo-Narrativ-Letter.svg');
	imgV.setAttribute('alt', '');
	volume_text.append('Powered by', imgV)

	const info_box = document.createElement("div");
	info_box.setAttribute('class', 'info_box');

	info_box.append(current_title, volume_text)
	title_box.append(img, info_box);


	// add player box 
	const player_box = document.createElement("div");
	player_box.setAttribute("class", "player_box");

	// add controler box 
	const controler_box = document.createElement("div");
	controler_box.setAttribute("class", "controler_box");

	const speed = document.createElement("div");
	speed.setAttribute("class", "speed")
	speed.textContent = '1x';

	// add btn's
	// return_back
	const return_back = document.createElement("div");
	return_back.setAttribute("class", "return return_back");
	return_back.setAttribute("id", "return_back")
	// return_back.setAttribute("onclick", "return_backAudioFile();")

	// play
	const play_btn = document.createElement("div");
	play_btn.setAttribute("class", "play_btn toggle-play play");
	play_btn.setAttribute("id", "playToggle")

	// return_forward
	const return_forward = document.createElement("div");
	return_forward.setAttribute("class", "return return_forward");
	return_forward.setAttribute("id", "return_forward")
	// return_forward.setAttribute("onclick", "return_forwardAudioFile();")
	controler_box.append(speed, return_back, play_btn, return_forward)

	// ******** finish controler box

	// add audio player
	const audio_player = document.createElement("div");
	audio_player.setAttribute("class", "audio_player");
	audio_player.setAttribute("id", "player");

	const audio = document.createElement("div");
	audio.setAttribute("id", "audio");
	audio.setAttribute("src", "https://521dimensions.com/song/FirstSnow-Emancipator.mp3");

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

	const volumeImg = document.createElement("img");
	volumeImg.setAttribute("src", "img/volume.svg")

	const volumeInput = document.createElement("input");
	volumeInput.setAttribute("type", "range")
	volumeInput.setAttribute("value", "70")
	volumeInput.setAttribute("min", "0")
	volumeInput.setAttribute("max", "100")
	volumeInput.setAttribute("step", "1")

	volume.append(volumeImg, volumeInput)
	volume_box.append(volume, volume_text)

	player_box.append(controler_box, audio_player)

	player_section.append(title_box, player_box, volume_box)

	player_container.append(player_section)
}


function play_music() {


	const audioPlayer = document.querySelector(".audio_player");
	const audio = new Audio(
		"https://narrativ-audio-bucket.s3.amazonaws.com/930157e4-995a-42de-af4b-8c30ab58f42d/fcf6c846-a10b-473b-9745-f475137aab25-nina.mp3"
	);

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
		document.querySelector("#currentTime").textContent = getTimeCodeFromNum(audio.currentTime);


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
		document.querySelector("#currentTime").textContent = getTimeCodeFromNum(audio.currentTime);


		timeline.addEventListener("click", e => {
			const timelineWidth = window.getComputedStyle(timeline).width;
			const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
			audio.currentTime = timeToSeek;
		}, false);
	}




	//* sound volume control
	const volume = document.querySelector(".volume input");
	volume.addEventListener("change", () => {
		audio.volume = volume.value / 100;
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

}

const timeoutObject = setTimeout(create_player, 5000);
const timeoutMusic = setTimeout(play_music, 5000);

function f() {
	var sticky = {
		sticky_after: 200,
		init: function() {
		  this.header = document.getElementById('player_here');
		  this.clone = this.header.cloneNode(true);
		  this.clone.classList.add("clone");
		  document.body.append(this.clone);
		  this.scroll();
		  this.events();
		},
	  
		scroll: function() {
		  if(window.scrollY > this.sticky_after) {
			document.body.classList.add("down");
		  }
		  else {
			document.body.classList.remove("down");
		  }
		},
	  
		events: function() {
		  window.addEventListener("scroll", this.scroll.bind(this));
		}
	  };
	  
	  document.addEventListener("DOMContentLoaded", sticky.init.bind(sticky));
}

const timeoutMusic2 = setTimeout(f, 2000);