const themeUrl = 'https://mercuryretrogradeapi.com/';

// will tell the document whether mercury is in retrograde
//CURRENTLY ONLY CONSOLE LOGS THE RESULT
$(document).ready(function () {
  $.get(themeUrl, (data) => {
        if(data.is_retrograde){
          $('.isRetrograde').append(
            `<span id="mercuryInRetrograde">Mercury is in retrograde. We're all screwed.</span>`
          );
          // console.log("Mercury is in retrograde, we're all F***ed!")
        }else{
          $('.isRetrograde').append(
            `<span id="mercuryInRetrograde">Breathe easy, mercury is not in retrograde.</span>`
          );
          // console.log("Breathe easy, mercury is not in retrograde!");
        }
  })
});
