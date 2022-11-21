window.onscroll = function () {
    myFunction()
};

var player = document.getElementById("player_here");
var sticky = player.offsetTop + 200;

function myFunction() {
    if (window.pageYOffset > sticky) {
        player.classList.add("sticky");
    } else {
        player.classList.remove("sticky");
    }
}