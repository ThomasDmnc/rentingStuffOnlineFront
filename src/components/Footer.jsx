import { Flex, Text } from '@mantine/core';

function Footer() {

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
          <Text size="sm">Created By</Text>
        </Flex>
        <Flex direction={{  sm: 'row' }} gap="md" align="start" justify="center">
          <Text>
              <a href="LINK_TO_CREATOR_1_LINKEDIN" target="_blank" rel="noopener noreferrer">
                Thomas Demoncy
              </a>
            </Text>
            <Text size="md" align="center">
              <a href="LINK_TO_CREATOR_2_LINKEDIN" target="_blank" rel="noopener noreferrer">
                Maximiliano Wullbrand-Naddeo
              </a>
            </Text>
            <Text size="md" align="center">
              <a href="LINK_TO_CREATOR_3_LINKEDIN" target="_blank" rel="noopener noreferrer">
                Halil Ibrahim Aydin
              </a>
            </Text>
        </Flex>
        <Flex direction="column" align="center">
          <Text size="sm">Created for Ironhack final project.</Text>
        </Flex>
      </Flex>
    </footer>
  );
}

export default Footer;
