import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import { Rating, TextInput, Text, Button } from "@mantine/core";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

function CreateComment() {
  const { user } = useContext(AuthContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const [ownedBy, setOwnedBy] = useState();
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(2.5);
  const [createdBy, setcreatedBy] = useState(user.userId);
  const navigate = useNavigate();
  useEffect(() => {
    let queryOwner = searchParams.get("owner");
    setOwnedBy(queryOwner);
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = { content, rating, ownedBy, createdBy };
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/comments`, payload, {
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
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Your comment:"
          placeholder="Please write your comment here."
          value={content}
          onChange={(event) => setContent(event.currentTarget.value)}
        />
        <Text>Your rating:</Text>
        <Rating
          fractions={2}
          value={rating}
          onChange={(event) => setRating(event)}
        />
        <Button type="submit">Create your comment</Button>
      </form>
    </>
  );
}

export default CreateComment;