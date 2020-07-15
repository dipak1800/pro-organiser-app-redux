import React, { Component, Fragment } from "react";
import Style from "./Homepage.module.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { fetchData } from "../../Redux/Actions/Action Creators/HomepageActionsCreators/HomepageActionCreators";
class Homepage extends Component {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    return (
      <>
        {this.props.loading ? (
          <h1 style={{ textAlign: "center" }}>
            <Loader type="Audio" color="#00BFFF" height={80} width={80} />
          </h1>
        ) : (
          <div className={Style.Container}>
            <h2 className={Style.Boards}>Boards</h2>
            <div className={Style.mainContainer}>
              {this.props.boardData ? (
                Object.entries(this.props.boardData).map(board => (
                  <Fragment key={board[0]}>
                    <Link
                      to={{
                        pathname: "/" + board[1].boardName,
                        state: {
                          boardId: board[0],
                          boardMembers: board[1].boardMembers,
                        },
                      }}
                      style={{ textDecoration: "none" }}
                    >
                      <div className={Style.board}>
                        <h3>{board[1].boardName}</h3>
                      </div>
                    </Link>
                  </Fragment>
                ))
              ) : (
                <h3 className={Style.Noboards}>
                  You haven't created any boards. Kindly click on the 'Create
                  Board' button in the navigation bar to create a board.
                </h3>
              )}
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    boardData: state.HomepageReducer.boardData,
    loading: state.HomepageReducer.loading,
    error: state.HomepageReducer.error,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(fetchData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
