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

// Defining SongType with its fields.
const SongType = new GraphQLObjectType({
  name: "Song",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
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
    song: {
      type: SongType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return songs.findById(args.id);
      }
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
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {    // To add User in DB
      type: UserType,
      args: {
        username: { type: GraphQLString }
      },
      resolve(parent, args) {
        let user = new users({
          username: args.username
        });
        return user.save();
      }
    },
    addSong: {
      type: SongType,
      args: {
        title: { type: GraphQLString },
        url: { type: GraphQLString },
        userId: { type: GraphQLID }
      },
      resolve(parent, args) {
        let song = new songs({
          title: args.title,
          url: args.url,
          userId: args.userId
        });

        return song.save();
      }
    }
  }
});

//exporting 'GraphQLSchema' for GraphqlHTTP middleware.
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});