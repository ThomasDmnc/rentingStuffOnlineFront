import { Flex, Button, Burger, Menu, rem } from '@mantine/core';
import { IconUserEdit, IconUserBolt } from '@tabler/icons-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import rlogo from '../assets/RLogoTemp.png'
  
function Navbar() {
    const [opened, setOpened] = useState(false);

    
    const close = () => {
        setOpened(false);
      };
    
      const open = () => {
        setOpened(true);
      };
    
      const toggleDropdown = () => {
        opened ? close() : open();
      };
    
    return (  
        <>
        <Flex
            direction="row"
            bg="#F2F2F2"
            mih={60}
            justify="space-between"
            align="center"
            pt={5}
            pb={5}
            pr={25}
            pl={25}
        >
            <img src={rlogo} alt="tmpLogo" style={{ width: rem(45), height: rem(45) }}/>

            <Button variant="filled" color="#288BE2" size="md" visibleFrom="md">Button</Button>
            <Menu hiddenFrom="md" opened={opened} onChange={toggleDropdown}>

                <Menu.Target>
                    <Burger opened={opened} aria-label="Toggle navigation" />
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Item leftSection={<IconUserBolt style={{ width: rem(14), height: rem(14) }} />}>
                    Log In
                    </Menu.Item>
                    <Menu.Item leftSection={<IconUserEdit style={{ width: rem(14), height: rem(14) }} />}>
                    Sign Up
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
            
        </Flex>
        </>
    );
}

export default Navbar;