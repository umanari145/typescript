import {type Scoreable} from './Scoreable'
import {Foods} from './Foods';

export class Score implements Scoreable {
    private static instance: Score;
    
    private constructor() { }
    
    get totalScore() {
        // 何回も作ると重複したイベントが記録されてしまうのでシングルトンにする
        const foods = Foods.getInstance();
        return foods.activeElementsScore.reduce((total, score) => total + score, 0)
    }

    static getInstance() {
        if (!Score.instance) {
          Score.instance = new Score();
        }
        return Score.instance;
    }

    render() {
        document.querySelector('.score__number')!.textContent = String(this.totalScore);
    }
}