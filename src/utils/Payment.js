import { notify } from "./notify";

export const startPayment = (applicationId) => {
  return new Promise((resolve, reject) => {
    // Create order on the server
    fetch(
      `${import.meta.env.VITE_API_BASE_URL}/payments/create-order/${applicationId}`,
      {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      },
    )
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Failed to create payment order");
        }
        return res.json();
      })
      .then((order) => {
        const options = {
          key: "rzp_test_Sr7e3cxuLQjO3S",
          amount: order.amount,
          currency: order.currency,
          order_id: order.razorpayOrderId,

          handler: async function (response) {
            try {
              const verifyRes = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/payments/verify`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                  },
                  body: JSON.stringify(response),
                },
              );

              if (!verifyRes.ok) {
                const data = await verifyRes.json();
                notify(data.message , "error");
                reject(new Error("Payment verification failed"));
                return;
              }

              // Resolve ONLY after verification
              resolve(response);
            } catch (err) {
              reject(err);
            }
          },

          modal: {
            ondismiss: function () {
              reject(new Error("Payment cancelled by user"));
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      })
      .catch((err) => {
        reject(err);
        console.log(err);
      });
  });
};

export const PayPendingBalance = (applicationId) => {
  return new Promise((resolve, reject) => {
    // Create order on the server
    fetch(
      `${import.meta.env.VITE_API_BASE_URL}/payments/create-balance-order/${applicationId}`,
      {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      },
    )
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json();
          notify(data.message , "error")
          throw new Error("Failed to create payment order");
        }
        return res.json();
      })
      .then((order) => {
        const options = {
          key: "rzp_test_Sr7e3cxuLQjO3S",
          amount: order.amount,
          currency: order.currency,
          order_id: order.razorpayOrderId,

          handler: async function (response) {
            try {
              const verifyRes = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/payments/verify`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                  },
                  body: JSON.stringify(response),
                },
              );

              if (!verifyRes.ok) {
                const data = await verifyRes.json();
                notify(data.message , "error");
                reject(new Error("Payment verification failed"));
                return;
              }

              // Resolve ONLY after verification
              resolve(response);
            } catch (err) {
              reject(err);
            }
          },

          modal: {
            ondismiss: function () {
              reject(new Error("Payment cancelled by user"));
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      })
      .catch((err) => {
        reject(err);
        console.log(err);
      });
  });
};
