import React, { useState } from 'react';
import InputComponent from './common-component/InputComponent';
import {
  TWO_HUNDRED,
  TWO_THOUSAND,
  FIVE_HUNDRED,
  WITHDRAW_AMOUNT,
  DEPOSIT_TITLE,
  DEPOSIT_MESSAGE,
  WITHDRAW_MESSAGE,
  WITHDRAW_ERROR,
  DEPOSIT_ERROR,
} from '../constant/constants';
import MessageComponent from './common-component/MessageComponent';
import { validateOnlyNumbers } from '../utils/Transform';

export default function ShowTransaction() {
  const [transactionAmt, setTransactionAmt] = useState({
    twoHundred: '',
    fiveHundred: '',
    twoThousand: '',
    withdrawAmt: '',
  });
  const [showDeposit, setShowDeposit] = useState('');
  const [popupOpen, setPopupOpen] = useState(false);
  const [withdrawError, setWithdrawError] = useState('');
  const [depositError, setDepositError] = useState('');
  const [totalBalance, setTotalBalance] = useState(0);

  const onInputChange = event => {
    const { name, value } = event.target;
    setTransactionAmt({ ...transactionAmt, [name]: value });
  };

  //Cancel btn
  const onCancelClick = () => {
    setTransactionAmt({
      twoHundred: '',
      fiveHundred: '',
      twoThousand: '',
      withdrawAmt: '',
    });
    setDepositError('');
    setWithdrawError('');
  };

  //Submit btn
  const onSubmitClick = () => {
    if (showDeposit === '2') {
      let isValidWithdraw = validateOnlyNumbers(transactionAmt.withdrawAmt, 'withdraw');
      if (isValidWithdraw && transactionAmt.withdrawAmt <= totalBalance) {
        const withdrawVal = transactionAmt.withdrawAmt ? parseInt(transactionAmt.withdrawAmt) : 0;
        setTotalBalance(totalBalance - withdrawVal);
        setPopupOpen(true);
        setWithdrawError('');
      } else {
        setWithdrawError(WITHDRAW_ERROR);
      }
    } else if (showDeposit === '1') {
      if (transactionAmt.twoHundred || transactionAmt.fiveHundred || transactionAmt.twoThousand) {
        const twoHunVal = transactionAmt.twoHundred ? parseInt(transactionAmt.twoHundred) * 200 : 0;
        const fiveHunVal = transactionAmt.fiveHundred ? parseInt(transactionAmt.fiveHundred) * 500 : 0;
        const twoThoVal = transactionAmt.twoThousand ? parseInt(transactionAmt.twoThousand) * 2000 : 0;
        setTotalBalance(twoHunVal + fiveHunVal + twoThoVal);
        setPopupOpen(true);
        setDepositError('');
      } else {
        setDepositError(DEPOSIT_ERROR);
      }
    } else {
      return null;
    }
  };

  //handle onclose of message component
  const onPopupClose = () => {
    setPopupOpen(false);
  };

  //Deposit Click
  const onDepositClick = () => {
    return (
      <div className="deposit-main">
        <div className="deposit-title">{DEPOSIT_TITLE}</div>
        <InputComponent
          inputLabel={TWO_HUNDRED}
          onInputChange={onInputChange}
          inputName="twoHundred"
          inputVal={transactionAmt.twoHundred}
          classLabel="small-input"
        />
        <InputComponent
          inputLabel={FIVE_HUNDRED}
          onInputChange={onInputChange}
          inputName="fiveHundred"
          inputVal={transactionAmt.fiveHundred}
          classLabel="small-input"
        />
        <InputComponent
          inputLabel={TWO_THOUSAND}
          onInputChange={onInputChange}
          inputName="twoThousand"
          inputVal={transactionAmt.twoThousand}
          classLabel="small-input"
          errorMsg={depositError}
        />
        <div className="btn-container">
          <button className="save-btn" onClick={onSubmitClick}>
            Submit
          </button>
          <button className="cancel-btn" onClick={onCancelClick}>
            Cancel
          </button>
        </div>
      </div>
    );
  };

  //Withdraw Click
  const onWithdrawClick = () => {
    return (
      <div className="withdraw-main">
        <InputComponent
          inputLabel={WITHDRAW_AMOUNT}
          onInputChange={onInputChange}
          inputName="withdrawAmt"
          inputVal={transactionAmt.withdrawAmt}
          classLabel="small-input"
          errorMsg={withdrawError}
        />
        <div className="btn-container">
          <button className="save-btn" onClick={onSubmitClick}>
            Submit
          </button>
          <button className="cancel-btn" onClick={onCancelClick}>
            Cancel
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="show-transaction">
      <div>Total Balance: {totalBalance}</div>
      <div className="btn-container">
        <button className="save-btn" onClick={() => setShowDeposit('1')}>
          Deposit
        </button>
        <button className="cancel-btn" onClick={() => setShowDeposit('2')}>
          Withdraw
        </button>
      </div>
      <div className="transaction-content">
        {showDeposit === '1' ? onDepositClick() : showDeposit === '2' ? onWithdrawClick() : ''}
      </div>
      {popupOpen && (
        <MessageComponent
          modalOpen={popupOpen}
          modalHeader="Transaction Details"
          closeModal={onPopupClose}
          amount={showDeposit === '1' ? totalBalance : showDeposit === '2' ? transactionAmt.withdrawAmt : ''}
          popupMsg={showDeposit === '1' ? DEPOSIT_MESSAGE : showDeposit === '2' ? WITHDRAW_MESSAGE : ''}
        />
      )}
    </div>
  );
}
