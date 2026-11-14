import { Link } from "@/ui-kit";
import classes from "./NavLink.module.css";

type NavLinkProps = {
  href: string;
  label: string;
  isActive: boolean;
};

/** Пункт меню в шапке; активный подчёркнут по нижнему краю шапки. */
const NavLink = ({ href, label, isActive }: NavLinkProps) => {
  return (
    <div className={classes.item}>
      <Link href={href} tone={isActive ? "inverse" : "inverseMuted"} fz="lg" fw={600}>
        {label}
      </Link>
      {isActive && <div className={classes.underline} />}
    </div>
  );
};

export default NavLink;
