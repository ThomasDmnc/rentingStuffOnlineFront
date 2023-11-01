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
  rem,
} from "@mantine/core";

function Homepage() {
  const [equipments, setEquipments] = useState("");
  const [filteredEquipments, setFilteredEquipments] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const getEquipments = () => {
    let url = `${import.meta.env.VITE_API_URL}/api/equipments?available=true`;

    const queryParams = [];

    if (selectedTag) {
      queryParams.push(`categories=${selectedTag}`);
    }

    if (queryParams.length > 0) {
      url += `&${queryParams.join("&")}`;
      console.log(url);
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

  const handleTagFilter = (tag) => {
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
    console.log(equipments);
    console.log(filteredEquipments);
    console.log(searchTerm);
    if (equipments) {
      const regex = new RegExp(`.*${searchTerm}.*`, "i");
      console.log(regex);
      const tempFilteredEquipments = equipments.filter((currentEquipment) => {
        return regex.test(currentEquipment.name);
      });
      console.log(tempFilteredEquipments);
      setFilteredEquipments(tempFilteredEquipments);
    }
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
          <Button onClick={() => handleTagFilter(null)}>All</Button>
          {allTags.map((tag) => (
            <Button key={tag} onClick={() => handleTagFilter(tag)}>
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
                setItemsPerPage(10), setCurrentPage(1);
              }}
            >
              10
            </MenuItem>
            <MenuItem
              onClick={() => {
                setItemsPerPage(25), setCurrentPage(1);
              }}
            >
              25
            </MenuItem>
            <MenuItem
              onClick={() => {
                setItemsPerPage(50), setCurrentPage(1);
              }}
            >
              50
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
