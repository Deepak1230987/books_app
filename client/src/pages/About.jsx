const About = () => {
    return (
      <section className="bg-gradient-to-b from-white to-gray-100 py-16 px-6 md:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">About BookNest</h2>
          <p className="text-lg text-gray-600 mb-6">
            Welcome to <span className="font-semibold text-blue-600">BookNest</span> – your smart digital library.
            We’re redefining how you discover, read, and engage with books.
            Whether you're a casual reader or a curious learner, BookNest delivers a personalized and seamless experience.
          </p>
          <div className="text-gray-700 text-md space-y-4">
            <p>
              With AI-powered features like book summaries, voice reading, and interactive Q&A, BookNest makes reading smarter and more interactive.
            </p>
            <p>
              Explore thousands of books, track your reading habits, and get suggestions tailored to your taste and learning goals.
            </p>
            <p>
              Built with love using modern web technologies to ensure speed, accessibility, and a delightful user experience.
            </p>
          </div>
        </div>
      </section>
    );
  };
  
  export default About;
  