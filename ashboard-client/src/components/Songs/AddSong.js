import React from "react";
import { getUsersQuery } from "../../queries/queries";
import { graphql } from "react-apollo";

const AddSong = props => {
  const getUsers = () => {
    var data = props.data;
    if (data.loading) {
      return <option disabled>User loading...</option>;
    } else {
      return data.users.map(user => {
        return (
          <option key={user.id} value={user.id}>
            {user.username}
          </option>
        );
      });
    }
  };

  return (
    <>
      <form>
        <div className="field">
          <label>Title</label>
          <input type="text" name="songTitle"></input>
        </div>
        <div className="field">
          <label>URL:</label>
          <input type="text" name="songUrl"></input>
        </div>
        <div className="field">
          <label>User:</label>
          <select>
            <option>Select User</option>
            {getUsers(props)}
          </select>
        </div>
        <button>Add Song</button>
      </form>
    </>
  );
};

export default graphql(getUsersQuery)(AddSong);