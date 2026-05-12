import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Truck, MapPin, PlusCircle, Trash2, Leaf, AlertCircle, Clock, Filter, CheckCircle2 } from 'lucide-react';

const API_URL = "http://localhost:8000/api/waste";

function App() {
  const [reports, setReports] = useState([]);
  const [formData, setFormData] = useState({ location: '', wasteType: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filterType, setFilterType] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const blueGlowRef = useRef(null);

  const filteredReports = reports.filter(r => {
    const matchType = filterType === 'All' || r.wasteType === filterType;
    const matchStatus = statusFilter === 'All' || r.status === statusFilter;
    return matchType && matchStatus;
  });

  // දත්ත ලබාගැනීම (Fetch All)
  const fetchReports = async () => {
    try {
      const res = await axios.get(`${API_URL}/getall`);
      setReports(res.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setReports([]);
      } else {
        console.error("Error fetching data", err);
      }
    }
  };

  useEffect(() => { fetchReports(); }, []);

  // Mouse follow effect for the dark blue glow
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (blueGlowRef.current) {
        // Animate the glow to follow the cursor with a slight trailing delay
        blueGlowRef.current.animate({
          transform: `translate(${e.clientX}px, ${e.clientY}px)`
        }, { duration: 1500, fill: "forwards", easing: "ease" });
      }
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // දත්ත ඇතුළත් කිරීම (Create)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(`${API_URL}/create`, { ...formData, status: "Pending" });
      setFormData({ location: '', wasteType: '' });
      await fetchReports();
    } catch (err) {
      alert("Failed to report!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMarkCollected = async (id) => {
    try {
      await axios.put(`${API_URL}/update/${id}`, { status: "Collected" });
      await fetchReports();
    } catch (err) {
      alert("Failed to update status!");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this report?")) return;
    try {
      await axios.delete(`${API_URL}/delete/${id}`);
      await fetchReports();
    } catch (err) {
      alert("Failed to delete report!");
    }
  };

  const getWasteIcon = (type) => {
    switch (type) {
      case 'Organic': return <Leaf className="w-3.5 h-3.5" />;
      case 'E-Waste': return <AlertCircle className="w-3.5 h-3.5" />;
      default: return <Trash2 className="w-3.5 h-3.5" />;
    }
  };

  const getWasteTypeStyles = (type) => {
    switch (type) {
      case 'Plastic':
        return "bg-cyan-500/10 border-cyan-500/20 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.05)] group-hover:bg-cyan-500/20";
      case 'Organic':
        return "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.05)] group-hover:bg-emerald-500/20";
      case 'E-Waste':
        return "bg-purple-500/10 border-purple-500/20 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.05)] group-hover:bg-purple-500/20";
      default:
        return "bg-gray-500/10 border-gray-500/20 text-gray-400 shadow-[0_0_10px_rgba(107,114,128,0.05)] group-hover:bg-gray-500/20";
    }
  };

  return (
    <div className="min-h-screen bg-darkBg text-gray-100 p-6 sm:p-8 font-sans relative overflow-hidden selection:bg-emerald-500/30">
      {/* Background Ambient Glows */}
      <div 
        ref={blueGlowRef}
        className="fixed top-[-300px] left-[-300px] w-[600px] h-[600px] rounded-full bg-sapphire blur-[150px] opacity-30 pointer-events-none z-0"
      ></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-600 blur-[150px] opacity-10 pointer-events-none z-0"></div>

      <header className="max-w-6xl mx-auto flex items-center gap-4 mb-12 relative z-10">
        <div className="p-3.5 bg-cardBg border border-sapphire/30 rounded-2xl shadow-[0_0_20px_rgba(30,58,138,0.4)]">
          <Truck className="text-emerald-500 w-8 h-8 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
        </div>
        <div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-br from-white via-gray-200 to-gray-500 bg-clip-text text-transparent tracking-tight drop-shadow-sm">
            Urban Waste Tracker
          </h1>
          <p className="text-sm text-emerald-500/80 mt-1 font-medium tracking-wide uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
            Live Monitoring
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-8 relative z-10">
        {/* Report Form Component */}
        <div className="lg:col-span-4 h-fit">
          <div className="bg-cardBg/80 backdrop-blur-2xl p-7 rounded-3xl border border-gray-800 shadow-2xl transition-all duration-500 hover:border-emerald-500/30 hover:shadow-green-glow group relative overflow-hidden">
            {/* Subtle top highlight */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <h2 className="font-semibold text-xl mb-6 flex items-center gap-2.5 text-gray-100">
              <PlusCircle className="w-5 h-5 text-emerald-500" />
              Report New Waste
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Location</label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-300 group-focus-within/input:text-emerald-500 text-gray-500">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <input
                    type="text" placeholder="Enter street address or area"
                    className="w-full pl-11 p-3.5 bg-darkBg border border-gray-800 rounded-xl text-sm outline-none transition-all duration-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 focus:shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:border-gray-700 text-gray-200 placeholder-gray-600"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Waste Category</label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-300 group-focus-within/input:text-emerald-500 text-gray-500">
                    <Trash2 className="h-4 w-4" />
                  </div>
                  <select
                    className="w-full pl-11 p-3.5 bg-darkBg border border-gray-800 rounded-xl text-sm outline-none transition-all duration-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 focus:shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:border-gray-700 text-gray-200 appearance-none cursor-pointer"
                    value={formData.wasteType}
                    onChange={(e) => setFormData({ ...formData, wasteType: e.target.value })}
                    required
                  >
                    <option value="" className="bg-cardBg text-gray-400">Select Category...</option>
                    <option value="Plastic" className="bg-cardBg text-white">Plastic Waste</option>
                    <option value="Organic" className="bg-cardBg text-white">Organic Waste</option>
                    <option value="E-Waste" className="bg-cardBg text-white">Electronic Waste</option>
                    <option value="General" className="bg-cardBg text-white">General/Mixed</option>
                  </select>
                  {/* Custom dropdown arrow */}
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              <button
                disabled={isSubmitting}
                className="w-full mt-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(5,150,105,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.6)] flex justify-center items-center gap-2 transform hover:-translate-y-1 active:translate-y-0 active:scale-95 disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <PlusCircle className="w-4 h-4" /> Submit Report
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Display List Component */}
        <div className="lg:col-span-8 flex flex-col">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-gray-800 pb-4">
            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-gray-200 flex items-center gap-2">
                Recent Reports
                <span className="text-xs font-medium px-2 py-0.5 rounded border border-red-500/20 bg-red-500/10 bg-gradient-to-r from-red-800 via-red-400 to-red-800 bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-text shadow-[0_0_10px_rgba(239,68,68,0.2)]">Live</span>
              </h2>

              {/* Status Filter Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setStatusFilter('All')}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-all duration-300 font-medium ${statusFilter === 'All' ? 'bg-purple-500/20 border-purple-500 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.3)]' : 'bg-darkBg border-gray-800 text-gray-500 hover:border-gray-600 hover:text-gray-300'}`}
                >
                  All
                </button>
                <button
                  onClick={() => setStatusFilter('Pending')}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-all duration-300 font-medium ${statusFilter === 'Pending' ? 'bg-orange-500/20 border-orange-500 text-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.3)]' : 'bg-darkBg border-gray-800 text-gray-500 hover:border-gray-600 hover:text-gray-300'}`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setStatusFilter('Collected')}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-all duration-300 font-medium ${statusFilter === 'Collected' ? 'bg-blue-500/20 border-blue-500 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.3)]' : 'bg-darkBg border-gray-800 text-gray-500 hover:border-gray-600 hover:text-gray-300'}`}
                >
                  Collected
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative group/filter flex-1 sm:flex-none">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <Filter className="h-3.5 w-3.5" />
                </div>
                <select
                  className="w-full sm:w-auto pl-9 pr-8 py-1.5 bg-darkBg border border-gray-800 rounded-lg text-sm text-gray-300 outline-none transition-colors hover:border-gray-700 focus:border-emerald-500 appearance-none cursor-pointer"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="All">All Types</option>
                  <option value="Plastic">Plastic</option>
                  <option value="Organic">Organic</option>
                  <option value="E-Waste">E-Waste</option>
                  <option value="General">General</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
                  <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
              <div className="text-sm font-medium text-gray-400 bg-cardBg px-3 py-1.5 rounded-lg border border-gray-800 shadow-inner whitespace-nowrap">
                Total: <span className="text-emerald-500 ml-1 font-bold">{filteredReports.length}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 flex-grow content-start">
            {filteredReports.length === 0 ? (
              <div className="md:col-span-2 py-20 text-center text-gray-500 bg-cardBg/30 rounded-3xl border border-gray-800 border-dashed flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gray-800/50 flex items-center justify-center mb-4">
                  <AlertCircle className="w-8 h-8 text-gray-600" />
                </div>
                <p className="text-lg">No reports found.</p>
                <p className="text-sm mt-1 text-gray-600">Submit a new report to see it appear here.</p>
              </div>
            ) : (
              filteredReports.map((item) => (
                <div
                  key={item._id}
                  className="group relative bg-cardBg/60 backdrop-blur-md p-6 rounded-3xl border border-gray-800/80 overflow-hidden transition-all duration-500 ease-out hover:scale-[1.02] hover:-translate-y-1.5 hover:border-emerald-500/50 hover:shadow-green-glow cursor-default flex flex-col justify-between"
                >
                  {/* Subtle inner gradient hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-transparent to-sapphire/0 group-hover:from-emerald-500/5 group-hover:to-sapphire/5 transition-all duration-700 pointer-events-none"></div>

                  <div className="relative z-10">
                    <div className="flex justify-between items-center mb-5">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[10px] font-bold uppercase tracking-widest transition-colors ${getWasteTypeStyles(item.wasteType)}`}>
                        {getWasteIcon(item.wasteType)}
                        {item.wasteType}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="relative flex h-2 w-2">
                          {item.status === 'Pending' ? (
                            <>
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                            </>
                          ) : item.status === 'Collected' ? (
                            <>
                              <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-20"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </>
                          ) : (
                            <>
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </>
                          )}
                        </span>
                        <span className="text-xs font-medium text-gray-400">
                          {item.status}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg font-medium text-gray-100 mb-2 flex items-start gap-2.5">
                      <MapPin className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:text-emerald-400" />
                      <span className="leading-snug">{item.location}</span>
                    </h3>
                  </div>

                  <div className="relative z-10 mt-6 pt-4 border-t border-gray-800 flex justify-between items-center text-[11px] font-medium">
                    <div className="flex flex-col gap-1 text-gray-500">
                      <span className="font-mono text-gray-600 uppercase">#{item._id?.substring(0, 6)}</span>
                      <div className="flex flex-col gap-1 mt-1">
                        <span className="flex items-center gap-1.5 text-[10px] sm:text-[11px]">
                          <Clock className="w-3 h-3" />
                          <span className="uppercase tracking-wider opacity-70">Reported:</span> {new Date(item.createdAt || Date.now()).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {item.status !== 'Pending' && (
                          <span className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-blue-400">
                            <CheckCircle2 className="w-3 h-3" />
                            <span className="uppercase tracking-wider opacity-70">{item.status === 'Collected' ? 'Collected:' : 'Updated:'}</span> {new Date(item.updatedAt || Date.now()).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 ml-2 self-end shrink-0 z-20">
                      {item.status === 'Pending' && (
                        <button
                          onClick={() => handleMarkCollected(item._id)}
                          className="flex items-center gap-1 px-2 py-1 rounded-md bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/50 hover:shadow-[0_0_8px_rgba(59,130,246,0.2)] transition-all duration-300 cursor-pointer"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          <span className="text-[9px] font-bold tracking-wider uppercase">Mark Collected</span>
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="flex items-center gap-1 px-2 py-1 rounded-md bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500/50 hover:shadow-[0_0_8px_rgba(239,68,68,0.2)] transition-all duration-300 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span className="text-[9px] font-bold tracking-wider uppercase">Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
