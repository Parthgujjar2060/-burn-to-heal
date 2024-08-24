import React from 'react';
import AvocationComp from "../component/avocationComp";

const Avocations: React.FC = () => {
    return (
        <div>

            <h1>Welcome to Avocations boolating</h1>
            <h3>Here you will find my hobbies</h3>

            <div style={{ display: 'grid', gap: '10px' }}>
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
