//integration json en modal bs
  //modal Eau
  $(document).on("click", "#clicktypeEau", function() {
    $.getJSON("../Assets/JSON/action.json", function(data) {
      console.log('test');
      let rand = Math.floor(Math.random() * 3) + 1;
      console.log(rand);
      var action = data[1].action[rand];
      $('.actionTitle').html('Eau');
      $('.doAction').html('<p> ' + action + ' </p>');
    });
  });

  //modal energie
  $(document).on("click", "#clicktypeEnergie", function() {
    $.getJSON("../Assets/JSON/action.json", function(data) {
      let rand = Math.floor(Math.random() * 3) + 1;
      var action = data[0].action[rand];
      $('.actionTitle').html('Energie');
      $('.doAction').html('<p> ' + action + ' </p>');
    });
  });
  //modal dechets
  $(document).on("click", "#clicktypeDechet", function() {
    $.getJSON("../Assets/JSON/action.json", function(data) {
      let rand = Math.floor(Math.random() * 3) + 1;
      var action = data[2].action[rand];
      $('.actionTitle').html('Déchets');
      $('.doAction').html('<p>' + action + ' </p>');
    });
  });


// débloquer action
$('#testBtn').on("click", function(){
  $('#clicktypeEau').removeAttr('disabled');
})
