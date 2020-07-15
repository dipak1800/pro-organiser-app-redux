import React from "react";
// import { render } from "@testing-library/react";
import CreateBoardPage from "./Pages/CreateBoard Page/CreateBoardPage";
import Homepage from "./Pages/Homepage/Homepage";
import App from "./App";
import { mount } from "enzyme";
import AddColumn from "./Components/AddColumn/AddColumn";
import Cards from "./Components/Cards/Cards";

describe("Navbar testing", () => {
  test("should have a home as well as createboard for navigating", () => {
    const wrapper = mount(<App />);
    // console.log(wrapper.debug());
    expect(wrapper.find(".list1").text()).toBe("Home");
    expect(wrapper.find(".list2").text()).toBe(" Create a Board");
    expect(wrapper.find("h1").text()).toBe("Pro-Organizer");
  });
});

describe("Create Board Page Testing", () => {
  it("should have a input as creteboard with id name and type as text", () => {
    const wrapper = mount(<CreateBoardPage />);
    // console.log(wrapper.debug());
    expect(wrapper.find("input#name")).toHaveLength(1);
    expect(wrapper.find("#name").prop("type")).toEqual("text");
  });
  it("should have a input as boardMembers with id team  and type as text", () => {
    const wrapper = mount(<CreateBoardPage />);
    expect(wrapper.find("input#team")).toHaveLength(1);
    expect(wrapper.find("#team").prop("type")).toEqual("text");
  });
  it("should have a input as boardType with id type  and type as text", () => {
    const wrapper = mount(<CreateBoardPage />);
    expect(wrapper.find("input#type")).toHaveLength(1);
    expect(wrapper.find("#type").prop("type")).toEqual("text");
  });
  it("should have a button as boardSubmit with id CreateBoard  and type as submit", () => {
    const wrapper = mount(<CreateBoardPage />);
    expect(wrapper.find("#CreateBoard")).toHaveLength(1);
    expect(wrapper.find("#CreateBoard").prop("type")).toEqual("submit");
    expect(wrapper.find("#CreateBoard").text()).toEqual("Create");
  });
});
// describe("Add column Testing ", () => {
//   it("should have input as column name with id column_name and type as text", () => {
//     const wrapper = mount(<AddColumn />);
//     console.log(wrapper.debug());
//     expect(wrapper.find("input#column_name")).toHaveLength(1);
//     expect(wrapper.find("#column_name").prop("type")).toEqual("text");
//   });
//   it("should have button as addColumn with id CreateColumn", () => {
//     const wrapper = mount(<AddColumn />);
//     expect(wrapper.find("#CreateColumn")).toHaveLength(1);
//     expect(wrapper.find("#CreateColumn").text()).toBe("Add Column");
//   });
// });

// describe("Add cardtesting ", () => {
//   it("should have input as card title with id title  and type as text", () => {
//     const wrapper = mount(<Cards />);
//     console.log(wrapper.debug());
//     expect(wrapper.find("input#title")).toHaveLength(1);
//     expect(wrapper.find("#title").prop("type")).toEqual("text");
//   });
//   it("should have input as card description  with id description   and type as text", () => {
//     const wrapper = mount(<Cards />);
//     // console.log(wrapper.debug());
//     expect(wrapper.find("input#description")).toHaveLength(1);
//     expect(wrapper.find("#description").prop("type")).toEqual("text");
//   });
//   it("should have input as card title with id title  and type as text", () => {
//     const wrapper = mount(<Cards />);
//     // console.log(wrapper.debug());
//     expect(wrapper.find("input#due_date")).toHaveLength(1);
//     expect(wrapper.find("#due_date").prop("type")).toEqual("text");
//   });
// });
