function Contact() {
  return (
    <section className="page-section contact-page">
      <div className="page-heading">
        <p className="eyebrow">GET IN TOUCH</p>
        <h1>Contact Us</h1>
        <p>Have a question? We'd love to hear from you.</p>
      </div>

      <div className="contact-card">
        <div>
          <h2>Let's talk</h2>
          <p>Our support team is available to help with your shopping experience.</p>
          <p><strong>Email:</strong> support@shopnest.example</p>
          <p><strong>Phone:</strong> +91 98765 43210</p>
        </div>

        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="5" required></textarea>
          <button className="btn" type="submit">Send Message</button>
        </form>
      </div>
    </section>
  );
}

export default Contact;