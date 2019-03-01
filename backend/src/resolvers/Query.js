// when there is a new query you must set a resolver
// answers the question where does this query come from 
// and how to get it to the users
const Query = {
    items(parent, args, ctx, info) {
        global.items = global.items || [];

        return global.items;
    },
};

module.exports = Query;
