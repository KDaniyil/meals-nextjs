'use client';
import Link from 'next/link';
import classes from './nav-link.module.css';
import { usePathname } from 'next/navigation';



export default function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
    const pathname = usePathname();
    return (
        <Link href={href} className={ pathname.startsWith(href) ? classes.active : undefined}>{children}</Link>
    )
}