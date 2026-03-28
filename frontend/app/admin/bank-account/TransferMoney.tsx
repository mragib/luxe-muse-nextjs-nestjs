"use client";

import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/Modal";
import { FinancialTransactionType } from "@/lib/constants";
import { FinancialAccount } from "@/lib/type";
import CreateMoneyTransferForm from "./CreateMoneyTransferForm";

const TransferMoney = ({
  accounts,
  activity,
}: {
  accounts: FinancialAccount[];
  activity: FinancialTransactionType;
}) => {
  return (
    <Modal>
      <Modal.Open opens="form">
        <Button>
          {activity === FinancialTransactionType.DEPOSIT
            ? "Deposit"
            : activity === FinancialTransactionType.WITHDRAW
              ? "Withdraw"
              : "Transfer"}{" "}
          Money
        </Button>
      </Modal.Open>
      <Modal.Window name="form">
        <CreateMoneyTransferForm activity={activity} accounts={accounts} />
      </Modal.Window>
    </Modal>
  );
};

export default TransferMoney;
