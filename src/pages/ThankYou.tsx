
import { Link } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ThankYou = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-16">
        <div className="container-custom">
          <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-abbaquar-purple text-center">
              Your Donation is Almost Complete!
            </h1>
            
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            
            <div className="prose max-w-none mb-8">
              <p>
                In order to make an offline donation we ask that you please follow these instructions:
              </p>
              
              <ol className="list-decimal pl-6 space-y-2 my-4">
                <li>Make a check payable to "Abbaquar-san Dream Centre"</li>
                <li>On the memo line of the check, please indicate that the donation is for "Abbaquar-san Dream Centre"</li>
                <li>
                  Please mail your check to:
                  <br />
                  <strong>Abbaquar-san Royal House Association</strong>
                  <br />
                  FNB Gold Business Account
                  <br />
                  Acc No: 62935811621
                  <br />
                  Branch code: 250135
                </li>
              </ol>
              
              <p>
                All contributions will be gratefully acknowledged and are tax deductible.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/" 
                className="bg-abbaquar-purple text-white px-8 py-3 rounded-md font-medium text-center hover:bg-opacity-90 transition-all"
              >
                Return to Home
              </Link>
              <Link 
                to="/contact" 
                className="border border-abbaquar-purple text-abbaquar-purple px-8 py-3 rounded-md font-medium text-center hover:bg-abbaquar-purple hover:text-white transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ThankYou;
