import React from 'react';

interface AvocationCompProps {
    avocation: string;
    description?: string;
    icon?: React.ReactNode;
}

const AvocationComp: React.FC<AvocationCompProps> = ({ avocation, description, icon }) => {
    return (
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '16px', maxWidth: '300px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {icon && <div style={{ marginRight: '12px' }}>{icon}</div>}
                <h3 style={{ margin: 0 }}>{avocation}</h3>
            </div>
            {description && <p style={{ marginTop: '8px', color: '#555' }}>{description}</p>}
        </div>
    );
};

export default AvocationComp;