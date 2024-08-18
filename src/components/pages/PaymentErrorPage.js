
import "./PaymentErrorPage.css"

const PaymentErrorPage = () => {
  return (
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-5">
          <div class="message-box _success _failed">
            <i class="fa fa-times-circle" aria-hidden="true"></i>
            <h3> Your payment failed. Try again later </h3>
            <p> Try again with another method or card </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentErrorPage