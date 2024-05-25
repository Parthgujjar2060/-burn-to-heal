"use client";
import React, { useEffect, useState } from 'react';
import { ref, get } from 'firebase/database';
import { database } from '@/app/DbSetUp/firebase';
import '../about/about.css';

interface aboutData {
    paragraph: string;
    skills: {
        interpersonalskills: { [key: string]: string };
        otherskills: { [key: string]: string };
        professional: { [key: string]: string };
        ui: { [key: string]: string };
        webdev: { [key: string]: string };
    };
}
const About = () => {
    const [data, setData] = useState<aboutData | null>(null);

    useEffect(() => {
        const aboutRef = ref(database, 'about');
        get(aboutRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    setData(snapshot.val());
                } else {
                    console.log("No about data available");
                }
            })
            .catch((error) => {
                console.error("Error fetching about data: ", error);
            });
    }, []);

    return (
        <div className="about-container">
            {data && (
                <div className="about-content">
                    <div className="flex-container">
                        <p>{data.paragraph}</p>
                    </div>
                    <div className="grid-container">
                        <div>
                            <h2>Other Skills</h2>
                            <ul>
                                {Object.values(data.skills.otherskills).map((skill, index) => (
                                    <li key={index}>• {skill}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h2>Interpersonal Skills</h2>
                            <ul>
                                {Object.values(data.skills.interpersonalskills).map((skill, index) => (
                                    <li key={index}>• {skill}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h2>Professional Skills</h2>
                            <ul>
                                {Object.values(data.skills.professional).map((skill, index) => (
                                    <li key={index}>• {skill}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h2>UI Skills</h2>
                            <ul>
                                {Object.values(data.skills.ui).map((skill, index) => (
                                    <li key={index}>• {skill}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h2>Web Development Skills</h2>
                            <ul>
                                {Object.values(data.skills.webdev).map((skill, index) => (
                                    <li key={index}>• {skill}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div>
                        <h3>Achievements</h3>
                        <p>Your achievements here...</p>
                    </div>
                    <div>
                        <h3>Primary interest</h3>
                        <p>Your primary interests here...</p>
                    </div>
                </div>
            )}
            
        </div>
    );
};

export default About;
