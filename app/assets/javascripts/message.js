$(document).on('turbolinks:load', function() {

  function buildHTML(message){
    var message_image = message.image ? message.image : ""

    var html = `<div class="chat-body__message" data-message-id="${message.id}">
                  <div class="chat-body__message-user-name">
                    ${message.user_name}
                  </div>
                  <div class="chat-body__message-created-time">
                    ${message.date}
                  </div>
                  <div class="chat-body__message-content">
                    ${message.content}
                    <div class="lower-message__image">
                    <img src=${message_image}>
                    </div>
                  </div>
                </div>`
    return html;
  }

  function after_send() {
    $('.chat-footer__input-box').val('');
    $('#message_image').val('');
    $('.chat-footer__send-button').prop("disabled", false);
  }


  $('.chat-footer__form').on('submit', function(e){
    e.preventDefault();

      var formData = new FormData(this);
      var url = $(this).attr('action');

      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(message){
        if ($(".chat-footer__input-box").val() == "" && $('#message_image').val() == ""){
          after_send();
        }else{
          var html = buildHTML(message);
          $('.chat-body').append(html);
          $('.chat-body').animate({scrollTop: $('.chat-body').get(0).scrollHeight}, 'slow');
        }
      })
      .fail(function(message){
        console.log("faile")
        alert('メッセージを入力してください。 by message.js');
      })
      .always(function(message){
        after_send();
      })

  })
});
