import { CalcMultiDetails } from "./calc-multi-detail";
import { MultiPulldown } from "./multi-pulldown";
import { PriceRender } from "./PriceRender";
import { Modal } from "bootstrap";
import { CityGetters } from "./CityGetters";

window.addEventListener('load', () => {
    // ダブルプルダウン
    const multiPulldown = new MultiPulldown();
    multiPulldown.start()

    // 明細の計算
    const calcMultiDetails = new CalcMultiDetails();
    calcMultiDetails.start()

    // 価格の表記
    const priceRender = new PriceRender()
    priceRender.start()

    // bootstrap modalの初期化
    const modal = Modal.getInstance;
    modal.apply
    
    // API取得
    const cityGetters = new CityGetters();
    cityGetters.fetchCities()
    
})
