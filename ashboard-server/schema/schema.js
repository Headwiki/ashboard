const graphql = require("graphql");
const _ = require("lodash");

const songs = require("../models/song");
const users = require("../models/user");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList
} = graphql;

/* const SongsArray = [
  { id: "1", title: "Midnight heartache", artist: "September", url: "https://www.youtube.com/watch?v=enpRJNBzkeM", userId: "1" },
  { id: "2", title: "hope is a dangerous thing for a woman like me to have - but i have it", artist: "Lana Del Rey", url: "https://www.youtube.com/watch?v=rY2LUmLw_DQ", userId: "2" },
  { id: "3", title: "Molly Hatchet", artist: " Fall of the Peacemakers", url: "https://www.youtube.com/watch?v=OzKBu66ceOc", userId: "1" }
];

const UsersArray = [
  { id: "1", username: "Headwiki" },
  { id: "2", username: "Feerun" }
]; */

// Defining SongType with its fields.
const SongType = new GraphQLObjectType({
  name: "Song",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    artist: { type: GraphQLString },
    url: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return users.findById(parent.userId);
      }
    }
  })
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    songs: {
      type: new GraphQLList(SongType),
      resolve(parent, args) {
        return songs.find({ userId: parent.id });
      }
    }
  })
});

//Defining RootQuery
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // Fields here will be the query for frontends
    //We are defining a 'car' query which can take (car ID ) to search in DB.
    song: {
      type: SongType, //Defining model for car Query
      args: { id: { type: GraphQLID } },  //args field to extract argument came with car query, e.g : Id of the car object to extract its details.
      resolve(parent, args) {
        return songs.findById(args.id);
      } //resolve function
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return users.findById(args.id);
      }
    },
    songs: {
      type: new GraphQLList(SongType),
      resolve(parent, args) {
        return songs.find({});
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return users.find({});
      }
    }
  } //fields end here
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {    // To add Owner in DB
      type: UserType,
      args: {
        username: { type: GraphQLString }
      },
      resolve(parent, args) {
        let user = new users({
          username: args.username
        });
        return user.save(); //create owner data in mlab
      }
    },
    addSong: {
      type: SongType,
      args: {
        title: { type: GraphQLString },
        artist: { type: GraphQLString },
        url: { type: GraphQLString },
        userId: { type: GraphQLID }
      },
      resolve(parent, args) {
        let song = new songs({
          title: args.title,
          artist: args.artist,
          url: args.url,
          userId: args.userId
        });

        return song.save();
      }
    }
  } //fields ends here
});

//exporting 'GraphQLSchema with RootQuery' for GraphqlHTTP middleware.
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});