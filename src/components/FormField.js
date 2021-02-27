import * as React from 'react';

export const FormField = ({name,type,formErrors,handleChange,...props}) => {

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div className={name}>
            <label htmlFor={name}>{capitalizeFirstLetter(name)}</label>
            <input
                type={type}
                name={name}
                onChange={handleChange}
                spellCheck={false}
                placeholder={capitalizeFirstLetter(name)}
                {...props}
            />
            {formErrors[name] && <span>{formErrors[name]}</span>}
        </div>
    );
};