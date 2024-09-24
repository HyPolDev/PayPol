interface NavMenuProps {
    title: string;
    classProps?: string;
}

const NavMenu: React.FC<NavMenuProps> = ({ title, classProps }) => {
    return (
        <li className={`mx-4 cursor-pointer ${classProps}`}>
            {title}
        </li>
    );
}

export default NavMenu;