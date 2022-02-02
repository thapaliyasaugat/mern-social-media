import "./closeFriend.css"

export default function CloseFriend({ friend }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    return (
        <li className="sidebarFriend">
            <img className="sidebarFriendImg" src={PF + friend.profilePicture} alt="" />
            <span className="sidebarFriendName">{friend.username}</span>
        </li>
    )
}
