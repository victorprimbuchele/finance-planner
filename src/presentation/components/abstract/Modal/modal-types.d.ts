export type IModalParams = {
  closeButton?: boolean;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  hasTopBar?: boolean;
};
