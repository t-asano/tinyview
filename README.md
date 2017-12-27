# Tiny View

## 概要

Tiny Viewは、最大3機分のFPV映像を同時に表示できるWebアプリです。USB接続型(UVC対応)のFPV受信器をPCに接続し、PC上のブラウザでWebアプリを開いて利用します。

## 動作環境

### 推奨環境

- MacBook Pro (Late 2016以降)
- MacOS High Sierra (10.13.2以降)
- Google Chrome (63.0.3239.108以降)
- Eachine ROTG01

### 備考

- Windowsでの動作は未検証です
- Chrome以外のブラウザでは、FPV映像を1機分しか表示できない場合があります
- USBインターフェースやCPUの能力が、表示の滑らかさに影響します
  - PCのUSBポートにFPV受信機を直結すると、改善する場合があります
  - 画質を落として安定動作を狙う「安定化モード」も利用できます

## インストールと起動

<!--
### GitHubのサイトを直接開く場合
1. PCにFPV受信機を接続する
2. Chromeで http://xxx/tinyview を開く
-->

### Node.js環境に配置する場合

1. すべてのファイルを適当な場所に配置
2. $ npm install
3. $ node index.js
4. PCにFPV受信機を接続する
5. Chromeで http://サーバーのアドレス:3001 を開く

### 非Node.jsなWebサーバーに配置する場合

1. public/ 以下を適当な場所に配置
2. PCにFPV受信機を接続する
3. Chromeで http://サーバーのアドレス/適当な場所 を開く

## 安定化モード

URLの最後に "?s" を加えると、安定化モードで起動します。安定化モードでは、FPV映像の解像度及びフレームレートを低くする事で表示負荷を減らし、安定した表示を狙います。

## 操作方法

キーボード操作により、FPV映像を個別にON/OFFできます。

- 1キー：FPV映像1をON/OFFする
- 2キー：FPV映像2をON/OFFする
- 3キー：FPV映像3をON/OFFする

## カスタマイズ

お好みに応じて、以下を差し替えてご利用ください。

- タイトル：public/index.html の &lt;div id="title"&gt; の内容
- 背景画像：public/img/wall.jpg
- 選手画像：public/img/whooper*.png
- 選手名：public/index.html の &lt;div class="name"&gt; の内容

また、ソースコードを書き換えると、UVC対応の一般的なUSBカメラも利用できます。

## ライセンス

MIT License