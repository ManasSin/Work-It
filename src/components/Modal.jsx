const Modal = ({ mini, body }) => {
  return (
    <div
      className={`
            border-[1px]
            rounded-md
            absolute
            ${
              mini
                ? `
              px-0
              py-2
              top-20
              right-1
              w-[10%]
              md:w-[25%]
              lg:w-[30%]
              h-[10%]
              md:h-[25%]
              lg:h-[30%]
            `
                : `
            px-3
            py-2.5
            w-[80vw]
            md:w-[60vw]
            lg:w-[40vw]
            h-[80vw]
            md:h-[60vw]
            lg:h-[40vw]
            inset-0
          `
            }
          `}
    >
      {body}
    </div>
  );
};

export default Modal;
