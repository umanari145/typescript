
export class Calc {

  private calcadd = (add_number:number) => {
    console.log('add_number ' + add_number);
    const url:string = `http://localhost/async_await_promise/calc.php?add=${add_number}`;
    return fetch(url)
    .then((response:Response) => {
      console.log('after ' + add_number);
      if (!response.ok) {
        throw new Error('例外を投げる');
      }
      return response.json();
    })
  }    

  public start = async() => {
    console.log('promiseのstart await');
    const start = performance.now();

    for (let i =1; i < 10; i++) {
      const res = await this.calcadd(10 * i);
      // console.log(res);
    }
    const end = performance.now();
    console.log('10回分　promiseのend await ' +  (end - start ) / 1000 + '秒');

  }

  public start2 = async() => {
    console.log('promiseのstart 非同期');
    const start = performance.now();
    const PromiseArr = [];
    for (let i =1; i < 10; i++) {
      // awaitがない分関数の実行自体 console.log(add_number・・・)は先行して出力される
      const res = this.calcadd(10 * i);
      PromiseArr.push(res)
    }

    Promise.all(PromiseArr).then((res) => {
      res.forEach(element => {
        console.log('aaaa');
      });
      console.log(res);
      const end = performance.now();
      console.log('10回分 promiseのend 非同期' +  (end - start ) / 1000 + '秒');  
    })
  }
}


