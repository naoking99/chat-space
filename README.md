# README

- Ruby version : 2.3.1

# DB設計

## Users Table

|column|type|options|
|------|----|-------|
|id|integer|null: false|
|name|string|null: false, index: true|
|email|string|null: false|
|password|string|null :false|
|avatar|||

※email, passwordはdeviseで自動設定されるものを使用

※avatarはImageMagickを使用するため実際はavatarカラムはuserテーブルに追加されない

### Association

- has_many :user_groups
- has_many :groups, through: :user_groups
- has_many :messages



## Groups Table

|column|type|options|
|------|----|-------|
|id|integer|null: false|
|name|string|null: false|

### Association

- has_many :user_groups
- has_many :users, thorough: :user_groups
- has_many :messages



## UserGroups Table

|column|type|options|
|------|----|-------|
|id|integer|null: false|
|user_id|reference|null: false, foreign_key: ture|
|group_id|reference|null: false, foreign_key: ture|

### Association

- belongs_to :user
- belongs_to :group



## Messages Table

|column|type|options|
|------|----|-------|
|id|integer|null: false|
|body|text|
|user_id|reference|null: false, foreign_key: ture|
|group_id|reference|null: false, foreign_key: ture|
|image|||

※imageカラムはImageMaginを利用するため実質imageカラムはMessageテーブルに追加されない

### Association

- belongs_to :user
- belongs_to :group
