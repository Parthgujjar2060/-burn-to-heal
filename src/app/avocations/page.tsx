'use client';
import React, { useEffect, useState, useRef } from 'react';
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
    const [activeKey, setActiveKey] = useState<string>("volleyball"); // Active avocation key
    const avocationKeys = ["volleyball", "Food", "Gaming"]; // Array of avocation keys
    const sectionRefs = useRef<Array<HTMLDivElement | null>>([]); // Refs for each section

    useEffect(() => {
        const avocationRef = ref(database, 'avocation');
        get(avocationRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setAvocationData(data);
                } else {
                    console.log("No data available");
                }
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }, []);

    // Function to determine which section is in view
    const handleScroll = () => {
        sectionRefs.current.forEach((section, index) => {
            if (section) {
                const rect = section.getBoundingClientRect();
                if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                    setActiveKey(avocationKeys[index]); // Update the active key based on scroll position
                }
            }
        });
    };

    return (
        <div>
            <h1 style={{ fontSize: '2.5rem', marginTop: "60px" }}>Welcome to Avocations</h1>
            <h3 style={{ fontSize: '1rem', marginTop: "10px" }}>Here you will find my hobbies</h3>
            <div className='grid' style={{ gridTemplateColumns: '45% 45% 5%' }}>
                {/* Left Side: Show active image */}
                <div className='single-image-container'>
                    {avocationData && activeKey && avocationData[activeKey]?.image && (
                        <img
                            src={avocationData[activeKey].image}
                            alt={activeKey}
                            className="avocation-image"
                        />
                    )}
                </div>

                {/* Right Side: Scrollable descriptions */}
                <div className='info-container' onScroll={handleScroll}>
                    {avocationData && avocationKeys.map((key, index) => (
                        <div
                            key={key}
                            className='avocation-wrapper'
                            ref={(el) => { sectionRefs.current[index] = el; }} // Assign ref for each section
                        >
                            <span className='shining-line'></span>
                            <AvocationComp
                                avocation={key}
                                description={avocationData[key]?.description || "No description available"}
                            />
                        </div>
                    ))}
                </div>

                {/* Scroll indicator */}
                <div className="scrol">
                    <div className="scroll-line"></div>
                </div>
            </div>
        </div>
    );
};

export default Avocations;
