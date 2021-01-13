import React, { useEffect, useState } from 'react';
import './App.css';
import Post from './Post';
import {db,auth} from './firebase';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';
import Avatar  from '@material-ui/core/Avatar';


//styling of modal
function getModalStyle(){
  const top=50;
  const left=50;

  return{
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}


const useStyles=makeStyles((theme)=>({
  paper:{
    position:'absolute',
    width:300,
    objectFit:'contain',
    backgroundColor:theme.palette.background.paper,
    border:'2px solid lightgray',
    boxShadow:theme.shadows[5],
    padding:theme.spacing(5,8,6),
  },
}));




function App() {
  const classes=useStyles();
  const [modalStyle]=React.useState(getModalStyle);
  const [posts,setPosts]=useState([]);
  const [open,setOpen]=useState(false);
  const [openSignIn,setOpenSignIn]=useState(false);
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const [email,setEmail]=useState('');
  const [user,setUser]=useState(null);

  //this usestate will create a user
  useEffect(()=>{
    const unsubscribe= auth.onAuthStateChanged((authUser)=>{
       if(authUser){
         //means user has logged in...
         console.log(authUser);
         setUser(authUser);

        //  if(authUser.displayName){
        //    //don't update username..
        //  }else{
        //    //if there is a new user then create that user
        //    return authUser.updateProfile({
        //      displayName: username,

        //    });
        //  }

       }else{
         //user has logged out....
         setUser(null)
       }
     })
     return ()=>{
       unsubscribe();
     }
  },[user,username]);
   
  useEffect(()=>{
   db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot=>{
     setPosts(snapshot.docs.map(doc=>({id:doc.id,post: doc.data()})));
   })
   //every time when a post is added,  this code fire

  },[]);

  // {
  //   username:"alok kumar",
  //   caption:"wow it works",
  //   imageUrl:"https://th.bing.com/th/id/OIP.-BpvNzwkSx9w9LdAK1qzcgHaGo?pid=Api&rs=1"
  // },
  // {
  //   username:"nitish",
  //   caption:"amazing dude",
  //   imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Hopetoun_falls.jpg/1200px-Hopetoun_falls.jpg"
  
  // },
  // {
  //   username:"aaradhana",
  //   caption:"you did it",
  //   imageUrl:"http://beautifulcoolwallpapers.files.wordpress.com/2011/08/naturewallpaper.jpg"
  
  // },
  // {
  //   username:"aman raj",
  //   caption:"why it works",
  //   imageUrl:"http://beautifulcoolwallpapers.files.wordpress.com/2011/07/naturewallpaper.jpg"
  
  // }

  //it will handle signUp
  const signUp=(e)=>{
    e.preventDefault();

    auth.createUserWithEmailAndPassword(email,password)
    .then((authUser)=>{
       return authUser.user.updateProfile({
        displayName:username,
      })
    })
    .catch((error)=>alert(error.message));

    setPassword('');
    setEmail('');
  }
  
  //handle sign in
  const signIn=(e)=>{
    e.preventDefault();

    auth.signInWithEmailAndPassword(email,password)
        .catch((error)=>alert(error.message))

    setOpenSignIn(false); 
    setPassword('');
    setEmail('');   

  }
  
  return (
    <div className="app">
      
              

  


        {/* modal for sign up */}
        
        <Modal open={open} onClose={()=>setOpen(false)}>
          <div style={modalStyle} className={classes.paper}>
            <form className="app__signup">
                <center>
                   <img
                   className="app__headerImage"
                    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                   alt=""
                    />
                </center>
                    <Input 
                       placeholder="Username"
                       type="text"
                       value={username}
                       onChange={(e)=>setUsername(e.target.value)}
                    />
                    <Input 
                       placeholder="Email"
                       type="text"
                       value={email}
                       onChange={(e)=>setEmail(e.target.value)}
                    />
                    <Input
                         placeholder="Password"
                         type="password"
                         value={password}
                         onChange={(e)=>setPassword(e.target.value)}
                    />
                    <Button type="submit" onClick={signUp}><p style={{color:"black"}}>Sign Up</p></Button>
                </form>   
           </div>

        </Modal>
        

        <Modal open={openSignIn} onClose={()=>setOpenSignIn(false)}>
          <div style={modalStyle} className={classes.paper}>
            <form className="app__signup">
                <center>
                   <img
                   className="app__headerImage"
                    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                   alt=""
                    />
                </center>
                    
                    <Input 
                       placeholder="Email"
                       type="text"
                       value={email}
                       onChange={(e)=>setEmail(e.target.value)}
                    />
                    <Input
                         placeholder="Password"
                         type="password"
                         value={password}
                         onChange={(e)=>setPassword(e.target.value)}
                    />
                    <Button  type="submit" onClick={signIn}><p style={{color:"black"}}>Sign In</p></Button>
                </form>   
           </div>

        </Modal>

       
      

        {/* header */}
          <div className="app__header">
               <div className="app__headerImage">Instagram</div>
             {/* <img
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
              /> */}


              {/* login or signUp Button handle through model */}
              
            
          {user ?(
            <div className="app__loginContainer">
             {/* <button className="app__button" >upload</button>  */}
             <Avatar 
                  className="app__avatar" 
                  src="/static/images/avatar/1.jpg" 
                  alt={user.user} /> 
             <button className="app__button" onClick={()=>auth.signOut()}>LogOut</button>
             
             </div>
          ): (
            <div className="app__loginContainer">
               <button className="app__button" onClick={()=>setOpenSignIn(true)}>Sign In</button>
               <button className="app__button" onClick={()=>setOpen(true)}>Sign Up</button>
            </div>
          
          )}

          </div>

            {/* component for upload images and caption */}
       {user?.displayName?(
         <ImageUpload username={user.displayName} />
       ):(
         <h3>sorry you need to login first to upload anything</h3>
       )}
       

          {/* post */}
             
             <div className="app__posts">
                   
             {posts.map(({id,post})=>(
                  <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
              ))}
             </div>

        


       

       

        {/* <Post username="alok kumar" caption="wow its works" imageUrl="https://th.bing.com/th/id/OIP.-BpvNzwkSx9w9LdAK1qzcgHaGo?pid=Api&rs=1" />
        <Post username="aman raj" caption="why it works" imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Hopetoun_falls.jpg/1200px-Hopetoun_falls.jpg"/>
        <Post username="aaradhana" caption="you did it" imageUrl="http://beautifulcoolwallpapers.files.wordpress.com/2011/08/naturewallpaper.jpg"/>
        <Post username="nitish" caption="amazing dude" imageUrl="http://beautifulcoolwallpapers.files.wordpress.com/2011/07/naturewallpaper.jpg"/>
      */}
        {/* post */}

    </div>
  );
}

export default App;
