'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import instance from '@/utils/axios';

export default function RegisterPage() {
    const Router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log(formData);
        try {
            const response = await instance.post("/v1/users/", formData);
            // console.log(response.data);
            alert(response.data);
            setFormData({
                name: '',
                email: '',
                password: ''
            });
        } catch (error) {
            // console.log("Error al registrar al usuario: ", error);
        }

    };

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            Router.push('/tasks');
        }
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.mainContainer}>
                <h1 className={styles.title}>Registrarse</h1>
                <form onSubmit={handleSubmit} className={styles.formContainer}>
                    <div className={styles.content}>
                        <label className={styles.label} htmlFor="name">Nombre:</label>
                        <input className={styles.input} type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                        <label className={styles.label} htmlFor="email">Correo electrónico:</label>
                        <input className={styles.input} type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                        <label className={styles.label} htmlFor="password">Contraseña:</label>
                        <input className={styles.input} type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <button className={styles.btnSubmit} type="submit">Registrarse</button>
                </form>
            </div>
        </div >
    );
}
