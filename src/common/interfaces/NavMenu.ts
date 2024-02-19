import NavSubmenu from "./NavSubmenu";


interface NavMenu extends NavSubmenu {
    type: 'page' | 'education';
    tabIndex: number;
    showIfNotLogin: boolean;
}

export default NavMenu;