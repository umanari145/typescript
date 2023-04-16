import Score from "./Score";

export default abstract class Foods {

    selector_id: string;
    score: Score;

    constructor(selector_id: string) {
        this.selector_id = selector_id;
        this.score = new Score();
    }

    addEvent():void {
        // !びっくりでnullなし 型アサーション
        const parent_element:HTMLElement = document.getElementById(this.selector_id)!;
        parent_element.addEventListener('click', (event: MouseEvent) => {
            // 型アサーションで強引に決めてしまう
            const element = event.currentTarget as HTMLElement;
            this.calcScore(element);
            this.score.calcTotalScore();
        })
    }

    abstract calcScore(parent_element:HTMLElement):void;

}
