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
import { NavigationSidebarButton } from "../../../Sidebars/Navigation/Button/NavigationSidebarButton";

export const ModalCrud: React.FC<ModalCRUDProps> = ({
  icon,
  inputData,
  handleSubmit,
  schema,
  setters,
  dataArray,
  isFetched,
  url,
  titleMobile,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:flex md:items-center md:justify-center w-full">
      <NavigationSidebarButton
        akg={`btn-${titleMobile}`}
        icon={icon}
        iconSize="lg"
        color="#354674"
        onClick={() => setIsOpen(true)}
      />
      <Button
        type="button"
        className="block md:hidden"
        onClick={() => setIsOpen(true)}
        id="btn-close-modal"
      >
        <span>{titleMobile}</span>
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
              url={url}
            />
          </div>
        </Modal>
      ) : null}
    </div>
  );
};
