"use strict";

window.addEventListener("load", start);

const endpoint = "https://rest-api-startdata-default-rtdb.europe-west1.firebasedatabase.app";

async function start() {
  const getData = await getPosts(`${endpoint}/posts.json`);
  getData.forEach(showData);

  console.log(getData);
}

async function getPosts(url) {
  const response = await fetch(url);

  const data = await response.json();
  const posts = preparePostData(data);

  return posts;
}

function preparePostData(dataObject) {
  const postArray = [];

  for (const key in dataObject) {
    const post = dataObject[key];
    post.id = key;
    postArray.push(post);
  }

  return postArray;
}

function showData(urlData) {
  const myHtml = /*html*/ `
<article>
<p>Id: ${urlData.id}</p>
<img src=${urlData.image}>
<p>${urlData.title}</p>
</article>

`;
  document.querySelector("#displayData").insertAdjacentHTML("beforeend", myHtml);
}


async function createPost(title, image) {
    const newPost = {title, image};
    const postAsJson = JSON.stringify(newPost);
    
    const res = await fetch(`${endpoint}/posts.json`, {
        method: "POST",
        body: postAsJson
    });
    const data = await res.json();
    console.log(data)
}

createPost("My First Post", "https://images.unsplash.com/photo-1641876749963-550554c7258d");