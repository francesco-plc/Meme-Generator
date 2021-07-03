const sqlite = require('sqlite3');
const bcrypt = require('bcrypt');

// open the db
const db = new sqlite.Database('db.sqlite', (err) => {
  if (err) throw err;
});

//get all (public & protected) memes 
exports.getAllMemes = () => new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM memes';
    db.all(sql, [], (err, rows) => {
        if (err) {
            reject(err);
            return;
        }

        const memes = rows.map((m) => (
            {
                id: m.id,
                id_template: m.id_template,
                title: m.title,
                text0: m.text0,
                text1: m.text1,
                text2: m.text2,
                text3: m.text3,
                color: m.color,
                font: m.font,
                size: m.size,
                protected: m.isProtected,
                image: m.image,
                user: m.user,
            }));

        resolve(memes);
    });
});

//get all public memes
exports.getPublicMemes = () => new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM memes WHERE protected = 0';
    db.all(sql, [], (err, rows) => {
        if (err) {
            reject(err);
            return;
        }

        const memes = rows.map((m) => (
            {
                id: m.id,
                id_template: m.id_template,
                title: m.title,
                text0: m.text0,
                text1: m.text1,
                text2: m.text2,
                text3: m.text3,
                color: m.color,
                font: m.font,
                size: m.size,
                protected: m.isProtected,
                image: m.image,
                user: m.user,
            }));

        resolve(memes);
    });
});
//get all the user's memes
exports.getUserMemes = (user) => new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM memes WHERE user = ?';
    db.all(sql, [user], (err, rows) => {
        if (err) {
            reject(err);
            return;
        }

        const memes = rows.map((m) => (
            {
                id: m.id,
                id_template: m.id_template,
                title: m.title,
                text0: m.text0,
                text1: m.text1,
                text2: m.text2,
                text3: m.text3,
                color: m.color,
                font: m.font,
                size: m.size,
                protected: m.isProtected,
                image: m.image,
                user: m.user,
            }));

        resolve(memes);
    });
});

//add a meme
exports.addMeme = (userId, meme) => new Promise((resolve, reject) => {
    const sql = 'INSERT INTO memes (id, id_template, title, text0, text1, text2, text3, color, font, size, protected, image, user) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)';
    db.run(sql, [
        this.lastID,
        meme.id_template,
        meme.title,
        meme.text0,
        meme.text1,
        meme.text2,
        meme.text3,
        meme.color,
        meme.font,
        meme.size,
        meme.isProtected,
        meme.image,
        userId],
        (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
});

//get a meme (copy)
exports.getMeme = (memeId) => new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM memes WHERE id = ?';
    db.get(sql, [memeId], (err, row) => {
        if (err) {
            reject(err);
            return;
        }

        const meme =
        {
            id: row.id,
            id_template: row.id_template,
            title: row.title,
            text0: row.text0,
            text1: row.text1,
            text2: row.text2,
            text3: row.text3,
            color: row.color,
            font: row.font,
            size: row.size,
            protected: row.isProtected,
            image: row.image,
            user: row.user
        };
        resolve(meme);
    });
});

//delete a meme
exports.deleteMeme = (userId, memeId) => new Promise((resolve, reject) => {
    const sql = 'DELETE FROM memes WHERE user = ? AND id = ?';
    db.run(sql, [userId, memeId], (err) => {
        if (err) {
            reject(err);
        } else resolve(null);
    });
});

// get user
exports.getUser = (email, password) => new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.get(sql, [email], (err, row) => {
        if (err) {
            reject(err);
        } else if (row) {
            const user = { id: row.id, username: row.email, name: row.name };
            bcrypt.compare(password, row.password).then((result) => {
                if (result) {
                    resolve(user);
                } else {
                    resolve(false);
                }
            });
        } else {
            resolve(false);
        }
    });
});
  
// get user by id
exports.getUserById = (id) => new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.get(sql, [id], (err, row) => {
        if (err) {
            reject(err);
        } else if (row) {
            const user = { id: row.id, username: row.email, name: row.name };
            resolve(user);
        } else {
            resolve({ err: 'User not found.' });
        }
    });
});