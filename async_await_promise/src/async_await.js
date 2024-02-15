async function displayMessage() {
  const response = await fetch("./src/hello.json");
  const data = await response.json();
  const messageElm = document.getElementById("message");
  messageElm.innerHTML = data.message;
  console.log("async_await.js 終了"); // [3]
}

console.log("async_await.js  開始前"); // [1]
displayMessage();
console.log("async_await.js 開始後"); // [2]
