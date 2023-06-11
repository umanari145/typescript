import { CalcMultiDetails } from "./calc-multi-detail";
import { MultiPulldown } from "./multi-pulldown";
import { PriceRender } from "./PriceRender";
import { Modal } from "bootstrap";
import { LocationRender } from "./LocationRender";

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
    const locationRender = new LocationRender();
    locationRender.fetchPrefs()

    document.getElementById('search')?.addEventListener('click', ()=> {
        const checked_pref: HTMLInputElement|null = document.querySelector('#pref_list input:checked')
        if (checked_pref?.value) {
            document.getElementById('city_list')!.classList.remove('d-none')
            document.getElementById('pref_list')!.classList.add('d-none')
            document.getElementById('close')!.classList.add('d-none')
            document.getElementById('back')!.classList.remove('d-none')
            locationRender.fetchCities(checked_pref?.value)
        }
    })

    document.getElementById('back')?.addEventListener('click', ()=> {
        document.getElementById('city_list')!.classList.add('d-none')
        document.getElementById('back')!.classList.add('d-none')
        document.getElementById('pref_list')!.classList.remove('d-none')
        document.getElementById('close')!.classList.remove('d-none')
    })
})
