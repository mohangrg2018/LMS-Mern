import { assets, dummyTestimonial } from "@/assets/assets";
import React from "react";
import { Link } from "react-router-dom";

const TestimonialsSection = () => {
  return (
    <section className="container__width flex flex-col items-center gap-6">
      <h2>Testimonials</h2>
      <p className="text-gray-400 text-center">
        Hear from our learners as they share their journeys of transformation,
        success, and how our
        <br /> platform has made a difference in their lives.
      </p>
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {dummyTestimonial.map((testimonial, index) => (
          <div key={index} className="flex flex-col gap-4 border rounded-md">
            <div className="flex items-center gap-4 p-6 bg-gray-100 rounded-t-md">
              <img
                src={testimonial.image}
                alt="profile image"
                className="w-20"
              />
              <div>
                <p className="font-bold">{testimonial.name}</p>
                <p>{testimonial.role}</p>
              </div>
            </div>
            <div className="px-6 flex flex-col gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <img key={index} src={assets.star} alt="" className="w-5" />
                ))}
              </div>
              <p className="text-gray-400">{testimonial.feedback}</p>
              <Link to="#" className="text-primary underline">
                Read more
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
