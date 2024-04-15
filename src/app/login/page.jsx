'use client'
import React, { useState } from "react";
import styles from './page.module.css';
import instance from "@/utils/axios";
// import { setUser } from "../../../Redux/features/users";
// import { useSelector, useDispatch } from 'react-redux';

export default function LoginPage() {
    // const dispatch = useDispatch();
    // const userData = useSelector(state => state.user.dataUser);
    // const userToken = useSelector(state => state.user.token);

    // console.log("Datos del usuario en Redux:", userData);
    // console.log("Token del usuario en Redux:", userToken);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log(formData);
        try {
            const response = await instance.post("/v1/users/login", formData);
            console.log(response.data);
            dispatch(setUser({ dataUser: response.data }));
            setFormData({
                email: '',
                password: ''
            });
        } catch (error) {
            //console.error('Error de autenticación:', error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.mainContainer}>
                <h1 className={styles.title}>Iniciar sesión</h1>
                <form onSubmit={handleSubmit} className={styles.formContainer}>
                    <div className={styles.content}>
                        <label className={styles.label} htmlFor="email">Correo electrónico:</label>
                        <input className={styles.input} type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                        <label className={styles.label} htmlFor="password">Contraseña:</label>
                        <input className={styles.input} type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <button className={styles.btnSubmit} type="submit">Iniciar sesion</button>
                </form>
            </div>
        </div >
    );
}