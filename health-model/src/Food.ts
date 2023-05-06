import { Foodable } from "./Foodable";
import { Score } from "./Score";

export class Food implements Foodable {
    
    constructor(public element: HTMLDivElement) {
        element.addEventListener(
            'click', 
            // 以下のようにthisをbindさせても可(その場合、IFも変わってくるが・・・)
            //this.clickEventHandler.bind(this),
            this.clickEventHandler
        );
    }

    clickEventHandler(e:Event) {
        // bindをつかうとthis.elementとしてjQueryのときのようにつかえる
        //console.log(element)
        const element = e.currentTarget as HTMLDivElement
        
        element.classList.toggle('food--active');
        // イベントのたびにnew するのがダメなのでシングルトンを生成する
        const score = Score.getInstance();
        // イベントのたびにnew するのがためなのでscore.renderの中を見るとFoodがシングルトンになる
        score.render();
    }
}