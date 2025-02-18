import React, {Dispatch, SetStateAction} from "react";
import {GiHamburger, GiSplitCross} from "react-icons/gi";

export type ToggleMenuButtonProps = {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    isOpen: boolean;
};

export const ToggleMenuButton: React.FC<ToggleMenuButtonProps> = ({setIsOpen, isOpen}) => {
    return (
        <button
            aria-expanded="false"
            type="button"
            onClick={() => setIsOpen((prevState) => !prevState)}
            data-testid="navbar-toggle-button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-lightGreen hover:text-lightViolet rounded-lg md:hidden"
        >
            <span className="sr-only">Open main menu</span>
            {isOpen ? <GiSplitCross size={30}/> : <GiHamburger size={30}/>}
        </button>
    );
};