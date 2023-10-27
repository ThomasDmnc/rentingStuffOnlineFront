import { useState, useContext } from "react";
import { Text, Rating, Flex, Avatar, Button } from "@mantine/core";
import { Link } from 'react-router-dom';
import { AuthContext } from "../contexts/AuthContext.jsx";
import axios from "axios";

function Comment({ theComment }) {
  const [comment, setComment] = useState(theComment);
  const { user } = useContext(AuthContext);

  const handleDelete = (commentId) => {
    axios.delete(`${import.meta.env.VITE_API_URL}/api/comments/${commentId}`)
    .then((response) => {
      console.log(response)
    }).catch((err) => {console.log(err)})
  }

  console.log(user);
  return (
    <>
      <Flex mt={20} mb={20} 
        direction={{ base: 'column', sm: 'row' }}
        gap={{ base: 'sm', sm: 'lg' }}
      >
        <Flex justify={{ base: 'center', sm: 'center' }} align="center" mr={20}>
          <Avatar h={50} w={50} src={comment.createdBy.imageUrl} mr={10} />
          <Text fw={600}>
            {comment.createdBy.firstName} {comment.createdBy.lastName}
          </Text>
        </Flex>
        <Flex w="60%" direction="column" justify="space-between" mr={10}>
          <Rating value={comment.rating} />
          <Text mt={20}>{comment.content}</Text>
        </Flex>
        { user.userId === comment.createdBy._id ? (
            <>
            <Flex
              direction="column"
              align="center"
            >
                <Button w="100" component={Link} to={`/updateComment/${comment._id}`}  variant="filled" color="#288BE2" size="sm">
                    Edit
                </Button>
                <Button w="100" mt={10} onClick={() => handleDelete(comment._id)} variant="filled" color="#CA1747" size="sm">
                    Delete
                </Button>
                </Flex>
            </>
        ) : ""}
      </Flex>
    </>
  );
}

export default Comment;
