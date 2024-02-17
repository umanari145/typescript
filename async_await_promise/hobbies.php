<?php

// ヘッダーを設定して、レスポンスのContent-TypeがJSONであることを指定
header('Content-Type: application/json; charset=utf-8');

http_response_code(200);
// データ配列を作成
$response = [
    "a" => "野球",
    "b" => "サッカー",
    "c" => "バスケ",
    "d" => "野球",
];

// JSONにエンコードして出力
echo json_encode($response, JSON_UNESCAPED_UNICODE);
