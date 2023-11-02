import { useState, useEffect } from "react";
import CardGrid from "../components/CardGrid";
import axios from "axios";
import {
  Title,
  Flex,
  Text,
  Button,
  Input,
  Menu,
  MenuItem,
  Pagination,
} from "@mantine/core";

import "../styles/homepage.css";

function Homepage() {
  const [equipments, setEquipments] = useState("");
  const [filteredEquipments, setFilteredEquipments] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const getEquipments = () => {
    let url = `${import.meta.env.VITE_API_URL}/api/equipments?available=true`;

    const queryParams = [];

    if (selectedTag) {
      queryParams.push(`categories=${selectedTag}`);
    }

    if (queryParams.length > 0) {
      url += `&${queryParams.join("&")}`;
    }

    axios
      .get(url)
      .then((response) => {
        setEquipments(response.data);
        handleSearch();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getEquipments();
    setFilteredEquipments(equipments);
  }, []);

  useEffect(() => {
    getEquipments();
  }, [selectedTag]);

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  useEffect(() => {
    handleSearch();
  }, [equipments]);

  const handleTagFilter = (tag, event) => {
    const allTags = document.getElementsByClassName("tag");
    for (let i = 0; i < allTags.length; i++) {
      allTags[i].classList.remove("active-tag");
    }
    event.currentTarget.classList.add("active-tag");
    setSelectedTag(tag);
    setCurrentPage(1);
  };

  const allTags = [
    "Tennis",
    "Climbing",
    "Fishing",
    "Hiking",
    "Surfing",
    "Biking",
    "Skiing",
  ];

  const handleSearch = () => {
    if (equipments) {
      const regex = new RegExp(`.*${searchTerm}.*`, "i");
      const tempFilteredEquipments = equipments.filter((currentEquipment) => {
        return regex.test(currentEquipment.name);
      });
      setFilteredEquipments(tempFilteredEquipments);
    }
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEquipments.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <section className="banner">
        <Flex direction="column" align="center" justify="center" mih="40vh">
          <Title order={1} fw={900} c="#288BE2" size="52">
            Renting Stuff Online
          </Title>
          <Text mt="2rem" fw={600}>
            The place where you get what you want
          </Text>
        </Flex>
      </section>

      <section className="searchBar" style={{ margin: "20px 0" }}>
        <Input
          placeholder="Search by name or description"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.currentTarget.value)}
          variant="default"
        />
      </section>

      <section className="tagFilters" style={{ margin: "20px 0" }}>
        <Flex wrap="wrap" justify="center" gap="md">
          <Button
            className="tag active-tag"
            variant="filled"
            onClick={(event) => handleTagFilter(null, event)}
          >
            All
          </Button>
          {allTags.map((tag) => (
            <Button
              className="tag"
              variant="filled"
              key={tag}
              onClick={(event) => handleTagFilter(tag, event)}
            >
              {tag}
            </Button>
          ))}
        </Flex>
      </section>

      <section className="gridCtn">
        <CardGrid allEquipments={currentItems} />
      </section>
      <section
        className="paginationOptions"
        style={{ textAlign: "center", margin: "20px 0" }}
      >
        <Menu>
          <Menu.Target>
            <Button>Item Per Page ({itemsPerPage}) </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <MenuItem
              onClick={() => {
                setItemsPerPage(12), setCurrentPage(1);
              }}
            >
              12
            </MenuItem>
            <MenuItem
              onClick={() => {
                setItemsPerPage(24), setCurrentPage(1);
              }}
            >
              24
            </MenuItem>
            <MenuItem
              onClick={() => {
                setItemsPerPage(48), setCurrentPage(1);
              }}
            >
              48
            </MenuItem>
          </Menu.Dropdown>
        </Menu>
      </section>

      <section
        className="pagination"
        style={{ textAlign: "center", margin: "20px 0" }}
      >
        <Flex justify="center" align="center" mt="2rem">
          <Pagination
            value={currentPage}
            onChange={setCurrentPage}
            total={Math.ceil(filteredEquipments.length / itemsPerPage)}
          />
        </Flex>
      </section>
    </>
  );
}

export default Homepage;
