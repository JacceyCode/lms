import { formatPrice } from "@/lib/utils";
import Image from "next/image";

const CourseCardSearch = ({
  course,
  isSelected,
  onClick,
}: SearchCourseCardProps) => {
  return (
    <section
      onClick={onClick}
      className={`course-card-search group ${
        isSelected
          ? "course-card-search--selected"
          : "course-card-search--unselected"
      }`}
    >
      <section className="course-card-search__image-container">
        <Image
          src={course.image || "/placeholder.png"}
          alt={course.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="course-card-search__image"
        />
      </section>
      <section className="course-card-search__content">
        <section>
          <h2 className="course-card-search__title">{course.title}</h2>
          <p className="course-card-search__description">
            {course.description}
          </p>
        </section>
        <section className="mt-2">
          <p className="course-card-search__teacher">By {course.teacherName}</p>
          <section className="course-card-search__footer">
            <span className="course-card-search__price">
              {formatPrice(course.price)}
            </span>
            <span className="course-card-search__enrollment">
              {course.enrollments?.length} Enrolled
            </span>
          </section>
        </section>
      </section>
    </section>
  );
};

export default CourseCardSearch;
