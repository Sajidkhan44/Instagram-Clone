
import React, { useState , useEffect } from 'react';
import './App.css';
import Post from './Post';
import { db , auth } from './firebase';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload'
import InstagramEmbed from 'react-instagram-embed';
import {
  FaSistrix,
  FaTelegramPlane,
  FaRegCompass,
  FaRegHeart,
} from "react-icons/fa";
import { MdHome } from "react-icons/md";
import Stories from './Stories'

function getModalStyle() {
  const top = 50 
  const left = 50 

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function App() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [posts, setPosts] =useState([]);
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('') ;
  const [password,setPassword] = useState('');
  const [open,setopen] = useState(false);
  const [openSignIn,setopenSignIn] = useState(false);

  const [user,setUser] = useState(null)


   useEffect(() => {
   const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser){
        //user is loggedin//
        console.log(authUser);
        setUser(authUser)
       
      }else{
        ///user is logged out//
        setUser(null)
      }
    })
    return () => {
      //perform some  clean up//
      unsubscribe()
    }
     },[user, username]);

  useEffect(()=>{
    db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })

  },[]);
  const signUp = (event) =>{
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      authUser.user.updateProfile({
       displayName: username
      })
    })
    .catch((error) => alert(error.message));
  }
  const signIn = (event) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email,password)
    .catch((error) => {
      alert(error.message)
    })
    setopenSignIn(false)

  }

  return (
    

    <div className="App">
      {/* Caption input */}
      {/* post picture */}
      {/*post Button */}
    
      <Modal
        open={open}
        onClose={() => setopen(false)}
       
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app_signup">
          <center>
            <img className="app_headerImg" src="./download.png" alt="hello world"/>
          </center>
            <Input placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}>
            </Input>
              <Input placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}>
            </Input>
            <Input placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}>
              </Input>
            <Button onClick={signUp}>SignUp</Button>
       </form>
        </div>
      </Modal>
      <Modal
        open={openSignIn}
        onClose={() => setopenSignIn(false)}
       
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app_signup">
          <center>
            <img className="app_headerImg" src="./download.png" alt="hello world"/>
          </center>
            <Input placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}>
            </Input >
            <Input placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}>
              </Input>
            <Button type="submit" onClick={signIn}>SignIn</Button>
       </form>
        </div>
      </Modal>
       {/* Header */}
      <div className="app_header">
        <img className="app_headerImg" src="./download.png" alt="hello world"/>
        <div className="navbar">
      <div className="navbar__last">
        <li>
          <MdHome className="navbar__icons" />
        </li>
        <li>
          <FaTelegramPlane className="navbar__icons" />
        </li>
        <li>
          <FaRegCompass className="navbar__icons" />
        </li>
        <li>
          <FaRegHeart className="navbar__icons" />
        </li>
        </div>
        </div>
        {
        user ? (
          <Button onClick={() => auth.signOut()}>Logout</Button>
        ): (
          <div className="app_loginContainer">
          <Button onClick={() => setopenSignIn(true)}>Sign In</Button>
          <Button onClick={() => setopen(true)}>Sign Up</Button>
          </div>
        )}
      </div>
      <Stories />
        <div className="app_posts">
          {posts.map(({id,post}) => (
            <Post key={id} postId={id} user={user}  username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
          )
          )}
         
         <InstagramEmbed
            url='https://www.instagram.com/p/B_uf9dmAGPw/'
            clientAccessToken='123|456'
            maxWidth={320}
            hideCaption={false}
            containerTagName='div'
            protocol=''
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
          
        
        </div>
        
      
       
       {user?.displayName ? (
         <ImageUpload username={user.displayName}/>
      ): (
        <h3> Sorry You Need To Login</h3>
      )}
      

      {/*<Post username="Sajid"  caption="Sun  is far" imageUrl="./download.png"/>*/}
      {/* posts */}

    </div>
  );
}

export default App;
