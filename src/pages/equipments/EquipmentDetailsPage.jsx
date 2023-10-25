import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from '@mantine/core';

function EquipmentDetails() {
    const [ equipment, setEquipment ] = useState();
    const { equipmentId } = useParams();
    const [isLoading, setIsLoading] = useState(true);

    const getEquipment = () => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/equipments/${equipmentId}`)
        .then((response) => {
            setEquipment(response.data)
            setIsLoading(false)
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getEquipment();
    }, []);

    console.log(equipment)
    return isLoading ? (<><Loader color="#288BE2" /></>) : (  
        <>
            <h1>{equipment.name}</h1>
            <p>{equipment.description}</p>
            <p>{equipment.available}</p>
        </>
    );
}

export default EquipmentDetails;