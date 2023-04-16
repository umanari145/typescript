import Foods from "./Foods";
export default class BadFoods extends Foods {
 
    calcScore(parent_element:HTMLElement) {
        const score_element: HTMLElement = parent_element.querySelector('.each_food_score')!;
        let score: string = score_element.innerHTML;
        let score_num: number = parseInt(score);
        score_num--;
        score_element.innerHTML = String(score_num)
    }
}
