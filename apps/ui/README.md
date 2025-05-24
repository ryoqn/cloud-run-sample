# ディレクトリ構成

```bash
apps/ui/
├── src/
│   ├── app/                  # Next.jsのApp Router用ディレクトリ
│   │   ├── page.tsx          # ホームページ
│   │   ├── layout.tsx        # レイアウト
│   │   └── [route]/          # 各ルート
│   │
│   ├── components/           # UIコンポーネント
│   │   ├── ui/               # 汎用UIコンポーネント
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.module.css
│   │   │   │   └── Button.stories.tsx
│   │   │   └── ...
│   │   │
│   │   ├── features/         # 機能固有のコンポーネント
│   │   │   ├── Sample/
│   │   │   │   ├── SampleDisplay.tsx       # プレゼンテーショナルコンポーネント
│   │   │   │   ├── SampleContainer.tsx     # コンテナコンポーネント
│   │   │   │   ├── SampleDisplay.module.css
│   │   │   │   └── SampleDisplay.stories.tsx
│   │   │   └── ...
│   │   │
│   │   └── layout/           # レイアウト関連コンポーネント
│   │       ├── Header/
│   │       ├── Footer/
│   │       └── ...
│   │
│   ├── lib/                  # ユーティリティとカスタムフック
│   │   ├── api/              # APIリクエスト関連
│   │   │   ├── hooks/        # データ取得用カスタムフック
│   │   │   │   ├── useSample.ts
│   │   │   │   └── ...
│   │   │   │
│   │   │   └── services/     # APIサービス
│   │   │       ├── sampleService.ts
│   │   │       └── ...
│   │   │
│   │   ├── utils/            # 汎用ユーティリティ
│   │   └── firebase/         # Firebase関連コード
│   │
│   ├── types/                # 型定義
│   │   ├── index.ts          # 型のエクスポート
│   │   └── sample.ts         # モデル固有の型
│   │
│   ├── styles/               # グローバルスタイル
│   │   ├── globals.css
│   │   └── variables.css
│   │
│   └── stories/              # Storybook用のページストーリー
│       └── pages/
│
├── .storybook/              # Storybook設定
│   ├── main.ts
│   └── preview.ts
│
└── public/                  # 静的アセット
```
