import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import AccordionSections from "./AccordionSections";

const CoursePreview = ({ course }: CoursePreviewProps) => {
  const price = formatPrice(course.price);

  return (
    <section className="course-preview">
      <section className="course-preview__container">
        <section className="course-preview__image-wrapper">
          <Image
            src={course.image || "/placeholder.png"}
            alt="Course Preview"
            width={640}
            height={360}
            className="w-full"
          />
        </section>
        <section>
          <h2 className="course-preview__title">{course.title}</h2>
          <p className="text-gray-400 text-md mb-4">by {course.teacherName}</p>
          <p className="text-sm text-customgreys-dirtyGrey">
            {course.description}
          </p>
        </section>

        <section>
          <h4 className="text-white-50/90 font-semibold mb-2">
            Course Content
          </h4>
          <AccordionSections sections={course.sections} />
        </section>
      </section>

      <section className="course-preview__container">
        <h3 className="text-xl mb-4">Price Details (1 item)</h3>
        <section className="flex justify-between mb-4 text-customgreys-dirtyGrey text-base">
          <span className="font-bold">1x {course.title}</span>
          <span className="font-bold">{price}</span>
        </section>
        <section className="flex justify-between border-t border-customgreys-dirtyGrey pt-4">
          <span className="font-bold text-lg">Total Amount</span>
          <span className="font-bold text-lg">{price}</span>
        </section>
      </section>
    </section>
  );
};

export default CoursePreview;
