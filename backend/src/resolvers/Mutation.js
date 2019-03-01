// now interface with the prisma database/api (everything inside prisma.graphql)
const Mutations = {
   async createItem(parent, args, ctx, info) {
        // TODO: check if they are logged in

    const item = await ctx.db.mutation.createItem({
        data: {
            ...args
        }
    }, info);
    console.log(args)
    return item;
    }
};

module.exports = Mutations;
