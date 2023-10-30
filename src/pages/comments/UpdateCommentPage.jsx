import axios from "axios";
import { useEffect, useState } from "react";
import { Rating, TextInput, Text, Button , Title, rem} from "@mantine/core";
import { useParams, useNavigate } from "react-router-dom";

function UpdateComment() {
  const { commentId } = useParams();
  const [content, setContent] = useState();
  const [createdBy, setCreatedBy] = useState();
  const [ownedBy, setOwnedBy] = useState();
  const [rating, setRating] = useState();
  const navigate = useNavigate();

  const fetchCommentToUpdate = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/comments/${commentId}`)
      .then((response) => {
        setContent(response.data.content)
        setCreatedBy(response.data.createdBy)
        setOwnedBy(response.data.ownedBy)
        setRating(response.data.rating)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchCommentToUpdate();
  }, [commentId]);


  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = { content, rating, ownedBy, createdBy };
    console.log(payload)
    axios
      .put(`${import.meta.env.VITE_API_URL}/api/comments/${commentId}`, payload, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": true,
        },
      })
      .then((response) => {
        console.log(response);
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Title order={1} fw={900} c="#288BE2" size="52" mt="5rem" mb="5rem">
        Edit your comment
      </Title>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Your comment:"
          placeholder="Please write your comment here."
          value={content}
          mb="1rem"
          onChange={(event) => setContent(event.currentTarget.value)}
        />
        <Text>Your rating:</Text>
        <Rating
          fractions={2}
          value={rating}
          onChange={(event) => setRating(event)}
          mb="1rem"
        />
        <Button type="submit">Update your comment</Button>
      </form>
    </>
  );
}

export default UpdateComment;
