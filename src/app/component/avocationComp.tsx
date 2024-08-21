import React from 'react';

interface AvocationCompProps {
    avocation: string;
}

const AvocationComp: React.FC<AvocationCompProps> = ({ avocation }) => {
    return (
        <div>
            <h1>Avocation</h1>
            <p>{avocation}</p>
        </div>
    );
};

export default AvocationComp;