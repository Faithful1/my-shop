const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
  async deleteItem (parent, args, ctx, info) {
    const where = { id: args.id }
    // 1. find the Item
    const item = await ctx.db.query.item({ where }, `{id title}`)
    // TODO: 2. check if they own that item, or have the permissions

    // 3. delete it
    return ctx.db.mutation.deleteItem({ where }, info)
  },
  async signUp (parent, args, ctx, info) {
    // lowercase all emails
    args.email = args.email.toLowerCase()
    // hash their passwords (pass it a salt of 10)
    const password = await bcrypt.hash(args.password, 10)
    // create user in the database
    const user = await ctx.db.mutation.createUser(
      { data: { ...args, password, permissions: { set: [ 'USER' ] } } },
      info
    );
    // create the jwt token for them
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // we set the jwt as a cookie on the response
    ctx.response.cookie( 'token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 , // 1 year cookie
    });
    // we return the user to the browser
    return user;
  }
}

module.exports = Mutations
