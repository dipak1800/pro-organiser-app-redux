import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("Navbar testing", () => {
  test("should have a home as well as createboard for navigating", () => {
    const wrapper = mount(<App />);
    console.log(wrapper.debug());
    expect(wrapper.find(".list1").text()).toBe("Home");
    expect(wrapper.find(".list2").text()).toBe("Create a Board");
    expect(wrapper.find("h1").text()).toBe("Pro-Organizer");
  });
});
