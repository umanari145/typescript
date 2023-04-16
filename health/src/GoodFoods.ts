export default class GoodFoods {

    selector_id: string;

    constructor(selector_id: string) {
        this.selector_id = selector_id;
    }

    addPoint() {
        // !びっくりでnullなし 型アサーション
        const parent_element:HTMLElement = document.getElementById(this.selector_id)!;
        parent_element.addEventListener('click', (event: MouseEvent) => {
            // 型アサーションで強引に決めてしまう
            const element = event.currentTarget as HTMLElement;
            console.log('クリックされました');
            this.addScore(element);
        })
    }

    addScore(parent_element:HTMLElement) {
        const score_element: HTMLElement = parent_element.querySelector('.each_food_score')!;
        let score: string = score_element.innerHTML;
        let score_num: number = parseInt(score);
        score_num++;
        console.log('今点数はこれだけです。'+ score_num);
        score_element.innerHTML = String(score_num)
    }

}
