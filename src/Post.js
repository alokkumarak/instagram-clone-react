import React, { useEffect, useState } from 'react';
import './Post.css';
import Avatar  from '@material-ui/core/Avatar';
import { db } from './firebase';
import { Button } from '@material-ui/core';
import { NearMeOutlined } from '@material-ui/icons';
import firebase from 'firebase';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import BorderColorRoundedIcon from '@material-ui/icons/BorderColorRounded';
import BookmarkBorderRoundedIcon from '@material-ui/icons/BookmarkBorderRounded';




function Post({postId,user,imageUrl,username,caption}) {
    const [comments,setComments]=useState([]);
    const [comment,setComment]=useState('');

    useEffect(()=>{
      let unsubscribe;
      if(postId){
          unsubscribe=db
                        .collection("posts")
                        .doc(postId)
                        .collection("comments")
                        .orderBy('timestamp','desc')
                        .onSnapshot((snapshot)=>{
                            setComments(snapshot.docs.map((doc)=>doc.data()));
                        });
      }
      return()=>{
          unsubscribe();
      };
    },[postId]);

    const postComment=(e)=>{
       e.preventDefault();

       db.collection("posts").doc(postId).collection("comments").add({
           text:comment,
           username:user.displayName,
           timestamp:firebase.firestore.FieldValue.serverTimestamp()
       })
       setComment('');
    }


    return (
        <div className="post">
            {/* avatar & username */}
            <div className="post__header">
                <Avatar 
                  className="post__avatar" 
                  src="/static/images/avatar/1.jpg" 
                  alt={username} />
            <h3 >{username}</h3>
            </div>

            
            <img className="post__image" src={imageUrl} alt="react-js"/>
            {/* image */}
               {/* icons of instagrams */}
               <div className="post__icons">
                   <div>
                   <button className="post_iconButton"><FavoriteBorderOutlinedIcon /></button>
                    <button className="post_iconButton"><BorderColorRoundedIcon/></button>
                    
                    <button className="post_iconButton"><NearMeOutlined/></button>
                    </div>
                    <div>
                    <button className="post__saveButton"><BookmarkBorderRoundedIcon /></button>
                    </div>
               </div>

            {/* username->caption */}
            <h4 className="post__text"><strong>{username}</strong> ::<strong>::</strong> {caption}</h4>
              
               {/* display all the comments from firebase  */}
                   <div className="post__comments">
                       {comments.map((comment)=>(
                           <p><strong>{comment.username}</strong> ::- {comment.text}</p>
                       ))}

                   </div>
               
            
             {user && (
                <form className="post__commentBox">
                    
                <input
                   className="post__input"
                   type="text"
                   color="white"
                   placeholder="Add some Comment..."
                   value={comment}
                   onChange={(e)=>setComment(e.target.value)}
                />
               <Button
               
                disabled={!comment}
                className="post__button"
                type="submit"
                onClick={postComment}
               ><NearMeOutlined/></Button>

            </form>
             )}
            

        </div>
    )
}

export default Post
