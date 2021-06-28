import { useState } from 'react'
import { useRouter } from 'next/router'
const axios = require('axios');
import styles from "../../styles/Join.module.scss";

const Join = (props) => {
    const router = useRouter();
    const { sessionId } = router.query;

    const [name, setName] = useState("");


    /**
     * Sets name to form input dynamically
     * @param {any} event 
     */
    const handleChange = (event) => {
        setName(event.target.value);
    };

    /**
     * Creates session, saves name to local storage, and redirects to session page
     * @param {any} event 
     */
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://sessionmanagerbackend.herokuapp.com/create-session', {
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
                <label className={styles.name}>Enter Name</label>
                <input 
                  className={styles.input}
                  name="name"
                  type="text"
                  value={name}
                  onChange={handleChange}
                  required
                />
                <input type="submit" value="Join Session" className={styles.submit}/>
            </form>
        </div>
    );
}

export default Join;