import React from 'react';
import AvocationComp from "../component/avocationComp"

const Avocations: React.FC = () => {
    return (
        <div>
            <h1>Avocations</h1>
            <p>Welcome to the avocations page</p>
            
            <div style={{ display: 'flex', gap: '16px' }}>
                <AvocationComp 
                    avocation="Volley ball" 
                    description="Exploring different genres and expanding knowledge." 
                    icon={<span role="img" aria-label="books">📚</span>} 
                />
                <AvocationComp 
                    avocation="Foddieeeeeee" 
                    description="Discovering new places and cultures." 
                    icon={<span role="img" aria-label="travel">✈️</span>} 
                />
                <AvocationComp 
                    avocation="Gaming" 
                    description="Capturing moments through the lens." 
                    icon={<span role="img" aria-label="camera">📷</span>} 
                />
            </div>
        </div>
    );
};

export default Avocations;
