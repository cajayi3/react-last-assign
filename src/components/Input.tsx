import React from 'react'

interface InputProps {
    name: string;
    placeholder: string;    
    autoComplete?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    required?: boolean;
    value:string;
}

const Input: React.FC<InputProps> = ({
    autoComplete,
    value,
    onChange,
    name,
    placeholder,
    type = 'text',
    required = false,
}) => {
    return (
    <input
    autoComplete={autoComplete}
    value={value}
    onChange={onChange}
    name={name}
    placeholder={placeholder}
    type={type}
    required={required}
    className=""
    />
  ); 
};
   

export default Input;