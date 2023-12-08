import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import { userData } from "../navbar/auth/User";
// This value is from the props in the UI
const style: Record<string, string> = { layout: "vertical", color: "black" };

// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({
  currency,
  showSpinner,
  total,
  submit,
  cart,
  removeFromCart,
}: any) => {
  const [{ isPending }] = usePayPalScriptReducer();
  const navigate = useNavigate();
  const { email } = userData();

  const handleSaveOrder = () => {
    submit();
    if (email) {
      const deleteCartAfterPayment = cart.map((item: any) => {
        removeFromCart({ cartItemId: item.id });
      });
      return deleteCartAfterPayment;
    }
  };
  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[style, currency, total]}
        fundingSource={undefined}
        createOrder={(data, actions) =>
          actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: total,
                  },
                },
              ],
            })
            .then((orderId) => orderId)
        }
        onApprove={async (data, actions) =>
          await actions.order?.capture().then(async (res: any) => {
            // onSuccess();
            if (res.status === "COMPLETED") {
              submit();
              if (email) {
                const deleteCartAfterPayment = cart.map((item: any) => {
                  removeFromCart({ cartItemId: item.id });
                });
                navigate("/cart");
                return deleteCartAfterPayment;
              }
            }
          })
        }
        onCancel={() => console.log("User cancelled")}
        onError={(err) => console.error("PayPal Error:", err)}
      />
    </>
  );
};

export default function Paypal({ total, submit, cart, removeFromCart }: any) {
  const initialOptions = {
    clientId:
      "AfsZxgmolivQPIyH1MQKelDFSJyHibC1WLicsVFbFe7hO_mu8MiiH-zUW3tWeJ0wAbLOC5or4bzdawvJ",
    currency: "USD",
    intent: "capture",
  };
  return (
    <div style={{ maxWidth: "auto", minHeight: "180px" }}>
      <PayPalScriptProvider options={initialOptions}>
        <ButtonWrapper
          currency={"USD"}
          total={total}
          showSpinner={false}
          submit={submit}
          cart={cart}
          removeFromCart={removeFromCart}
        />
      </PayPalScriptProvider>
    </div>
  );
}
