import React, { Component } from "react";
import AddColumn from "../../Components/AddColumn/AddColumn";
import axios from "axios";
import Style from "./IndividualBoardPage.module.scss";
import BoardColumn from "../../Components/BoardColumn/BoardColumn";
class IndividualBoardPage extends Component {
  state = {
    boardName: this.props.match.params.boardName,
    boardId: this.props.location.state.boardId,
    columnData: {},
    loading: true,
  };
  componentDidMount() {
    this.getColumnName();
  }
  componentDidUpdate(prevProps, prevState) {
    this.getColumnName();
  }

  getColumnName = () => {
    axios
      .get(
        `https://redux-pro-organizer-app.firebaseio.com/BoardData/${this.state.boardId}/columnData.json`
      )
      .then(response => {
        console.log(response.data);
        this.setState({
          columnData: response.data,
          loading: false,
        });
      })
      .catch(err => {
        alert("something went wrong ," + err.message);
      });
  };
  HandleColumnDelete = columnId => {
    let { boardId } = this.state;
    axios
      .delete(
        `https://redux-pro-organizer-app.firebaseio.com/BoardData/${boardId}/columnData/${columnId}.json`
      )
      .then(res => console.log(res.data))
      .catch(err => alert("something went wrong , " + err.message));
  };
  handleBoardDelete = e => {
    let { boardId } = this.state;
    let { history } = this.props;
    axios
      .delete(
        `https://redux-pro-organizer-app.firebaseio.com/BoardData/${boardId}.json`
      )
      .then(res => {
        history.push("/");
      })
      .catch(err => alert("something went wrong , " + err.message));
  };
  render() {
    let { loading } = this.state;
    return (
      <div className={Style.mainContainer}>
        <div className={Style.myboard}>
          <h4 className={Style.boardTitle}>
            {this.state.boardName.toUpperCase()}
          </h4>
          <button className={Style.smallbtn} onClick={this.handleBoardDelete}>
            Delete Board
          </button>
        </div>
        {loading ? (
          <h1>loading....</h1>
        ) : (
          <div className={Style.container}>
            {this.state.columnData &&
              Object.entries(this.state.columnData).map(column => (
                <BoardColumn
                  key={column[0]}
                  columnName={column[1].columnName}
                  columnId={column[0]}
                  // isCardDragged={isCardDragged}
                  handleColumnDelete={this.HandleColumnDelete}
                  // boardId={boardId}
                  // setIsCardDragged={setIsCardDragged}
                />
              ))}
            <AddColumn boardId={this.state.boardId} />
          </div>
        )}
      </div>
    );
  }
}
export default IndividualBoardPage;
