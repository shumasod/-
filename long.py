# ランダムな文字列を生成する関数
def generate_random_string(length):
  """
  指定された長さのランダムな文字列を生成します。

  Args:
    length: 生成する文字列の長さ

  Returns:
    ランダムな文字列
  """
  import random
  from string import ascii_letters, digits

  return ''.join(random.choice(ascii_letters + digits) for _ in range(length))

# 1000万個のランダムな文字列を生成
strings = [generate_random_string(100) for _ in range(1000000)]

# ソート
strings.sort()

# 重複を除去
unique_strings = set(strings)

# 重複の個数
duplicate_count = len(strings) - len(unique_strings)

# 結果を出力
print(f"生成した文字列の個数: {len(strings)}")
print(f"重複のない文字列の個数: {len(unique_strings)}")
print(f"重複の個数: {duplicate_count}")

# 重複している文字列をファイルに保存
with open("duplicates.txt", "w") as f:
  for string in strings:
    if strings.count(string) > 1:
      f.write(f"{string}\n")

# ソートされた文字列をファイルに保存
with open("sorted_strings.txt", "w") as f:
  for string in strings:
    f.write(f"{string}\n")
