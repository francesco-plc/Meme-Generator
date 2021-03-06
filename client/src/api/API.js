import Meme from '../models/Meme';

const url = 'http://localhost:3000';

function loadAllMemes() {
    return new Promise((resolve, reject) => {
        fetch(`${url}/api/memes`).then((response) => {
            if (response.ok) {
                response.json().then((json) => {
                    const memes = json.map((memeJson) => Meme.from(memeJson));
                    resolve(memes);
                }).catch((err) => reject(err));
            } else reject();
        }).catch((err) => reject(err));
    });
};

function loadPublicMemes() {
    return new Promise((resolve, reject) => {
        fetch(`${url}/api/memes/public`).then((response) => {
            if (response.ok) {
                response.json().then((json) => {
                    const memes = json.map((memeJson) => Meme.from(memeJson));
                    resolve(memes);
                }).catch((err) => reject(err));
            } else reject();
        }).catch((err) => reject(err));
    });
};

function loadUserMemes() {
    return new Promise((resolve, reject) => {
        fetch(`${url}/api/memes/user`).then((response) => {
            if (response.ok) {
                response.json().then((json) => {
                    const memes = json.map((memeJson) => Meme.from(memeJson));
                    resolve(memes);
                }).catch((err) => reject(err));
            } else reject();
        }).catch((err) => reject(err));
    });
};

async function addNewMeme(meme) {
    const response = await fetch(`${url}/api/memes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id_template: meme.id_template,
            title: meme.title,
            text0: meme.text0,
            text1: meme.text1,
            text2: meme.text2,
            text3: meme.text3,
            color: meme.color,
            font: meme.font,
            size: meme.size,
            isProtected: meme.isProtected,
            image: meme.image,
        }),
    });
    if (response.ok) {
        return null;
    } return { err: 'POST error' };
};

async function copyMeme(meme) {
    const response = await fetch(`${url}/api/copy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id_template: meme.id_template,
            title: meme.title,
            text0: meme.text0,
            text1: meme.text1,
            text2: meme.text2,
            text3: meme.text3,
            color: meme.color,
            font: meme.font,
            size: meme.size,
            isProtected: 1,
            image: meme.image,
        }),
    });
    if (response.ok) {
        return null;
    } return { err: 'POST error' };
};
  
async function deleteMeme(id) {
    const response = await fetch(`${url}/api/memes/${id}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        return null;
    } return { err: 'POST error' };
};

function changePrivacy(id) {
    return new Promise((resolve, reject) => {
      fetch(`${url}/api/memes/user/${id}`, {
        method: 'PUT',
      }).then((response) => {
        if (response.ok) {
          resolve(null);
        } else {
          // analyze the cause of error
          response.json()
            .then((obj) => { reject(obj); }) // error message in the response body
            .catch(() => {
              const err = { error: 'Cannot parse server response.' };
              reject(err);
            }); // something else
        }
      }).catch(() => {
        const err = { error: 'Cannot communicate with the server.' };
        reject(err);
      }); // connection errors
    });
  }

function getUserInfo() {
    return new Promise((resolve, reject) => {
        fetch(`${url}/api/sessions/current`)
            .then((response) => {
                if (response.ok) {
                    response.json().then((userInfo) => {
                        resolve(userInfo);
                    }).catch((err) => reject(err));
                } else {
                    reject();
                }
            }).catch((err) => reject(err));
    });
};
  
function logIn(username, password) {
    return new Promise((resolve, reject) => {
        fetch(`${url}/api/sessions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        }).then((response) => {
            if (response.ok) {
                response.json().then((user) => {
                    resolve([user.name, user.id]);
                }).catch((err) => reject(err));
            } else {
                reject();
            }
        }).catch((err) => reject(err));
    });
};
  
function logOut() {
    return new Promise((resolve, reject) => {
        fetch(`${url}/api/sessions/current`, {
            method: 'DELETE',
        }).then((response) => {
            if (response.ok) {
                resolve(null);
            } else {
                reject();
            }
        }).catch((err) => reject(err));
    });
};
  
  const API = {
    loadAllMemes,
    loadPublicMemes,
    loadUserMemes,
    addNewMeme,
    copyMeme,
    deleteMeme,
    changePrivacy,
    getUserInfo,
    logIn,
    logOut,
  };
  
  export default API;


  