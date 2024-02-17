<?php

// ヘッダーを設定して、レスポンスのContent-TypeがJSONであることを指定
header('Content-Type: application/json; charset=utf-8');

$response = [];
$type = @$_GET['type'] ?? '';
switch ($type) {
    case 'city':
        http_response_code(200);
        // データ配列を作成
        $response = [
            "11" => "東京",
            "12" => "千葉"
        ];
        break;
    case 'town':
        $pref_code = isset($_GET['pref_code']) ? $_GET['pref_code'] : '';
        // pref_codeの値に基づいて分岐
        switch ($pref_code) {
            case '11':
                http_response_code(200);
                $response = [
                    "0a" => "世田谷区",
                    "0b" => "港区"
                ];
                break;
            case '12':
                http_response_code(200);
                $response = [
                    "1a" => "千葉市",
                    "1b" => "船橋市"
                ];
                break;
            default:
                http_response_code(400);
                $response = ["error" => "Invalid or no pref_code provided"];
        }
        break;
    default:
        http_response_code(400);
        $response = ["error" => "Invalid type"];
        break;
}


// JSONにエンコードして出力
echo json_encode($response, JSON_UNESCAPED_UNICODE);
