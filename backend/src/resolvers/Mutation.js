const Mutations = {
    createItems(parent, args, ctx, info) {
        // create an item
        global.items = global.items || [];

        const newItem =  { name: args.name };
        global.items.push(newItem);
        return newItem;
    }
};

module.exports = Mutations;
