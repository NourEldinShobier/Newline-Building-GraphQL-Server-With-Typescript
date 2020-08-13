import { IResolvers } from "apollo-server-express";
import { list } from "./lists";

export const resolvers: IResolvers = {
    Query: {
        listings: () => {
            return list;
        }
    },
    Mutation: {
        deleteListing: (_root: undefined, { id }: { id: string }) => {
            for (let i = 0; i < list.length; i++) {
                if (list[i].id === id) {
                    return list.splice(i, 1)[0];
                }
            }

            throw new Error("failed to deleted listing");
        }
    }
};