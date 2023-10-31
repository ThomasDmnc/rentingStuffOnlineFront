// Homepage.js

import { useState, useEffect } from "react";
import CardGrid from "../components/CardGrid";
import axios from "axios";
import { Title, Flex, Text, Button, Input } from '@mantine/core';

function Homepage() {
    const [equipments, setEquipments] = useState('');
    const [selectedTag, setSelectedTag] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const getEquipments = () => {
        let url = `${import.meta.env.VITE_API_URL}/api/equipments`;

        const queryParams = [];

        if (selectedTag) {
            queryParams.push(`categories=${selectedTag}`);
        }
        if (searchTerm) {
            queryParams.push(`search=${searchTerm}`);
        }

        if (queryParams.length > 0) {
            url += `?${queryParams.join('&')}`;
        }

        axios.get(url)
        .then((response) =>{
            setEquipments(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }
    
    useEffect(() => {
        getEquipments();
    }, [selectedTag, searchTerm]);

    const handleTagFilter = (tag) => {
        setSelectedTag(tag);
        setSearchTerm(''); 
    };

    const allTags = [
        "Tennis",
        "Climbing",
        "Fishing",
        "Hiking",
        "Surfing",
        "Biking",
        "Skiing"
    ];

    const handleSearch = (value) => {
        setSearchTerm(value);
        setSelectedTag(null); 
    };

    return ( 
        <>
            <section className="banner">
                <Flex
                    direction="column"
                    align="center"
                    justify="center"
                    mih="40vh"
                >
                <Title order={1} fw={900} c="#288BE2" size="52">Renting Stuff Online</Title>
                <Text mt="2rem" fw={600}>The place where you get what you want</Text>
                </Flex>
            </section>

            <section className="searchBar" style={{ margin: '20px 0' }} >
                <Input
                    placeholder="Search by name or description"
                    value={searchTerm}
                    onChange={(event) => handleSearch(event.currentTarget.value)}
                    variant="default"
                />
            </section>

            <section className="tagFilters" style={{ margin: '20px 0' }}>
            <Flex wrap="wrap" justify="center" gap="md">
                    <Button onClick={() => handleTagFilter(null)}>All</Button>
                    {allTags.map(tag => (
                        <Button key={tag} onClick={() => handleTagFilter(tag)}>{tag}</Button>
                    ))}
                </Flex>
            </section>

            <section className="gridCtn">
                <CardGrid allEquipments={equipments} />
            </section>
        </>
    );
}

export default Homepage;
