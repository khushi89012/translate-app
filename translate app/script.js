 async function translate_me(){
     try{
        var input = document.getElementById("input-text").value
    
        var res = await fetch("https://libretranslate.de/translate",
   { 
       method : "POST",
   body : JSON.stringify({
       q:input,
       source:"en",
       target:"hi",
       format:"text",
   }),
   headers :  {
   "Content-Type": "application/json"
   },
   })
   
   let data = await res.json();
   console.log("data : ",data)
    document.getElementById("translated-text").innerText = data.translatedText
     }
     catch(err){
         console.log("err :",err )
     }
    

}
     

var voiceList = document.querySelector('#voiceList');
var input1 = document.getElementById("input-text")
    
var synth = window.speechSynthesis;
var voices = [];

myVoices();
if(speechSynthesis !== undefined){
    speechSynthesis.onvoiceschanged = myVoices;
}

btnSpeak.addEventListener('click', ()=> {
    var forSpeak = new SpeechSynthesisUtterance(input1.value);
    var selectedVoiceName = voiceList.selectedOptions[0].getAttribute('data-name');
    voices.forEach((voice)=>{
        if(voice.name === selectedVoiceName){
            forSpeak.voice = voice;
        }
    });
    synth.speak(forSpeak);
});

function myVoices(){
    voices = synth.getVoices();
    var selectedIndex = voiceList.selectedIndex < 0 ? 0 : voiceList.selectedIndex;
    voiceList.innerHTML = '';
    voices.forEach((voice)=>{
        var listItem = document.createElement('option');
        listItem.textContent = voice.name;
        listItem.setAttribute('data-lang', voice.lang);
        listItem.setAttribute('data-name', voice.name);
        voiceList.appendChild(listItem);
    });

    voiceList.selectedIndex = selectedIndex;
}

