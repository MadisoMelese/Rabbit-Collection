import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// client id: AaI_1HKKqLfxhZcIurPql51fGwboiOuN_knWLOmG3s4DKuCD4LKk8TVjl1eqS61Yczp6wQybYH7yT_cH
// secret: ENFxWwy7MszffdU3bzDADCIekkRGNGe-WGWzfmk8xeJrCugUxcHDCjdDyfxUHRT7aFhjkbVN2cOZgJZl
const PaypalButton = ({amount, onError, onSuccess}) => {
  return (
    <PayPalScriptProvider
    options={{"client-id":import.meta.env.VITE_PAYPAL_CLIENT_ID}}
    >
     <PayPalButtons
     style={{ layout: "vertical" }}
     createOrder={(data, actions) => {
       return actions.order.create({
         purchase_units: [
           {
             amount: {
               value: amount}}],
       });
     }}
     onApprove={(data, actions) => {
        return actions.order.capture().then(onSuccess)
     }}
     onError={onError}
     >
      </PayPalButtons> 
    </PayPalScriptProvider>
  )
}

export default PaypalButton
