# Getaway Web Extension
Revolutionize your new tab page with an all-in-one extension: Quick Bing searches, unbeatable hot flight and hotel deals, plus instant access to your top sites and bookmarks. Seamless, personalized browsing at your fingertips – Unlimited exploration awaits! 

### download link
[getaway-2.0.1-chrome.zip](https://github.com/Bar856/getaway-wxt/files/14322312/getaway-2.0.1-chrome.zip)


unpack zip file on local folder => Go to Chrome Extension Manager => load unpacked Extension => enjoy

## Project Structure
entrypoints - folder contains newtab, popup and background folders and devtools file. 
1. background - set the default settings when installing the extension. 
2. newtab - contain react application that renders hot flight deals, hot hotel deals, bing search, bookmarks, and top sites.
3. popup - contain react application that renders extension popup windows - has minimal settings to enable / disable hot flights or hotels  
4. devtools - file that give this extension the option to see error & logs on console.

### Tools & Frameworks used
Tailwind CSS, React, WXT

### Extension Size
Total size: 1.36 MB     

### Permission Needed:
1. bookmarks
2. topSites
3. storage
4. tabs

### Installation & Dev Guide
```
npm install
npm run dev
```

#### Note: data is not real

### ScreenShots
<img width="1497" alt="Screenshot 2024-02-18 at 13 50 06" src="https://github.com/Bar856/getaway-wxt/assets/73421962/769c8493-71f6-41b5-bcc0-0cab0fa98a99">




