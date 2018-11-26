$(function() {

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
    $("#user-search-result").append(html);
   }

   function appendNoUser(message) {
      var html = `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${ message }</p>
                  </div>`
    $("#user-search-result").append(html);
    }


  function addUserToGroup(user_id, user_name) {
    var html = `<div class='chat-group-user clearfix js-chat-member'>
                  <input name='group[user_ids][]' type='hidden' value='${ user_id }' class="chat-group-user__selected_user_id">
                  <p class='chat-group-user__name'>${ user_name }</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
      $("#chat-group-users").append(html);
  }



  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    var selected_users = [];
    selected_users.length = 0;

    $(".chat-group-user__selected_user_id").each(function(){
      selected_users.push($(this).attr("value"));
    });

    if (input == ""){
      $("#user-search-result").empty();
    } else {
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input, selected_users: selected_users },
        dataType: 'json'
      })
      .done(function(users){
        $("#user-search-result").empty();
        if (users.length != 0){
          users.forEach(function(user){
            appendUser(user);
          });
        }
        else{
          $("#user-search-result").empty();
          appendNoUser("一致するユーザーはいません")
        }
      })
      .fail(function(){
        alert("ユーザー検索に失敗しました");
      })
    }

  });



  $("#user-search-result").on("click", ".user-search-add", function(){
    var user_id = $(this).attr("data-user-id");
    var user_name = $(this).attr("data-user-name");

    addUserToGroup(user_id, user_name);
    $(this).parent().remove();
  });

  $("#chat-group-users").on("click", ".user-search-remove", function(){
    $(this).parent().remove();
  });
});
