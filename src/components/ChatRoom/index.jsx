import { Link, useParams } from 'react-router-dom';
import { chatRooms } from '../../data/chatRooms';
import { MessageInput } from '../MessageInput';
import { MessageList } from '../MessageList';
import { NavBar } from '../NavBar/index';
import './styles.css';
import '../NavBar/index'

function ChatRoom() {
    const params = useParams();

    const room = chatRooms.find((x) => x.id === params.id);
    if (!room) {
        // TODO: 404
    }

    return (
        <>
            <NavBar 
                chatName={room.title}
                backBtn={
                    <Link to="/">
                        <div className="back-container">
                            <span className="material-icons">arrow_back_ios</span>
                            Back
                        </div>
                    </Link>
                }
            />

            <div className="messages-container">
                <MessageList roomId={room.id} />
                <MessageInput roomId={room.id} />
            </div>
        </>
    );
}



export { ChatRoom };