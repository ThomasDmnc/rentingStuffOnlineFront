import { useEffect, useState } from "react";
import { Grid } from '@mantine/core';
import Comment from "./Comment";

function CommentGrid({ allcomments }) {
    const [comments, setComments] = useState()
    const [isLoading, setIsLoading ] = useState(false)

    useEffect(() =>{
        setComments(allcomments)
    }, [allcomments])

    console.log(typeof comments)
    console.log( comments)
    return isLoading ? (<><Loader color="#288BE2" /></>) : (
        <>
         <Grid gutter="lg"  spacing="lg" mt={20}>
            { typeof comments === 'object' && comments.length > 0 && comments.map((comment) => {
                return(
                    <Grid.Col key={comment.id} span={{ base: 12, xs:12, md: 12, lg: 12}}>
                        <Comment theComment={comment} />
                    </Grid.Col>
                )
            })}
        </Grid>
        </>
    );
}

export default CommentGrid;