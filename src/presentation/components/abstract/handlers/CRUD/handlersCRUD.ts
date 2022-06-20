import {
  DeleteActionProps,
  FetchActionProps,
  UpdateActionProps,
} from "../../../../../store/slices/default/default";
import {
  deleteAnything,
  fetchAnything,
  updateAnything,
} from "../../../../../store/slices/default/default.slice";
import { store } from "../../../../../store/store";

const dispatch = store.dispatch;

const handleFetch = async (action: FetchActionProps) => {
  const { payload } = await dispatch(
    fetchAnything({
      url: action.url,
      setter: action.setter,
      loading: action.loading,
    })
  );

  return payload;
};

const handleDelete = async (action: DeleteActionProps) => {
  await dispatch(
    deleteAnything({
      url: action.url,
      id: action.id,
      setter: action.setter,
    })
  );
};

const handleUpdate = async (action: UpdateActionProps) => {
  await dispatch(
    updateAnything({
      url: action.url,
      payload: {
        id: action.payload.id,
        name: action.payload.name,
      },
      setter: action.setter,
    })
  );
};

export { handleFetch, handleDelete, handleUpdate };
