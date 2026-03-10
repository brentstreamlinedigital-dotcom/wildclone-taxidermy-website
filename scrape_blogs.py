import urllib.request
from bs4 import BeautifulSoup
import json

url = "https://www.wildclone.com/blog"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read()
    soup = BeautifulSoup(html, 'html.parser')
    
    # Try to find blog posts. Squarespace normally uses specific structures:
    # Actually it's Wix maybe? The HTML will tell.
    links = []
    for a in soup.find_all('a', href=True):
        href = a['href']
        if '/post/' in href:
            links.append(href if href.startswith('http') else "https://www.wildclone.com" + href)
    
    print("Found links:", set(links))
except Exception as e:
    print("Error:", e)
