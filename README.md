# feedenostr
feed を deno で nostr に投稿する。  
コンテナ起動時間から指定した基準（TARGET_MINUTES）分の前に投稿された記事を取得し POST する。

# 環境変数
| 環境変数名 | 設定値 |
| ---- | ---- |
| FEED_URL | 取得する feed の URL |
| PRIVATE_KEY | POST 時に利用するプライベートキー |
| TARGET_MINUTES | feed 取得基準となる分 |

# 利用方法
```
# ビルド
docker build -t feedenostr -f ./docker/Dockerfile .

# ローカルでは src をマウントして作業
docker run -it --rm --mount type=bind,source="$(pwd)"/src,target=/srv -w /srv \
  -e FEED_URL="https://xxxxxxxxx.xx/" \
  -e PRIVATE_KEY="nsecxxxxxxxxxxxxxxxxxxxxx" \
  -e TARGET_MINUTES=30 \
  feedenostr bash
```
