import {
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLFloat,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLString,
    GraphQLObjectType
} from "graphql";
import { list } from "./lists";

/**
 * [GraphQLObjectType] is the most basic component of a GraphQL schema which can
 * be used to represent practically all our GraphQL object types from the root query
 * and mutation types to specific custom types.
 */

/**
 * [GraphQLSchema] is to be used to create a GraphQL Schema by passing in the root level
 * query and mutation GraphQL object types.
 */

const Listing = new GraphQLObjectType({
    name: "Listing",
    fields: {
        id: { type: GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLNonNull(GraphQLString) },
        image: { type: GraphQLNonNull(GraphQLString) },
        address: { type: GraphQLNonNull(GraphQLString) },
        price: { type: GraphQLNonNull(GraphQLInt) },
        numOfGuests: { type: GraphQLNonNull(GraphQLInt) },
        numOfBeds: { type: GraphQLNonNull(GraphQLInt) },
        numOfBaths: { type: GraphQLNonNull(GraphQLInt) },
        rating: { type: GraphQLNonNull(GraphQLFloat) }
    }
});

const query = new GraphQLObjectType({
    name: "Query",
    fields: {
        listings: {
            type: GraphQLNonNull(GraphQLList(GraphQLNonNull(Listing))),
            resolve: () => {
                return list;
            }
        }
    }
});

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        deleteListing: {
            type: GraphQLNonNull(Listing),
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            resolve: (_root, { id }) => {
                for (let i = 0; i < list.length; i++) {
                    if (list[i].id === id) {
                        return list.splice(i, 1)[0];
                    }
                }

                throw new Error("failed to deleted listing");
            }
        }
    }
});

export const schema = new GraphQLSchema({ query, mutation });