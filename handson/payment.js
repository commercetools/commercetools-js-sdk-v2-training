const { apiRoot } = require("./client");

module.exports.createPayment = async (paymentData) =>
    apiRoot
        .payments()
        .post({ body: createPaymentDraft(paymentData) })
        .execute()
        .then(payment =>
            apiRoot
                .payments()
                .withId({ ID: payment.body.id })
                .post({
                    body: {
                        actions: [
                            {
                                action: "addTransaction",
                                transaction: createTransactionDraft(paymentData)
                            },
                            {
                                action: "setStatusInterfaceCode",
                                interfaceCode: "SUCCES"
                            },
                            {
                                action: "setStatusInterfaceText",
                                interfaceText: "We got the money"
                            }
                        ],
                        version: payment.body.version
                    }
                })
                .execute()
        );

const createPaymentDraft = (paymentData) => {
    const {
        key,
        amountPlanned,
        pspName,
        pspMethod,
        interfaceId,
    } = paymentData;
    return {
        key,
        amountPlanned,
        paymentMethodInfo: {
            paymentInterface: pspName,
            method: pspMethod,
        },
        interfaceId
    };
};

const createTransactionDraft = (paymentData) => {
    return {
        timeStamp: Date.now(),
        type: "Charge",
        amount: paymentData.amountPlanned,
        interactionId: paymentData.interactionId,
        state: "Initial"
    }
};