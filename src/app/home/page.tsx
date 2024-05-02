'use client';
import React, { useEffect, useState } from 'react';
import { db } from '@/app/DbSetUp/firebase';
import HomeModels from '@/models/homeModels';

const Home: React.FC = () => {
    const [homeData, setHomeData] = useState<HomeModels[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const snapshot = await db.collection('Home').get();
                const data = snapshot.docs.map(doc => doc.data() as HomeModels);
                setHomeData(data);
            } catch (error) {
                console.log("Error fetching data: ", error);
            }
        };
        fetchData();

        return () => {
            // Cleanup function if needed
        };
    }, []);

    return (
        <div>
            <h1>Home</h1>
            {homeData.map(item => (
                <div key={item.name}>
                    <h2>My name is: {item.name}</h2>
                    <img src={item.photo} alt="This is my photo" />
                    <img src={item.icon} alt="This is my icon" />
                    <p>Welcome to the home page</p>
                </div>
            ))}
        </div>
    );
};

export default Home;
