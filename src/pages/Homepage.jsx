import { useState, useEffect } from "react";
import CardGrid from "../components/CardGrid";
import axios from "axios";
import { Title } from '@mantine/core';

function Homepage() {
    const [equipments, setEquipments] = useState('');


    const getEquipments = () => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/equipments`)
        .then((response) =>{
            setEquipments(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }
    
    useEffect(() => {
        getEquipments()
    }, []);

    return ( 
        <>
            <section className="banner">
                <Title order={1} fw={900}>Renting Stuff Online</Title>
                <p>The place where you get what you want</p>
            </section>

            <section className="gridCtn">
                <CardGrid props={equipments} />
            </section>
        </>
    );
}

export default Homepage;