import AccordionSections from "@/components/AccordionSections";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

const SelectedCourse = ({ course, handleEnrollNow }: SelectedCourseProps) => {
  return (
    <section className="selected-course">
      <section>
        <h3 className="selected-course__title">{course.title}</h3>
        <p className="selected-course__author">
          By {course.teacherName} |{" "}
          <span className="selected-course__enrollment-count">
            {course.enrollments?.length}
          </span>
        </p>
      </section>

      <section className="selected-course__content">
        <p className="selected-course__description">{course.description}</p>

        <section className="selected-course__sections">
          <h4 className="selected-course__sections-title">Course content</h4>

          {/* ACCORDION SECTIONS */}
          <AccordionSections sections={course.sections} />
        </section>

        <section className="selected-course__footer">
          <span className="selected-course__price">
            {formatPrice(course.price)}
          </span>
          <Button
            className="bg-primary-700 hover:bg-primary-600"
            onClick={() => handleEnrollNow(course.courseId)}
          >
            Enroll Now
          </Button>
        </section>
      </section>
    </section>
  );
};

export default SelectedCourse;
