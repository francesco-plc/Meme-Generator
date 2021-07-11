# Exam #2: "Meme Generator"
## Student: s281705 POLICASTRO FRANCESCO 

## React Client Application Routes

- Route `/` : Main page of the website. It is basically a dashboard of memes created by logged users: in particular it allows non-logged in users to  only see public memes and logged in users to see and copy (through button "**Steal?**" attached to each meme) all created memes (both public and protected ones).

- Route `/create` : it's the website area that give access to the creation of a meme. It is reachable (only if logged in) through the "**Generate**" button in the navbar and the "**Steal?**" button attached to each meme in the dashboard.

- Route `/account` : it's the personal area of the logged in user, accessible via **Account Icon** in the navbar, in which you can browse through your created memes and manage them (deleting from the button attached to each meme). From this area it's also possible to Log out.  
- Route `/login` : the page simply show a Log In form through which authenticate.

## API Server

- GET `/api/memes` \+ [`/public, /user`]  

  - Request parameters: *None*

  - Response body content:  An array of objects, each describing a **meme** (`/api/memes` retrieves all memes public and protected, `/api/memes/public` retrieves only public ones, `/api/memes/user` retrieves only logged in user's memes) .

    \```

    [{

      "id": 1,

      "id_template" : 3,

      "title": "title 1",

      "text0": "top text",

      "text1": "bottom text",

      "text2": "null",

      "text3": "null",

      "color": "#000000",

      "font": "Arial",

      "size": 50,

      "isProtected": 0,

      "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABgAAAALbCAYAAAA8WEuUAAAg...",

      "user": 1,

      "username": "maurizio",

    }, {

      "id": 2,

      "id_template" : 0,

      "title": "title 2",

      "text0": "caption 1",

      "text1": "caption 2",

      "text2": "caption 3",

      "text3": "null",

      "color": "#0000FF",

      "font": "Lucida Console",

      "size": 100,

      "isProtected": 1,

      "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABgAAAALbCAYAAAA8WEuUAAAg...",

      "user": 2,

      "username": "fulvio",

    },

    ...

    ]

    \```

- POST `/api/memes`

  - Request parameters and request body content :An object representing a meme (Content-Type: application/json).

    \```

    {

      "id_template" : 3,

      "title": "title 1",

      "text0": "top text",

      "text1": "bottom text",

      "text2": "null",

      "text3": "null",

      "color": "#000000",

      "font": "Arial",

      "size": 50,

      "isProtected": 0,

      "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABgAAAALbCAYAAAA8WEuUAAAg...",

    }

    \```

  - Response body: None

- POST `/api/copy`

  - Request parameters and request body content : An object representing a meme (Content-Type: application/json).

    This api is called when copying a protected meme from another creator, therefore "**isProtected**" attribute is forced to 1 (*and not passed in the request body*) in order to double check it and avoid relying only on the client side.

    \```

    {

      "id_template" : 3,

      "title": "title 1",

      "text0": "top text",

      "text1": "bottom text",

      "text2": "null",

      "text3": "null",

      "color": "#000000",

      "font": "Arial",

      "size": 50,

      "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABgAAAALbCAYAAAA8WEuUAAAg...",

    }

    \```

  - Response body: *None*

- PUT `/api/memes/user/<id>`

  - Request parameter: **id** of the meme whose privacy you want to update
  - Request body: *None*
  - Response body: *None*

- DELETE `/api/memes/<id>`

  - Request parameter: **id** of the meme to delete
  - Request body: *None*
  - Response body: *None*

- POST `/api/sessions`

  - Request body: credentials of the user who is trying to login
  - Response body: authenticated user

- DELETE `/api/sessions/current`

  - Request body: *None*
  - Response body: *None*

- GET `/api/sessions/current`

  - Request body: *None*
  - Response body: authenticated user

  

## Database Tables

- Table `users` - contains: `id, email, name, password`.  

- Table `memes` - contains: `id, id_template, title, text0, text1, text2, text3, color, font, size, isProtected, image, user`.

## Main React Components

- `Navbar` (in `Navbar.js`): Navbar with brand name, generate button, and login/account button 
- `Dashboard` (in `Dashboard.js`): a list of cards that mapped each meme retrieved from the server. Each card shows a meme, a title, its creator, the privacy (*Public*/*Protected*), and a button to *Steal* (copy) the selected meme.
- `UserDashboard` (in `UserDashboard.js`): similarly to the previous component except here the cards list map all the memes created  by the logged user and each of them has a button to delete the selected meme.
- `Generate` (in `Generate.js`): a double-sided component that allow the creation of a meme. It shows: 
  - on one side the template to use as a base for the meme along with two button to move backward/forward through the list of possible templates.
  - on the other side all the possible characterization one can use to create a meme (title, captions, font style, color and size, and a switch to choose the privacy (*Public*/*Protected*)).
- `Canvas`(in `Canvas.js`): component that handles all the real-time manipulation of the process of generating a meme.
- `AccountInfo` (in `Account.js`):  a non-dismissible alert that shows up below the navbar in the personal area, through which  some info are displayed along with a **Log out** button.
- `LoginForm` (in `Account.js`):  literally a login form.
- `PageNotFound` (in `PageNotFound.js`):  a component that renders each time a user access undefined route, simply shows a page not found message with a "return to homepage" button.

<br/>

## Screenshot

![Screenshot](.\client\src\images\screenshot.jpg)

<br/>

## Users Credentials

  | email          | name  | password  | memes created - titles | memes copied - titles |
  | -------------- | ----- | --------- | ---------------------- | --------------------- |
  | test1@email.it | test1 | password1 |                        |                       |
  | test2@email.it | test2 | password2 |                        |                       |
  | test3@email.it | test3 | password3 |                        |                       |

