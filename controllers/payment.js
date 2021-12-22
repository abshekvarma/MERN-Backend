const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "snh9ndkg2t4f5b3j",
  publicKey: "2cdkxczr7ft6y6v8",
  privateKey: "5a57cf13565909c621d9c11cc288656a",
});

exports.getToken = (req, res) => {
  gateway.clientToken.generate({}, (err, response) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(response);
    }
  });
};

exports.processPayment = (req, res) => {
  let nonceFromTheClient = req.body.paymentMethodNonce;
  gateway.transaction.sale(
    {
      amount: req.body.amount,
      paymentMethodNonce: nonceFromTheClient,
      options: {
        submitForSettlement: true,
      },
    },
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        console.log(result);
        res.json(result);
      }
    }
  );
};
