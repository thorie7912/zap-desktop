import React from 'react'
import PropTypes from 'prop-types'
import { FaDollar, FaBitcoin } from 'react-icons/lib/fa'
import { MdClose } from 'react-icons/lib/md'
import { btc } from '../../../../../utils'
import styles from './Form.scss'

const Form = ({
  form: { formType, amount, message, payment_request },
  setAmount,
  setMessage,
  setPaymentRequest,
  ticker: { currency, btcTicker },
  isOpen,
  close,
  createInvoice,
  payInvoice,
  fetchInvoice,
  formInvoice
}) => {
  const requestClicked = () => {
    createInvoice(amount, message, currency, btcTicker.price_usd)
    close()
  }

  const payClicked = () => {
    payInvoice(payment_request)
    close()
  }

  const paymentRequestOnChange = (payreq) => {
    setPaymentRequest(payreq)
    if (payreq.length === 124) { fetchInvoice(payreq) }
  }

  const calculateAmount = value => (currency === 'btc' ? btc.satoshisToBtc(value) : btc.satoshisToUsd(value, btcTicker.price_usd))

  return (
    <div className={`${styles.formContainer} ${isOpen ? styles.open : ''}`}>
      <div className={styles.container}>
        <div className={styles.esc} onClick={close}>
          <MdClose />
        </div>
        <div className={styles.content}>
          <section className={styles.amountContainer}>
            <label htmlFor='amount'>
              {
                currency === 'btc' ?
                  <FaBitcoin />
                  :
                  <FaDollar />
              }
            </label>
            <input
              type='text'
              size=''
              style={
                formType === 'pay' ?
                  { width: '75%', fontSize: '100px' }
                  :
                  { width: `${amount.length > 1 ? (amount.length * 15) - 5 : 25}%`, fontSize: `${190 - (amount.length ** 2)}px` }
              }
              value={formType === 'pay' ? calculateAmount(formInvoice.amount) : amount}
              onChange={event => setAmount(event.target.value)}
              readOnly={formType === 'pay'}
              id='amount'
            />
          </section>
          {
            formType === 'pay' ?
              <section className={styles.inputContainer}>
                <label htmlFor='paymentRequest'>Request:</label>
                <input
                  type='text'
                  placeholder='Payment Request'
                  value={payment_request}
                  onChange={event => paymentRequestOnChange(event.target.value)}
                  id='paymentRequest'
                />
              </section>
              :
              <section className={styles.inputContainer}>
                <label htmlFor='message'>For:</label>
                <input
                  type='text'
                  placeholder='Dinner, Rent, etc'
                  value={message}
                  onChange={event => setMessage(event.target.value)}
                  id='message'
                />
              </section>
          }
          {
            formType === 'pay' ?
              <section className={styles.buttonGroup}>
                <div className={styles.button} onClick={payClicked}>
                  Pay
                </div>
              </section>
              :
              <section className={styles.buttonGroup}>
                <div className={styles.button} onClick={requestClicked}>
                  Request
                </div>
              </section>
          }
        </div>
      </div>
    </div>
  )
}

Form.propTypes = {
  form: PropTypes.object.isRequired,
  ticker: PropTypes.object.isRequired,
  setAmount: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  setPaymentRequest: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  createInvoice: PropTypes.func.isRequired,
  payInvoice: PropTypes.func.isRequired,
  fetchInvoice: PropTypes.func.isRequired,
  formInvoice: PropTypes.object.isRequired
}

export default Form
