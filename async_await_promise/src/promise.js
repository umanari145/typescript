const url = "./src/hello.json";
{
  function fetchHello() {
    const promise = fetch(url);

    const onFulfilled = (data) => {
      console.log("promise + fullfill 一番原始的の成功");
    };

    const onRejected = (err) => {
      console.log("promise + fullfill 一番原始的の失敗");
    };
    return promise.then(onFulfilled, onRejected);
  }
  console.log("promise + fullfill　開始");
  fetchHello();
}

{
  function fetchHello() {
    return fetch(url).then(
      (data) => {
        console.log("fetchのthen通信成功しました 1段階");
      },
      (err) => {
        console.log("fetchのthen通信失敗しました");
      }
    );
  }
  console.log("fetch１段階の開始");
  fetchHello();
}

{
  function fetchHello() {
    return fetch(url)
      .then((response) => {
        // [1]
        return response.json();
      })
      .then((data) => {
        // [2]
        const messageElm = document.getElementById("message");
        messageElm.innerHTML = data.message;
        console.log("fetch ２段階目 内部");
      });
  }
  console.log("fetch2段階の開始");
  fetchHello().then(() => {
    console.log("fetch 2段階目 外");
  });
}

{
  /*function displayMessagePromise() {
    return fetch(url)
      .then((response) => {
        // [1]
        return response.json(); // [2]
      })
      .then((data) => {
        const messageElm = document.getElementById("message"); // [3] 〜
        messageElm.innerHTML = data.message;
        // 例えば以下のように例外が発生してもcatch関数で捕まえられる
        // throw new Error("テストエラー");
        console.log("終了"); // 〜 [3]
      })
      .catch((err) => {
        // [4]
        console.log(
          `displayMessagePromiseの処理中にエラーが発生しました: ${err.message}`
        );
      });
  }

  displayMessagePromise().then(() => {
    console.log("displayMessagePromiseが終わりました");
  });*/
}

{
  async function displayMessage() {
    try {
      const response = await fetch(url);
      const data = await response.json();
      const messageElm = document.getElementById("message");
      messageElm.innerHTML = data.message;
      console.log("終了");
    } catch (err) {
      console.log(
        `displayMessageの処理中にエラーが発生しました: ${err.message}`
      );
    }
  }

  displayMessage().then(() => {
    console.log("displayMessageが終わりました async_awaitでthen");
  });
}
