import "./share.css"
import { AuthContext } from "../../context/AuthContext"

import { PermMedia, Label, Room, EmojiEmotions, RoomOutlined, Cancel } from "@material-ui/icons"
import { useContext, useRef, useState } from "react"
import axios from "axios"

export default function Share() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const { user } = useContext(AuthContext)
    const desc = useRef()
    const [file, setfile] = useState(null)
    const submitHandler = async (e) => {
        e.preventDefault()
        console.log("inside submit handler")
        const newPost = {
            userId: user._id,
            desc: desc.current.value
        }
        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newPost.img = fileName;
            console.log(newPost);
            try {
                await axios.post("/api/upload", data);
            } catch (err) { }
        }
        try {
            await axios.post("/api/posts", newPost);
            window.location.reload();
        } catch (err) { }

    }
    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className="shareProfileImg" src={user.profilePicture ? PF + user.profilePicture : PF + "person/no-Avatar.png"} alt="" />
                    <input placeholder={"What's in your mind " + user.username + "?"}
                        ref={desc}
                        className="shareInput" />
                </div>
                <hr className="shareHr" />
                {file && (
                    <div className="shareImgContainer">
                        <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
                        <Cancel className="shareCancelImg" onClick={() => setfile(null)} />
                    </div>
                )}
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMedia htmlColor="tomato" className="shareIcon" />
                            <span className="shareOptionText">Photo/Video</span>
                            <input type="file"
                                style={{ display: "none" }}
                                id="file"
                                accept=".png,.jpeg,.jpg"
                                onChange={(e) => setfile(e.target.files[0])} />
                        </label>
                        <div className="shareOption">
                            <Label htmlColor="blue" className="shareIcon" />
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor="green" className="shareIcon" />
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
                            <span className="shareOptionText">Fellings</span>
                        </div>
                    </div>
                    <button className="shareButton" type="submit">share</button>
                </form>
            </div>
        </div>
    )
}
