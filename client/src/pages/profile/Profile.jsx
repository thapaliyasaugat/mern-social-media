import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useState, useEffect } from "react";
import axios from 'axios'
import { useParams } from "react-router-dom";
export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [user, setuser] = useState({})
    const username = useParams().username


    useEffect(() => {
        const fetchUser = async () => {
            // console.log("yes in")
            const res = await axios.get(`/api/user?username=${username}`);
            setuser(res.data)
            // console.log(res.data)
        }
        fetchUser()
    }, [username])
    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img
                                className="profileCoverImg"
                                src={user.profilePicture ? user.coverImg : PF + "person/cover.png"}
                                alt=""
                            />
                            <img
                                className="profileUserImg"
                                src={user.profilePicture ? user.profilePicture : PF + "person/no-Avatar.png"}
                                alt=""
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <span className="profileInfoDesc">{user.desc}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={user.username} />
                        <Rightbar user={user} />
                    </div>
                </div>
            </div>
        </>
    );
}