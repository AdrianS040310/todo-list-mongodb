import Link from "next/link";
import styles from './navbar.module.css';
import Image from 'next/image';

const Navbar = () => {

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
                <li>
                    <Link href="/login">Iniciar Sesión</Link>
                </li>
                <li>
                    <Link href="/register">Registrarse</Link>
                </li>
                <li>
                    <Link href="/tasks">Tareas</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
