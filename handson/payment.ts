import { Money, PaymentDraft, TransactionDraft } from "@commercetools/platform-sdk";
import { apiRoot } from "./client";

export interface PaymentDraftData {
    key: string;
    amountPlanned: Money;
    pspName: string
    pspMethod: string
    interfaceId: string;
    interactionId: string;
}

export const createPayment = async (paymentDraftData: PaymentDraftData) =>
    apiRoot
        .payments()
        .post({ body: createPaymentDraft(paymentDraftData) })
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
                                transaction: createTransactionDraft(paymentDraftData)
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

const createPaymentDraft = (paymentDraftData: PaymentDraftData): PaymentDraft => {
    const {
        key,
        amountPlanned,
        pspName,
        pspMethod,
        interfaceId,
    } = paymentDraftData;
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

const createTransactionDraft = (paymentDraftData: PaymentDraftData): TransactionDraft => {
    return {
        type: "Charge",
        amount: paymentDraftData.amountPlanned,
        interactionId: paymentDraftData.interactionId,
        state: "Initial",
        timestamp: new Date().toISOString()
    }
};