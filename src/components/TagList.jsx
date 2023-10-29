import {
  useFloating,
  useHover,
  useInteractions,
  useTransitionStyles,
  offset,
} from "@floating-ui/react";
import { useState } from "react";

import { getHTMLElementDescription } from "../html-elements";

function Tag({ value }) {
  const [isOpen, setIsOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "top",
    middleware: [offset(6)],
  });
  const hover = useHover(context);
  useInteractions([hover]);
  const { isMounted, styles } = useTransitionStyles(context);
  const tagDescription = getHTMLElementDescription(value);

  return (
    <>
      <div className="tag" ref={refs.setReference}>
        <code>&lt;{value}&gt;</code>
      </div>
      {isMounted && tagDescription && (
        <div
          ref={refs.setFloating}
          className="tooltip"
          style={{ ...floatingStyles, ...styles }}
        >
          {tagDescription}
        </div>
      )}
    </>
  );
}

export default function TagList({ tags }) {
  return (
    <div className="tag-list">
      {tags.map((tag) => (
        <Tag key={tag} value={tag} />
      ))}
    </div>
  );
}
