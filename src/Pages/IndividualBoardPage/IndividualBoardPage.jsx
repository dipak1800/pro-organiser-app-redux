import React, { Component } from "react";
import AddColumn from "../../Components/AddColumn/AddColumn";
import axios from "axios";
import Style from "./IndividualBoardPage.module.scss";
import BoardColumn from "../../Components/BoardColumn/BoardColumn";
import swal from "sweetalert";
import Loader from "react-loader-spinner";
import { fetchData } from "../../Redux/Actions/Action Creators/HomepageActionsCreators/HomepageActionCreators";
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
        // console.log(response.data);
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
  };
  handleBoardDelete = e => {
    console.log("button clicked");
    let { boardId } = this.state;
    let { history } = this.props;
    swal({
      title: "Are you sure?",
      text: `${this.state.boardName.toUpperCase()} card will be deleted`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(willDelete => {
      if (willDelete) {
        return (
          axios
            .delete(
              `https://redux-pro-organizer-app.firebaseio.com/BoardData/${boardId}.json`
            )
            .then(res => history.push("/"))
            .catch(err => alert("something went wrong , " + err.message)),
          swal(
            `${this.state.boardName.toUpperCase()} card Deleted Succesfully`,
            {
              icon: "success",
            }
          )
        );
      } else {
        swal(`${this.state.boardName.toUpperCase()} card not Deleted 😁!`);
      }
    });
  };
  render() {
    let { loading } = this.state;
    return (
      <div className={Style.mainContainer}>
        <div className={Style.myboard}>
          <h2 className={Style.boardTitle}>
            {this.state.boardName.toUpperCase()}
          </h2>
          <button className={Style.smallbtn} onClick={this.handleBoardDelete}>
            Delete Board
          </button>
        </div>
        {loading ? (
          <h1 style={{ textAlign: "center" }}>
            {" "}
            <Loader type="Audio" color="#00BFFF" height={80} width={80} />
          </h1>
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
                  boardId={this.state.boardId}
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
