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
    <div class="w-75 mb-4">
        <div class="d-flex justify-content-between w-75">
            <h2>都道府県-市区町村</h2>
        </div>
        <button id="add_button">追加</button>
        <div id="dobule_pulldown">
        </div>
    </div>


    <div class="w-75 mb-4">
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


    <div class="w-75 mb-4">
        <div class="d-flex justify-content-between w-75">
            <h2>セール品</h2>
        </div>
        <div>
            <div>
                <h3>価格</h3>
                <span>正規価格</span><span id="regular_price" class="ms-4">10000</span><span>円</span>
                <div>
                    <span>値引後金額</span><span id="discounted_price" class="ms-4"></span><span>円</span>
                </div>

                <div class="mt-3">値引き</div>
                <div class="mt-2 discount_type_node">
                    <input type="radio" name="price_discount_type" id="discount_type_price_1" class="discount_type" value="1">
                    <label for="discount_type_price_1">金額</label>
                    <input type="text" id="price_discount" class="text-lg-end col-1 discount_value" disabled=true><span class="ms-1">円引き</span>
                </div>
                <div class="mt-2 discount_type_node">
                    <input type="radio" name="price_discount_type" id="discount_type_rate_1" class="text-right discount_type" value="2">
                    <label for="discount_type_rate_1">割合</label>
                    <input type="text" id="rate_discount" class="text-lg-end col-1 discount_value" disabled=true><span class="ms-1">%引き</span>
                </div>
                <div class="mt-2 discount_type_node">
                    <input type="radio" name="price_discount_type" id="discount_type_none_1" class="discount_type" value="3">
                    <label for="discount_type_none_1">割引なし</label>
                </div>
            </div>
        </div>
    </div>

    <div class="w-75 mb-4">
        <div class="d-flex justify-content-between w-75">
            <h2>モーダル選択</h2>
        </div>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            モーダルオープン
        </button>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">住みたいエリア</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div id="location_area">
                        <ul id="pref_list" class="d-flex justify-content-start flex-wrap">

                        </ul>
                        <ul id="city_list" class="d-flex justify-content-start flex-wrap">

                        </ul>
                    </div>                
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" id="close" data-bs-dismiss="modal">閉じる</button>
                    <button type="button" class="btn btn-secondary d-none" id="back">戻る</button>
                    <button type="button" class="btn btn-primary" id="search">検索する</button>
                </div>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="./dist/index.js?hoge=<?php echo time(); ?>"></script>
</body>
</html>