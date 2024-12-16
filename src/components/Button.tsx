import React from "react";

interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    title?: string;
    type?: "button" | "submit" | "reset";
    color?: string;
    startIcon?: React.ReactNode;

}

const Button: React.FC<ButtonProps> = ({ 
    children,
    className,
    onClick,
    type = "button",
    color = "",
    startIcon,
}) => {
    return (
        <button 
            type={ type }
            onClick={ onClick }
            className={`${className} ${color}`}
        >
            {startIcon && <span className="start-icon">{startIcon}</span>}
            { children }
        </button>
    )
}

export default Button;