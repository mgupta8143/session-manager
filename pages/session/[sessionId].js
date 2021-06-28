import io from 'socket.io-client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import styles from "../../styles/Session.module.scss";

const ENDPOINT = "https://sessionmanagerbackend.herokuapp.com/";


const Session = (props) => {
    const router = useRouter();
    const userData = router.query;

    
    /* If client accesses this path directly, then sessionId will be null in router.query and window.location
    needs to be used */
    if(!userData.sessionId) {
        userData.sessionId = typeof window !== 'undefined' ? 
                             window.location.pathname.substring(9): null;
    }

    // Persisting localstorage name data and taking it for session 
    userData.name = typeof window !== 'undefined' ? 
                    localStorage.getItem('session-user-name') : null
   
    // Participant state 
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        if(userData.name === null) {
            // If there isn't a username in local storage redirect to join 
            router.push("/join/" + userData.sessionId);
        } else {
            const socket = io.connect(ENDPOINT);

            // Connect but passing data because normal on connect can't pass data 
            socket.emit("connect_session", userData);

            // Whenever a new user joins, this will update the participant list 
            socket.on("update_participant_list", (participantList) => {
                setParticipants(participantList);
            });

            // Whenever you try to join a session that hasn't been created, redirects you back to join
            socket.on("session_not_available", () => {
                router.push("/join/" + userData.sessionId);
            });
            
            // Upon disconnect, name will be cleared from local storage
            socket.on('clear_local_storage', () => {
                if(typeof window !== 'undefined')
                  localStorage.clear();
            })
        }
    }, []);

    return (
        <div className={styles.sessionContainer}>
            <h1 className={styles.participantText}>Participants</h1>
            <div className={styles.participantWrapper}>
                {
                    participants.map((val, idx) => {
                        return (
                            <div className={styles.participantBlock} key={idx}>
                                <div className={styles.profileImage}>{val.toUpperCase().charAt(0)}</div>
                                <p className={styles.participantName}>{val}</p>
                            </div>
                        )
                    })
                }
            </div>
            <p className={styles.defaultFont}>{"Invite Link: https://session-manager.vercel.app/join/" + userData.sessionId}</p>
            <p className={styles.defaultFont}>Current User: {userData.name}</p>
        </div>
    );
};

export default Session;