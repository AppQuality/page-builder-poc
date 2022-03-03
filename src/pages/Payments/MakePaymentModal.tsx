import {
  Button,
  Modal,
  BSGrid,
  BSCol,
  Text,
} from "@appquality/appquality-design-system";
import { shallowEqual, useSelector } from "react-redux";
import { useAppDispatch } from "src/redux/provider";
import { HourglassSplit } from "react-bootstrap-icons";
import {
  paySelectedRequests,
  togglePaymentModal,
} from "src/redux/adminPayments/actionCreator";
import { useState } from "react";

export const MakePaymentModal = () => {
  const [isRequestsSending, setRequestSending] = useState(false);
  const {
    paymentModal: { isOpen },
    pendingRequests: { selected, processing },
  } = useSelector((state: GeneralState) => state.adminPayments, shallowEqual);
  const dispatch = useAppDispatch();
  const onClose = () => {
    dispatch(togglePaymentModal(false));
  };

  const onPayClick = async () => {
    setRequestSending(true);
    dispatch(paySelectedRequests("pending")).then(() => {
      setRequestSending(false);
    });
  };

  const InitialModalFooter = () => {
    return (
      <BSGrid>
        <BSCol>
          <Button
            onClick={onClose}
            type="primary"
            flat
            size="block"
            disabled={isRequestsSending}
          >
            Cancel
          </Button>
        </BSCol>
        <BSCol>
          <Button onClick={onPayClick} type="primary" flat size="block">
            Pay
          </Button>
        </BSCol>
      </BSGrid>
    );
  };

  const ProgressModalFooter = () => {
    return (
      <Button type="danger" flat size="block">
        Cancel
      </Button>
    );
  };

  const ProgressModalContent = () => {
    return (
      <>
        <Text>
          <strong>Please don’t leave the window.</strong>
        </Text>
        <HourglassSplit />
        <Text>
          {processing.filter((req) => req.status !== "pending").length}/
          {processing.length} processing
        </Text>
      </>
    );
  };

  return (
    <Modal
      size="small"
      isOpen={isOpen}
      onClose={onClose}
      footer={
        isRequestsSending ? <ProgressModalFooter /> : <InitialModalFooter />
      }
      closeOnClickOutside={false}
    >
      <>
        <Text className="aq-mb-3">
          <strong>Pay</strong>
        </Text>
        {isRequestsSending ? (
          <ProgressModalContent />
        ) : (
          `Are you sure you want to pay ${selected.length} request(s)?`
        )}
      </>
    </Modal>
  );
};
