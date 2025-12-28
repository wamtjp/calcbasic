import requests
import csv
import json

# =================================================================
# ★ここに、Reactアプリの時にコピーした「databaseURL」を貼ってください
# ※最後に必ず「/results.json」をつけてください！
# =================================================================
FIREBASE_URL = "https://gemini3-mathdrill-01-default-rtdb.firebaseio.com/results.json" 
# ↑ 例: https://your-project.firebaseio.com/results.json
# =================================================================

OUTPUT_FILE = "seiseki_data.csv"

def fetch_and_convert():
    print("データを取得しています...")
    
    # 1. Firebaseからデータをダウンロード（JSON形式）
    try:
        response = requests.get(FIREBASE_URL)
        
        # エラーチェック
        if response.status_code != 200:
            print(f"エラー: データが取得できませんでした。(Status: {response.status_code})")
            return

        data = response.json()
        
        if not data:
            print("データが見つかりません（まだ誰も回答していません）。")
            return

    except Exception as e:
        print(f"通信エラーが発生しました: {e}")
        return

    # 2. データをリスト形式に整理
    # JSONの構造: { "101_山田": {name: "山田", score: 10...}, "102_田中": {...} }
    
    rows = []
    # CSVのヘッダー（1行目の項目名）
    header = ["出席番号", "名前", "点数", "問題数", "実施日時"]
    
    for user_id, info in data.items():
        # 必要な項目を取り出す
        row = [
            info.get("number", ""),
            info.get("name", ""),
            info.get("score", 0),
            info.get("total", 0),
            info.get("date", "")
        ]
        rows.append(row)
    
    # 出席番号順に並べ替え（文字列として比較されるので注意）
    rows.sort(key=lambda x: x[0])

    # 3. CSVファイルに書き出し
    # encoding='utf-8-sig' にすると、Excelで文字化けせずに開けます
    try:
        with open(OUTPUT_FILE, 'w', encoding='utf-8-sig', newline='') as f:
            writer = csv.writer(f)
            writer.writerow(header) # ヘッダーを書く
            writer.writerows(rows)  # データの中身を書く
            
        print(f"成功！ '{OUTPUT_FILE}' を作成しました。Excelで開いてください。")
        print(f"取得件数: {len(rows)} 件")
        
    except IOError:
        print(f"エラー: ファイル '{OUTPUT_FILE}' を書き込めません。Excelで開いたままにしていませんか？")

if __name__ == "__main__":
    fetch_and_convert()