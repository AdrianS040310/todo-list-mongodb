'use client'
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import instance from "@/utils/axios";

export default function LoginPage() {
    const Router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            Router.push('/tasks');
        }
    }, [Router]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await instance.post("/v1/users/login", formData);
            console.log(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
            setFormData({
                email: '',
                password: ''
            });
            Router.push('/tasks');
            window.location.reload();
        } catch (error) {
            console.error('Error de autenticación:', error);
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