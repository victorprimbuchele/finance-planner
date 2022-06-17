export type SetterObject = {
  setUpdate: any;
  setDelete: any;
  setFetch: any;
  setLoading: any;
};

export type ModalListProps = {
  isFetched: boolean;
  dataArray: DateCreateAnything[];
  setters: SetterObject;
  url: string;
};

export type DateCreateAnything = {
  id: number | string;
  name: string;
  foreignKey?: number;
};
