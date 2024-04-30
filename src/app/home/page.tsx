import React from 'react';

interface HomeProps {
    // Add any props you need here
}

const Home: React.FC<HomeProps> = () => {
    return (
        <div>
            <h1>Home</h1>
            <p>Welcome to the home page</p>
        </div>
    );
};

export default Home;