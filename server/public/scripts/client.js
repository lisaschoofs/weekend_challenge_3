var taskID = 0;

$(document).ready(function(){
  console.log("jQuery ready to rock");
  eventListeners();
  getTasks();
});

function eventListeners() {

  $('#addButton').on('click', function(){
    console.log('Add button clicked'); // + $(this).data('book'));
    console.log($('#task').val());

    //sets ups initial 'if/else' statement to ensure something is in the input field
    if ($('#task').val() === '') {
      var confirmation = confirm("Don't forget to add a task first!");
    //if there's something in the input field, proceed with task addition!
    } else {
        $.ajax({
          type: "POST",
          url: "/tasks/add",
          data: {task: $('#task').val(), status: "TRUE"},
          success: function(response) {
            // Refresh our data
            console.log('successfully added to DB');
            getTasks();
            task.value = ''; //clears input field
          } // ends success function
        }); //ends AJAX
      }//ends else
    });//ends addbutton


//delete button listener
    $('body').on('click', '#delete', function(){
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

//complete button listener
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

//appends existing tasks to the DOM
function getTasks() {
  $.ajax( {
    type: "GET",
    url: "/tasks",
    success: function(response) {
      //removes old tasks
      $('.taskList').empty();
      $('.completedTask').empty();
      console.log(response);
      for (var i = 0; i < response.length; i++) {
        $('.taskList').append("<tr></tr");
        $('.completedTask').append("<tr></tr>");
        var task = response[i];
        console.log(response[i]);
        console.log(task.status);
        //if statement that checks if a task has been completed. true means yet to be completed
          if ( task.status === true ) {
            var $el = $('.taskList').children().last();
            $el.append('<td>' + task.description + '</td>');
            $el.append('<td><button id="complete" data-task="' + task.id + '">Complete!</button></td>' +
                      '<td><button id="delete" data-task="' + task.id + '">Delete!</button></td>');
          }
          else {
            var complete = $('.completedTask').children().last();
            complete.append('<td>' + task.description + '</td>');
            complete.append('<td><button id="delete" data-task="' +
                            task.id + '">Delete!</button></td>');
      }
    } //ends for
    }//ends success
  });//ends ajax
} //ends getTasks function
