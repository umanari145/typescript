
export class Asynchronous {
  private url: string

  constructor() {
    this.url = "./src/hello.json";
  }

  private fetch_hello_fullfill = ():Promise<void> => {
    const promise = fetch(this.url);

    const onFulfilled = (data: any) => {
      console.log("promise + fullfill 一番原始的の成功");
    };

    const onRejected = (err: any) => {
      console.log("promise + fullfill 一番原始的の失敗");
    };
    return promise.then(onFulfilled, onRejected);
  }

  private fetch_hello_1step = ():Promise<void> => {
    return fetch(this.url).then(
      (data) => {
        console.log("fetch 1stepのthen通信成功しました 1段階");
      },
      (err) => {
        console.log("fetch 1stepのthen通信失敗しました");
      }
    );
  }

  private fetch_hello_2step = ():Promise<string|void> => {
    return fetch(this.url)
    .then((response:Response) => {
      if (!response.ok) {
        throw new Error('例外を投げる');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      console.log("fetch 2step内部");
    }).catch((err) => {
      console.log("fetch 2stepのthen通信失敗しました");
    });
  }

  private fetch_hello_2step_return = ():Promise<Response> => {
    return fetch(this.url);
  }

  // asyncなのでpromiseをかえすがvoid
  private try_async_await = async():Promise<void> => {
    try {
      const response = await fetch(this.url);
      // ↓ここでもawaitを使わないとconsole.log(data)でPromiseが返却されてしまう
      const data = await response.json();
      console.log(data);
    } catch (err:any) {
      console.log(
        `displayMessageの処理中にエラーが発生しました: ${err.message}`
      );
    }
  }

  private return_async_await = async ():Promise<Response> => {
    const response = await fetch("./src/hello.json");
    return response.json();
  } 

  public start = async() => {
    console.log('fetch_hello_1stepの開始');
    await this.fetch_hello_1step();
    console.log('----------------------');
  
    console.log('fetch_hello_2stepの開始');
    await this.fetch_hello_2step();
    console.log('----------------------');
  
    console.log('fetch_hello_2step_returnの開始');
    await this.fetch_hello_2step_return()
      .then((res:Response) => res.json())
      .then((data) => console.log(data))
    console.log('----------------------');
  
    console.log('fetch_hello_2step_returnで変数を受け取る、の開始');
    const data = await this.fetch_hello_2step_return()
      .then((res:Response) => res.json());
    console.log(data)
    console.log('----------------------');
  
    console.log('try_async_awaitの開始');
    await this.try_async_await();
    console.log('----------------------');
  
    console.log('try_async_awaitの開始 戻り値としてPromise<void>なので1thenが可能');
    await this.try_async_await()
    // だだしなにも帰ってこないのでundefined
      .then((res:void) => console.log(res) );
    console.log('----------------------');
  
    console.log('return async_awaitの開始 then');
    await this.return_async_await()
      .then((res:Response) => console.log(res));
    console.log('----------------------');
  
    console.log('return async_awaitの開始 戻り値');
    const data2 = await this.return_async_await();
    console.log(data2);
    console.log('----------------------');
  }
}