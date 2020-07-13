import React, { Component } from "react";
import Style from "./BoardColumn.module.scss";
import Card from "../Cards/Cards";
export default class BoardColumn extends Component {
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
            // onDragOver={e => e.preventDefault()}
            // onDrop={handleDragDrop}
          >
            <Card columnId={columnId}></Card>
          </div>
        </div>
      </div>
    );
  }
}
