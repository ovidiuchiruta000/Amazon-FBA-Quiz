var user;

function set_view(file, selector) {
  fetch(file)
  .then(response => {
    return response.text()
  })
  .then(data => {
    document.querySelector(selector).innerHTML = data;
  });
}

function init_quiz() {
          var script = document.createElement('script');
                script.src = './assets/js/quiz.js';
                document.body.appendChild(script);
  setTimeout(function(
         {
              set_view('./components/quiz.html', 'content');
              
             }), 3000);

  return true;
}

function init_admin() {
  set_view('./components/results.html', 'content');
  var script = document.createElement('script');
  script.src = './assets/js/admin.js';
  document.body.appendChild(script);
  return true;
}

function validate() {
  var username = document.getElementById('username').value;

  if (username == '') {
    alert('Username required');
    return false;
  }
  else {
    var permissions;

    var Req = new XMLHttpRequest();
    Req.onload = reqListener;
    Req.open("get", "./data/auth.json", true);
    Req.send();

    function reqListener(e) {
      permissions = JSON.parse(this.responseText);
      for (i = 0; i < permissions.users.length; i++) {
        if (permissions.users[i] == username && username != 'admin') {
          user = permissions.users[i];
          return init_quiz();
        }
        if (permissions.users[i] == username && username == 'admin') {
          user = permissions.users[i];
          return init_admin();
        }
      }
      alert('Username does not exist');
      document.getElementById('username').value = '';
      return false;
    }
  }
}

function exportData(answers) {
  var store_json = [[], []];

  var data = user + ' has ' + (30 - wrong_answr.length) + ' correct answers and ' + wrong_answr.length + ' wrong answers' + '\r\n\r\n';
  store_json[0] = [{ 'Username': user }, { 'correct': (30 - wrong_answr.length) }, { 'wrong': wrong_answr.length }];

  for (i = 0; i < answers.length; i++) {
    data += answers[i].question + '\r\n';
    data += 'Selected answer ';
    data += answers[i].selected_id + '\r\n';
    data += answers[i].selected + '\r\n';
    data += 'Correct answer ';
    data += answers[i].correct_id + '\r\n';
    data += answers[i].correct + '\r\n';
    data += '\r\n';
    store_json[1][i] = [answers[i].question, [{ 'Selected answer ': answers[i].selected_id, 'Content': answers[i].selected }], [{ 'Correct answer ': answers[i].correct_id, 'Content': answers[i].correct }]];
  }

  data = 'data:application/csv;charset=utf-8,' + encodeURIComponent(data);
  var exportLink = document.createElement('a');
  exportLink.setAttribute('href', data);
  exportLink.setAttribute('download', 'result.csv');
  exportLink.setAttribute('class', 'result_dwl');
  exportLink.setAttribute('target', '_blank');
  exportLink.appendChild(document.createTextNode('Download results'));

  document.getElementById('results').appendChild(exportLink);
  var response = [];

  $.post('https://dev.darkhound.ro/projects/amazon_quiz/', //this is used ony for development purposes!! do not submit real data
  {
    store_data: JSON.stringify(store_json)
  },
  function (data, status) {
    if (status == 'success') {
      console.log(JSON.stringify(data));
    }
    else {
      console.log(status);
    }
  });
}

window.addEventListener('load', function () {
  set_view('./components/header.html', 'header');

  if (typeof username == 'undefined') {
    set_view('./components/login.html', 'content')
  }

  set_view('./components/footer.html', 'footer');
})
