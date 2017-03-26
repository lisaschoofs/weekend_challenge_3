var taskID = 0;

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
    });//ends addbutton



    $('.taskList').on('click', '#delete', function(){
      console.log('Delete task: ' + $(this).data('task'));
      taskId = $(this).data('task');
      var confirmation = confirm("Are you SURE you want to delete this task? If so, click OK!");
      if (confirmation) {
        $.ajax({
          type: 'DELETE',
          url: '/tasks/delete/' + taskId,
          success: function(response) {
            console.log(response);
            getTasks();
        } //end success
        }); //ends ajax
      }
  }); //ends delete click event listener


  $('.taskList').on('click', '#complete', function(){
    console.log('Mark task ' + $(this).data('task') + ' as complete.');
    taskId = $(this).data('task');
    $.ajax({
      type: 'PUT',
      url: '/tasks/update/' + taskId,
      data: {task: taskId, status: "FALSE"},
      success: function(response) {
        console.log(response);
        getTasks();
    } //end success
    }); //ends ajax
  }); //ends complete click event listener

}

function getTasks() {
  $.ajax( {
    type: "GET",
    url: "/tasks",
    success: function(response) {
      $('.taskList').empty();
      $('.taskList').append("<div class='task'></div>");
      console.log(response);
      for (var i = 0; i < response.length; i++) {
        var task = response[i];
        console.log(response[i]);
        var $el = $('.taskList').children().last();
        $el.append('<p>' + task.description +
                              '<button id="complete" data-task="' +
                              task.id + '">Complete!</button>' +
                              '<button id="delete" data-task="' +
                              task.id + '">Remove!</button></p>');
      }
    }//ends success
  });//ends ajax
} //ends getTasks function
