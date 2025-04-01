import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-slate-200 last:border-none">
      <button
        className="w-full py-6 text-left flex justify-between items-center focus:outline-none"
        onClick={onClick}
      >
        <span className="text-lg font-medium text-slate-900">{question}</span>
        <svg
          className={`w-6 h-6 text-slate-500 transform transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? 'max-h-96 pb-6' : 'max-h-0'
        }`}
      >
        <p className="text-slate-600">{answer}</p>
      </div>
    </div>
  );
};

const Welcome = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqData = [
    {
      question: "How does the digital library work?",
      answer: "Our digital library provides instant access to thousands of books through our web platform. Simply sign up, browse our collection, and start reading on any device. Your progress and bookmarks sync automatically across all your devices."
    },
    {
      question: "What types of books are available?",
      answer: "We offer a wide range of books including fiction, non-fiction, academic texts, and periodicals. Our collection spans multiple genres and is regularly updated with new releases and classic literature."
    },
    {
      question: "How much does it cost?",
      answer: "We offer several subscription tiers starting from a free basic plan. Premium plans start at $9.99/month and include additional features like offline reading, advanced note-taking, and access to exclusive content."
    },
    {
      question: "Can I read books offline?",
      answer: "Yes, with our premium subscription you can download books for offline reading. Simply mark the books you want to read offline, and they'll be available even without an internet connection."
    },
    {
      question: "How do I track my reading progress?",
      answer: "Our app automatically tracks your reading progress across all books. You can set reading goals, view detailed statistics, and get insights about your reading habits through our intuitive dashboard."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Book Library
              </span>
            </div>
            <div className="flex gap-4">
              <Link
                to="/login"
                className="text-slate-600 hover:text-slate-900 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:shadow-lg hover:shadow-blue-500/25"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-24 pb-8 sm:pt-32 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 tracking-tight">
              Your Personal
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Digital Library</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-600">
              Transform your reading experience with our digital library platform. Access your favorite books anytime, anywhere.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all hover:shadow-lg hover:shadow-blue-500/25"
              >
                Get Started
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl border-2 border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition-all"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all">
            <div className="h-12 w-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Digital Library</h3>
            <p className="text-slate-600">Access thousands of books from any device, anytime. Your library is always with you.</p>
          </div>

          {/* Feature 2 */}
          <div className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all">
            <div className="h-12 w-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Track Progress</h3>
            <p className="text-slate-600">Monitor your reading goals and track your progress with detailed analytics.</p>
          </div>

          {/* Feature 3 */}
          <div className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all">
            <div className="h-12 w-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Smart Features</h3>
            <p className="text-slate-600">Enjoy smart bookmarking, notes, and personalized recommendations.</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white mt-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-2">Frequently Asked Questions</h2>
          <p className="text-slate-600 text-center mb-12">Everything you need to know about our digital library platform</p>
          
          <div className="divide-y divide-slate-200 rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
            {faqData.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFAQ === index}
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="flex space-x-6">
              <a href="#" className="text-slate-500 hover:text-slate-900 transition-colors">
                Instagram
              </a>
              <a href="#" className="text-slate-500 hover:text-slate-900 transition-colors">
                Twitter
              </a>
              <a href="#" className="text-slate-500 hover:text-slate-900 transition-colors">
                Facebook
              </a>
            </div>
            <div className="flex space-x-8">
              <Link to="/about" className="text-slate-500 hover:text-slate-900 transition-colors">
                About
              </Link>
              <Link to="/privacy" className="text-slate-500 hover:text-slate-900 transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="text-slate-500 hover:text-slate-900 transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Welcome;
