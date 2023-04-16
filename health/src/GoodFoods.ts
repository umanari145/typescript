export default class GoodFoods {

    selector_id: string;
    element: HTMLElement;


    constructor(selector_id: string) {
        this.selector_id = selector_id;
        // !びっくりでnullなし 型アサーション
        this.element = document.getElementById(this.selector_id)!;
    }

    addPoint() {
        this.element.addEventListener('click', () => {
            alert('green クリックされた')
        })
        this.score 
    }


}
