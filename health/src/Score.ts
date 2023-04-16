export default class Score {

    total_score : number;

    constructor() {
        this.total_score = 0;
    }

    calcTotalScore():void {
        this.total_score = 0;
        this.calcForElement('good_foods_area');
        this.calcForElement('bad_foods_area');
        document.getElementById('todays_score')!.innerHTML = String(this.total_score);
    }

    calcForElement(selector_id:string):void {
        const elements:HTMLElement = document.querySelector('#' + selector_id)!;
        elements.querySelectorAll('li').forEach((element: HTMLElement) => {
            // nullオペレーターをいれることで条件分岐を回避
            const score:string = element.querySelector('.each_food_score')!.innerHTML;
            this.total_score += parseInt(score);
        })
    }


}
