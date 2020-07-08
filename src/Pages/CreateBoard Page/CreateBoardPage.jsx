import React, { Component } from "react";
import Style from "./CreateBoardPage.module.scss";

class CreteBoardPage extends Component {
  render() {
    return (
      <div className={Style.board_container}>
        <h2 className={Style.createboard}>Create a Board</h2>
        <form>
          <label htmlFor="board-name">
            <h3>Enter a name for your board</h3>
          </label>
          <div className={Style.formDiv}>
            <input
              type="text"
              placeholder="e.g Agile Sprint Board"
              id="name"
              required
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
            />
          </div>
          <div>
            <button id="CreateBoard" type="submit">
              Create
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default CreteBoardPage;
