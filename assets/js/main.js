$(document).ready(function () {
    getSongs();
    initPlayer();
});

var audio = document.getElementById('player');
//console.log(audio);
var nameplay = document.querySelector('#playershow');
//console.log(nameplay);
var music;

function getSongs() {
    //buscamos nuestro archivo json
    $.getJSON("./assets/audio/json/songs.json", function (json) {
        //lo asigamos a nuestro arreglo music
        //y los pasamos a la función getList
        music = json;
        //console.log(json);
        playSong(0);
    });
}
//Funcion para reproducir canción
function playSong(song) {
    //console.log(song);
    //validamos si el id de la canción actual es mayor o igual
    //a la longitud del arreglo de canciones
    //Si ya pasó el limite significa que no hay más canciones
    //el audio dejará de reproducirse
    var long = music.songs;
    if (song >= long.length) {
        //console.log('No hay más canciones');
        audio.pause();
        //si no es asi ejecutará el resto del codigo donde
        //buscará la canción e imagen para reproducir
    } else {
        //con .attr asignamos un atributo a scr, que en este caso es la suta de la canción
        //la cual esta en los valores del json
        //a los que accedemos mediante el array music que ya tenemos capturado
        $('#player').attr('src', music.songs[song].song);
        nameplay.innerHTML = "<p>" + music.songs[song].nombre + " " + music.songs[song].artist + "</p>";
        //Como ya tenemos el elemento por su ID con getElementById
        //Ahora accedemos al elemento y con el metodo play() que es
        //propio del reproductor o etiqueta audio
        audio.play();
        //una vez termina ejecutará la función nextSong y le enviará el id
        //de la canción en reproducción
        nextSong(song);
    }
}
//Funcion para seguir a la proxima canción automaticamente
function nextSong(id) {
    audio.onended = function () {
        //Llamamos a la función playSong pero esta vez con el 
        //Id aumentado en uno para que reproduzca la siguiente canción
        playSong(parseInt(id) + 1);
    }
}
function initPlayer() {
    $('#play').click(function () {
        playSong(0);
    });
}

