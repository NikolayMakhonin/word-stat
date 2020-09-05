```
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="/__/firebase/7.17.2/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="/__/firebase/7.17.2/firebase-analytics.js"></script>

<!-- Initialize Firebase -->
<script src="/__/firebase/init.js"></script>
```

Для размещения сайта в Firebase Hosting:
```
npm install -g firebase-tools
firebase login
firebase init // можно запускать в папке с готовым приложением
firebase deploy // публикует папку public по-умолчанию
```

Приложение будет по адресу: https://notes-98850.web.app

Документация по хостингу: https://firebase.google.com/docs/hosting/quickstart?authuser=0
