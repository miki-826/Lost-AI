# LostAI

LostAIは、記憶を失ったAIに5回だけ質問し、
そのAIがかつて何のAIだったのかを推理するWebゲームです。

> **失われた記憶は、あと5回でしか呼び出せない。**

## Features

- ChatGPT API による記憶喪失AIとの会話
- 5回制限の推理ゲーム
- 記憶ノイズ / 記憶安定率ゲージ演出
- 記憶断片カードの収集
- 正解・不正解の動画／演出分岐（`MEMORY RESTORED` / `MEMORY LOST`）
- ChatGPT API による採点・総合評価・後日談生成
- Supabase によるプレイ履歴保存（任意）
- BGM 自動再生＋音量調整

## Tech Stack

- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- OpenAI API
- Supabase
- Vercel

## 素材

- 画像（タイトル / キャラクター / パネル / ボタン）：`public/images/`
- BGM：`public/music/bgm.mp3`（タイトルから自動再生・音量調整可）
- 動画：`public/videos/success.mp4`（正解演出）
  - 不正解演出は CSS アニメーション（`MEMORY LOST`）で表現

## セットアップ

```bash
npm install
npm run dev
```

`http://localhost:3000` を開いてプレイできます。

### 環境変数

`.env.example` を `.env.local` にコピーして設定します。

```env
OPENAI_API_KEY=xxxxxxxx
NEXT_PUBLIC_SUPABASE_URL=xxxxxxxx
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxxxxx
SUPABASE_SERVICE_ROLE_KEY=xxxxxxxx
```

> `OPENAI_API_KEY` が未設定でも、内蔵フォールバックロジックでゲームは動作します（デモ用）。
> `SUPABASE_SERVICE_ROLE_KEY` はサーバー側のみで使用し、フロントには渡しません。

## Supabase

`supabase.sql` を Supabase の SQL Editor で実行すると `game_sessions` テーブルが作成されます。

## デプロイ（Vercel）

1. GitHub リポジトリを Vercel に紐付け
2. 環境変数を設定
3. Supabase 側でテーブル作成
4. デプロイ

## ゲームの流れ

```text
タイトル → ストーリー → 遊び方 → 会話（5回質問）
→ 最終回答 → 正解/不正解演出 → 総合評価 → タイトルへ
```
