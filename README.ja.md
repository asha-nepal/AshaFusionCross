# AshaFusionCross
[![wercker status](https://app.wercker.com/status/48f4d8ae121c28691e2c4f767c99eb47/m "wercker status")](https://app.wercker.com/project/bykey/48f4d8ae121c28691e2c4f767c99eb47)

## Set up
[Wiki](https://github.com/asha-nepal/AshaFusionCross/wiki/SetUp.ja) を参照

## Coding style
[Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)に準拠

[ESLinter](http://eslint.org/)を使用

#### Atomへの導入
http://mae.chab.in/archives/2874 などを参考に

## Flow
[flow](https://flowtype.org/) を利用した静的型解析を行う．
ファイルの先頭に`/* @flow */`と書くことでflowによる分析対象となる．
基本的に全てのファイルを対象にする．

## Test
テストフレームワークはJest．
`**/__tests__/*`にテストを書く．必要に応じて，`**/__mocks__/*`にモックを書く．

## CI
CIサービスはWerckerを利用．`npm test`に加え，flowによる型チェックとlinterによるコーディング規約チェックを行う．


## 構成
```
├── __mocks__          // Jestでのテスト用の外部ライブラリのモック
├── android            // react-nativeによって生成されたandroid用コード
├── assets             // assets
├── data               // Resources
├── flow  
│   └── types          // flowの型定義ファイル
├── ios                // react-nativeによって生成されたios用コード
├── src
│   ├── actions        // action
│   ├── common         // web / native両方で利用されるcomponent
│   ├── connects       // web / native両方で利用されるconnect関数
│   ├── data           // 固定データをjsのオブジェクトとして提供する
│   ├── form-styles    // カルテのフォーム定義
│   ├── native         // nativeアプリ用コード
│   │   ├── components
│   │   ├── containers
│   │   └── forms
│   ├── sagas          // redux-saga
│   ├── selectors      // reselect
│   ├── store          // store
│   │   └── reducers   // reducers
│   ├── utils
│   └── web            // webアプリ用コード
│       ├── components
│       ├── containers
│       ├── forms
│       ├── sass
│       └── static     // webアプリで利用される静的ファイル．ビルドでpublicにコピーされる
├── test               // jest用ファイル
└── utils              // ユーティリティスクリプト
```

- `actions`, `store`, `store/reducers`: [redux](https://github.com/reactjs/redux)
- `sagas`: 非同期処理を扱う[redux-saga](https://github.com/yelouafi/redux-saga)のファイル
- `selectors`: reduxの`state`ツリーから必要な部分を切り出すセレクタメソッド群．基本的にContainer components (下記)の`mapStateToProps()`で利用される．切り出しに加えてデータの加工が含まれ，計算コストがかかるセレクタは[reselect](https://github.com/reactjs/reselect)でメモ化する

### components / containers
- `web` / `native` 以下の `components` / `containers` はPresentational components / Container components．
- http://redux.js.org/docs/basics/UsageWithReact.html で推奨されている．

### Web / Native
- `native` / `web` 以外のディレクトリのファイルはwebアプリ・nativeアプリ共通．
- `native` / `web` 以下は各プラットフォーム固有のコード．基本的にwebはReact，nativeはReactNativeによるViewコードになる．
- `(web|native)/containers/*`は基本的に`connects/`以下のファイルをインポートしてPresentational componentsに適用するのみ．`connects/`以下が`connect()`関数を利用するロジックの主な置き場．
- 参考) http://qiita.com/yuichiroTCY/items/7c66691fe6cc244053de

### Form
[react-redux-form](https://github.com/davidkpiano/react-redux-form)を利用．
フォームは`form-styles`に従って動的に構築される．
`web/forms/fields/*`, `native/forms/fields/*`はフォームの構成要素．これらは基本的にPresentational / Container componentの定義を分離しない．
