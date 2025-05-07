
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Donate = () => {
  const [amount, setAmount] = useState("50.00");
  const [selectedAmount, setSelectedAmount] = useState("50.00");
  const { toast } = useToast();
  const navigate = useNavigate();

  const predefinedAmounts = ["50.00", "100.00", "200.00", "500.00"];

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
    
    // Navigate to thank you page
    navigate('/thank-you');
  };

  return (
    <section id="donate" className="section-padding bg-gradient-to-r from-abbaquar-purple to-purple-800 text-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Donate</h2>
            <p className="text-xl mb-8">
              Support Abbaquar
            </p>
            <p className="mb-6">
              A little donation goes a long way. Select an amount below or enter your desired amount.
            </p>
          </div>

          <div className="bg-white text-abbaquar-dark rounded-lg p-8 shadow-lg">
            <form onSubmit={handleDonate}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {predefinedAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    className={`py-3 px-4 border rounded-md transition-all ${
                      selectedAmount === amt 
                        ? 'bg-abbaquar-purple text-white border-abbaquar-purple' 
                        : 'border-gray-300 hover:border-abbaquar-purple'
                    }`}
                    onClick={() => handleAmountClick(amt)}
                  >
                    R{amt}
                  </button>
                ))}
              </div>
              
              <div className="mb-6">
                <label htmlFor="amount" className="block text-gray-700 mb-2">Or enter custom amount:</label>
                <div className="flex items-center border rounded-md overflow-hidden">
                  <span className="bg-gray-100 px-4 py-3 border-r">R</span>
                  <input
                    type="text"
                    id="amount"
                    value={amount}
                    onChange={handleCustomAmount}
                    className="flex-1 px-4 py-3 outline-none"
                    placeholder="Enter amount"
                  />
                </div>
              </div>
              
              <button 
                type="submit" 
                className="w-full btn-secondary"
              >
                Donate Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Donate;
