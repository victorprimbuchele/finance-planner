export type ResponseCreateCategory = {
  data: DataCreateCategory[];
};

export type DataCreateCategory = {
  id: number;
  name: string;
  userId: number;
};

export type CategoryFormPayload = {
  category: string;
};
