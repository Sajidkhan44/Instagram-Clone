import React,{ useState, useEffect } from 'react'
import Avatar from "@material-ui/core/Avatar"
import "./Post.css"
import { db, auth } from './firebase';
import firebase from 'firebase';
import {
    FaSistrix,
    FaTelegramPlane,
    FaRegCompass,
    FaRegHeart,
  } from "react-icons/fa";
  import { MdHome } from "react-icons/md";


function Post({ username, postId,user,imageUrl, caption}) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState([]);

    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .orderBy('timestamp', 'asc')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()));
                })
        }

        return () => {
            unsubscribe();
        };
    }, [postId]);

    const postComment = (event) => {
        event.preventDefault();
        db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment('');
            
    }
    return (
        <div className="post">
            <div className="post_header">
                {/* header --avatar +username*/} 
                <Avatar
                 className="post-avatar" 
                 alt='Sajid'
                 src="{username} " 
                />
                <h3>{username}</h3>
           </div>
            
           {/*image*/}
           <img className="post_image" src={imageUrl} alt="" />
            <span><FaRegHeart className="Image__icons" /></span>
            <span><FaRegCompass className="Image__icons" /></span>
            <span><FaTelegramPlane className="Image__icons"/></span>
           <h3 className="post_text"><strong>{username}  </strong>{caption}</h3>
           {/*username +caption*/}

          
           <div className="post__comments">
                {comments.map((comment) => (
                        <p>
                           
                                <strong >
                                    {comment.username}: 
                                </strong> {comment.text}
                           
                            
                        </p>
                ))}
            </div>


                {user && ( // Only display this comment form input if the user has logged in
                    <form className="post_commentBox">
                        <input
                            className="post_input"
                            type="text"
                            placeholder="Add a comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}>
                         </input>

                        <button
                            className="post_button"
                            disable={!comment}
                            type="submit"
                            onClick={postComment}
                        >
                          Comment
                        </button>
                    </form>
                )}




        </div>




    )
}

export default Post
