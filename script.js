const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

//Enable and disable button
function toggleButton() {
    button.disabled= !button.disabled;
}
//Pass Joke to VoiceRSS ApI

function tellMeJoke(joke) {
    console.log('Joke: ', joke);
    VoiceRSS.speech({
        key: '8843cc6ead6f46219c3e1a255f73437f',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

//Get Jokes from Joke Api

async function getJokes() {
    const apiUrl ='https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';
    try {
        let joke = '';
        const response = await fetch(apiUrl);
        const data = await response.json();
        if(data.setup){
            joke = `${data.setup} ... ${data.delivery}`;
        }else{
            joke = data.joke;
        }
        tellMeJoke(joke);
        //Disable button
        toggleButton();
    } catch (error) {
        console.log('Oopps there is in an error', error);
    }
}

//Event listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton)
