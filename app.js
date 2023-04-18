"use strict";

window.addEventListener("load", start);

const endpoint = "https://rest-api-startdata-default-rtdb.europe-west1.firebasedatabase.app";

async function start() {
  const getPost = await getDataPost(`${endpoint}/posts.json`);
  const getUser = await getDataUser(`${endpoint}/users.json`);
  getPost.forEach(showPosts);
  getUser.forEach(showUser);

  console.log(getUser);
  console.log(getPost);
}

async function getDataPost(url) {
  const response = await fetch(url);

  const data = await response.json();
  const posts = preparePostData(data);

  return posts;
}

async function getDataUser(url) {
  const response = await fetch(url)

  const data = await response.json()
  const posts = preparePostData(data)

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

function showPosts(urlData) {
  const myHtml = /*html*/ `
  <article>
    <h3>${urlData.title}</h3>
    <img src=${urlData.image}>
    <p>${urlData.body}</p>
    <p>${urlData.uid}</p>
  </article>

`;
  document.querySelector("#displayData").insertAdjacentHTML("beforeend", myHtml);
}

function showUser(userData) {
  const myHtml = /*html*/ `
  <article>
    <h3>${userData.name}</h3>
    <img src=${userData.image}>
    <p> Title: ${userData.title}</p>
    <p> Tlf: ${userData.phone}</p>
    <p> Mail: ${userData.mail}</p>
  </article>
  
  
  `;
  document.querySelector("#displayUser").insertAdjacentHTML("beforeend", myHtml);
}

// async function createPost(title, image) {
//   const newPost = { title, image };
//   const postAsJson = JSON.stringify(newPost);

//   const res = await fetch(`${endpoint}/posts.json`, {
//     method: "POST",
//     body: postAsJson,
//   });
//   const data = await res.json();
//   console.log(data);
// }

// // createPost("My First Post", "https://images.unsplash.com/photo-1641876749963-550554c7258d");