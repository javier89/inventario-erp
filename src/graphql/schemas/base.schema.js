import  { gql }  from 'graphql-tag';


export const baseTypeDefs = gql`
    
    type Query{
        _empty: String
    }
    
    type Mutation {
        _empty: String
    }

    scalar Date

    type MessageResponse {
        success: Boolean!
        message: String!
    }

    type PaginationInfo {
        total: Int!
        page: Int!
        limit: Int!
    }
`;