import { Avatar, UnstyledButton, Text, Menu, rem, Group } from '@mantine/core';
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IconChevronDown, IconLogout, IconSettings } from '@tabler/icons-react'
import { AuthContext } from '../contexts/AuthContext';

function UserBadge({userProps}) {
    const [user, setUser] = useState(userProps);
    const [userInfo, setUserInfo] = useState();
    const [opened, setOpened] = useState(false);
    const {
        logOutUser,
      } = useContext(AuthContext);

    const close = () => {
        setOpened(false);
      };
    
      const open = () => {
        setOpened(true);
      };
    
      const toggleDropdown = () => {
        opened ? close() : open();
      };

    const getUserInfo = () =>{
        axios.get(`${import.meta.env.VITE_API_URL}/api/user/${user.userId}`)
        .then((response) => {
            setUserInfo(response.data)
            console.log(response)
        }).catch((err) => {
            console.log(err)
        })
    }
    console.log(user)
    useEffect(() => {
        getUserInfo();
    }, [] )

    return !userInfo ? ('test') : (
        <>
            <Menu 
                visibleFrom="sm" 
                opened={opened} 
                onChange={toggleDropdown}>
            <Menu.Target>
                <UnstyledButton>
                    <Group>
                        <Avatar src={userInfo.imageUrl} alt="it's me" />
                        <Text>{userInfo.firstName} {userInfo.lastName}</Text>
                        <IconChevronDown 
                            aria-label="Toggle navigation" 
                                style={{ width: rem(16), height: rem(16) }}
                            />
                    </Group>
                </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
                            <Menu.Item component={Link} to='/profile' leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
                            Account Settings
                            </Menu.Item>
                            <Menu.Divider />
                            <Menu.Item onClick={logOutUser} leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}>
                            Log Out
                            </Menu.Item>
            </Menu.Dropdown>
            </Menu>
        </>
    );
}

export default UserBadge;