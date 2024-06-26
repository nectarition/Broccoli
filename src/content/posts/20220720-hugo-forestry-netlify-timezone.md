---
date: 2022-07-20T12:00:00+9
title: 'Hugo + Forestry + Netlify環境下における日付情報のタイムゾーン適用'
description: 'Hugo + Forestry環境下で日付にタイムゾーンが適用されない問題を解決します。'
showList: true
---

Hugo + Forestry環境下で日付にタイムゾーンが適用されない問題を解決します。

<!--more-->

## TL;DR

* 環境変数設定に「TZ=Asia/Tokyo」を入れよう。
* テーマの日付を表示する記述を `Date.Format`から`Date.Local.Format`に変更しよう

## 背景

* Hugo + Forestry 環境下で、タイムゾーンが適用されずにUTCで表示される。
* 求める動作: 適切なタイムゾーン設定による正しい日付表示。

## 原因

1. Forestryのタイムゾーン設定は変更済み。
2. Forestryが出力するMarkdownの日付情報に設定したタイムゾーン情報が付加されていない。
   * どこのタイムゾーンを設定しているかは調査が必要。
3. Hugoでの生成時にMarkdownで指定されている日付情報を元にページが生成される。

## 関連リンク

* [https://gohugo.io/functions/format/#use-local-and-utc](https://gohugo.io/functions/format/#use-local-and-utc "https://gohugo.io/functions/format/#use-local-and-utc")
* [https://matsuoshi.hatenablog.com/entry/2018/11/09/000000](https://matsuoshi.hatenablog.com/entry/2018/11/09/000000 "https://matsuoshi.hatenablog.com/entry/2018/11/09/000000")