'use client';

import Image from "next/image";
import prisma from '@/lib/prisma';
import styles from "../app/page.module.css";
// import styles from "./Nav.module.css";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Nav() {
    const { data: session, status } = useSession();
    if(status === 'authenticated') {
        console.log('authenticated as: ', session.user?.name);
    }

    return(
        <header className={styles.header}>
            <Link href={'/'}>
                <Image
                    className={styles.logo}
                    src="/uncinc.svg"
                    alt="Unc Inc logo"
                    width={100}
                    height={20}
                    priority
                />
            </Link>
            
            <nav className={styles.nav}>
                <Link href={'/'} className={`${styles.navLink}`}>Articles</Link>
                
                <div className={styles.userNav}>
                    {status === 'loading' && (
                        <span>Loading...</span>
                    )}

                    {status === 'unauthenticated' && (
                        <div className={styles.userMenu}>
                            {/* Login */}
                            <Link href={'/login'} className={`${styles.btn} ${styles.btnSecondary}`}>Login</Link>
                            {/* Signup */}
                            <Link href={'/signup'} className={`${styles.btn} ${styles.btnPrimary}`}>Sign Up</Link>
                        </div>
                    )}

                    {status === 'authenticated' && (
                        <>
                            <button>Hi, {session.user?.name}</button>
                            <div className={styles.dropdownMenu}>
                                <ul>
                                    <li><Link href={'/new'} className={`${styles.dropdownMenuLink}`}>Create Article</Link></li>
                                    <li>
                                        <button onClick={() => signOut() }>Logout</button>
                                    </li>
                                </ul>
                            </div>
                        </>
                    )}
                </div>
            </nav>
        </header>
    )
}