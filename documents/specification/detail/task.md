# 4.2.5. タスクに関する操作 <各エンドポイントの仕様>

[エンドポイントのもくじに戻る](index.md)

## グループのタスクをすべて取得

GET /authed/tasks

| 認証の有無 | HTTPメソッド | URI末尾 |
----|----|----
| 有り | GET | `/authed/tasks` |

### リクエストbody

無し

### レスポンスbody

以下のオブジェクトの配列(長さ0以上)が返る

該当するものがないときは長さ0の配列`[]`が返る

| キー | データ型 | 説明 |
----|----|----
| id | 数字 | タスクid |
| name | 文字列 | タスクの表示名 |
| comment | 文字列またはnull | タスクの詳細文字列 |
| groupid | 数字 | タスクの所属するグループid |
| isfinished | 真偽値 | タスクが完了したか否か |
| whoisdoinguserid | 数字またはnull | タスク担当者のユーザid(担当者未定の場合はnull) |
| deadlinedate | null | タスクの締め切り日時を表す予定のフィールド(現在未使用) |
| finisheddate | null | タスクを完了にした日時を表す予定のフィールド(現在未使用) |
| updatedAt | 文字列 | 当該レコードの最終更新日時(タイムゾーンなし) |
| createdAt | 文字列 | 当該レコードの作成日時(タイムゾーンなし) |
| thanklength | 数字 | ありがとうの数 |

### サーバ内の状態変化

無し

## 新規タスクの作成

| 認証の有無 | HTTPメソッド | URI末尾 |
----|----|----
| 有り | POST | `/authed/tasks` |

グループに所属しているユーザのみ実行可能

自らのグループに紐付いたタスクを作る

### リクエストbody

| キー | データ型 | 必須/任意 | 説明 |
----|----|----|----
| name | 文字列 | 必須 | タスクの表示名 |
| comment | 文字列またはnull | 任意 | タスクの詳細文字列 |
| whoisdoinguserid | 数字またはnull | 任意 | タスクを担当するユーザid(必ずリクエストを送信しているユーザ、タスクと同じグループに属するユーザでなければならない) |

### レスポンスbody

| キー | データ型 | 説明 |
----|----|----
| id | 数字 | タスクid |
| name | 文字列 | タスクの表示名 |
| comment | 文字列またはnull | タスクの詳細文字列 |
| groupid | 数字 | タスクの所属するグループid |
| isfinished | 真偽値 | タスクが完了したか否か(タスク作成時はデフォルトでfalseが設定される) |
| whoisdoinguserid | 数字またはnull | タスク担当者のユーザid(担当者未定の場合はnull) |
| deadlinedate | null | タスクの締め切り日時を表す予定のフィールド(現在未使用) |
| finisheddate | null | タスクを完了にした日時を表す予定のフィールド(現在未使用) |
| updatedAt | 文字列 | 当該レコードの最終更新日時(タイムゾーンなし) |
| createdAt | 文字列 | 当該レコードの作成日時(タイムゾーンなし) |
| thanklength | 数字 | ありがとうの数 |

### サーバ内の状態変化

新しいグループのレコードが作成される

リクエストしたユーザのgroupidが書き換えられる


## 特定のタスクの情報を取得

自分の所属するグループのタスクのみ取得可能

| 認証の有無 | HTTPメソッド | URI末尾 |
----|----|----
| 有り | GET | `/authed/tasks/:id` |

`:id`はタスクid(数字)に置き換える

### リクエストbody

無し

### レスポンスbody

| キー | データ型 | 説明 |
----|----|----
| id | 数字 | タスクid |
| name | 文字列 | タスクの表示名 |
| comment | 文字列またはnull | タスクの詳細文字列 |
| groupid | 数字 | タスクの所属するグループid |
| isfinished | 真偽値 | タスクが完了したか否か |
| whoisdoinguserid | 数字またはnull | タスク担当者のユーザid(担当者未定の場合はnull) |
| deadlinedate | null | タスクの締め切り日時を表す予定のフィールド(現在未使用) |
| finisheddate | null | タスクを完了にした日時を表す予定のフィールド(現在未使用) |
| updatedAt | 文字列 | 当該レコードの最終更新日時(タイムゾーンなし) |
| createdAt | 文字列 | 当該レコードの作成日時(タイムゾーンなし) |
| thanklength | 数字 | ありがとうの数 |


### サーバ内の状態変化

無し

## 特定のタスクの内容を変更


| 認証の有無 | HTTPメソッド | URI末尾 |
----|----|----
| 有り | PUT | `/authed/tasks/:id` |

`:id`はタスクid(数字)に置き換える

### リクエストbody

| キー | データ型 | 必須/任意 | 説明 |
----|----|----|----
| name | 文字列 | 任意 | タスクの表示名 |
| comment | 文字列またはnull | 任意 | タスクの詳細文字列 |
| isfinished | 真偽値 | 任意 | タスクが完了したか否か |
| whoisdoinguserid | 数字またはnull | 任意 | タスクを担当するユーザid(必ずリクエストを送信しているユーザ、タスクと同じグループに属するユーザでなければならない) |

### レスポンスbody

| キー | データ型 | 説明 |
----|----|----
| id | 数字 | タスクid |
| name | 文字列 | タスクの表示名 |
| comment | 文字列またはnull | タスクの詳細文字列 |
| groupid | 数字 | タスクの所属するグループid |
| isfinished | 真偽値 | タスクが完了したか否か |
| whoisdoinguserid | 数字またはnull | タスク担当者のユーザid(担当者未定の場合はnull) |
| deadlinedate | null | タスクの締め切り日時を表す予定のフィールド(現在未使用) |
| finisheddate | null | タスクを完了にした日時を表す予定のフィールド(現在未使用) |
| updatedAt | 文字列 | 当該レコードの最終更新日時(タイムゾーンなし) |
| createdAt | 文字列 | 当該レコードの作成日時(タイムゾーンなし) |
| thanklength | 数字 | ありがとうの数 |

### サーバ内の状態変化

当該タスクのレコードにおいて、リクエストに含めたキーのデータが書き換えられる

例えば、タスクを完了する操作をしたいときは、リクエストボディを次のようなjsonにすれば良い

```json
{
  "isfinished" : true
}
```

[エンドポイントのもくじに戻る](index.md)