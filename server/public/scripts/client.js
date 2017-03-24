$(document).ready(function(){
  console.log("jQuery ready to rock");
  eventListeners();
});

function eventListeners() {
  $('#addButton').on('click', function(){
    console.log('Add button clicked'); // + $(this).data('book'));
  });
}
