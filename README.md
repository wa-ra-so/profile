# profile

菅原さんのプロフィールカード（スワイプ型）。React + Vite + [HeroUI](https://heroui.com) + Tailwind CSS で構築。

## 開発

```bash
npm install
npm run dev
```

## ビルド

```bash
npm run build
npm run preview
```

## デプロイ

`main` に push すると GitHub Actions (`.github/workflows/deploy-pages.yml`) が自動でビルドして GitHub Pages に公開します。

リポジトリの **Settings → Pages → Build and deployment → Source** を `GitHub Actions` に設定してください。
