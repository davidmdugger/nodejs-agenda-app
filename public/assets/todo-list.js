$(document).ready(function(){

  $('form').on('submit', function(){ // when submit event on the form is triggered

      var item = $('form input'); // assign user's input to item
      var todo = {item: item.val()}; // item.val() is the value set to the item key, and that object is assigned to todo

      $.ajax({
        type: 'POST',
        url: '/todos',
        data: todo,
        success: function(data){
          //reload the data via front-end framework
          location.reload();
        }
      });
      return false;
  });

  // when the list item is clicked
  $('li').on('click', function(){
      // replace spaces with dashes
      var item = $(this).text().replace(/ /g, "-");
      $.ajax({
        // delete the item
        type: 'DELETE',
        url: '/todos/' + item,
        success: function(data){
          // reload the data via front-end framework
          location.reload();
        }
      });
  });
});
