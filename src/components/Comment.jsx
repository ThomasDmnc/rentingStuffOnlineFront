import { useState } from "react";
import { Text, Rating, Flex, Avatar } from "@mantine/core";


function Comment({ theComment }) {
  const [comment, setComment] = useState(theComment);

  return (
    <>
      <Flex w="100%"  mt={20} mb={20} 
        direction={{ base: 'column', sm: 'row' }}
        gap={{ base: 'sm', sm: 'lg' }}
      >
        <Flex justify={{ base: 'center', sm: 'center' }} align="center" mr={20} w="30%">
          <Avatar h={50} w={50} src={comment.createdBy.imageUrl} mr={10} />
          <Text fw={600}>
            {comment.createdBy.firstName} {comment.createdBy.lastName}
          </Text>
        </Flex>
        <Flex w="100%" direction="column" justify="space-between" mr={10}>
          <Rating readOnly value={comment.rating} />
          <Text mt={20}>{comment.content}</Text>
        </Flex>
      </Flex>
    </>
  );
}

export default Comment;
