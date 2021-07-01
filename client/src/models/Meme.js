
class Meme {
    constructor(id, id_template, title, text0, text1, text2, text3, color, font, size, protected, image, user) {
        this.id = id;
        this.id_template = id_template;
        this.title = title;
        this.text0 = text0;
        this.text1 = text1;
        this.text2 = text2;
        this.text3 = text3;
        this.color = color;
        this.font = font;
        this.size = size;
        this.protected = protected;
        this.image = image;
        this.user = user;
    }

    static from(json) {
        const meme = new Meme();
        Object.assign(meme, json);
        return meme;
      }
}

