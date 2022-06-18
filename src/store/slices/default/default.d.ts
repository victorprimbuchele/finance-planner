export type UpdatePayload = {
  id: number | string;
  name: string;
};

export type ActionProps = {
  url: string;
  setter: any;
};

export interface FetchActionProps extends ActionProps {
  loading: any;
}

export interface DeleteActionProps extends ActionProps {
  id: string | number;
}

export interface UpdateActionProps extends ActionProps {
  payload: UpdatePayload;
}

export type ResponseCreateAnything = {
  data: DataCreateAnything[];
};

export type DataCreateAnything = {
  id: number;
  name: string;
  userId: number;
};
