import React from 'react';

interface ContactProps {
    // Add any props you need for the Contact component
}

const Contact: React.FC<ContactProps> = () => {
    return (
        <div>
            <h1>Contact</h1>
            <p>Welcome to the contact page</p>
        </div>
    );
};

export default Contact;