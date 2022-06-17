// third
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// my
import { Button } from "../../Button/Button";
import { Form } from "../../Form/Form";
import { NeumorphicButton } from "../../Neumorphic/Button/NeumorphicButton";
import { ModalList } from "../List/ModalList";
import { Modal } from "../Modal";
import { ModalCRUDProps } from "./modal-crud";

export const ModalCrud: React.FC<ModalCRUDProps> = ({
  icon,
  inputData,
  handleSubmit,
  schema,
  setters,
  dataArray,
  isFetched,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:flex md:items-center md:justify-center w-full">
      <NeumorphicButton
        lala="btn-logout"
        className="hidden md:w-full md:h-auto md:flex md:justify-center"
        onClick={() => setIsOpen(true)}
      >
        <FontAwesomeIcon
          icon={icon}
          className="hidden md:block"
          size="lg"
          color="#354674"
        />
      </NeumorphicButton>
      <Button
        type="button"
        className="block md:hidden"
        onClick={() => setIsOpen(true)}
      >
        <span>Category</span>
      </Button>
      {isOpen ? (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div className="flex flex-col justify-center">
            <div className="flex flex-row text-center justify-center items-center font-sans text-lg text-slate-700">
              <Form
                input={inputData}
                onSubmit={handleSubmit}
                schema={schema}
                buttonClass="w-auto my-2"
              />
            </div>
            <ModalList
              dataArray={dataArray}
              isFetched={isFetched}
              setters={setters}
              url={"/categories"}
            />
          </div>
        </Modal>
      ) : null}
    </div>
  );
};
