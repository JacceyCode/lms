"use client";

import CoursePreview from "@/components/CoursePreview";
import { CustomFormField } from "@/components/CustomFormField";
import Loading from "@/components/Loading";
import SignInComponent from "@/components/SignIn";
import SignUpComponent from "@/components/SignUp";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useCurrentCourse } from "@/hooks/useCurrentCourse";
import { GuestFormData, guestSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

const CheckoutDetailsPage = () => {
  const { course: SelectedCourse, isLoading, isError } = useCurrentCourse();
  const searchParams = useSearchParams();
  const showSignUp = searchParams.get("showSignUp") === "true";

  const methods = useForm<GuestFormData>({
    resolver: zodResolver(guestSchema),
    defaultValues: {
      email: "",
    },
  });

  if (isLoading) return <Loading />;
  if (isError) return <section>Failed to fetch course data</section>;
  if (!SelectedCourse) return <section>Course not found</section>;

  return (
    <section className="checkout-details">
      <section className="checkout-details__container">
        <section className="checkout-details__preview">
          <CoursePreview course={SelectedCourse} />
        </section>

        {/* STRETCH FEATURE */}
        <section className="checkout-details__options">
          <section className="checkout-details__guest">
            <h2 className="checkout-details__title">Guest Checkout</h2>
            <p className="checkout-details__subtitle">
              Enter email to receive course access details and order
              confirmation. You can create an account after purchase.
            </p>
            <Form {...methods}>
              <form
                onSubmit={methods.handleSubmit((data) => {
                  console.log(data);
                })}
                className="checkout-details__form"
              >
                <CustomFormField
                  name="email"
                  label="Email address"
                  type="email"
                  className="w-full rounded mt-4"
                  labelClassName="font-normal text-white-50"
                  inputClassName="py-3"
                />
                <Button type="submit" className="checkout-details__submit">
                  Continue as Guest
                </Button>
              </form>
            </Form>
          </section>

          <section className="checkout-details__divider">
            <hr className="checkout-details__divider-line" />
            <span className="checkout-details__divider-text">Or</span>
            <hr className="checkout-details__divider-line" />
          </section>

          <section className="checkout-details__auth">
            {showSignUp ? <SignUpComponent /> : <SignInComponent />}
          </section>
        </section>
      </section>
    </section>
  );
};

export default CheckoutDetailsPage;
