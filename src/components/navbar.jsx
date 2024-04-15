'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from './navbar.module.css';
import Image from 'next/image';
import { useEffect, useState } from "react";

const Navbar = () => {
    const router = useRouter();
    const [loggedIn, setLoggedIn] = useState(false);

    // Función para cerrar sesión
    const handleLogout = () => {
        localStorage.removeItem('user');
        setLoggedIn(false);
        router.push('/');
    };

    // Verificar si el usuario ha iniciado sesión
    const isLoggedIn = () => {
        const user = localStorage.getItem('user');
        return user !== null;
    };

    // Verificar si el usuario ha iniciado sesión al cargar el componente
    useEffect(() => {
        setLoggedIn(isLoggedIn());
    }, []);

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Image
                    width={50}
                    height={50}
                    src="/images/tasks.png"
                    alt="Book"
                />
                <div className={styles.logoText}>
                    <span>TodoList</span>
                </div>
            </div>

            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                {loggedIn ? (
                    <>
                        <li>
                            <Link href="/tasks">Tareas</Link>
                        </li>
                        <li>
                            <button onClick={handleLogout}>Cerrar Sesión</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link href="/login">Iniciar Sesión</Link>
                        </li>
                        <li>
                            <Link href="/register">Registrarse</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
