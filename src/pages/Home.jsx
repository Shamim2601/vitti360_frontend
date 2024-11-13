import React from 'react';
import { Link } from 'react-router-dom';
import { FaQuestionCircle, FaNewspaper, FaBlog, FaBook, FaUserGraduate, FaBriefcase, FaPencilAlt } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto p-4">
        <header className="text-center py-10">
          <h1 className="text-4xl font-bold text-blue-700 mb-2">
            ভর্তিযোদ্ধা ও চাকরিপ্রত্যাশীদের সব ধরনের সহযোগিতা
          </h1>
          <p className="text-xl text-gray-600">Allround Support for Admission and Job Seekers</p>
        </header>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <SectionLink
            to="/support?category=job"
            icon={<FaBriefcase className="text-4xl text-indigo-500 mb-4" />}
            title="চাকরি সহায়তা"
            description="চাকরির আবেদন এবং প্রস্তুতিতে সহায়তা পান।"
          />
          <SectionLink
            to="/support?category=admission"
            icon={<FaUserGraduate className="text-4xl text-yellow-500 mb-4" />}
            title="ভর্তি সহায়তা"
            description="ভর্তি প্রক্রিয়া এবং ফরম পূরণে সাহায্য নিন।"
          />
          <SectionLink
            to="/circulars"
            icon={<FaNewspaper className="text-4xl text-green-500 mb-4" />}
            title="ভর্তি ও চাকরির সার্কুলার"
            description="সর্বশেষ ভর্তি এবং সরকারি চাকরির সার্কুলার দেখতে ক্লিক করুন।"
          />
          <SectionLink
            to="/forum"
            icon={<FaQuestionCircle className="text-4xl text-blue-500 mb-4" />}
            title="প্রশ্নোত্তর ফোরাম"
            description="এখানে প্রশ্ন করুন এবং অভিজ্ঞদের থেকে উত্তর পান।"
          />
          <SectionLink
            to="/blogs"
            icon={<FaBlog className="text-4xl text-purple-500 mb-4" />}
            title="ব্লগ এবং নিবন্ধ"
            description="উপকারী তথ্য এবং নির্দেশিকা সম্বলিত ব্লগ পড়ুন।"
          />
          <SectionLink
            to="/bookshop"
            icon={<FaBook className="text-4xl text-red-500 mb-4" />}
            title="অনলাইন বুক শপ"
            description="ভর্তি এবং চাকরির প্রস্তুতির জন্য প্রয়োজনীয় বইগুলি কিনুন।"
          />
          <SectionLink
            to="/exams"
            icon={<FaPencilAlt className="text-4xl text-orange-500 mb-4" />}
            title="অনলাইন প্র্যাকটিস এক্সাম"
            description="ভর্তি ও চাকরির পরীক্ষার জন্য অনলাইনে অনুশীলন করুন।"
          />
        </div>

        {/* Featured Content Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8 text-blue-700">আমাদের বিশেষ সেবাসমূহ</h2>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>ভর্তি ও চাকরির পরীক্ষার প্রস্তুতি সহায়তা</li>
              <li>ভর্তি ও চাকরির আবেদন ফরম পূরণে সহায়তা</li>
              <li>কারিয়ার পরামর্শ</li>
              <li>মক টেস্ট এবং অনলাইন কুইজ</li>
              <li>স্টাডি ম্যাটেরিয়াল এবং নোট শেয়ারিং</li>
              <li>লাইভ ওয়েবিনার এবং ওয়ার্কশপ</li>
              <li>অনলাইন প্র্যাকটিস এক্সাম</li>
            </ul>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4 text-blue-700">আজই যোগ দিন!</h2>
          <p className="text-gray-600 mb-6">আপনার ক্যারিয়ার লক্ষ্যে পৌঁছাতে আমরা সাহায্য করব</p>
          <Link
            to="/signup"
            className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
          >
            JOIN US
          </Link>
        </section>
      </div>
    </div>
  );
}

const SectionLink = ({ to, icon, title, description }) => (
  <Link to={to} className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-200 flex flex-col items-center text-center">
    {icon}
    <h2 className="text-xl font-semibold text-blue-700 mb-2">{title}</h2>
    <p className="text-gray-600">{description}</p>
  </Link>
);

export default Home;