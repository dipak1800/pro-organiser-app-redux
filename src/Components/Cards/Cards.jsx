import React, { Component, Fragment } from "react";
import { withRouter } from "react-router";
import Style from "./Cards.module.scss";
import axios from "axios";
import Modal from "../Modal/Modal";
import swal from "sweetalert";
class Cards extends Component {
  state = {
    boardName: this.props.match.params.boardName,
    boardId: this.props.location.state.boardId,
    showModal: false,
    showCardDetails: false,
    boardMembers: this.props.location.state.boardMembers,
    taskTitle: "",
    taskDueDate: "",
    taskDescription: "",
    taskMembers: [],
    cardDetails: {},
    cardDetailsTitle: "",
    cardDetailsDueDate: "",
    cardDetailsDescription: "",
    cardDetailsMembers: [],
    cardId: "",
    editCardDetails: false,
    columnId: this.props.columnId,
    todayDate: new Date().toISOString().slice(0, 10),
  };
  componentDidMount() {
    this.getCardDetails();
  }
  componentDidUpdate(prevProps, prevState) {
    this.getCardDetails();
  }

  getCardDetails = () => {
    let { boardId, columnId } = this.state;
    axios
      .get(
        `https://redux-pro-organizer-app.firebaseio.com/BoardData/${boardId}/columnData/${columnId}/cardData.json`
      )
      .then(res => {
        this.setState({
          cardDetails: res.data,
        });
      })
      .catch(err => {
        alert("something went wrong , " + err.message);
      });
  };
  handleAddCard = () => {
    this.setState({
      showModal: true,
      editCardDetails: false,
    });
  };
  handleInsertCard = e => {
    e.preventDefault();
    let {
      taskDescription,
      taskDueDate,
      taskMembers,
      taskTitle,
      cardDetailsDescription,
      cardDetailsMembers,
      cardDetailsDueDate,
      cardDetailsTitle,
      editCardDetails,
      boardId,
      columnId,
      cardId,
      todayDate,
    } = this.state;
    if (editCardDetails) {
      axios
        .put(
          `https://redux-pro-organizer-app.firebaseio.com/BoardData/${boardId}/columnData/${columnId}/cardData/${cardId}.json`,
          {
            taskTitle: taskTitle == "" ? cardDetailsTitle : taskTitle,
            taskMembers: taskMembers == "" ? cardDetailsMembers : taskMembers,
            taskDescription:
              taskDescription == "" ? cardDetailsDescription : taskDescription,
            taskDueDate: taskDueDate == "" ? cardDetailsDueDate : taskDueDate,
          }
        )
        .then(res =>
          swal("The card is Edited sucessfully 😃", {
            icon: "success",
            buttons: false,
            timer: 3000,
          })
        )
        .catch(err => alert(err.message));
      this.setState({
        editCardDetails: false,
        showModal: false,
      });
    } else {
      if (!(taskDueDate < todayDate)) {
        axios
          .post(
            `https://redux-pro-organizer-app.firebaseio.com/BoardData/${boardId}/columnData/${columnId}/cardData.json`,
            {
              taskTitle,
              taskMembers,
              taskDescription,
              taskDueDate,
            }
          )
          .then(res => console.log(res.data))
          .catch(err => {
            alert("s0mething went wrong ," + err.message);
          });
        this.setState({
          showModal: false,
          taskDescription: "",
          taskDueDate: "",
          taskTitle: "",
          taskMembers: [],
        });
      } else {
        swal("Invalid Date", "You can't select past date as DUEDATE", "info");
      }
    }
  };
  handleCardDetailsClick = (
    taskTitle,
    taskDescription,
    taskDueDate,
    taskMembers,
    cardId
  ) => {
    this.setState({
      showCardDetails: true,
      cardDetailsTitle: taskTitle,
      cardDetailsDescription: taskDescription,
      cardDetailsDueDate: taskDueDate,
      cardDetailsMembers: taskMembers,
      cardId: cardId,
    });
  };
  handleCardDetailsEdit = () => {
    this.setState({
      showModal: true,
      editCardDetails: true,
      showCardDetails: false,
    });
  };
  handleCardDetailsArchive = () => {
    let { cardDetailsTitle, boardId, columnId, cardId } = this.state;
    swal({
      title: "Are you sure?",
      text: `${cardDetailsTitle.toUpperCase()} card will be deleted`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(willDelete => {
      if (willDelete) {
        return (
          axios
            .delete(
              `https://redux-pro-organizer-app.firebaseio.com/BoardData/${boardId}/columnData/${columnId}/cardData/${cardId}.json`
            )
            .then(response => {
              this.setState({
                showCardDetails: false,
              });
            })
            .catch(err => alert("something went wrong," + err.message)),
          swal(
            `${this.state.cardDetailsTitle.toUpperCase()} card Deleted Succesfully`,
            {
              icon: "success",
            }
          )
        );
      } else {
        swal(`${cardDetailsTitle.toUpperCase()} card not Deleted 😁!`);
      }
    });
  };
  handleDragging = (dragcardId, cardData, e) => {
    console.log(dragcardId);
    let { columnId } = this.state;
    let draggedCardDetails = {
      columnId,
      dragcardId: dragcardId,
      cardData,
    };
    e.dataTransfer.setData("text", JSON.stringify(draggedCardDetails));
  };

  render() {
    let { cardDetails } = this.state;
    return (
      <>
        {cardDetails &&
          Object.entries(cardDetails).map(card => (
            <Fragment key={card[0]}>
              <div
                draggable
                onDragStart={e => this.handleDragging(card[0], card[1], e)}
                className={Style.addedcard}
                onClick={() =>
                  this.handleCardDetailsClick(
                    card[1].taskTitle,
                    card[1].taskDescription,
                    card[1].taskDueDate,
                    card[1].taskMembers,
                    card[0]
                  )
                }
              >
                <div
                  style={{
                    textTransform: "uppercase",
                    display: "flex",
                  }}
                >
                  <h4>{card[1].taskTitle}</h4>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <i style={{ fontSize: "22px" }} class="fas fa-tasks"></i>
                  <div style={{ display: "flex", margin: "0px 3px" }}>
                    {card[1].taskMembers.map((member, i) => (
                      <div key={i} className={Style.members}>
                        {member.charAt(0)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Fragment>
          ))}
        <div
          onClick={this.handleAddCard}
          id="AddACard"
          className={Style.cardelement}
        >
          <h4 style={{ textAlign: "center" }}>Add a card</h4>
        </div>
        {this.state.showModal && (
          <Modal>
            {this.state.editCardDetails ? (
              <h2 className={Style.title}>Edit Card Details</h2>
            ) : (
              <h2 className={Style.title}>Add Card</h2>
            )}

            <form onSubmit={this.handleInsertCard}>
              <label className="ml-3" htmlFor="task_title">
                <h3>Enter a title for your task</h3>
              </label>{" "}
              <div className={Style.formDiv}>
                <input
                  type="text"
                  name="task_title"
                  id="title"
                  defaultValue={
                    this.state.editCardDetails
                      ? this.state.cardDetailsTitle
                      : ""
                  }
                  required
                  placeholder="e.g Add a new icon"
                  onChange={e =>
                    this.setState({
                      taskTitle: e.target.value,
                    })
                  }
                />
              </div>
              <label className="ml-3" htmlFor="task_members">
                <h3>
                  Choose members for this task(select multiple ,if needed)
                </h3>
              </label>
              <div className={Style.formDiv}>
                <select
                  name="task_members"
                  id="members"
                  multiple
                  defaultValue={
                    this.state.editCardDetails
                      ? this.state.cardDetailsMembers
                      : ""
                  }
                  required
                  onChange={e => {
                    let selectedoptions = e.target.selectedOptions;
                    let members = [...selectedoptions].map(
                      member => member.value
                    );
                    // console.log(members);
                    this.setState({
                      taskMembers: members,
                    });
                  }}
                >
                  {this.state.boardMembers.split(",").map(member => (
                    <option key={member} value={member}>
                      {member}
                    </option>
                  ))}
                </select>
              </div>
              <label className="ml-3" htmlFor="task_description">
                <h3>Add the description for your task</h3>
              </label>{" "}
              <div className={Style.formDiv}>
                <input
                  type="text"
                  name="task_description"
                  id="description"
                  defaultValue={
                    this.state.editCardDetails
                      ? this.state.cardDetailsDescription
                      : ""
                  }
                  placeholder="Add your description here"
                  required
                  onChange={e =>
                    this.setState({
                      taskDescription: e.target.value,
                    })
                  }
                />
              </div>
              <label className="ml-3" htmlFor="task_due_date">
                <h3>Select the due date for this task</h3>
              </label>
              <div className={Style.formDiv}>
                <input
                  type="date"
                  name="task_due_date"
                  id="due_date"
                  defaultValue={
                    this.state.editCardDetails
                      ? this.state.cardDetailsDueDate
                      : ""
                  }
                  required
                  onChange={e =>
                    this.setState({
                      taskDueDate: e.target.value,
                    })
                  }
                />
              </div>
              <div className={Style.buttons}>
                {this.state.editCardDetails ? (
                  <button className={Style.btn1} type="submit" id="CreateCard">
                    Edit Card
                  </button>
                ) : (
                  <button className={Style.btn1} type="submit" id="CreateCard">
                    Add Card
                  </button>
                )}
                <button
                  className={Style.btn2}
                  id="closeCard"
                  onClick={() => {
                    this.setState({
                      showModal: false,
                      editCardDetails: false,
                    });
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </Modal>
        )}
        {this.state.showCardDetails && (
          <Modal>
            <div>
              <div className={Style.cardDetails}>
                <div>
                  <h2 className={Style.cardtitle}>
                    {this.state.cardDetailsTitle}
                  </h2>
                </div>
                <div className={Style.handleButtons}>
                  <button
                    className={Style.btn1}
                    id="edit"
                    onClick={this.handleCardDetailsEdit}
                  >
                    Edit
                  </button>
                  <button
                    className={Style.btn2}
                    id="archive"
                    onClick={this.handleCardDetailsArchive}
                  >
                    Archive
                  </button>
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <span style={{ margin: "3px 10px", fontWeight: "600" }}>
                  in<h4 className={Style.boardtype}>{this.state.boardName}</h4>
                </span>
              </div>
              <hr />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  margin: "15px 0px",
                }}
              >
                <h3 style={{ color: "#1b1464" }}>Description</h3>
                <p>{this.state.cardDetailsDescription}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  margin: "15px 0px",
                }}
              >
                <h3 style={{ color: "#1b1464" }}>Members</h3>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    margin: "15px 0px",
                  }}
                >
                  {this.state.cardDetailsMembers.map((member, i) => (
                    <div key={i} className={Style.membersboard}>
                      {member.charAt(0)}
                    </div>
                  ))}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  margin: "15px 0px",
                }}
              >
                <h3 style={{ color: "#1b1464" }}>Due Date </h3>
                <p>{this.state.cardDetailsDueDate}</p>
              </div>
            </div>
            <button
              class={Style.button}
              onClick={() => {
                this.setState({ showCardDetails: false });
              }}
            >
              Cancel
            </button>
          </Modal>
        )}
      </>
    );
  }
}
export default withRouter(Cards);
