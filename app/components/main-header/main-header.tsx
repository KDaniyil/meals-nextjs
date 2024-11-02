import Link from "next/link";
import logoImage from "@/assets/logo.png";
import Image from "next/image";
import classes from "./main-header.module.css";
import MainHeaderBackground from "./main-header-background";
import NavLink from "./nav-link";

export default function MainHeader() {
  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
    <Link href="/" className={classes.logo}>
        <Image src={logoImage.src} alt="NextLevel Food Logo" width={50} height={50} priority />
        NextLevel Food
    </Link>
    <nav className={classes.nav}>
        <ul>
            <li>
                <NavLink href="/meals">Browse Meals</NavLink>
            </li>
            <li>
                <NavLink href="/community">Foodies Community</NavLink>
            </li>
        </ul>
        </nav>
      </header>
    </>
  )
}
