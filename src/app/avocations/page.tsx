import React, { useEffect } from 'react';
import AvocationComp from "../component/avocationComp";
import { ref, get } from 'firebase/database';
import { database } from '@/app/DbSetUp/firebase';

const Avocations: React.FC = () => {

    interface avocationData {
        description: string;
        icon: React.ReactNode;
    }

    useEffect(() => {
        const avocationRef = ref(database, 'avocation');

        get(avocationRef).then((snapshot) => {
            if (snapshot.exists()) {
                const data: avocationData = snapshot.val();
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

            <div style={{ display: 'grid', gap: '10px' }}>
                <AvocationComp
                    avocation="Volley ball"
                    description= ""
                    icon={<span role="img" aria-label="books">📚</span>}
                />
                <AvocationComp
                    avocation="Foddieeeeeee"
                    description=""
                    icon={<span role="img" aria-label="travel">✈️</span>}
                />
                <AvocationComp
                    avocation="Gaming"
                    description=""
                    icon={<span role="img" aria-label="camera">📷</span>}
                />
            </div>
        </div>
    );
};

export default Avocations;
