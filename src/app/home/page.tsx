'use client';
import React, { useEffect, useState } from 'react';
import { ref, get } from 'firebase/database';
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
        <div className="flex items-center justify-center h-screen">
            <div className='grid grid-cols-1 gap-4'>
                <h2 className="text-white font-serif">Hello, I am Parth Called</h2>
                <h1 className="text-4xl text-white font-bold p-1">Arjun</h1>
                <p className="flex space-x-1 overflow-hidden animate-pulse">
                    {Array.from("a Full Stack Developer").map((char, i) => (
                        <span
                            className={`text-blue-500 animate-reveal delay-${i * 3} text-5xl m-2`}
                        >{char}
                        </span>
                    ))}
                </p>
            </div>

            <style>{`
                @keyframes reveal {
                    0% {
                        opacity: 0;
                        transform: translateY(100%);
                    }
                    50% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(-100%);
                    }
                }

                .animate-reveal {
                    animation: reveal 3s infinite;
                }
            `}</style>

            <div>
                {homeData && (
                    <div>
                        <img className='w-44 h-48 ' src={homeData.image} alt="name is empty" />
                    </div>
                )}
            </div>

        </div>
    );

    
};

export default Home;
