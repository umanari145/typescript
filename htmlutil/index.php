<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTMLUtil</title>
    <link rel="stylesheet" href="./dist/app.css?hoge=<?php echo time(); ?>">
</head>
<body>
    <h1>頻出動的処理</h2>
    <div class="w-75">
        <div class="d-flex justify-content-between w-75">
            <h2>都道府県-市区町村</h2>
        </div>
        <button id="add_button">追加</button>
        <div id="dobule_pulldown">
        </div>
    </div>


    <div class="w-75">
        <div class="d-flex justify-content-between w-75">
            <h2>明細</h2>
        </div>
        <div>
            <div>
                通常<span id="normal-total-sum"></div>
            </div>
            <div>
                特別<span id="special-total-sum"></div>
            </div>
            <div>
                例外<span id="irregular-total-sum"></div>
            </div>
        </div>
        <button id="add_detail_button">追加</button>
        <div id="multi-detail">
        </div>
    </div>

    <script type="text/javascript" src="./dist/multi-pulldown.js?hoge=<?php echo time(); ?>"></script>
    <script type="text/javascript" src="./dist/calc-multi-detail.js?hoge=<?php echo time(); ?>"></script>
</body>
</html>