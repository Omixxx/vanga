import time
import json
import requests
from bs4 import BeautifulSoup

url = 'https://myanimelist.net/topanime.php'
anime_data = []

while url:
    time.sleep(10)
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    for anime in soup.find_all('tr', class_='ranking-list'):
        link = anime.find(
            'a', class_='hoverinfo_trigger fl-l ml12 mr8')['href']
        title = link.split('/')[-1]
        anime_data.append({'title': title, 'link': link})

    next_page = soup.find('link', {'rel': 'next'})
    if next_page:
        print('next_page_number:' + next_page['href'].split('=')[-1])
        url = 'https://myanimelist.net/topanime.php' + next_page['href']
    else:
        print("af")
        url = None

json_object = json.dumps(anime_data, indent=4)

with open("anime_link.json", "w") as outfile:
    outfile.write(json_object)
