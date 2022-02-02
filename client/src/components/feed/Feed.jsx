import { useContext, useEffect, useState } from "react";
import Post from "../post/Post"
import Share from "../share/Share"
import "./feed.css"
import axios from "axios"
import { AuthContext } from "../../context/AuthContext"
// import { Posts } from "../../dummyData"
export default function Feed({ username }) {
    const [posts, setposts] = useState([]);
    const { user } = useContext(AuthContext)

    useEffect(() => {
        const fetchPosts = async () => {
            // console.log(username ? username : "not from profile")

            const res = !username ?
                await axios.get("api/posts/timeline/" + user._id) :
                await axios.get("/api/posts/profile/" + username);
            setposts(res.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt)
            }))
            // console.log(res)


        }

        fetchPosts()

    }, [username, user._id])
    // console.log("check = " + username)
    // console.log("check = " + user.username)
    return (
        <div className="feed">
            <div className="feedWrapper">
                {(username === user.username) ? <Share /> : !username ? <Share /> : null}
                {posts.map(p => (
                    <Post key={p._id} post={p} />
                ))}



            </div>
        </div>
    )
}

