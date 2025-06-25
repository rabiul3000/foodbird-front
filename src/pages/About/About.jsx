import React from "react";
import { Link } from "react-router";
const About = () => {
  return (
    <div className="mx-auto w-10/12 flex flex-col">
      <div className="flex lg:flex-row flex-col gap-16 justify-around items-center p-16">
        <div>
          <img src="https://i.ibb.co/dJxbd4S6/15855.jpg" alt="banner" />
        </div>
        <div className="w-80">
          <h1 className="text-2xl font-semibold">
            From food delivery to your daily convenience companion.
          </h1>
        </div>
      </div>

      <div className="flex lg:flex-row-reverse flex-col gap-16 justify-around items-center p-16">
        <div>
          <img src="https://i.ibb.co/84B68wFg/9175292-6520.jpg" alt="banner" />
        </div>
        <div className="w-80">
          <h1 className="text-2xl font-semibold">
            Plan for today tomorrow focus on today.
          </h1>
        </div>
      </div>

      <div className="flex lg:flex-row flex-col gap-16 justify-around items-center p-16 bg-secondary-content">
        <div>
          <img
            src="https://i.ibb.co/MDBVFYG1/team-7278740-1920.jpg"
            alt="banner"
          />
        </div>
        <div className="w-80 space-y-2">
          <h1 className="text-3xl font-semibold">
            Join Our Platform Right Now!
          </h1>
          <p>
            Hungry for growth? There's a seat at our table! We're looking for
            the best in tech, marketing, sales, logistics, account management
            and more. Explore career opportunities at FoodBird.
          </p>

          <Link to={"/login"} className="btn btn-secondary rounded-2xl">
            Join Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
