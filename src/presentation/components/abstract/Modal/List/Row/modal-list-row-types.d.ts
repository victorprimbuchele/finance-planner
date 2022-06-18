import { DateCreateAnything } from "../modal-list-types";

export interface ModalListRowProps extends DateCreateAnything {
  url: string;
  setUpdate: any;
  setDelete: any;
}
