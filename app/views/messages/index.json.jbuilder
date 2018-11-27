json.array! @auto_messages do |message|
  json.id         message.id
  json.content    message.content
  json.date       message.created_at.to_s(:default)
  json.image      message.image.url
  json.user_name  message.user.name
end
