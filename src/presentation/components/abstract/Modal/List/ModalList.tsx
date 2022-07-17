import { useEffect } from "react";
import { handleFetch } from "../../handlers/CRUD/handlersCRUD";
import { ModalListProps } from "./modal-list-types";
import { ModalListRow } from "./Row/ModalListRow";

export const ModalList: React.FC<ModalListProps> = ({
  isFetched,
  dataArray,
  url,
  setters,
}) => {
  useEffect(() => {
    if (typeof url === "string") {
      if (!isFetched)
        handleFetch({
          url,
          setter: setters.setFetch,
          loading: setters.setLoading,
        });

      return () => {};
    }

    if (!isFetched)
      handleFetch({
        url: url.list,
        setter: setters.setFetch,
        loading: setters.setLoading,
      });
  }, []);

  return (
    <>
      {dataArray.map((data) => {
        return (
          <ModalListRow
            id={data.id}
            name={data.name}
            foreignKey={data.foreignKey}
            key={data.id}
            url={url}
            setUpdate={setters.setUpdate}
            setDelete={setters.setDelete}
          />
        );
      })}
    </>
  );
};
