import React, { Component } from "react";
import axios from "axios";
import Style from "./AddColumn.module.scss";
import Modal from "../Modal/Modal";
class Add_Column extends Component {
  // const Add_Column = (/*{ boardId, setShowColumn }*/) => {
  //   const [columnName, setColumnName] = useState(undefined);
  //   const [showModal, setShowModal] = useState(false);
  state = {
    columnName: "",
    showModal: false,
  };

  handleAddColumn = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = e => {
    e.preventDefault();
    this.setState({
      showModal: false,
    });
  };
  handleChange = e => {
    e.preventDefault();
    this.setState({
      columnName: e.target.value,
    });
  };
  handleAddColumnToFirebase = e => {
    e.preventDefault();
    const { columnName } = this.state;
    const { boardId } = this.props;
    axios
      .post(
        `https://redux-pro-organizer-app.firebaseio.com/BoardData/${boardId}/columnData.json`,
        { columnName }
      )
      .then(res => {
        this.setState({
          showModal: false,
        });
      })
      .catch(err => {
        alert("something went wrong ," + err.message);
      });
  };
  render() {
    return (
      <div className={Style.container}>
        <div className={Style.title} onClick={this.handleAddColumn}>
          <h6>Add a column</h6>&nbsp;
          <i style={{ fontSize: "20px" }} class="fas fa-folder-plus"></i>
        </div>
        {this.state.showModal && (
          <Modal>
            <div className={Style.addColumn}>
              <h4 className={Style.heading}>Add a column</h4>
            </div>
            <div>
              <form onSubmit={this.handleAddColumnToFirebase}>
                <label htmlFor="column_name">
                  <h5>Enter a column name :</h5>
                </label>{" "}
                <div className={Style.formDiv}>
                  <input
                    type="text"
                    name="column_name"
                    id="column_name"
                    required
                    value={this.state.columnName}
                    onChange={this.handleChange}
                    placeholder="e.g staging,done,etc"
                  />
                </div>
                <div className={Style.buttons}>
                  <button
                    className={Style.btn1}
                    type="submit"
                    id="CreateColumn"
                  >
                    Add Column
                  </button>
                  <button
                    className={Style.btn2}
                    id="close"
                    onClick={this.handleCloseModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </Modal>
        )}
      </div>
    );
  }
}

export default Add_Column;
