<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>連動型のプルダウン</h1>

    <div>
        <span>都道府県</span>
        <select name="city">
            <option value=""></option>
            <option value="11">東京</option>
            <option value="12">千葉</option>
        </select>
        <span>市区町村</span>
        <select name="pre" id="">
            <option value="11"></option>
        </select>    
    </div>
    <div id="city_pref_json"></div>
</body>
    <script src="./dist/app.js?time=<?php echo time();?>"></script>

</html>