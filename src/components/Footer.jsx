import React from "react";
import { Flex, Text } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  const linkedInIcon = <FontAwesomeIcon icon={faLinkedin} style={{ fontSize: '30px' }} />;

  return (
    <footer
      style={{
        backgroundColor: "#f2f2f2",
        width: "100%",
        padding: "10px",
        textAlign: "center",
        boxSizing: "border-box",
      }}
    >
      <Flex direction="column" gap="sm" align="center">
        <Flex gap="sm" align="center">
          <Text size="lg">Created By</Text>
        </Flex>
        <Flex direction={{  sm: 'row' }} gap="md" align="start" justify="center">
          <Flex direction="column" align="top">
            {linkedInIcon}
            <Text size="lg" align="center">
              <a href="LINK_TO_CREATOR_1_LINKEDIN" target="_blank" rel="noopener noreferrer">
                Thomas Demoncy
              </a>
            </Text>
          </Flex>
          <Flex direction="column" align="top">
            {linkedInIcon}
            <Text size="lg" align="center">
              <a href="LINK_TO_CREATOR_2_LINKEDIN" target="_blank" rel="noopener noreferrer">
                Maximiliano Wullbrand-Naddeo
              </a>
            </Text>
          </Flex>
          <Flex direction="column" align="top">
            {linkedInIcon}
            <Text size="lg" align="center">
              <a href="LINK_TO_CREATOR_3_LINKEDIN" target="_blank" rel="noopener noreferrer">
                Halil Ibrahim Aydin
              </a>
            </Text>
          </Flex>
        </Flex>
        <Flex direction="column" align="center">
          <Text size="sm">Created for Ironhack final project.</Text>
          <Text size="sm">All rights reserved.</Text>
        </Flex>
      </Flex>
    </footer>
  );
}

export default Footer;
