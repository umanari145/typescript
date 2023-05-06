import { CalcMultiDetails } from "./calc-multi-detail";
import { MultiPulldown } from "./multi-pulldown";
import { PriceRender } from "./PriceRender";

window.addEventListener('load', () => {
    // ダブルプルダウン
    const multiPulldown = new MultiPulldown();
    multiPulldown.start()

    // 明細の計算
    const calcMultiDetails = new CalcMultiDetails();
    calcMultiDetails.start()


    const priceRender = new PriceRender()
    priceRender.start()
})
