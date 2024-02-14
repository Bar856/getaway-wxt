# Getaway Web Extension
Revolutionize your new tab page with an all-in-one extension: Quick Bing searches, unbeatable hot flight and hotel deals, plus instant access to your top sites and bookmarks. Seamless, personalized browsing at your fingertips – Unlimited exploration awaits! 

## Project Structure
entrypoints - folder contains newtab, popup and background folders and devtools file. 
1. background - set the default settings when installing the extension. 
2. newtab - contain react application that renders hot flight deals, hot hotel deals, bing search, bookmarks, and top sites.
3. popup - contain react application that renders extension popup windows - has minimal settings to enable / disable hot flights or hotels  
4. devtools - file that give this extension the option to see error & logs on console.

### Tools & Frameworks used
Tailwind CSS, React, WXT

### Extension Size
Total size: 162.76 kB    

### Permission Needed:
1. bookmarks
2. topSites
3. storage
4. tabs
5. scripting

### Installation & Dev Guide
```
npm install
npm run dev
```

#### Note: data is not real
