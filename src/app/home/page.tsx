"use client";
import React, { useEffect, useState } from 'react';
import { ref, get } from 'firebase/database';
import { database } from '@/app/DbSetUp/firebase';
import Link from 'next/link';
import '../home/home.css';

interface HomeData {
    image: string;
    name: string;
    linkdin: string;
    github: string;
    insta: string;
    logo: string;
}

const Home: React.FC = () => {
    const [homeData, setHomeData] = useState<HomeData | null>(null);
    const [links, setLinks] = useState<HomeData | null>(null);
    const [logo, setLogo] = useState<{ [key: string]: HomeData } | null>(null);

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
        <div className="home-container">
            <div className="flex items-center pb-28 h-screen">
                <div className="grid grid-cols-2 gap-4 w-full ml-10">
                    <div className='main-container flex flex-col justify-center items-center' style={{ width: '100%', height: '100%' }}>
                        <div className=" font-container mr-60">
                            <h2 className="text-white font-thin text-2xl ">Hello, I am Parth</h2>
                        </div>
                        <div className="flex m-5">
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

                        <div>
                            <p className=" w-96" style={{ width: "410px" }}>
                                Full-Stack Developer with ability to learn and collaborate
                                in rapidly changing enviroments and compositions.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-40">
                            <div className="">
                                <Link href="/contact">
                                    <button className="bg-blue-500 p-2 rounded-lg text-white hover:opacity-50 transition duration-500 ease-in-out">Let's Talk</button>
                                </Link>
                            </div>
                            <div className="flex gap-2">
                                {links && Object.entries(links).map(([platform, url]) => (
                                    <div key={platform} className="">
                                        <a href={url} target="_blank">
                                            <img src={url} alt={platform} className="w-10 h-10 hover:opacity-50 cursor-pointer transition duration-500" />
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        {homeData && (
                            <div className="flex justify-center items-center" style={{ width: '50%', height: '100%' }}>
                                <div className="w-full h-full border-3 border-blue-500 overflow-hidden" style={{ borderRadius: '50%' }}>
                                    <img className="" src={homeData.image} alt="name is empty" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {logo && Object.keys(logo).map((key, index) => {
                    const logoData = logo[key] as HomeData;
                    const position = getSpecificPosition(index);
                    return (
                        <a key={key} target="_blank" className="logo" style={{ left: position.left, top: position.top }}>
                            <img src={logoData.logo} alt={`Icon ${key}`} />
                        </a>
                    );
                })}
            </div>

            <style>{`
                .home-container {
                    position: relative;
                }
    
                .logo {
                    position: absolute;
                    opacity: 0.4;  
                }
    
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

    function getSpecificPosition(index: number) {

        switch (index) {
            case 0:
                return { left: '200px', top: '50px' };
            case 1:
                return { left: '300px', top: '250px' };
            case 2:
                return { left: '200px', top: '450px' };
            case 3:
                return { left: '400px', top: '50px' };
            case 4:
                return { left: '600px', top: '250px' };
            case 5:
                return { left: '400px', top: '450px' };
            case 6:
                return { left: '650px', top: '450px' };
            case 7:
                return { left: '650px', top: '50px' };
            case 8:
                return { left: '1320px' };
            default:
                return { left: '0', top: '0' };
        }
    }
};

export default Home;