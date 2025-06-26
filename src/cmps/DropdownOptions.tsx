import React from 'react';
import { DropdownItem } from '../types/types';

interface Props {
    handleClose: () => void;
    options: DropdownItem[];
}

export function DropdownOptions({ options = [], handleClose }: Props) {
    const onModalClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    }


    const handleOptionClick = (option: DropdownItem) => {
        if (option.action) {
            option.action();
        }

        handleClose();
    }

    return (
        <div className="dropdown-options-backdrop" onClick={handleClose}>
            <div className="dropdown-options-modal" onClick={onModalClick}>
                <ul className="dropdown-menu">
                    {options.map((option) => (
                        <li
                            key={option.label}
                            className={`dropdown-item ${option.style || ''}`}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}