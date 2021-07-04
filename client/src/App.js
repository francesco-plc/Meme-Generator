import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
/* import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'; */
/* import { Switch, Route, useHistory } from 'react-router-dom'; */
import { Switch, Route, useHistory, BrowserRouter as Router } from 'react-router-dom';
import { AccountInfo, LoginForm } from './components/Account';
import NavBar from './components/Navbar';
import DashBoard from './components/DashBoard';
import Generator from './components/Generator';
import API from './api/API';

function App() {

  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const routerHistory = useHistory();

  // Rehydrate tasks at mount time
  useEffect(()=>{
    API.loadPublicMemes().then((newM) => {setMemes(newM);});
  }, []);

  useEffect(() => {
    API.getUserInfo().then((user) => {
      setUserName(user.name);
      setLoggedIn(true);
      setLoading(true);
      setDirty(true);
    }).catch((err) => console.log(err));
  }, []);

  // Rehydrate tasks at mount time, and when tasks are updated
  useEffect(() => {
    if (dirty && loggedIn) {
      API.loadAllMemes()
        .then((fecthedMemes) => {
          console.log('Load All Memes');
          setMemes(fecthedMemes);
          setLoading(false);
          setDirty(false);
        }).catch((err) => {
          setLoading(false);
          setDirty(false);
          console.log(err);
        });
    } else if (dirty && !loggedIn) {
      API.loadPublicMemes()
        .then((fecthedMemes) => {
          console.log('Load Public Memes');
          setMemes(fecthedMemes);
          setLoading(false);
          setDirty(false);
        }).catch((err) => {
          setLoading(false);
          setDirty(false);
          console.log(err);
        });
    }
    console.log(memes);
  }, [dirty, loggedIn]);


  const addMeme = (meme) => {
    setMemes((oldMemes) => [...oldMemes, meme]);

    API.addNewMeme(meme)
      .then(setDirty(true))
      .catch((err) => console.log(err));
  };

  const deleteMeme = (id) => {
    setMemes((currMemes) => currMemes.filter((meme) => (meme.id !== id)));

    API.deleteTask(id)
      .then(setDirty(true))
      .catch((err) => console.log(err));
  };

  const doLogIn = (username, password) => {
    API.logIn(username, password).then(([name, id]) => {
      setUserName(name);
      setUserId(id);
      setLoggedIn(true);
      //setShowAlert(true);
      setLoading(true);
      setDirty(true);
      routerHistory.push('/');
    }).catch((err) => {
      //setShowAlert(true);
      console.log(err);
    });
  };

  const doLogOut = () => {
    API.logOut().then(() => {
      /* setShowAlert(false); */
      setLoggedIn(false);
      setUserName('');
      setUserId('');
      routerHistory.push('/');    
      window.location.reload();
    }).catch((err) => console.log(err));
  };

  return (
    <>
      <NavBar
        loggedIn={loggedIn}
        userName={userName}
      />
      <div>
      <Switch>
          <Route exact path="/">
          {loading ? <span> 🕗 Please wait, loading some memes... 🕗 </span>
           : (
           <DashBoard
              memes={memes}
              setMemes={setMemes}
              routerHistory={routerHistory}
            />)
          }
          </Route>

          <Route exact path="/create">
            {
              loggedIn ? (
                <Generator
                  addMeme={addMeme}
                  routerHistory={routerHistory}
                  userId={userId}
                />
              ) : (
                <LoginForm doLogIn={doLogIn} />
              )
            }
          </Route>

          <Route exact path="/account">
            
            {
              loggedIn ? (
                <AccountInfo
                  userName={userName}
                  doLogOut={doLogOut}
                />
              ) : (
                <LoginForm doLogIn={doLogIn} />
              )
            }
          </Route>

          <Route exact path="/login">
            <LoginForm doLogIn={doLogIn} />
          </Route>
        </Switch>
      </div>
        
    </>
  );
}

export default App;
