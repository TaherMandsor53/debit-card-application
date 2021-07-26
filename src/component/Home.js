import React, { useState } from 'react';
import InputComponent from './common-component/InputComponent';
import { APP_HEADER, ACCOUNT_NO_LABEL, ACCOUNT_PIN_LABEL } from '../constant/constants';
import { validateOnlyNumbers } from '../utils/Transform';
import ShowTransaction from './ShowTransaction';

export default function Home(props) {
  const [cardDetails, setCardDetails] = useState({
    accountNo: '',
    cardPin: '',
  });
  const [cardDetailsError, setCardDetailsError] = useState({
    accountNo: '',
    cardPin: '',
  });
  const [showForm, setShowForm] = useState(true);

  const onInputChange = event => {
    const { name, value } = event.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const onCancelClick = () => {
    setCardDetails({
      accountNo: '',
      cardPin: '',
    });
    setCardDetailsError({
      accountNo: '',
      cardPin: '',
    });
  };

  const onSaveClick = () => {
    let isValidAccount = validateOnlyNumbers(cardDetails.accountNo);
    let isValidCardPin = cardDetails.cardPin && cardDetails.cardPin.length === 4;
    if (isValidAccount && isValidCardPin) {
      setShowForm(false);
    } else {
      setCardDetailsError(prevState => ({
        ...prevState,
        accountNo: !isValidAccount ? 'Please enter only 12 digits' : '',
        cardPin: !isValidCardPin ? 'Please enter a valid pin' : '',
      }));
    }
  };

  //Initial Form
  const showFormDetails = () => {
    return (
      <>
        <InputComponent
          inputLabel={ACCOUNT_NO_LABEL}
          onInputChange={onInputChange}
          inputName="accountNo"
          inputVal={cardDetails.accountNo}
          errorMsg={cardDetailsError.accountNo}
        />
        <InputComponent
          inputLabel={ACCOUNT_PIN_LABEL}
          onInputChange={onInputChange}
          inputName="cardPin"
          inputVal={cardDetails.cardPin}
          type="password"
          errorMsg={cardDetailsError.cardPin}
        />
        <div className="btn-container">
          <button className="save-btn" onClick={onSaveClick}>
            Save
          </button>
          <button className="cancel-btn" onClick={onCancelClick}>
            Cancel
          </button>
        </div>
      </>
    );
  };

  return (
    <div className="home-main">
      <div className="home-title">{APP_HEADER}</div>
      <div className="content">{showForm ? showFormDetails() : <ShowTransaction />}</div>
    </div>
  );
}
