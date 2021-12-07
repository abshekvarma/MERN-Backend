const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "useYourMerchantId",
        publicKey: "useYourPublicKey",
  privateKey: "useYourPrivateKey",
});

exports.getToken = (req, res) => {
          gateway.clientToken.generate({}, (err, response) => {
            if (err) {
              res.status(500).send(err);
            } else {
              res.send(response);
  }
});
}

exports.processPayment() = () => {
    gateway.transaction.sale({
  amount: "10.00",
  paymentMethodNonce: nonceFromTheClient,
  deviceData: deviceDataFromTheClient,
  options: {
    submitForSettlement: true
  }
}, (err, result) => {
});
}