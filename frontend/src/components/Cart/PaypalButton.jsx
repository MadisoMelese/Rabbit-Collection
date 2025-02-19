import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// client id: AaI_1HKKqLfxhZcIurPql51fGwboiOuN_knWLOmG3s4DKuCD4LKk8TVjl1eqS61Yczp6wQybYH7yT_cH
// secret: ENFxWwy7MszffdU3bzDADCIekkRGNGe-WGWzfmk8xeJrCugUxcHDCjdDyfxUHRT7aFhjkbVN2cOZgJZl
const PaypalButton = () => {
  return (
    <PayPalScriptProvider
    options={{"client-id":"AaI_1HKKqLfxhZcIurPql51fGwboiOuN_knWLOmG3s4DKuCD4LKk8TVjl1eqS61Yczp6wQybYH7yT_cH"}}
    >
     <PayPalButtons
     style={{ layout: "vertical" }}
     >
      </PayPalButtons> 
    </PayPalScriptProvider>
  )
}

export default PaypalButton
