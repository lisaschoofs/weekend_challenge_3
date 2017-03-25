$(document).ready(function(){
  console.log("jQuery ready to rock");
  eventListeners();
  getTasks();
});

function eventListeners() {
  $('#addButton').on('click', function(){
    console.log('Add button clicked'); // + $(this).data('book'));
    //ADD IF STATEMENT for input validation
    console.log($('#task').val());
        $.ajax({
          type: "POST",
          url: "/tasks/add",
          data: {task: $('#task').val(), status: "TRUE"},
          success: function(response) {

            // Refresh our data
            console.log('successfully added to DB');
            getTasks();
          } // ends success function
        }); //ends AJAX
        //ADD SOMETHING to clear input fields once new task has been submitted
    });
}


function getTasks() {
  $.ajax( {
    type: "GET",
    url: "/tasks",
    success: function(response) {
      $('.taskList').empty();
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
