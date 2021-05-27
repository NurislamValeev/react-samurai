import React from "react";
import {create} from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
   test("status from props should be in state", () => {
      const component = create(<ProfileStatus status="hao min"/>)
      const instance = component.getInstance()
      expect(instance.state.status).toBe("hao min")
   })

   test("after creation <span> with status should be displayed", () => {
      const component = create(<ProfileStatus status="hao min"/>)
      const root = component.root
      let span = root.findByType("span")
      expect(span).not.toBeNull()
   })

   test("after creation <input> with status shouldn't be displayed", () => {
      const component = create(<ProfileStatus status="hao min"/>)
      const root = component.root
      expect(() => {
         let input = root.findByType("input")
      }).toThrow()
   })

   test("after creation span with status should contain correct status", () => {
      const component = create(<ProfileStatus status="hao min"/>)
      const root = component.root
      let span = root.findByType("span")
      expect(span.children[0]).toBe("hao min")
   })

   test("input should be displayed in editMode instead of span", () => {
      const component = create(<ProfileStatus status="hao min"/>)
      const root = component.root

      let span = root.findByType("span")
      span.props.onDoubleClick()

      let input = root.findByType("input")
      expect(input.props.value).toBe("hao min")
   })

   test("callback should be called", () => {
      const mockCallback = jest.fn()
      const component = create(<ProfileStatus status="hao min" updateStatus={mockCallback}/>)
      const instance = component.getInstance()
      instance.deactivateEditMode()
      expect(mockCallback.mock.calls.length).toBe(1)
   })

})