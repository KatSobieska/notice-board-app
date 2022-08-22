import Ad from "../Ad/Ad";

const Ads = ({ ads }) => {
  return (
    <section>
      {ads.map((ad) => (
        <Ad key={ad._id} {...ad} />
      ))}
    </section>
  );
};

export default Ads;
