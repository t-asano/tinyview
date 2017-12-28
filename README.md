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

1. $ npm install
2. $ node index.js
3. PCにFPV受信機を接続
4. Chromeで https://localhost:3001 を開く

## 安定化モード

URLの最後に "?s" を加えると、安定化モードで起動します。安定化モードでは、FPV映像の解像度及びフレームレートを低くする事で表示負荷を減らし、安定した表示を狙います。

## 操作方法

キーボード操作により、FPV映像を個別にON/OFFできます。

- 1キー：FPV映像1をON/OFFする
- 2キー：FPV映像2をON/OFFする
- 3キー：FPV映像3をON/OFFする

## カスタマイズ

設定ファイル(docs/config.js)を書き換えると、以下の項目をカスタマイズできます。

- タイトル
- 背景画像
- 選手画像
- 選手名

また、プログラム(docs/main.js)を書き換えると、UVC対応の一般的なUSBカメラも利用できます。

## ライセンス

MIT License