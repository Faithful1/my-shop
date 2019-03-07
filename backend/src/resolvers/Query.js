// when there is a new query you must set a resolver
// answers the question where does this query come from
// and how to get it to the users
const { forwardTo } = require('prisma-binding');

const Query = {
    items: forwardTo('db'),
    item: forwardTo('db'),
    itemsConnection: forwardTo('db')

    // async items(parent, args, ctx, info) {
    //     const items = await ctx.db.query.items();
    //     return items;
    // }
};

module.exports = Query;
