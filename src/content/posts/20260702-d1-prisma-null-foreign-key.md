---
date: 2026-07-02T12:00:00+09:00
title: 'Cloudflare D1 + Prisma で Null 許容の外部キー参照を使用すると、マイグレーション時に参照が失われる場合がある'
description: 'Cloudflare D1 と Prisma を組み合わせて使用する場合、Null 許容の外部キー参照を定義した状態でマイグレーションを実行すると、意図せず参照カラムの値が NULL に変更されることがあります。'
showList: true
---

## 概要

Cloudflare D1 と Prisma を組み合わせて使用する場合、Null 許容の外部キー参照を定義した状態でマイグレーションを実行すると、意図せず参照カラムの値が `NULL` に変更されることがあります。

これは、Prisma が生成する外部キー制約と Cloudflare D1 の制約実装の組み合わせによって発生します。

## 環境

- Cloudflare D1 (compatibility_date = 2026-06-03)
- Prisma v7.8.0

## 原因

Prisma では、Null 許容のリレーションを定義し、`@relation` の `onDelete` を省略すると、デフォルトで `ON DELETE SET NULL` が設定されます。

`ON DELETE SET NULL` は、参照先のレコードが削除された際に、参照元の外部キーを `NULL` に更新する外部キー制約です。

一方、Prisma が生成する SQLite 用マイグレーションでは、テーブルの再作成を行う際に

```sql
PRAGMA foreign_keys = OFF;
```

を実行し、一時的に外部キー制約を無効化しようとします。

しかし、Cloudflare D1 では外部キー制約を無効化できず、常に有効な状態でマイグレーションが実行されます。

その結果、マイグレーション中に旧テーブルの参照先レコードが削除されるタイミングで `ON DELETE SET NULL` が発動し、参照元の外部キーが `NULL` に書き換えられてしまいます。

## 対策

`@relation` に `onDelete: Restrict` を明示的に指定することで、`ON DELETE RESTRICT` の外部キー制約を作成できます。

```prisma
model Child {
  parentId String?

  parent Parent? @relation(fields: [parentId], references: [id], onDelete: Restrict)
}
```

これにより、参照先レコードの削除時に参照元の外部キーが `NULL` に更新されることを防げます。

Null 許容のリレーションを定義する場合は、`onDelete: Restrict` を明示的に指定することを推奨します。

なお、Null 非許容のリレーションでは、Prisma のデフォルトが `ON DELETE RESTRICT` となるため通常は問題ありませんが、将来の仕様変更への備えとして、こちらも明示的に指定しておくと安心です。
