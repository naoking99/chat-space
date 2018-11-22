$(function(){
  function buildHTML(message){
    var message_content = message.content ? message.content : ""
    var message_image = message.image["url"] ? '<img src=${message.image["url"]}>' : ""

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
                    ${message_image}
                    </div>
                  </div>
                </div>`
    return html;
  }

console.log('load_first')

  $('.chat-footer__form').on('submit', function(e){
    console.log('pushed submit button');
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
      $('.chat-footer__input-box').val('');
      $('.chat-body').animate({scrollTop: $('.chat-body').get(0).scrollHeight}, 'slow');
      $('.chat-footer__send-button').prop("disabled", false);
    })
    .fail(function(message){
      alert('メッセージを入力してください。');
      $('.chat-footer__send-button').prop("disabled", false);
    })
  })
});
