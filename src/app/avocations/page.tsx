'use client';
import React, { useEffect, useState } from 'react';
import AvocationComp from "../component/avocationComp";
import { ref, get } from 'firebase/database';
import { database } from '@/app/DbSetUp/firebase';

const Avocations: React.FC = () => {

    interface AvocationData {
        description: string;
        image: string; // Assuming image is a URL string
    }

    const [avocationData, setAvocationData] = useState<{ [key: string]: AvocationData } | null>(null);

    useEffect(() => {
        const avocationRef = ref(database, 'avocation');

        get(avocationRef).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                setAvocationData(data);
                console.log(data);
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error("Error fetching data: ", error);
        });

    }, []);

    return (
        <div>
            <h1>Welcome to Avocations boolating</h1>
            <h3>Here you will find my hobbies</h3>

            <div>
                {avocationData && avocationData["volleyball"]?.image ? (
                    <img src={avocationData["volleyball"].image} alt="Volleyball" />
                ) : (
                    "No image available"
                )}
                {avocationData && avocationData["Gaming"]?.image ? (
                    <img src={avocationData["Gaming"].image} alt="Gaming" />
                ) : (
                    "No image available"
                )}
                {avocationData && avocationData["Food"]?.image ? (
                    <img src={avocationData["Food"].image} alt="Food" />
                ) : (
                    "No image available"
                )}
            </div>
            <div style={{ display: 'grid', gap: '10px' }}>
                {avocationData && (
                    <>
                        <AvocationComp
                            avocation="Volleyball"
                            description={avocationData["volleyball"]?.description || "No description available"}
                        />
                        <AvocationComp
                            avocation="Foddieeeeeee"
                            description={avocationData["foodie"]?.description || "No description available"}
                            icon={<span role="img" aria-label="food">🍔</span>}
                        />
                        <AvocationComp
                            avocation="Gaming"
                            description={avocationData["gaming"]?.description || "No description available"}
                            icon={<span role="img" aria-label="gaming">🎮</span>}
                        />
                    </>
                )}
            </div>
            <div className='scrol'>
                <h3>Roll up to Find More about me</h3>
            </div>
        </div>
    );
};

export default Avocations;
