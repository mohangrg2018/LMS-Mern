import React from "react";
import { Button } from "../ui/button";
import { assets } from "@/assets/assets";

const CallToAction = () => {
  return (
    <section className="container__width flex flex-col items-center gap-6">
      <h3 className="font-bold">Learn anything, anytime, anywhere</h3>
      <p className="text-gray-400 text-center">
        Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id
        veniam aliqua proident excepteur commodo do ea.
      </p>
      <div>
        <Button>Get Started</Button>
        <Button variant="link">
          Learn more <img src={assets.arrow_icon} alt="" />
        </Button>
      </div>
    </section>
  );
};

export default CallToAction;
