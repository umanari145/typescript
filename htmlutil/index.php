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


    <div class="w-75">
        <div class="d-flex justify-content-between w-75">
            <h2>セール品</h2>
        </div>
        <div>
            <div>
                <h3>価格</h3>
                <span id="regular_price">10000</span>
                <span id="discounted_price"></span>
                <div class="mt-2 discount_type_node">
                    <input type="radio" name="price_discount_type" id="discount_type_price_1" class="discount_type" value="1">
                    <label for="discount_type_price_1">金額</label>
                    <input type="text" id="price_discount" class="text-lg-end col-1 discount_value"><span class="ms-1">円</span> 
                </div>
                <div class="mt-2 discount_type_node">
                    <input type="radio" name="price_discount_type" id="discount_type_rate_1" class="text-right discount_type" value="2">
                    <label for="discount_type_rate_1">割合</label>
                    <input type="text" id="rate_discount" class="text-lg-end col-1 discount_value"><span class="ms-1">%</span>
                </div>
                <div class="mt-2 discount_type_node">
                    <input type="radio" name="price_discount_type" id="discount_type_none_1" class="discount_type" value="3">
                    <label for="discount_type_none_1">割引なし</label>
                </div>
            </div>
        </div>
    </div>

    <script type="text/javascript" src="./dist/index.js?hoge=<?php echo time(); ?>"></script>
</body>
</html>