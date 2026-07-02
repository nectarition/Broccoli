---
date: 2026-07-02T12:00:00+09:00
title: 'Cloudflare D1 + Prisma で Null 許容型参照を使うとデータが消失する (Null となる)'
description: 'Cloudflare D1 + Prisma で Null 許容型の外部キー参照 (Foreign Key) を使用し、マイグレーションを適用するとデータが消失する問題について解説します。'
showList: true
---

## 概要

Cloudflare D1 + Prisma で Null 許容型の外部キー参照 (Foreign Key) を使用し、マイグレーションを適用するとデータが消失します。

## 構成

- Cloudflare D1 (compatibility_date = 2026-06-03)
- Prisma v7.8.0

## 原因

Cloudflare D1 の外部キー制約が[常に有効である](https://developers.cloudflare.com/d1/sql-api/foreign-keys/#defer-foreign-key-constraints)ことが大きな原因です。

Prisma のスキーマにて Null 許容型参照を定義した際、 @relation 句に何も指定しない場合は `ON DELETE SET NULL` を使用して外部キー制約を作成します。  
`ON DELETE SET NULL` は、参照先のレコードが削除された場合に、参照元の外部キーを NULL に設定する制約です。

Prisma が生成したマイグレーションスクリプトでは、 `PRAGMA foreign_keys = OFF;` を使用して外部キー制約の無効化を試みますが、D1 では外部キー制約を無効化できないため、マイグレーションの適用時にデータが消失します。

## 対策

Prisma スキーマの `@relation` 句に `onDelete: Restrict` を指定することで、`ON DELETE RESTRICT` 制約を設定することができます。

特に Null 許容型の場合は `ON DELETE RESTRICT` を指定することを推奨します。

なお、Null 非許容参照の場合はデフォルトで `ON DELETE RESTRICT` が設定されるため特に指定する必要はありませんが、今後の仕様変更に備えて明示的に指定することを推奨します。
