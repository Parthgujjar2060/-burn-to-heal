'use client';
import React, { useEffect, useState } from 'react';
import { ref, get, set } from 'firebase/database';
import { database } from '@/app/DbSetUp/firebase';

interface HomeData {
    icon: string;
    image: string;
    name: string;
}

const Home: React.FC = () => {
    const [homeData, setHomeData] = useState<HomeData | null>(null);

    useEffect(() => {
        const homeRef = ref(database, 'home');

        get(homeRef).then((snapshot) => {

            if (snapshot.exists()) {
                setHomeData(snapshot.val());
            }
            else {
                console.log("No data available");
            }

        }).catch((error) => {
            console.error("Error fetching data: ", error);
        });
    }, [])


    return (
        <div className="bg-[#081B29]">
            <h1>Home page main</h1>
            <div>
                {homeData && (
                    <div>
                        <img className='w-44 h-48' src={homeData.image} alt="name is empty" />
                        <h2>{homeData.name}</h2>
                        <img src={homeData.icon} alt="name is empty" />

                    </div>  

                )}
            </div>

        </div>
    );
};

export default Home;
