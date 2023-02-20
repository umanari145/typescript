import superagent from 'superagent';

class Scraping {
    private url = ""
    constructor(url: string){
        this.url = url
    }
    async getRawHtml(){
        console.log(this.url);
        const result = await superagent.get(this.url);
        return result;   
    }
}

let url:string = 'https://www.dmm.co.jp/digital/videoc/-/list/=/limit=120/sort=ranking/';
const scraping = new Scraping(url);
scraping.getRawHtml().then(function(res){
    console.log(res);
})
