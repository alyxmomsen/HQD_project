<?php 




?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/main.css?v=<?= time() ?>">
    <title>Document</title>
</head>
<body>
    <div id='root'>
        <div id='main-container'>
            <header id="header">
                <div class="container_1"></div>
            </header>
            <div id="main_content-container">
                <aside id="aside-left"></aside>
                <div id="main-content-goods" >
                    <!-- <video loop autoplay src="http://moroz.dobolli.ru/video/background/hqdBackGround.mp4"></video> -->
                </div>
                <aside id="aside-right"></aside>
            </div>
            <footer id="footer"></footer>
        </div>
        <aside class='main-menu-common-container'>
            <button class="close-button">X</button>
            <div class="menu-aside-content-container">
                <div class="main-menu-list-container">
                    <li class="main-menu-item"><a href="/">главная</a></li>
                    <li class="main-menu-item"><a href="/goods.php">продукты</a></li>
                    <li class="main-menu-item"><a href="/">о нас</a></li>
                    <li id='entrance' class="main-menu-item"><a href="/entrance.php">вход</a></li>
                    <li class="main-menu-item"><a href="logout.php">logout</a></li>
                </div>
            </div>
        </aside>
    </div>
</body>
</html>
<script>
    document.querySelector('.main-menu-common-container > .close-button').onclick = (e) => {
        
        console.log(e.currentTarget.parentNode.classList.toggle('do'));
    };
</script>
<script src="./index.js?v=<?= time() ?>"></script>