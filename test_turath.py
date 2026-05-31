import re
import urllib.request
import json

# Try to check the HTML file first
html_file = r'C:\Users\mjeed\.gemini\antigravity\brain\e3b562b2-86ed-4b04-b587-7ac833ef1f1e\.system_generated\steps\4\content.md'
with open(html_file, 'r', encoding='utf-8') as f:
    content = f.read()

titles = re.findall(r'<title>(.*?)</title>', content)
descriptions = re.findall(r'<meta name="description" content="(.*?)">', content)
print("Title from HTML:", titles)
print("Description from HTML:", descriptions)

# Let's try Turath API just in case
url = 'https://api.turath.io/book/1262'
try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode())
        print("API Response title:", data.get('title') or data.get('name'))
        print("Author:", data.get('author'))
except Exception as e:
    print("API Error:", e)
