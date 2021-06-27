import io from 'socket.io-client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'

const ENDPOINT = "http://localhost:3030";


const Session = (props) => {
    const router = useRouter();
    const userData = router.query;


    if(!userData.sessionId) {
        userData.sessionId = typeof window !== 'undefined' ? window.location.pathname.substring(9): null;

    }

    userData.name = typeof window !== 'undefined' ? localStorage.getItem('session-user-name') : null
   
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        if(userData.name === null) {
            router.push("/join/" + userData.sessionId);
        } else {
            const socket = io.connect(ENDPOINT);
            socket.emit("connect_session", userData);

            socket.on("update_participant_list", (participantList) => {
                setParticipants(participantList);
            });

            socket.on("session_not_available", () => {
                router.push("/join/" + userData.sessionId);
            });

            socket.on('clear_local_storage', () => {
                if(typeof window !== 'undefined')
                  localStorage.clear();
            })
        }
    }, []);

    return (
        <div>
            {
                participants.map((val, idx) => {
                    return <h1 key={idx}>{val}</h1>
                })
            }
        </div>
    );
};

export default Session;