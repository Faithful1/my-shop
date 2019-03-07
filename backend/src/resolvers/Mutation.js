// now interface with the prisma database/api (everything inside prisma.graphql)
const Mutations = {
  async createItem (parent, args, ctx, info) {
    // TODO: check if they are logged in
    const item = await ctx.db.mutation.createItem({ data: { ...args } }, info)
    console.log(item)
    return item
  },
  updateItem (parent, args, ctx, info) {
    // first take a copy of the updates
    // remove the ID from the updates
    // run the update method
    const updates = { ...args }
    delete updates.id
    return ctx.db.mutation.updateItem(
      { data: updates, where: { id: args.id } },
      info
    )
  },
  async deleteItem(parent, args, ctx, info) {
    const where = {id: args.id};
    //1. find the Item
    const item = await ctx.db.query.item({ where }, `{id title}`);
    //2. check if they own that item, or have the permissions
    // TODO:
    //3. delete it
    return ctx.db.mutation.deleteItem({ where }, info);
  }
};

module.exports = Mutations
