$(function () {
  loadRecipies();
  $("#recipes").on("click", ".btn-danger", handleDelete);
  $("#recipes").on("click", ".btn-warning", handleUpdate);
  $("#addBtn").click(addRecipe);
  $("#updateSave").click(function () {
    var id = $("#updateId").val();
    var name = $("#updateTitle").val();
    var price = $("#updateBody").val();
    $.ajax({
      url: "https://usman-cui-recipies.herokuapp.com/api/products/" + id,
      data: { name, price },
      method: "PUT",
      success: function (response) {
        console.log(response);
        loadRecipies();
        $("#updateModal").modal("hide");
      },
    });
  });
});
function handleUpdate() {
  var btn = $(this);
  var parentDiv = btn.closest(".recipe");
  let id = parentDiv.attr("data-id");
  $.get(
    "https://usman-cui-recipies.herokuapp.com/api/products/" + id,
    function (response) {
      $("#updateId").val(response._id);
      $("#updateTitle").val(response.Name);
      $("#updateBody").val(response.Price);
      $("#updateModal").modal("show");
    }
  );
}
function addRecipe() {
  var name = $("#name").val();
  var price = $("#price").val();
  $.ajax({
    url: "https://usman-cui-recipies.herokuapp.com/api/products",
    method: "POST",
    data: { name , price },
    success: function (response) {
      console.log(response);
      $("#name").val("");
      $("#price").val("");
      loadRecipies();
      $("#addModal").modal("hide");
    },
  });
}
function handleDelete() {
  var btn = $(this);
  var parentDiv = btn.closest(".recipe");
  let id = parentDiv.attr("data-id");
  console.log(id);
  $.ajax({
    url: "https://usman-cui-recipies.herokuapp.com/api/products" + id,
    method: "DELETE",
    success: function () {
      loadRecipies();
    },
  });
}
function loadRecipies() {
  $.ajax({
    url: "https://usman-cui-recipies.herokuapp.com/api/products",
    method: "GET",
    error: function (response) {
      var recipes = $("#recipes");
      recipes.html("An Error has occured");
    },
    success: function (response) {
      console.log(response);
      var recipes = $("#recipes");
      recipes.empty();
      for (var i = 0; i < response.length; i++) {
        var rec = response[i];
        recipes.append(
          `<div class="recipe" data-id="${rec._id}"><h3>${rec.name}</h3><p><button class="btn btn-danger btn-sm float-right">delete</button><button class="btn btn-warning btn-sm float-right">Edit</button> ${rec.price}</p></div>`
        );
      }
    },
  });
}