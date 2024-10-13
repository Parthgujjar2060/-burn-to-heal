import React from 'react';
import '../component/avocationComp.css';

interface AvocationCompProps {
    avocation: string;
    description?: string;
    icon?: React.ReactNode;
}

const AvocationComp: React.FC<AvocationCompProps> = ({ avocation, description, icon }) => {
    return (
        <div className='avocationBox' style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', maxWidth: '400px', height: '39vh' }}>
            <div  className='header' style={{ display: 'flex', alignItems: 'center' }}>
                {icon && <div style={{ marginRight: '12px' }}>{icon}</div>}
                <h3 style={{ margin: 0 }}>{avocation}</h3>
            </div>
            <div className='description'>
            {description && <p style={{ marginTop: '8px', color: '#555' }}>{description}</p>}
            </div>
        </div>
    );
};

export default AvocationComp;