import React from 'react';
import '../component/avocationComp.css';

interface AvocationCompProps {
    avocation: string;
    description?: string;
    icon?: React.ReactNode;
}

const AvocationComp: React.FC<AvocationCompProps> = ({ avocation, description, icon }) => {
    return (
        <div className='avocationBox'>
            <div className='header'>
                {icon && <div className="icon">{icon}</div>}
                <h3>{avocation}</h3>
            </div>
            <div className='description'>
                {description && <p>{description}</p>}
            </div>
        </div>
    );
};

export default AvocationComp;
