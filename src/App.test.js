import React from "react";
// import { render } from "@testing-library/react";
import CreateBoardPage from "./Pages/CreateBoard Page/CreateBoardPage";
import App from "./App";
import { mount } from "enzyme";

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
