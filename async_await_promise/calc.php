<?php

// ヘッダーを設定して、レスポンスのContent-TypeがJSONであることを指定
header('Content-Type: application/json; charset=utf-8');


$response = [];
http_response_code(200);
$add = $_GET['add'];
// データ配列を作成
$response = [
    "res" => $add * 2
];
// 1秒おく
sleep(1);

// JSONにエンコードして出力
echo json_encode($response, JSON_UNESCAPED_UNICODE);
