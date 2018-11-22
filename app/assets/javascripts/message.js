$(function(){
  function buildHTML(message){
    var message_content = message.content ? message.content : ""
    var message_image = message.image["url"] ? message.image["url"] : ""

    var html = `<div class="chat-body__message">
                  <div class="chat-body__message-user-name">
                    ${message.user_name}
                  </div>
                  <div class="chat-body__message-created-time">
                    ${message.created_at}
                  </div>
                  <div class="chat-body__message-content">
                    ${message_content}
                    <div class="lower-message__image">
                    <img src=${message_image}>
                    </div>
                  </div>
                </div>`
    return html;
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
      var html = buildHTML(message);
      $('.chat-body').append(html);
      $('.chat-body').animate({scrollTop: $('.chat-body').get(0).scrollHeight}, 'slow');
    })
    .fail(function(message){
      alert('メッセージを入力してください。');
    })
    .always(function(message)){
      $('.chat-footer__input-box').val('');
      $('#message_image').val('')
      $('.chat-footer__send-button').prop("disabled", false);
    }
  })
});
