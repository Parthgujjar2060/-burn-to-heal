"use client";
import React, { useEffect, useState } from 'react';
import { ref, get } from 'firebase/database';
import { database } from '@/app/DbSetUp/firebase';
9
interface HomeData {
    logo: string;
    image: string;
    name: string;
    linkdin: string;
    github: string;
    insta: string;
}

const Home: React.FC = () => {
    const [homeData, setHomeData] = useState<HomeData | null>(null);
    const [links, setLinks] = useState<HomeData | null>(null);
    const [logo, setLogo] = useState<HomeData | null>(null);

    useEffect(() => {
        const homeRef = ref(database, 'home');
        const linkRef = ref(database, 'home/links');
        const logoRef = ref(database, 'home/icon');

        get(homeRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    setHomeData(snapshot.val());
                } else {
                    console.log("No home data available");
                }
            })
            .catch((error) => {
                console.error("Error fetching home data: ", error);
            });

        get(linkRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    setLinks(snapshot.val());
                } else {
                    console.log("No links data available");
                }
            })
            .catch((error) => {
                console.error("Error fetching links data: ", error);
            });

        get(logoRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    setLogo(snapshot.val());
                } else {
                    console.log("No logo data available");
                }
            })
            .catch((error) => {
                console.error("Error fetching logo data: ", error);
            });
    }, []);

    return (
        <div className="flex items-center pb-28 h-screen">
            <div className="grid grid-cols-2 gap-4 w-full  ml-10  mr-10">
                <div className='flex flex-col justify-center items-center' style={{ width: '100%', height: '100%' }}>
                    <div className="mr-64">
                        <h2 className="text-white font-serif text-1xl">Hello, I am Parth Called</h2>
                        <h1 className="text-3xl text-white font-bold p-1">Arjun</h1>
                    </div>
                    <div className="flex justify-center m-5">
                        <p className="flex space-x-1 overflow-hidden animate-pulse">
                            {Array.from("a Full Stack Developer").map((char, i) => (
                                <span
                                    key={i}
                                    className={`text-blue-500 animate-reveal delay-${i * 3} text-4xl m-3`}
                                >{char}
                                </span>
                            ))}
                        </p>
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    {homeData && (
                        <div className="flex justify-center items-center mr-28" style={{ width: '50%', height: '100%' }}>
                            <div style={{ width: '100%', height: '100%', borderRadius: '0.5rem', overflow: 'hidden' }}>
                                <img className='w-full h-full object-cover' src={homeData.image} alt="name is empty" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex flex-col items-center mt-10">
                {links && Object.entries(links).map(([platform, url]) => (
                    <div key={platform} className="mt-2">
                        <a href={url} target="_blank" rel="noopener noreferrer">
                            <img src={url} alt={platform} className="w-10 h-10 hover:opacity-50 cursor-pointer" />
                        </a>
                    </div>
                ))}
            </div>


            {/* Animation styles */}
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
        </div>
    );
};

export default Home;
