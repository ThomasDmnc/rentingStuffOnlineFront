import { Flex, Button, Burger, Menu, rem } from '@mantine/core';
import { IconUserEdit, IconUserBolt, IconTools, IconInbox } from '@tabler/icons-react';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext.jsx'

import rlogo from '../assets/RLogoTemp.png'
import UserBadge from './UserBadge.jsx';
  
function Navbar() {
    const [opened, setOpened] = useState(false);
    const { 
        isLoggedIn,
        logOutUser,
        user
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
    
      console.log(isLoggedIn)
    
    return (  
        <>
        <nav>
            <Flex
                direction="row"
                bg="#F2F2F2"
                mih={70}
                justify="space-between"
                align="center"
                pt={5}
                pb={5}
                pr={25}
                pl={25}
            >
                <Link to='/'>
                    <img src={rlogo} alt="tmpLogo" style={{ width: rem(45), height: rem(45) }}/>
                </Link>
                <Flex
                    direction="row"
                    miw={300}
                    justify="space-evenly"
                    align="center"
                    visibleFrom="md"
                >      

                {isLoggedIn && (
                    <>
                    
                    <Button variant="subtle" color="#288BE2" component={Link} to='/my-listings'  size="md" leftSection={<IconTools size={14} />}>My Equipments</Button>
                    <Button variant="subtle" color="#288BE2" size="md" leftSection={<IconInbox size={14} />}>My Requests</Button>
                    <UserBadge size="md"  userProps={user}/>
                    </>
                )}   
                
                {!isLoggedIn && (
                    <>
                    <Link to="/signup"><Button variant="filled" color="#288BE2" size="md">Sign Up</Button></Link>
                    <Link to="/login"> <Button variant="subtle" color="#288BE2" size="md">Log In</Button></Link>
                    </>
                    )} 
                </Flex>



                <Menu hiddenFrom="md" opened={opened} onChange={toggleDropdown}>

                    <Menu.Target>
                        <Burger opened={opened} aria-label="Toggle navigation" />
                    </Menu.Target>

                    <Menu.Dropdown>
                    {isLoggedIn && (
                    <>  
                            <Menu.Item component={Link} to='/my-listings' leftSection={<IconTools style={{ width: rem(14), height: rem(14) }} />}>
                            My Equipments
                            </Menu.Item>
                            <Menu.Item component={Link} to={`/`} leftSection={<IconInbox style={{ width: rem(14), height: rem(14) }} />}>
                            My Requests
                            </Menu.Item>
                            <Menu.Divider />
                        <Menu.Item onClick={logOutUser} leftSection={<IconUserEdit style={{ width: rem(14), height: rem(14) }} />}> 
                        Log Out
                        </Menu.Item>
                    </>
                    )}   
                    {!isLoggedIn && (
                    <>  
                        <Link to="/login">
                            <Menu.Item leftSection={<IconUserBolt style={{ width: rem(14), height: rem(14) }} />}>
                            Log In
                            </Menu.Item>
                        </Link>
                        <Link to="/signup">
                            <Menu.Item leftSection={<IconUserEdit style={{ width: rem(14), height: rem(14) }} />}>
                            Sign Up
                            </Menu.Item>
                        </Link>
                    </>
                    )}
                    </Menu.Dropdown>
                </Menu>
                
            </Flex>
        </nav>
        </>
    );
}

export default Navbar;