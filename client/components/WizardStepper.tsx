import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { Fragment } from "react";

const WizardStepper = ({ currentStep }: WizardStepperProps) => {
  return (
    <section className="wizard-stepper">
      <section className="wizard-stepper__container">
        {[1, 2, 3].map((step, index) => (
          <Fragment key={index}>
            <section className="wizard-stepper__step">
              <section
                className={cn("wizard-stepper__circle", {
                  "wizard-stepper__circle--completed":
                    currentStep > step || (currentStep === 3 && step === 3),
                  "wizard-stepper__circle--current":
                    currentStep === step && step !== 3, // Fix for the last step
                  "wizard-stepper__circle--upcoming": currentStep < step,
                })}
              >
                {currentStep > step || (currentStep === 3 && step === 3) ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{step}</span>
                )}
              </section>
              <p
                className={cn("wizard-stepper__text", {
                  "wizard-stepper__text--active": currentStep >= step,
                  "wizard-stepper__text--inactive": currentStep < step,
                })}
              >
                {step === 1 ? "Details" : step === 2 ? "Payment" : "Completion"}
              </p>
            </section>
            {index < 2 && (
              <section
                className={cn("wizard-stepper__line", {
                  "wizard-stepper__line--completed": currentStep > step,
                  "wizard-stepper__line--incomplete": currentStep <= step,
                })}
              />
            )}
          </Fragment>
        ))}
      </section>
    </section>
  );
};

export default WizardStepper;
