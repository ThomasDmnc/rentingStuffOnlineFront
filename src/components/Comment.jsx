import { useState } from "react";
import { Text, Rating, Flex, Avatar } from "@mantine/core";

function Comment({ theComment }) {
  const [comment, setComment] = useState(theComment);

  console.log(theComment);
  return (
    <>
      <Flex
        mt={20}
        mb={20}
      >
        <Flex
            justify='center'
            align="center"
            mr={20}
        >
            <Avatar 
                    h={50}
                    w={50}
                    src={comment.createdBy.imageUrl}
                    mr={10}
                />
          <Text fw={600}>{comment.createdBy.firstName} {comment.createdBy.lastName}</Text>
        </Flex>
        <Flex
            direction="column"
            justify="space-between"
        >
          <Rating value={comment.rating} />
          <Text mt={20}>{comment.content}</Text>
        </Flex>
      </Flex>
    </>
  );
}

export default Comment;
