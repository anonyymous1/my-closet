# My Closet
A sneaker apps for sneakerheads.

# Table of Contents

0. [Prep](#Prep)
1. [About](#About)
2. [Install](#Install)
3. [Challenges](#Challenges)
4. [Code](#Peak)
6. [Future](#Future)

### Prep
![Image of Wireframe](https://i.imgur.com/0E0vq3w.png)
![Image of EDR](https://i.imgur.com/jV7JNlH.png)
![Image 2 of EDR](https://i.imgur.com/KnqKOa7.png)

### About

MyCloset is a sneaker app thats lets you save your own collection of sneakers and help you get details for resale or if you would like to buy them.

## User Story

As the user, you need to be able to keep track of what sneakers you have in your inventory. Users with alot of stock and sneakers sometimes forget what they have. This way i can add to what I have and my favorites.
![Image 1 of Preview](https://i.imgur.com/fuy5XAw.png)
![Image 2 of Preview](https://i.imgur.com/g4sZPmU.png)
![Image 3 of Preview](https://i.imgur.com/ws5iVZu.png)
You can use the app by clicking [here](https://project2-mycloset.herokuapp.com/) or doing the following:

### Install
1. Go to [Repo](https://github.com/anonyymous1/my-closet.git).
2. `Fork` page.
3. `Clone` code.
4. Open iTerm2 .
5. Type - `git clone https://github.com/anonyymous1/my-closet.git` into iTerm2.
6. Open `index.html` by typing `code .` in iTerm2.

### Challenges

Some challenges that came about where pulling infor from the DB, it took me a while to remember the associations between tables.

I also needed to get used to not undoing migrations in development and production, so I got really good at making migrations when I needed to alter tables and add columns.

I also have a issue with how my API was set up for this project so i need to work around that to get my Heroku up and running correctly. (This is a ongoing issue ATM)


### Peak at my Code

PEEK OF SOME HTML CODE FOR A DISPLAY PAGE
```html
<h1><%= sneaker[0].brand.toUpperCase() %> </h1>
<hr>

  <div class="container">
    <% sneaker.forEach(function(sneaker) { %>
        <div class="card">
            <a href="/browse/details/<%= sneaker.styleID %>"><img src="<%= sneaker.thumbnail%>" class="card-img-top"></a>
            <div class="card-body">
              <h5 class="card-title"><%= sneaker.silhoutte.toUpperCase()%></h5>
              <p class="card-title"><%= sneaker.colorway%></p>
              <h6 class="card-title">Release Date: <%= sneaker.releaseDate%></h6>
              <hr>
              <% if (sneaker.retailPrice) {%>
                <p class="card-text">Retail Price: $<%= sneaker.retailPrice%></p>
              <% } else { %>
                <p class="card-text">Retail Price: ???</p>
              <% } %>  
              
              <hr>
              <% if (sneaker.description) {%>
                <p class="card-text"><%= sneaker.description%></p>
              <% } else { %>
                <p class="card-text">Sorry, there is currently no description for this item.</p>
              <% } %>  
              <form method="POST" action="/browse/mostPopular">
                <input hidden type="text" name="shoeName" value="<%= sneaker.shoeName %>">
                <input hidden type="text" name="styleID" value="<%= sneaker.styleID %>">
                <input hidden type="text" name="thumbnail" value="<%= sneaker.thumbnail %>">
                <input hidden type="text" name="brand" value="<%= sneaker.brand%>">
                <button class="btn btn-outline-danger" type="submit">Add to Closet</button>
              </form>
            </div>
          </div>
    <% }); %>
  </div>
```
CSS STAYLING ADDED TO BOOTSTRAP COMPONENTS
```css
@import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');

nav ul li {
  text-decoration: none;
  display: inline-block;
  margin-right: .3em;
}

h1, h3 {
  padding: 50px 0px 50px 0px;
  color: black;
  text-align: center;
  font-family: 'Anton', sans-serif;
}

body {
  /* opacity: .5; */
  padding-top: 75px;
  background-color: white;
}

.index-body {
  padding-top: 100px;
  text-align: center;
  margin: auto;
  width: 700px;
}

.login, .signup {
  padding-top: 100px;
  text-align: center;
  width: 300px;
  margin: auto;
}

.menu-img {
  width: 150px;
  height: 150px;
}

.menu-img:hover {
  opacity: .7;
}

.row {
  justify-content: space-evenly;
  flex: 33.33%;
  padding: 5px;
}

/* Clear floats after image containers */
.index-menu {
  display: flex;
}

.browse-index-menu {
  display: flex;
}

.card-img-top {
  width: 250px;
  align-self: center;
}

.card-img-top:hover {
  opacity: .75;
}

.card {
  width: 350px;
  height: 600px;
  margin: 5px;
  padding: 5px;
  background-color: white;
  border: white 1px solid;
  border-radius: 25px;
  display:inline-block;
  text-align: center;
  font-size: 11px;
}

.mycloset-card {
  width: 350px;
  height: 400px;
  margin: 5px;
  padding: 5px;
  background-color: white;
  border: lightgray 1px solid;
  border-radius: 25px;
  display:inline-block;
  text-align: center;
  font-size: 11px;
}

#logOutButton, #profileButton {
  margin-left: 2px;
  margin-bottom: 5px;
}

.input-group {
  margin-left: 100px;
  width: 300px;
}

h4 {
  padding-left: 50px;
}

.comment, .comments-h6 {
  padding-left: 50px;
  width: 600px;
}
.profile-div{
  padding-left: 50px;
  padding-bottom: 50px;
  text-align: center;
}

.user-info {
  padding-left: 50px;
}

.my-closet {
  padding-left: 100px;
}
.profile-image {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 250px;
  height: 250px;
  margin: auto;
  padding: 10px;
  overflow: hidden;
}

.input-group, .mb-3 {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 350px;
  height: 60px;
  margin: auto;
  padding: 10px;
  overflow: hidden;
  /* border: violet 1px solid; */
}

.profile-img {
  width: 250px;
  margin-left: auto;
  margin-right: auto;
  
}

.user-profile-form {
  padding-top: 20px;
}

```
PEEK AT CODE THAT FINDS OR CREATES STYLE AND USER INTO TWO TABLES
```js
browse.post('/search', isLoggedIn, (req, res) => {
    const currentUser = res.locals.currentUser
    const alerts = res.locals.alerts
    let brand = req.body.brand;
    let shoeName = req.body.shoeName;
    let styleID = req.body.styleID;
    let thumbnail = req.body.thumbnail;
    db.sneaker.findOrCreate({
        where: {
            shoeName: shoeName,
            brand: brand,
            styleId: styleID,
            thumbnail: thumbnail
        }
        }).then(([sneaker, created]) =>{
            db.favorite.findOrCreate({
                where: {
                    userId: req.user.id,
                    sneakerId: sneaker.id
                }
            }).then(()=>{
            res.redirect('/browse/search')
        })
    })
})
```
PEEK AT CODE THAT PULLS DATA FROM DB FROM TABLE AND JOIN TABLE
```js
mycloset.get('/', isLoggedIn, (req, res) => {
    const currentUser = res.locals.currentUser
    console.log(`Current User is #${currentUser.id}`);
    const alerts = res.locals.alerts
    db.favorite.findAll({
        where: { userId: currentUser.id },
        include: [db.sneaker]
    }).then (favorites => {
        favorites.forEach(function(favorite){
            console.log(favorite);
        })
        res.render('mycloset/mycloset', { alerts, currentUser, favorites })
    })
})
```

### Future

Here's a list of some of the functionality that i would like to add in the future so that i can have a great piece to show off:
- Herokuo working
- Functionality for `Have` and `Want` for each user.
- Add better, more styling to the site.
- Comment Section for the sneakers in the detail page.
- Make app mobile friendly not just window scale friendly.