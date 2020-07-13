import React, { Component } from "react";
import Style from "./CreateBoardPage.module.scss";
import axios from "axios";
class CreteBoardPage extends Component {
  state = {
    boardName: "",
    boardMembers: "",
    boardType: "",
    loading: false,
  };
  handleCreateboard = e => {
    let { history } = this.props;
    e.preventDefault();
    let { boardName, boardMembers, boardType } = this.state;
    axios
      .post(`https://redux-pro-organizer-app.firebaseio.com/BoardData.json`, {
        boardName,
        boardMembers,
        boardType,
      })
      .then(res => history.push("/"))
      .catch(err => console.log(err.message));
    this.setState({
      loading: true,
    });
  };
  render() {
    let { boardName, boardMembers, boardType, loading } = this.state;
    return (
      <>
        {loading ? (
          <h1 style={{ textAlign: "center" }}>Loading...</h1>
        ) : (
          <div className={Style.board_container}>
            <h2 className={Style.createboard}>Create a Board</h2>
            <form onSubmit={this.handleCreateboard}>
              <label htmlFor="board-name">
                <h3>Enter a name for your board</h3>
              </label>
              <div className={Style.formDiv}>
                <input
                  type="text"
                  placeholder="e.g Agile Sprint Board"
                  id="name"
                  required
                  onChange={e => {
                    this.setState({
                      boardName: e.target.value,
                    });
                  }}
                  value={boardName}
                />
              </div>
              <label htmlFor="board-members">
                <h3>Add your team members</h3>
              </label>{" "}
              <div className={Style.formDiv}>
                <input
                  type="text"
                  placeholder="Add your team(seperated by commas)"
                  id="team"
                  required
                  onChange={e => {
                    this.setState({
                      boardMembers: e.target.value.split(" ").join(" "),
                    });
                  }}
                  value={boardMembers}
                />
              </div>
              <label htmlFor="board-type">
                <h3>Enter the type of your board</h3>
              </label>
              <div className={Style.formDiv}>
                <input
                  type="text"
                  placeholder="e.g Design Board(optional)"
                  id="type"
                  onChange={e => {
                    this.setState({
                      boardType: e.target.value,
                    });
                  }}
                  value={boardType}
                />
              </div>
              <div>
                <button id="CreateBoard" type="submit">
                  Create
                </button>
              </div>
            </form>
          </div>
        )}
      </>
    );
  }
}

export default CreteBoardPage;
