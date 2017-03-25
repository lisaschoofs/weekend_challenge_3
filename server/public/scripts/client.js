$(document).ready(function(){
  console.log("jQuery ready to rock");
  eventListeners();
  getTasks();
});

function eventListeners() {
  $('#addButton').on('click', function(){
    console.log('Add button clicked'); // + $(this).data('book'));
  });
}


function getTasks() {
  $.ajax( {
    type: "GET",
    url: "/tasks",
    success: function(response) {
      console.log(response);
      for (var i = 0; i < response.length; i++) {
        var task = response[i];
        console.log(response[i]);
        // var $el = $('.taskList').children().last();
        $('.taskList').append('<p>' + task.description + '</p>');
        // $el.append('<p>' + task.description + '</p>');
      }
    }//ends success

  });//ends ajax
}
