import { useState } from 'react'
import { useRouter } from 'next/router'
const axios = require('axios');
import styles from "../../styles/Join.module.scss";

const Join = (props) => {
    const router = useRouter();
    const { sessionId } = router.query;

    const [name, setName] = useState("");

    const handleChange = (event) => {
        setName(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3030/create-session', {
                name: name,
                sessionId: sessionId
            });
            if (typeof window !== "undefined") localStorage.setItem("session-user-name", name);
            router.push({
                pathname: "/session/" + sessionId,
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles.joinContainer}>
            <form className={styles.formContainer} onSubmit={handleSubmit}>
                <label>Name</label>
                <input 
                  name="name"
                  type="text"
                  value={name}
                  onChange={handleChange}
                />
                <input type="submit" value="Submit"/>
            </form>
        </div>
    );
}

export default Join;