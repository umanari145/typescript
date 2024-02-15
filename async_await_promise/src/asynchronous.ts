
class Asynchronous {
  private url: string

  constructor() {
    this.url = "./src/hello.json";
  }

  public fetch_hello_fullfill = ():Promise<void> => {
    const promise = fetch(this.url);

    const onFulfilled = (data: any) => {
      console.log("promise + fullfill 一番原始的の成功");
    };

    const onRejected = (err: any) => {
      console.log("promise + fullfill 一番原始的の失敗");
    };
    return promise.then(onFulfilled, onRejected);
  }

  public fetch_hello_1step = ():Promise<void> => {
    return fetch(this.url).then(
      (data) => {
        console.log("fetch 1stepのthen通信成功しました 1段階");
      },
      (err) => {
        console.log("fetch 1stepのthen通信失敗しました");
      }
    );
  }

  public fetch_hello_2step = ():Promise<string|void> => {
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

  public fetch_hello_2step_return = ():Promise<Response> => {
    return fetch(this.url);
  }

  public try_async_await = async():Promise<void> => {
    try {
      const response = await fetch(this.url);
      const data = await response.json();
      console.log(data);
    } catch (err:any) {
      console.log(
        `displayMessageの処理中にエラーが発生しました: ${err.message}`
      );
    }
  }

  public return_async_await = async ():Promise<Response> => {
    const response = await fetch("./src/hello.json");
    return response.json();
  }  
}

(async() => {
  const asynchronosu = new Asynchronous();
  console.log('fetch_hello_1stepの開始');
  await asynchronosu.fetch_hello_1step();
  console.log('----------------------');

  console.log('fetch_hello_2stepの開始');
  await asynchronosu.fetch_hello_2step();
  console.log('----------------------');

  console.log('fetch_hello_2step_returnの開始');
  await asynchronosu.fetch_hello_2step_return()
    .then((res:Response) => res.json())
    .then((data) => console.log(data))
  console.log('----------------------');

  console.log('fetch_hello_2step_returnで変数を受け取る、の開始');
  const data = await asynchronosu.fetch_hello_2step_return()
    .then((res:Response) => res.json());
  console.log(data)
  console.log('----------------------');

  console.log('async_awaitの開始');
  await asynchronosu.try_async_await();
  console.log('----------------------');

  console.log('return async_awaitの開始 then');
  await asynchronosu.return_async_await()
    .then((res) => console.log(res));
  console.log('----------------------');

  console.log('return async_awaitの開始 戻り値');
  const data2 = await asynchronosu.return_async_await();
  console.log(data2);
  console.log('----------------------');
})();
