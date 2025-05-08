import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Donate = () => {
  const [amount, setAmount] = useState("50.00");
  const [selectedAmount, setSelectedAmount] = useState("50.00");
  const { toast } = useToast();
  const navigate = useNavigate();

  const predefinedAmounts = ["50.00", "100.00", "200.00", "500.00"];

  const merchantId = import.meta.env.VITE_PAYFAST_MERCHANT_ID;
  const merchantKey = import.meta.env.VITE_PAYFAST_MERCHANT_KEY;
  const isSandbox = import.meta.env.VITE_PAYFAST_SANDBOX === 'true';

  const baseUrl = isSandbox ? 'https://sandbox.payfast.co.za' : 'https://www.payfast.co.za';

  const handleAmountClick = (amt: string) => {
    setSelectedAmount(amt);
    setAmount(amt);
  };
  
  const handleCustomAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(value) || value === '') {
      setAmount(value);
      setSelectedAmount('custom');
    }
  };

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid donation amount",
        variant: "destructive"
      });
      return;
    }
    // Redirect to PayFast sandbox payment link
    const payfastUrl = `${baseUrl}/eng/process?merchant_id=${merchantId}&merchant_key=${merchantKey}` +
      `&return_url=${encodeURIComponent(window.location.origin + '/thank-you')}` +
      `&cancel_url=${encodeURIComponent(window.location.origin + '/donate')}` +
      `&notify_url=${encodeURIComponent(window.location.origin + '/api/payfast-notify')}` +
      `&amount=${selectedAmount}&item_name=${encodeURIComponent('Donation to Abbaquar')}`;
    window.location.href = payfastUrl;
  };

  return (
    <>
      <span id="donate" className="block h-0 w-0 -mt-24" aria-hidden="true"></span>
      <section className="py-24 bg-gradient-to-b from-[#073366] to-[#0A2647]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-[#D72660] font-semibold mb-4 block">Make a Difference</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white font-serif">Support Our Cause</h2>
            <p className="text-lg text-gray-200 max-w-3xl mx-auto">
              Your donation helps us continue our mission of uplifting and supporting our community. Every contribution makes a difference.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <form onSubmit={handleDonate} className="space-y-8">
                <div>
                  <label className="block text-gray-700 text-lg font-semibold mb-4">Select Amount</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {predefinedAmounts.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        className={`py-4 px-6 border-2 rounded-xl transition-all font-semibold ${
                          selectedAmount === amt 
                            ? 'bg-[#D72660] text-white border-[#D72660]' 
                            : 'border-gray-200 text-gray-700 hover:border-[#D72660] hover:text-[#D72660]'
                        }`}
                        onClick={() => handleAmountClick(amt)}
                      >
                        R{amt}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="amount" className="block text-gray-700 text-lg font-semibold mb-4">Custom Amount</label>
                  <div className="flex items-center border-2 rounded-xl overflow-hidden focus-within:border-[#D72660] transition-all">
                    <span className="bg-gray-50 px-6 py-4 text-gray-500 font-semibold border-r-2">R</span>
                    <input
                      type="text"
                      id="amount"
                      value={amount}
                      onChange={handleCustomAmount}
                      className="flex-1 px-6 py-4 outline-none text-lg"
                      placeholder="Enter your amount"
                    />
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-[#D72660] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-opacity-90 transition-all"
                >
                  Donate Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Donate;
