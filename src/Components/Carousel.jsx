import React from "react";
import pic from "../images/c4.avif";
import pic1 from "../images/a7.avif";
import pic2 from "../images/a3.avif";
import pic3 from "../images/c3.avif";

const Carousel = () => {
  return (
    <div className="container mt-4">
      <section className="row">
        <div className="col-md-12">
          <div
            className="carousel slide"
            id="des"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={pic} className="d-block w-100" alt="Slide 1" />
              </div>
              <div className="carousel-item">
                <img src={pic2} className="d-block w-100" alt="Slide 2" />
              </div>
              <div className="carousel-item">
                <img src={pic1} className="d-block w-100" alt="Slide 3" />
              </div>
              <div className="carousel-item">
                <img src={pic3} className="d-block w-100" alt="Slide 4" />
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#des"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon bg-danger"></span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#des"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon bg-danger"></span>
            </button>
          </div>
        </div>
      </section>

      {/* Custom CSS */}
      <style>
        {`
          .carousel img {
            height: 400px; /* Adjust based on your preference */
            object-fit: cover;
            border-radius:15px;
          }
        `}
      </style>
    </div>
  );
};

export default Carousel;
