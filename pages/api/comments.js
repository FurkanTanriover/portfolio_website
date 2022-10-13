  import { GraphQLClient, gql } from "graphql-request";

  const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT;
  const graphcmsToken=process.env.GRAPHCMS_TOKEN;

  export default async function comments(req, res){
    const graphQLClient=new GraphQLClient(graphqlAPI, {
      headers: {
        authorization: `Bearer ${graphcmsToken}`,
      }
    });
    const query = gql`
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
      createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}) { id }
    }
  `;
    try{
      const result= await graphQLClient.request(query, req.body);
      console.log("62")

      return res.status(200).send(result);
    } catch(err){
      console.log("31")
      return res.status(500).send(err);
    }

  }