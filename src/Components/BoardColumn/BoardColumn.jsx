import React, { Component } from "react";
import Style from "./BoardColumn.module.scss";
import Card from "../Cards/Cards";
import axios from "axios";
export default class BoardColumn extends Component {
  handleDragDrop = e => {
    let { columnId, boardId } = this.props;

    e.preventDefault();
    let droppingCardData = JSON.parse(e.dataTransfer.getData("text"));
    console.log(droppingCardData);
    let draggingFromColumnId = droppingCardData.columnId;
    let draggingFromCardId = droppingCardData.dragcardId;
    let draggingFromCardData = droppingCardData.cardData;

    console.log(
      droppingCardData,
      boardId,
      draggingFromColumnId,
      draggingFromCardId
    );
    axios
      .delete(
        `https://redux-pro-organizer-app.firebaseio.com/BoardData/${boardId}/columnData/${draggingFromColumnId}/cardData/${draggingFromCardId}.json`
      )
      .then(res => console.log(res))
      .catch(err => alert("something went wrong," + err.message));

    axios
      .post(
        `https://redux-pro-organizer-app.firebaseio.com/BoardData/${boardId}/columnData/${columnId}/cardData.json`,
        {
          taskTitle: draggingFromCardData.taskTitle,
          taskDescription: draggingFromCardData.taskDescription,
          taskDueDate: draggingFromCardData.taskDueDate,
          taskMembers: draggingFromCardData.taskMembers,
        }
      )
      .then(res => console.log(res))
      .catch(err => {
        alert("something went wrong while dragging," + err.message);
      });
  };
  render() {
    let { columnName, columnId, handleColumnDelete } = this.props;

    return (
      <div className={Style.uppreroutercontainer}>
        <div className={Style.outercontainer}>
          <div className={Style.innercontainer}>
            <h6
              style={{
                fontSize: "18px",
                textTransform: "uppercase",
                marginLeft: "10px",
              }}
            >
              {columnName}
            </h6>
            <span onClick={() => handleColumnDelete(columnId)}>
              <i
                style={{
                  fontSize: "18px",
                  textTransform: "uppercase",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
                class="far  fa-trash-alt"
              ></i>
            </span>
          </div>
          <div
            className={Style.cardelement}
            onDragOver={e => e.preventDefault()}
            onDrop={this.handleDragDrop}
          >
            <Card columnId={columnId}></Card>
          </div>
        </div>
      </div>
    );
  }
}
