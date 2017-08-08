const themeUrl = 'https://mercuryretrogradeapi.com/';

// will tell the document whether mercury is in retrograde
//CURRENTLY ONLY CONSOLE LOGS THE RESULT
$(document).ready(function () {
  $.get(themeUrl, (data) => {
        if(data.is_retrograde){
          console.log("Mercury is in retrograde, we're all F***ed!")
        }else{
          console.log("Breathe easy, mercury is not in retrograde!");
        }
  })
});
