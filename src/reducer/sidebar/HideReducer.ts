export interface HideStateProps {
  isHidden: boolean;
}

export interface HideActionProps {
  type: "TOGGLE";
  payload: boolean;
}

export const hide = {
  isHidden: true,
};

export const hideIt = (state: HideStateProps, action: HideActionProps) => {
  switch (action.type) {
    case "TOGGLE":
      return {
        ...state,
        isHidden: !state.isHidden,
      };
    default:
      return state;
  }
};
