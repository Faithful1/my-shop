/*
    We need to edit like four different files
    1. edit data model
    2. deploy to prisma
    3. edit schema.graphql for yoga
    4. write a resolver in mutation
*/


query SINGLE_ITEM{
    item(where:{ id:"cjsrcr69z2pmf0b872d3xez0d"})
    {
      id
      title
      description
    }
  }


  query dataAboutItems {
  itemsConnection {
    aggregate {
      count
    }
  }
}
