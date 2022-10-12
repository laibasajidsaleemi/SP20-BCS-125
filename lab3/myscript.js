
  
  function addNewTodo() {
    var newVal = $("#newTodo").val();
    if (newVal === ""){
      $("#newTodo").addClass("red");
    }else{
      $("#newTodo").addClass("green");
      $("#todos").append("<li>" + newVal + "</li>");
    }
  }