# Tiny View

Tiny Viewは、FPV映像を3画面同時に表示できるWebアプリです。USB接続型(UVC対応)のFPV受信機をPCに接続し、PCのブラウザでURLを開いて利用します。(※より高速に動作する[Tiny View Plus](https://github.com/t-asano/tinyviewplus/)も公開中です。今後はこちらの開発にシフトします)

<img alt="demo movie" src="https://github.com/t-asano/tinyview/raw/master/docs/img/demo.gif">

## 動作環境

### 推奨環境

- MacBook Pro (Late 2016以降)
- MacOS High Sierra (10.13.2以降)
- Google Chrome (63.0.3239.108以降)

※この環境での、完璧な動作を保証するものではありません。複数の映像を表示した場合に、映像によって表示の滑らかさが異なる現象が不定期に発生することが、確認されています。GitHubのIssueにて動作報告をして頂ければ幸いです。

### 対応受信機

- Eachine ROTG01
- Eachine ROTG02

### 備考

- Windowsでの動作は未検証です
- Chrome以外のブラウザでは、映像を1画面しか表示できない場合があります
- USBインターフェースやCPUの能力が、表示の滑らかさに影響します
  - PCのUSBポートにFPV受信機を直結すると、改善する場合があります
  - [映像モード](#vmode)を変更すると、動作が安定する場合があります

## インストールと起動

### デモサイトを利用する場合

デモサイトで動作を試すことができます。ただし、カスタマイズはできません。映像がインターネットへ送信されることはありませんので、ご安心ください。

#### 1. カメラの許可設定(初回のみ)

1. Chromeでデモサイト https://t-asano.github.io/tinyview/ に接続
2. URL表示欄のすぐ左のアイコンをクリック
3. [サイトの設定]をクリック
4. [カメラ]を[許可]に設定
5. Webサイトをリロード

#### 2. 起動

1. FPV受信機を接続
2. Chromeでデモサイト https://t-asano.github.io/tinyview/ に接続

### PC上に設置する場合

Node.jsを導入済みのPCにWebサーバーを設置します。この場合、動作を自由にカスタマイズできます。

#### 1. インストール(初回のみ)

1. 適当な場所にファイル一式を配置
2. 外部モジュールをインストール ($ npm install)

#### 2. カメラの許可設定(初回のみ)

1. サーバーを起動 ($ node index.js)
2. Chromeで http://localhost:3001 に接続
3. URL表示欄のすぐ左のアイコンをクリック
4. [サイトの設定]をクリック
5. [カメラ]を[許可]に設定
6. Webサイトをリロード

#### 3. 起動

1. サーバーを起動 ($ node index.js)
2. FPV受信機を接続
3. Chromeで http://localhost:3001 に接続

## 操作方法

キーボード操作により、映像を個別にON/OFFできます。

- 1キー：映像1をON/OFFする
- 2キー：映像2をON/OFFする
- 3キー：映像3をON/OFFする

<a name="vmode"></a>
## 映像モード

URLの最後に "?vmode=(モード名)" を加えると、映像モードを指定できます。例えば、次のように指定します。

> https://t-asano.github.io/tinyview/?vmode=low

モード毎の設定値は以下のとおりです。初期値は"high"です。

| モード | 解像度(横方向) | フレームレート |
|:--|:--|:--|
| high | 640 px 以下 | 32 fps 以下 |
| mid | 640 px 以下 | 16 fps 以下 |
| low | 352 px 以下 | 16 fps 以下 |

Eachine ROTG01及びROTG02では、以下のような動作が期待できます。

| モード | 解像度 | フレームレート |
|:--|:--|:--|
| high | 640 × 480 px | 30 fps |
| mid | 640 × 480 px | 15 fps |
| low | 352 x 288 px | 15 fps |

## カスタマイズ

PC上にWebサーバーを設置した場合には、自由にカスタマイズが可能です。

設定ファイル(docs/config.js)を書き換えることで、以下の項目を変更できます。

- タイトル
- 背景画像
- 選手画像
- 選手名

また、プログラムファイル(docs/main.js)を書き換えることで、UVC対応の一般的なUSBカメラも利用可能となります。プログラム中の以下の条件式に、利用したい映像機器のラベルを加えてください(ラベルはコンソールで確認できます)。

> if (dev.label.indexOf('USB2.0 PC CAMERA') !== -1) {

これにより、FPV受信機とPC内蔵カメラの映像を混在させるような使い方も可能です。映像機器は、プログラムが検出した順に最大3台まで使用されます。

## ライセンス

MIT License
