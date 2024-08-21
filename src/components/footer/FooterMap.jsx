function FooterMap() {
  return (
    <div className="mb-6">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.84145434373!2d105.76842661441786!3d10.029938975270964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0895a51d60719%3A0x9d76b0035f6d53d0!2sCan%20Tho%20University!5e0!3m2!1sen!2sbd!4v1639207982768!5m2!1sen!2sbd"
        height="150"
        className="w-full"
        style={{ border: 0 }}
        loading="lazy"
      ></iframe>
      <div className="icon">
        <i className="fa fa-map-marker"></i>
      </div>
    </div>
  );
}

export default FooterMap;
