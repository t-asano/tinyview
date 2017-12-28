# Tiny View

Tiny Viewは、最大3機分のFPV映像を同時に表示できるWebアプリです。USB接続型(UVC対応)のFPV受信機をPCに接続し、PC上のブラウザでWebアプリのURLを開いて利用します。

## 動作環境

### 推奨環境

- MacBook Pro (Late 2016以降)
- MacOS High Sierra (10.13.2以降)
- Google Chrome (63.0.3239.108以降)

### 対応受信機

- Eachine ROTG01

### 備考

- Windowsでの動作は未検証です
- Chrome以外のブラウザでは、FPV映像を1機分しか表示できない場合があります
- USBインターフェースやCPUの能力が、表示の滑らかさに影響します
  - PCのUSBポートにFPV受信機を直結すると、改善する場合があります
  - 画質を落として安定動作を狙う「安定化モード」も利用できます
- Eachine ROTG02 にも対応予定です

## インストールと起動

### デモサイトを利用する場合

デモサイトで動作を試すことが可能です。この場合、動作のカスタマイズはできません。ブラウザ上にFPV映像が表示されますが、それがインターネットへ送信されることはありません。

#### 1. カメラの許可設定(初回のみ)

1. Chromeでデモサイト https://t-asano.github.io/tinyview/ に接続
2. Webアドレスの左に表示されているアイコンをクリック
3. [サイトの設定]をクリック
4. [カメラ]を[許可]に設定
5. Webサイトをリロード

#### 2. 起動

1. FPV受信機を接続
2. Chromeでデモサイト https://t-asano.github.io/tinyview/ に接続

### PC上に設置する場合

Node.jsをインストール済みのPCにWebサーバーを設置します。この場合、動作を自由にカスタマイズできます。

#### 1. インストール(初回のみ)

1. 適当な場所にファイル一式を配置
2. 外部モジュールをインストール ($ npm install)

#### 2. カメラの許可設定(初回のみ)

1. サーバーを起動 ($ node index.js)
2. Chromeで http://localhost:3001 に接続
3. Webアドレスの左に表示されているアイコンをクリック
4. [サイトの設定]をクリック
5. [カメラ]を[許可]に設定
6. Webサイトをリロード

#### 3. 起動

1. サーバーを起動 ($ node index.js)
2. FPV受信機を接続
3. Chromeで http://localhost:3001 に接続

## 安定化モード

URLの最後に "?s" または "?mode=stability" を加えると、安定化モードで起動します。安定化モードでは、FPV映像の解像度及びフレームレートを低くする事で表示負荷を減らし、安定した表示を狙います。

モード毎の設定値は以下のとおりです。

| モード | 解像度(横方向) | フレームレート |
|:--|:--|:--|
| 標準モード | 640 px 以下 | 32 fps 以下 |
| 安定化モード | 352 px 以下 | 16 fps 以下 |

Eachine ROTG01では、以下のような動作が期待できます。

| モード | 解像度 | フレームレート |
|:--|:--|:--|
| 標準モード | 640 × 480 px | 30 fps |
| 安定化モード | 352 x 288 px | 15 fps |

## 操作方法

キーボード操作により、FPV映像を個別にON/OFFできます。

- 1キー：FPV映像1をON/OFFする
- 2キー：FPV映像2をON/OFFする
- 3キー：FPV映像3をON/OFFする

## カスタマイズ

PC上にWebサーバーを設置した場合には、自由にカスタマイズが可能です。

設定ファイル(docs/config.js)を書き換えることで、以下の項目をカスタマイズできます。

- タイトル
- 背景画像
- 選手画像
- 選手名

プログラムファイル(docs/main.js)を書き換えることで、UVC対応の一般的なUSBカメラも利用可能となります。以下の条件式に、利用したい映像機器のラベルを加えてください。

> if (dev.label.indexOf('USB2.0 PC CAMERA') !== -1) {

ラベルを限定しなければ(例えば条件式に常にtrueを与えれば)、ブラウザが対応するすべての映像機器が利用可能となります。映像機器は、プログラムが検出した順に3台まで使用されます。

## ライセンス

MIT License