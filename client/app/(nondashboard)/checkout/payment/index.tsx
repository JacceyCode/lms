import CoursePreview from "@/components/CoursePreview";
import { Button } from "@/components/ui/button";
import { useCheckoutNavigation } from "@/hooks/useCheckoutNavigation";
import { useCurrentCourse } from "@/hooks/useCurrentCourse";
import { useCreateTransactionMutation } from "@/state/api";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { CreditCard } from "lucide-react";
import { toast } from "sonner";
import StripeProvider from "./StripeProvider";

const PaymentPageContent = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [createTransaction] = useCreateTransactionMutation();
  const { navigateToStep } = useCheckoutNavigation();
  const { course, courseId } = useCurrentCourse();
  const { user } = useUser();
  const { signOut } = useClerk();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error("Stripe service is not available");
      return;
    }

    const baseUrl = process.env.NEXT_PUBLIC_LOCAL_URL
      ? `http://${process.env.NEXT_PUBLIC_LOCAL_URL}`
      : process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : undefined;

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${baseUrl}/checkout?step=3&id=${courseId}`,
      },
      redirect: "if_required",
    });

    if (result.paymentIntent?.status === "succeeded") {
      const transactionData: Partial<Transaction> = {
        transactionId: result.paymentIntent.id,
        userId: user?.id,
        courseId: courseId,
        paymentProvider: "stripe",
        amount: course?.price || 0,
      };

      await createTransaction(transactionData);
      navigateToStep(3);
    }
  };

  const handleSignOutAndNavigate = async () => {
    await signOut();
    navigateToStep(1);
  };

  if (!course) return null;

  return (
    <section className="payment">
      <section className="payment__container">
        <section className="payment__preview">
          <CoursePreview course={course} />
        </section>

        {/* Payment Form */}
        <section className="payment__form-container">
          <form
            id="payment-form"
            onSubmit={handleSubmit}
            className="payment__form"
          >
            <section className="payment__content">
              <h1 className="payment__title">Checkout</h1>
              <p className="payment__subtitle">
                Fill out the payment details below to complete your purchase.
              </p>

              <section className="payment__method">
                <h3 className="payment__method-title">Payment Method</h3>

                <section className="payment__card-container">
                  <section className="payment__card-header">
                    <CreditCard size={24} />
                    <span>Credit/Debit Card</span>
                  </section>

                  <section className="payment__card-element">
                    <PaymentElement />
                  </section>
                </section>
              </section>
            </section>
          </form>
        </section>
      </section>

      {/* navigation buttons */}
      <section className="payment__actions">
        <Button
          className="hover:bg-white-50/10"
          onClick={handleSignOutAndNavigate}
          variant="outline"
          type="button"
        >
          Switch Account
        </Button>

        <Button
          form="payment-form"
          type="submit"
          className="payment__submit"
          disabled={!stripe || !elements}
        >
          Pay with Credit Card
        </Button>
      </section>
    </section>
  );
};

const PaymentPage = () => {
  return (
    <StripeProvider>
      <PaymentPageContent />
    </StripeProvider>
  );
};

export default PaymentPage;
