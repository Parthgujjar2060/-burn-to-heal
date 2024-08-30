'use client';
import React, { useEffect, useState } from 'react';
import AvocationComp from "../component/avocationComp";
import { ref, get } from 'firebase/database';
import { database } from '@/app/DbSetUp/firebase';
import '../avocations/avocation.css';

const Avocations: React.FC = () => {

    interface AvocationData {
        description: string;
        image: string;
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
            <h1>Welcome to Avocations</h1>
            <h3>Here you will find my hobbies</h3>
            <div className='grid grid-cols-3 gap-4' style={{ gridTemplateColumns: '40% 40% 10%' }}>
                <div className='single-image-container'>
                    {avocationData && avocationData["volleyball"]?.image && (
                        <img src={avocationData["volleyball"].image} alt="Volleyball" className="avocation-image" />
                    )}
                </div>
                <div className='info-container'>
                    {avocationData && (
                        <>
                            <div className='avocation-wrapper'>
                                <span className='shining-line'></span>
                                <AvocationComp
                                    avocation="Volleyball"
                                    description={avocationData["volleyball"]?.description || "No description available"}
                                />
                            </div>
                            <div className='avocation-wrapper'>
                                <span className='shining-line'></span>
                                <AvocationComp
                                    avocation="Foodie"
                                    description={avocationData["Food"]?.description || "No description available"}
                                />
                            </div>
                            <div className='avocation-wrapper'>
                                <span className='shining-line'></span>
                                <AvocationComp
                                    avocation="Gaming"
                                    description={avocationData["Gaming"]?.description || "No description available"}
                                />
                            </div>
                        </>
                    )}
                </div>
                <div className='scrol'>
                    <h3>Roll up to Find More about me</h3>
                </div>
            </div>
        </div>
    );
};

export default Avocations;