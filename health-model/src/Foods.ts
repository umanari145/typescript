import { type Foodsable } from "./Foodsable";
import { Food } from "./Food";

export class Foods implements Foodsable {
    // シングルトン用のinstance
    public static instance: Foods;
    elements = document.querySelectorAll<HTMLDivElement>('.food');
    private _activeElements: HTMLDivElement[] = [];
    private _activeElementsScore: number[] = [];
    
    private constructor() {
        this.elements.forEach(element => {
            new Food(element);
        })
    }
    
    static getInstance() {
        if (!Foods.instance) {
            Foods.instance = new Foods();
        }
        return Foods.instance;
    }

    get activeElements() {
        this._activeElements = [];
        this.elements.forEach(element => {
            if (element.classList.contains('food--active')) {
                this._activeElements.push(element);
            }
        })
        return this._activeElements;
    }
    
    get activeElementsScore() {
        this._activeElementsScore = [];
        this.activeElements.forEach(element => {
            const foodScore = element.querySelector('.food__score');
            // isNaN判定とParIntよりもこちらで
            this._activeElementsScore.push(Number(foodScore?.textContent));
        })
        return this._activeElementsScore;
    }
}