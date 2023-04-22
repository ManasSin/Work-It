const Tooltip = ({ body: text, direction }) => {
  return (
    <toot-tip
      inert
      role="tooltip"
      tip-position={direction}
      className="absolute"
    >
      {text}
    </toot-tip>
  );
};

export default Tooltip;
