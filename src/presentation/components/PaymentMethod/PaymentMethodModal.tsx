// Third
import * as yup from "yup";
import { useSelector } from "react-redux";

// My
import PaymentMethodFormData from "../../../data/form/payment-method/payment-method-form-data.json";
import { RootState, useAppDispatch } from "../../../store/store";
import { ModalCrud } from "../abstract/Modal/CRUD/ModalCRUD";
import {
  addNewPaymentMethod,
  removePaymentMethodFromList,
  setIsFetched,
  setPaymentMethodList,
  updatePaymentMethodInList,
} from "../../../store/slices/payment-method/payment-method.slice";
import { PaymentMethodFormPayload } from "../../../store/slices/payment-method/payment-method";

export const PaymentMethodModal: React.FC = () => {
  const dispatch = useAppDispatch();

  const paymentMethods = useSelector((state: RootState) => state.paymentMethod);

  const schema = yup.object({
    paymentMethod: yup.string().required().min(3),
  });

  const handleSubmit = async (payload: PaymentMethodFormPayload) => {
    try {
      await dispatch(addNewPaymentMethod(payload.paymentMethod));
      document.getElementById(PaymentMethodFormData[0].name)!.value = "";
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ModalCrud
      icon="credit-card"
      inputData={PaymentMethodFormData}
      dataArray={paymentMethods.paymentMethods}
      handleSubmit={handleSubmit}
      schema={schema}
      setters={{
        setUpdate: updatePaymentMethodInList,
        setFetch: setPaymentMethodList,
        setLoading: setIsFetched,
        setDelete: removePaymentMethodFromList,
      }}
      isFetched={paymentMethods.isFetched}
      url="/payment-methods"
      titleMobile="Payment Methods"
    />
  );
};
