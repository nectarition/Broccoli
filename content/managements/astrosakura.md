+++
Title = 'AstroSakura'
Draft = false
Date = 2023-03-24T03:00:00Z

+++

AstroSakuraでのイベント特設サイト構築方法をまとめています。

<!--more-->

## 必要なもの

- 他のリポジトリで使用していないRSA鍵 1ペア (コンテキスト管理リポジトリのデプロイキーとなります)
- コンテンツ管理リポジトリへのアクセス権限

## コンテキスト管理リポジトリを作成

1. nectarition Organizations上にコンテキスト管理リポジトリをPublic Repositoryとして作成します。
  - ここでは `AstroSakura-XXX` とする。
2. 作成したリポジトリのデプロイキー設定を開きます。
3. デプロイキーに準備したRSA公開鍵をAllow Writeにして設定します。(名称は「Deploy AstroSakura」とかにしておく)
4. 以下のファイル・ブランチを作成します。

### 準備するファイル・ブランチ

#### mainブランチ

##### ディレクトリ構成

```
public/
| assets/
| | brand/
| | | components/
| | | | bg-colored.png: ボタン背景
| | | | bg-uncolored.png: ボタン背景
| | | ` bg.png: ページ背景
| | | icon.png: OGP
| | | keyvisual.jpg: ヒーローイメージ
| ` ` logotype.svg: サイドメニュー
| banner.png: リンクバナー(外部参照用)
` favicon.ico: Favicon
src/
| styles/
| ` color.scss
` config.ts
```

##### 用意するファイル

###### /src/styles/color.scss

```scss
:root {
  --primary-color: #2d96b1;
}

```

###### /src/config.ts

```ts
const config = {
  siteUrl: 'https://kohatabe.jp',
  copyright: {
    year: 2021,
    author: 'Nectarition'
  },
  event: {
    name: '小春六花はヨーグルトが食べたい',
    date: '2023-06-18',
    place: '池袋サンシャインシティ',
    content: '小春六花プチオンリーイベント',
    twitterId: 'nct_kohatabe'
  }
}

export default config

```

#### gh-pagesブランチ

- 存在することが目的。(SakuraContentのWorkflowから色々操作するため、作成以外の操作は必要ない)
- mainから分岐するなりして作成する。

## コンテンツ管理リポジトリの更新

- AstroSakuraのコンテンツは全て [SakuraContent](https://github.com/nectarition/SakuraContent) で管理しています。

### ワークフローファイル作成

- [AstroSakura-KYT.yml](https://github.com/nectarition/SakuraContent/blob/main/.github/workflows/AstroSakura-KYT.yml)を参考にワークフローファイルを作成する。
- ファイル名はコンテキスト管理リポジトリ名と合わせておく
- `name` を `🌏 Deploy content to AstroSakura-XXX` に
- `on.push.paths` のパスを `contents/AstroSakura-XXX/**` に
- `env.CNAME` を Webサイトを公開するドメインに
- `env.REPOSITORY` を `AstroSakura-XXX` に
- `jobs.build_and_push.steps[1].env.CONTEXT_DEPLOY_KEY` の値を `${{ secrets.REPO_DEPLOY_KEY_ASTROSAKURA_XXX }}` に(後ほどシークレットの設定をします)

### シークレットの設定

1. SakuraContentのActionsシークレット管理設定を開きます。
2. Repository secretsに以下を追加します。
  - Name: `REPO_DEPLOY_ASTROSAKURA_XXX`
  - Secret: コンテキスト管理リポジトリのデプロイキーとして設定した鍵の秘密鍵

### コンテンツディレクトリの整備

`SakuraContent/contents` 以下のディレクトリを作成します。

```
~/contents
` /AstroSakura-XXX
  | /pages
  | ` index.md
  ` /assets
    | 必要なアセット(/assets以下がそのまま公開ディレクトリのパスとなります)
    ` example.png (これが https://example.com/example.png でアクセスできる)
```

### 仮デプロイ

- SakuraContentのActionsから作成したワークフローを開きます。
- 手動デプロイを試してみます。

### ドメイン設定

- サイトの実体はコンテキスト管理リポジトリのgh-pagesブランチです。
- サイトを公開するために、コンテキスト管理リポジトリのGitHub Pages設定からドメイン等を設定します。

### 運用

- SakuraContent/contents/AstroSakura-XXX 以下を更新すると自動的にビルドとデプロイが行われます。
