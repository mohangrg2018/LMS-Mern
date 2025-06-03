import { assets } from "@/assets/assets";

const Companies = () => {
  return (
    <section className="container__width flex flex-col items-center gap-10">
      <p className="text-gray-400">Trusted by learners from</p>
      <div className="flex items-center gap-10 md:gap-16">
        <img
          src={assets.microsoft_logo}
          alt="microsoft logo"
          className="w-20 md:w-28"
        />
        <img
          src={assets.walmart_logo}
          alt="walmart logo"
          className="w-20 md:w-28"
        />
        <img
          src={assets.accenture_logo}
          alt="accenture logo"
          className="w-20 md:w-28"
        />
        <img
          src={assets.adobe_logo}
          alt="adobe logo"
          className="w-20 md:w-28"
        />
        <img
          src={assets.paypal_logo}
          alt="paypal logos"
          className="w-20 md:w-28"
        />
      </div>
    </section>
  );
};

export default Companies;
