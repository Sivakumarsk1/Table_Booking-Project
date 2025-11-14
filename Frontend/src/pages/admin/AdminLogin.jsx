import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, this would validate against a backend
    if (credentials.username === 'admin' && credentials.password === 'admin') {
      localStorage.setItem('adminToken', 'dummy-token');
      navigate('/admin');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="bg-[#00000042] rounded-lg shadow-lg p-8">
          {/* Avatar */}
          <div className="flex justify-center mb-6">
            <img
              src="https://ui-avatars.com/api/?name=Admin&background=1e3a8a&color=fff&font-size=0.33" // Replace with actual avatar URL
              alt="Admin Avatar"
              className="w-16 h-16 rounded-full border-4 border-primary"
            />
          </div>

          <h1 className="text-3xl font-bold text-[#D8AB3E] mb-6 text-center">Login</h1>

          {error && (
            <div className="bg-red-200 text-red-700 px-4 py-2 rounded mb-4 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Username Field */}
              <div className="bg-[#ffffff2e] p-4 rounded-lg shadow-sm border border-gray-300">
                <label className="block text-sm font-medium text-[#D8AB3E] mb-2">Username.</label>
                <input
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                  className="w-full px-4 py-2 bg-[#9da4b361] rounded-lg text-secondary border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D8AB3E]"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="bg-[#ffffff2e] p-4 rounded-lg shadow-sm border border-gray-300">
                <label className="block text-sm font-medium text-[#D8AB3E] mb-2">Password.</label>
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border text-dark bg-[#9da4b361] border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D8AB3E]"
                  required
                />
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-[#D8AB3E] text-white py-2 rounded-lg font-semibold hover:bg-[#D8AB3E]/90 transition"
              >
                Login
              </button>
            </div>
          </form>

          {/* Card with some information or branding */}
          <div className="mt-8 text-center text-gray-500 text-sm">
            <p>Forgot your password? <a href="#" className="text-[#D8AB3E]">Reset it here</a></p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default AdminLogin;
