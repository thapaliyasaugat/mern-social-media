// import "./post.css"
// import { useState, useEffect } from 'react'
// import { Link } from "react-router-dom";
// import { MoreVert } from "@material-ui/icons"
// // import { Users } from "../../dummyData"
// import { format } from 'timeago.js';
// import { AuthContext } from "../../context/AuthContext"

// import { useContext } from "react";
// import axios from "axios"

// export default function Post({ post }) {
//     const [like, setlike] = useState(post.likes.length)
//     const [isliked, setisliked] = useState(false)
//     const [user, setuser] = useState({})
//     const { user: currentUser } = useContext(AuthContext)

//     useEffect(() => {
//         setisliked(post.likes.includes(currentUser._id))
//         console.log(post)
//         console.log(isliked)
//     }, [currentUser._id, post.likes])


//     const PF = process.env.REACT_APP_PUBLIC_FOLDER
//     useEffect(() => {
//         const fetchUser = async () => {

//             const res = await axios.get(`/api/user?userId=${post.userId}`);

//             setuser(res.data)
//             // console.log(res.data)


//         }

//         fetchUser()

//     }, [post.userId]);
//     const likeHandler = () => {
//         try {
//             axios.put(`/api/posts/${post._id}/like`, { userId: currentUser._id })
//             // window.location.reload()
//         } catch (error) {
//             setlike(isliked ? like - 1 : like + 1)
//             setisliked(!isliked)
//         }

//     }
//     return (
//         <div className="post">
//             <div className="postWrapper">
//                 <div className="postTop">
//                     <div className="postTopLeft">
//                         <Link to={`profile/${user.username}`}>
//                             <img className="postProfileImg"
//                                 src={user.profilePicture ? PF + user.profilePicture : PF + "person/no-Avatar.png"} alt="" />
//                         </Link>
//                         <span className="postUserName">
//                             {user.username}
//                         </span>
//                         <span className="postDate">
//                             {format(post.createdAt)}
//                         </span>
//                     </div>
//                     <div className="postTopRight">
//                         <MoreVert />
//                     </div>
//                 </div>
//                 <div className="postCenter">
//                     <span className="postText">
//                         {post?.desc}
//                     </span>
//                     <img className="postImg" src={PF + post.img} alt="" />
//                 </div>
//                 <div className="postBottom">
//                     <div className="postBottomLeft">
//                         <img className="likeIcon" onClick={likeHandler} src={`${PF}like.png`} alt="" />
//                         <img className="likeIcon" onClick={likeHandler} src={`${PF}heart.png`} alt="" />
//                         <span className="likeCounter">{like} people like it.</span>
//                     </div>
//                     <div className="postBottomRight">
//                         <span className="postCommentText">{post.comment} comments</span>
//                     </div>
//                 </div>
//             </div>
//         </div >
//     )
// }

import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user: currentUser } = useContext(AuthContext);
    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id));
    }, [currentUser._id, post.likes]);

    useEffect(() => {
        const fetchUser = async () => {
            // console.log(post)
            const res = await axios.get(`/api/user?userId=${post.userId}`);
            // const res = await axios.get(`/api/users?userId=${post.userId}`);
            // console.log(res.data)
            setUser(res.data);
        };
        fetchUser();
        // console.log(user)

    }, [post.userId]);

    const likeHandler = () => {
        try {
            axios.put("/api/posts/" + post._id + "/like", { userId: currentUser._id });
        } catch (err) { }
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    };
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user.username}`}>
                            <img
                                className="postProfileImg"
                                src={
                                    user.profilePicture
                                        ? PF + user.profilePicture
                                        : PF + "person/no-avatar.png"
                                }
                                alt=""
                            />
                        </Link>
                        <span className="postUsername">{user.username}</span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img className="postImg" src={PF + post.img} alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img
                            className="likeIcon"
                            src={`${PF}like.png`}
                            onClick={likeHandler}
                            alt=""
                        />
                        <img
                            className="likeIcon"
                            src={`${PF}heart.png`}
                            onClick={likeHandler}
                            alt=""
                        />
                        <span className="postLikeCounter">{like} people like it</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
    );
}