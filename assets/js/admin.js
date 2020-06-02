var results;

$.post('https://dev.darkhound.ro/projects/amazon_quiz/', //this is used ony for development purposes!! do not submit real data
{
  get_data: 'sadasd3232sdsd1rewg46m579l' // authorization key
},
function (data, status) {
  if (status == 'success') {
    results = data;
  }
  else {
    console.log(status);
  }
});

console.log(JSON.stringify(results));
