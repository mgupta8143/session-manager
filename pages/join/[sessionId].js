import { useState } from 'react'
import { useRouter } from 'next/router'
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

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
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