import { forwardRef } from "react";

const TagInput = forwardRef(function TagInput(props, ref) {
  return (
    <input
      {...props}
      ref={ref}
      className="tag-input"
      type="text"
      placeholder="Tag name"
    ></input>
  );
});

export default TagInput;
