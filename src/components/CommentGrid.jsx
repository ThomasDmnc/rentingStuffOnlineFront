import { useEffect, useState, useContext } from "react";
import { Grid, Flex, Button } from '@mantine/core';
import Comment from "./Comment";
import { AuthContext } from "../contexts/AuthContext.jsx";
import axios from "axios";
import { Link } from "react-router-dom";

function CommentGrid({ allcomments }) {
    const [comments, setComments] = useState()
    const [isLoading, setIsLoading ] = useState(false)

    const { user } = useContext(AuthContext);
  
    const handleDelete = (comment) => {
      axios.delete(`${import.meta.env.VITE_API_URL}/api/comments/${comment._id}`)
      .then((response) => {
        const newComments = comments.filter(function (el) {
            return el != comment;
          })
        setComments(newComments);
      }).catch((err) => {console.log(err)})
    }
  

    useEffect(() =>{
        setComments(allcomments)
    }, [allcomments])

    return isLoading ? (<><Loader color="#288BE2" /></>) : (
        <>
         <Grid gutter="lg"  spacing="lg" mt={20}>
            { typeof comments === 'object' && comments.length > 0 && comments.map((comment) => {
                return(
                    <Grid.Col key={comment._id} span={{ base: 12, xs:12, md: 12, lg: 12}}>
                        <Flex w='100%' direction={{ base: 'column', sm: 'row' }}>
                        <Comment theComment={comment} />
                        { user && user.userId === comment.createdBy._id ? (
                            <Flex
                            direction="column"
                            align="center"
                            justify="center"
                            >
                                <Button w="100" component={Link} to={`/updateComment/${comment._id}`}  variant="filled" color="#288BE2" size="sm">
                                    Edit
                                </Button>
                                <Button w="100" mt={10} onClick={() => handleDelete(comment)} variant="filled" color="#CA1747" size="sm">
                                    Delete
                                </Button>
                                </Flex>
                        ) : ""}
                        </Flex>
                    </Grid.Col>
                )
            })}
        </Grid>
        </>
    );
}

export default CommentGrid;