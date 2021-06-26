import { useState } from 'react'
import { useRouter } from 'next/router'
const axios = require('axios');
import styles from "../../styles/Join.module.scss";

const Join = (props) => {
    const router = useRouter();
    const { sessionId } = router.query;

    const [formData, setFormData] = useState({
        name: "",
        sessionName: ""
    });


    const handleChange = (event) => {
        setFormData(prevForm => ({
            ...prevForm,
            [event.target.name]: event.target.value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3030/create-session', {
                ...formData,
                sessionId: sessionId
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
                  value={formData.name}
                  onChange={handleChange}
                />
                <label>Session Name</label>
                <input 
                  name="sessionName"
                  type="text"
                  value={formData.sessionName}
                  onChange={handleChange}
                />
                <input type="submit" value="Submit"/>
            </form>
        </div>
    );
}

export default Join;