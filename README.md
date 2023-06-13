# FE_RSSFeedReaders
A simple Angular RSS News feed readers, web scraping, baotintuc.vn clone.

#### Setup environment variable
./src/environments/environment.ts
```.ts
export const environment = {
  production: false,
  newsSource: "https://baotintuc.vn",
  corsApi: "cors-proxy4.p.rapidapi.com",
  corsApiKey: "<Your API key>",
};
```
I'm using [CORS Proxy API](https://rapidapi.com/condacore/api/cors-proxy4/) to bypass CORS, you can use your own CORS Proxy server and skip this part.

#### Commands
- Use `npm install` to install and then `npm start` to start the project. 

#### Screenshot
![Home](https://github.com/treocaynho01629/FE_RSSFeedReaders/assets/91520278/4c320473-00d4-4724-8129-b7b49e45f7d2)
![Read](https://github.com/treocaynho01629/FE_RSSFeedReaders/assets/91520278/4bc963bd-af1d-42c4-a833-226afbd1c820)

