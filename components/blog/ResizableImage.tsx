import React, { useRef } from "react";
import { NodeViewWrapper, NodeViewProps, ReactNodeViewRenderer } from "@tiptap/react";
import Image from "@tiptap/extension-image";

const ResizableImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        parseHTML: (element) => element.getAttribute("width"),
        renderHTML: (attributes) => (attributes.width ? { width: attributes.width } : {}),
      },
      textAlign: {
        default: "left",
        parseHTML: (element) => element.getAttribute("data-text-align") || "left",
        renderHTML: (attributes) => ({
          "data-text-align": attributes.textAlign,
        }),
      },
    };
  },
  renderHTML({ node, HTMLAttributes }) {
    const alignments = {
      left: "margin-right: auto",
      center: "margin-right: auto; margin-left: auto",
      right: "margin-left: auto",
    };
    return [
      "figure",
      [
        "img",
        {
          ...HTMLAttributes,
          style: alignments[node.attrs.textAlign as "left" | "center" | "right"],
          src: node.attrs.src,
          width: node.attrs.width,
        },
      ],
    ];
  },
  addNodeView() {
    return ReactNodeViewRenderer(ResizableImageNodeView);
  },
});

export default ResizableImage;

const ResizableImageNodeView: React.FC<NodeViewProps> = (props) => {
  const { node, updateAttributes } = props;
  const imageRef = useRef<HTMLImageElement>(null);

  const onMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const startX = event.clientX;
    const startWidth = imageRef.current?.offsetWidth || 0;

    const onMouseMove = (e: MouseEvent) => {
      const diff = e.clientX - startX;
      const newWidth = Math.max(50, startWidth + diff);
      updateAttributes({ width: newWidth + "px" });
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <NodeViewWrapper
      style={{
        display: "block",
        textAlign: node.attrs.textAlign,
      }}
    >
      <div style={{ position: "relative", display: "inline-block" }}>
        <img
          ref={imageRef}
          src={node.attrs.src}
          alt=""
          style={{
            width: node.attrs.width || "auto",
            display: "block",
          }}
        />
        <div
          onMouseDown={onMouseDown}
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "10px",
            height: "10px",
            background: "#007aff",
            cursor: "nwse-resize",
          }}
        />
      </div>
    </NodeViewWrapper>
  );
};
