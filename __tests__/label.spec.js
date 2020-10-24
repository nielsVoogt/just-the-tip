import Label from "@/components/ui/label";
import { shallowMount } from "@vue/test-utils";

describe("Testing Component props", () => {
  const wrapper = shallowMount(Label, {
    propsData: {
      name: "Movie",
    },
  });

  it("checks the prop name", () => {
    expect(wrapper.props().name).toBe("Movie");
  });

  it("checks the label content", () => {
    expect(wrapper.find(".label").text()).toEqual("Movie");
  });
});
