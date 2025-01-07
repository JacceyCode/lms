"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

const CompletionPage = () => {
  return (
    <section className="completion">
      <section className="completion__content">
        <section className="completion__icon">
          <Check className="w-16 h-16" />
        </section>
        <h1 className="completion__title">COMPLETED</h1>
        <p className="completion__message">
          🎉 You have made a course purchase successfully! 🎉
        </p>
      </section>
      <section className="completion__support">
        <p>
          Need help? Contact our{" "}
          <Button variant="link" asChild className="p-0 m-0 text-primary-700">
            <a href="mailto:support@example.com">customer support</a>
          </Button>
          .
        </p>
      </section>
      <section className="completion__action">
        <Link href="user/courses" scroll={false}>
          Go to Courses
        </Link>
      </section>
    </section>
  );
};

export default CompletionPage;
