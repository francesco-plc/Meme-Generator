import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';/* 
import { Switch, Route, useHistory } from 'react-router-dom'; */
import NavBar from './components/Navbar';
import DashBoard from './components/DashBoard';
import Generator from './components/Generator';
import API from './api/API';

function App() {

  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState('');

  // Rehydrate tasks at mount time
  useEffect(()=>{
    API.loadPublicMemes().then((newM) => {setMemes(newM);});
  }, []);

  // Rehydrate tasks at mount time, and when tasks are updated
  useEffect(() => {
    if (memes.length && dirty) {
      API.loadPublicMemes().then(newM => {
        setMemes(newM);
        setLoading(false);
        setDirty(false);
      });
    }
    console.log(memes);
  }, [memes.length, dirty]);


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
    API.logIn(username, password).then((name) => {
      setUserInfo(name);
      setLoggedIn(true);
      //setShowAlert(true);
      setLoading(true);
      setDirty(true);
      /* routerHistory.push('/'); */
    }).catch((err) => {
      //setShowAlert(true);
      console.log(err);
    });
  };

  const doLogOut = () => {
    API.logOut().then(() => {
      /* setShowAlert(false); */
      setLoggedIn(false);
      setUserInfo('');
    }).catch((err) => console.log(err));
  };
  //const routerHistory = useHistory();

  return (
   <Router>
     <NavBar/>
      <Switch>
        <Route exact path="/">
          <DashBoard
            memes={memes}
            setMemes={setMemes}
          />
        </Route>
        <Route exact path="/create">
          <Generator 
            addMeme={addMeme}
          />
        </Route>
      </Switch>
    </Router> 
  );
}

export default App;
