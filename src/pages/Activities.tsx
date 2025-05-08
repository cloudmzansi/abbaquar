import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Activities from "@/components/Activities";

const ActivitiesPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-[#073366] text-white py-20 mt-24">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Our Activities</h1>
            <p className="text-xl text-center max-w-3xl mx-auto">
              Join Our Community and discover what we offer. We provide various activities to engage, 
              educate, and empower members of our community.
            </p>
          </div>
        </section>

        <Activities />
      </main>
      <Footer />
    </div>
  );
};

export default ActivitiesPage;
