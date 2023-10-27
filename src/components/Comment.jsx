import { useState, useContext } from "react";
import { Text, Rating, Flex, Avatar, Button } from "@mantine/core";
import { Link } from 'react-router-dom';
import { AuthContext } from "../contexts/AuthContext.jsx";

function Comment({ theComment }) {
  const [comment, setComment] = useState(theComment);
  const { user } = useContext(AuthContext);

  console.log(user);
  return (
    <>
      <Flex mt={20} mb={20}>
        <Flex justify="center" align="center" mr={20}>
          <Avatar h={50} w={50} src={comment.createdBy.imageUrl} mr={10} />
          <Text fw={600}>
            {comment.createdBy.firstName} {comment.createdBy.lastName}
          </Text>
        </Flex>
        <Flex direction="column" justify="space-between">
          <Rating value={comment.rating} />
          <Text mt={20}>{comment.content}</Text>
        </Flex>
        { user.userId === comment.createdBy._id ? (
            <>
                <Button  component={Link} to={`/updateComment/${comment._id}`}  variant="filled" color="#288BE2" size="md">
                    Edit you Comment
                </Button>
            </>
        ) : ""}
      </Flex>
    </>
  );
}

export default Comment;
