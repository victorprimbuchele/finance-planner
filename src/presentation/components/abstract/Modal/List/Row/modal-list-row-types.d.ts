import { DateCreateAnything, IUrlProps } from "../modal-list-types";

export interface ModalListRowProps extends DateCreateAnything {
  url: string | IUrlProps;
  setUpdate: any;
  setDelete: any;
}
