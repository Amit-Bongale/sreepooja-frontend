import { useState, useEffect, useMemo } from 'react';
import { 
    Map, MapPin, Navigation, Plus, Edit, X, 
    CheckCircle2, AlertCircle, Loader2, Search, 
    ChevronRight, Home, ArrowLeft
} from 'lucide-react';

// --- SIMULATED IN-MEMORY DATABASE ---
// This acts as our backend for the simulated API calls.
let MOCK_DB = {
    states: [
        { id: 1, stateName: "Karnataka", active: true },
        { id: 2, stateName: "Tamil Nadu", active: true },
        { id: 3, stateName: "Maharashtra", active: false }
    ],
    cities: [
        { id: 1, stateId: 1, cityName: "Bengaluru", active: true },
        { id: 2, stateId: 1, cityName: "Mysuru", active: true },
        { id: 3, stateId: 2, cityName: "Chennai", active: true }
    ],
    pincodes: [
        { id: 1, cityId: 1, pincode: "560001", active: true },
        { id: 2, cityId: 1, pincode: "560038", active: true },
        { id: 3, cityId: 2, pincode: "570004", active: true }
    ]
};

let nextStateId = 4;
let nextCityId = 4;
let nextPincodeId = 4;

export default function Locations() {
    // --- VIEW STATE (Drill-down Navigation) ---
    // 'STATES' | 'CITIES' | 'PINCODES'
    const [currentView, setCurrentView] = useState('STATES');
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);

    // --- DATA STATE ---
    const [dataList, setDataList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    // --- MODAL STATES ---
    const [isStateModalOpen, setIsStateModalOpen] = useState(false);
    const [isCityModalOpen, setIsCityModalOpen] = useState(false);
    const [isPincodeModalOpen, setIsPincodeModalOpen] = useState(false);
    
    // Generic Form Data
    const [formData, setFormData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
    };

    // Data Fetcher based on current view
    const fetchData = () => {
        setIsLoading(true);
        setTimeout(() => {
            if (currentView === 'STATES') {
                // GET /admin/masters/states
                console.log("[GET] /admin/masters/states");
                setDataList([...MOCK_DB.states]);
            } else if (currentView === 'CITIES' && selectedState) {
                // GET /admin/masters/states/{stateId}/cities
                console.log(`[GET] /admin/masters/states/${selectedState.id}/cities`);
                setDataList(MOCK_DB.cities.filter(c => c.stateId === selectedState.id));
            } else if (currentView === 'PINCODES' && selectedCity) {
                // GET /admin/masters/cities/{cityId}/pincodes
                console.log(`[GET] /admin/masters/cities/${selectedCity.id}/pincodes`);
                setDataList(MOCK_DB.pincodes.filter(p => p.cityId === selectedCity.id));
            }
            setIsLoading(false);
        }, 600);
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchData();
        setSearchQuery('');
    }, [currentView, selectedState, selectedCity]);

    const filteredList = useMemo(() => {
        return dataList.filter(item => {
            const query = (searchQuery || '').toLowerCase();
            if (currentView === 'STATES') return (item.stateName || '').toLowerCase().includes(query);
            if (currentView === 'CITIES') return (item.cityName || '').toLowerCase().includes(query);
            if (currentView === 'PINCODES') return (item.pincode || '').toString().toLowerCase().includes(query);
            return true;
        });
    }, [dataList, searchQuery, currentView]);

    // --- STATE SUBMIT ---
    const handleStateSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const payload = { stateName: formData.stateName, active: formData.active };

        setTimeout(() => {
            if (formData.id) {
                console.log(`[PUT] /admin/masters/states/${formData.id}`, payload);
                MOCK_DB.states = MOCK_DB.states.map(s => s.id === formData.id ? { ...s, ...payload } : s);
                showToast("State updated successfully!");
            } else {
                console.log(`[POST] /admin/masters/states`, payload);
                MOCK_DB.states.push({ ...payload, id: nextStateId++ });
                showToast("State created successfully!");
            }
            setIsSubmitting(false);
            setIsStateModalOpen(false);
            fetchData();
        }, 800);
    };

    // --- CITY SUBMIT ---
    const handleCitySubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const payload = { cityName: formData.cityName, active: formData.active };

        setTimeout(() => {
            if (formData.id) {
                console.log(`[PUT] /admin/masters/cities/${formData.id}`, payload);
                MOCK_DB.cities = MOCK_DB.cities.map(c => c.id === formData.id ? { ...c, ...payload } : c);
                showToast("City updated successfully!");
            } else {
                console.log(`[POST] /admin/masters/states/${selectedState.id}/cities`, payload);
                MOCK_DB.cities.push({ ...payload, stateId: selectedState.id, id: nextCityId++ });
                showToast("City created successfully!");
            }
            setIsSubmitting(false);
            setIsCityModalOpen(false);
            fetchData();
        }, 800);
    };

    // --- PINCODE SUBMIT ---
    const handlePincodeSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            if (formData.id) {
                // Update Single Pincode
                const payload = { pincode: formData.pincodesRaw.trim(), active: formData.active };
                // Using formData.id (pincode id) though prompt mentioned {cityId} for PUT path, standard is pincode ID.
                console.log(`[PUT] /admin/masters/pincodes/${formData.id}`, payload);
                MOCK_DB.pincodes = MOCK_DB.pincodes.map(p => p.id === formData.id ? { ...p, pincode: payload.pincode, active: payload.active } : p);
                showToast("Pincode updated successfully!");
            } else {
                // Create Multiple Pincodes
                // Parse comma separated values
                const rawCodes = formData.pincodesRaw.split(',').map(s => s.trim()).filter(s => s);
                const payload = { pincodes: rawCodes, active: formData.active };
                console.log(`[POST] /admin/masters/cities/${selectedCity.id}/pincodes`, payload);
                
                rawCodes.forEach(code => {
                    MOCK_DB.pincodes.push({ pincode: code, active: formData.active, cityId: selectedCity.id, id: nextPincodeId++ });
                });
                showToast(`${rawCodes.length} Pincode(s) added successfully!`);
            }
            setIsSubmitting(false);
            setIsPincodeModalOpen(false);
            fetchData();
        }, 800);
    };

    const navigateToCities = (state) => {
        setSelectedState(state);
        setCurrentView('CITIES');
    };

    const navigateToPincodes = (city) => {
        setSelectedCity(city);
        setCurrentView('PINCODES');
    };

    const navigateUp = () => {
        if (currentView === 'PINCODES') setCurrentView('CITIES');
        else if (currentView === 'CITIES') {
            setCurrentView('STATES');
            setSelectedState(null);
            setSelectedCity(null);
        }
    };

    const openAddModal = () => {
        if (currentView === 'STATES') {
            setFormData({ id: null, stateName: '', active: true });
            setIsStateModalOpen(true);
        } else if (currentView === 'CITIES') {
            setFormData({ id: null, cityName: '', active: true });
            setIsCityModalOpen(true);
        } else if (currentView === 'PINCODES') {
            setFormData({ id: null, pincodesRaw: '', active: true });
            setIsPincodeModalOpen(true);
        }
    };

    const openEditModal = (item) => {
        if (currentView === 'STATES') {
            setFormData({ id: item.id, stateName: item.stateName, active: item.active });
            setIsStateModalOpen(true);
        } else if (currentView === 'CITIES') {
            setFormData({ id: item.id, cityName: item.cityName, active: item.active });
            setIsCityModalOpen(true);
        } else if (currentView === 'PINCODES') {
            setFormData({ id: item.id, pincodesRaw: item.pincode, active: item.active });
            setIsPincodeModalOpen(true);
        }
    };

    return (
        <div className="font-sans text-gray-800 antialiased min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
            
            {/* Toast Notification */}
            {toast.show && (
                <div className="fixed top-4 right-4 z-70 animate-in slide-in-from-top-5 fade-in duration-300">
                    <div className={`flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg border ${toast.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                        {toast.type === 'success' ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                        <span className="font-bold text-sm">{toast.message}</span>
                    </div>
                </div>
            )}

            <div className="max-w-6xl mx-auto">
                {/* Header & Breadcrumbs */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-2">
                        <button 
                            onClick={() => { setCurrentView('STATES'); setSelectedState(null); setSelectedCity(null); }}
                            className={`flex items-center gap-1 hover:text-orange-600 transition-colors ${currentView === 'STATES' ? 'text-orange-600 font-bold' : ''}`}
                        >
                            <Home className="h-4 w-4" /> All States
                        </button>
                        
                        {selectedState && (
                            <>
                                <ChevronRight className="h-4 w-4" />
                                <button 
                                    onClick={() => { setCurrentView('CITIES'); setSelectedCity(null); }}
                                    className={`hover:text-orange-600 transition-colors ${currentView === 'CITIES' ? 'text-orange-600 font-bold' : ''}`}
                                >
                                    {selectedState.stateName}
                                </button>
                            </>
                        )}

                        {selectedCity && (
                            <>
                                <ChevronRight className="h-4 w-4" />
                                <span className="text-orange-600 font-bold">
                                    {selectedCity.cityName}
                                </span>
                            </>
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                        <div className="flex items-center gap-3">
                            {currentView !== 'STATES' && (
                                <button 
                                    onClick={navigateUp}
                                    className="p-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 hover:text-orange-600 transition-colors"
                                >
                                    <ArrowLeft className="h-5 w-5" />
                                </button>
                            )}
                            <div>
                                <h1 className="text-2xl font-serif font-bold text-gray-900 flex items-center gap-2">
                                    <Map className="h-6 w-6 text-orange-500" />
                                    {currentView === 'STATES' ? 'Manage States' : 
                                     currentView === 'CITIES' ? `Cities in ${selectedState.stateName}` : 
                                     `Pincodes for ${selectedCity.cityName}`}
                                </h1>
                                <p className="text-sm text-gray-500 mt-1">Configure active service regions and boundaries.</p>
                            </div>
                        </div>
                        <button 
                            onClick={openAddModal}
                            className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all sm:w-auto w-full"
                        >
                            <Plus className="h-5 w-5" /> 
                            {currentView === 'STATES' ? 'Add State' : currentView === 'CITIES' ? 'Add City' : 'Add Pincodes'}
                        </button>
                    </div>
                </div>

                {/* Main Content Card */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col min-h-[400px]">
                    
                    {/* Toolbar / Search */}
                    <div className="p-5 border-b border-gray-200 bg-gray-50/50">
                        <div className="relative max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input 
                                type="text" 
                                placeholder={`Search ${currentView.toLowerCase()}...`} 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all shadow-sm" 
                            />
                        </div>
                    </div>

                    {/* Table / Data View */}
                    <div className="flex-1 overflow-x-auto relative">
                        {isLoading ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 bg-white z-10">
                                <Loader2 className="h-8 w-8 animate-spin text-orange-500 mb-2" />
                                <p className="text-sm font-medium">Loading {currentView.toLowerCase()}...</p>
                            </div>
                        ) : filteredList.length > 0 ? (
                            <table className="w-full text-left text-sm whitespace-nowrap">
                                <thead className="bg-white text-gray-500 border-b border-gray-200 sticky top-0 z-10">
                                    <tr>
                                        <th className="px-6 py-4 font-bold w-24">ID</th>
                                        <th className="px-6 py-4 font-bold">
                                            {currentView === 'STATES' ? 'State Name' : currentView === 'CITIES' ? 'City Name' : 'Pincode'}
                                        </th>
                                        <th className="px-6 py-4 font-bold">Status</th>
                                        <th className="px-6 py-4 font-bold text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredList.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group cursor-pointer" onClick={() => {
                                            if (currentView === 'STATES') navigateToCities(item);
                                            if (currentView === 'CITIES') navigateToPincodes(item);
                                        }}>
                                            <td className="px-6 py-4 text-gray-500 font-mono text-xs">
                                                {currentView.charAt(0)}-{item.id.toString().padStart(3, '0')}
                                            </td>
                                            <td className="px-6 py-4 font-bold text-gray-900 text-base flex items-center gap-2">
                                                {currentView === 'STATES' && <Map className="h-4 w-4 text-gray-400" />}
                                                {currentView === 'CITIES' && <MapPin className="h-4 w-4 text-gray-400" />}
                                                {currentView === 'PINCODES' && <Navigation className="h-4 w-4 text-gray-400" />}
                                                
                                                {currentView === 'STATES' ? item.stateName : currentView === 'CITIES' ? item.cityName : item.pincode}
                                            </td>
                                            <td className="px-6 py-4" onClick={e => e.stopPropagation()}>
                                                {item.active ? (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Active
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-600 border border-gray-200">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span> Inactive
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right" onClick={e => e.stopPropagation()}>
                                                <button 
                                                    onClick={() => openEditModal(item)}
                                                    className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors mr-2"
                                                    title="Edit"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                                {currentView !== 'PINCODES' && (
                                                    <button 
                                                        onClick={() => {
                                                            if (currentView === 'STATES') navigateToCities(item);
                                                            if (currentView === 'CITIES') navigateToPincodes(item);
                                                        }}
                                                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors"
                                                    >
                                                        View {currentView === 'STATES' ? 'Cities' : 'Pincodes'} <ChevronRight className="h-3 w-3" />
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-white z-10">
                                <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                    <Map className="h-8 w-8 text-gray-300" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1">No {currentView.toLowerCase()} found</h3>
                                <p className="text-gray-500 text-sm max-w-sm">
                                    {searchQuery 
                                        ? `We couldn't find anything matching "${searchQuery}".`
                                        : `There are currently no ${currentView.toLowerCase()} listed here.`}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* STATE MODAL */}
            {isStateModalOpen && (
                <div className="fixed inset-0 z-[60] bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <h3 className="text-lg font-bold text-gray-900 font-serif flex items-center gap-2">
                                <Map className="h-5 w-5 text-orange-500" /> {formData.id ? 'Edit State' : 'Add New State'}
                            </h3>
                            <button onClick={() => !isSubmitting && setIsStateModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-200">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <form onSubmit={handleStateSubmit}>
                            <div className="p-6 space-y-5">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1.5">State Name <span className="text-red-500">*</span></label>
                                    <input 
                                        type="text" required value={formData.stateName}
                                        onChange={(e) => setFormData({...formData, stateName: e.target.value})}
                                        placeholder="e.g. Karnataka" 
                                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:border-orange-500 outline-none transition-all" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Status</label>
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input type="checkbox" checked={formData.active} onChange={(e) => setFormData({...formData, active: e.target.checked})} className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500" />
                                        <span className="text-sm font-bold text-gray-800">{formData.active ? 'Active' : 'Inactive'}</span>
                                    </label>
                                </div>
                            </div>
                            <div className="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
                                <button type="button" onClick={() => setIsStateModalOpen(false)} className="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-200">Cancel</button>
                                <button type="submit" disabled={isSubmitting || !formData.stateName?.trim()} className="px-5 py-2.5 rounded-xl text-sm font-bold bg-orange-600 hover:bg-orange-700 text-white flex items-center gap-2">
                                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save State'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* CITY MODAL */}
            {isCityModalOpen && (
                <div className="fixed inset-0 z-[60] bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <h3 className="text-lg font-bold text-gray-900 font-serif flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-orange-500" /> {formData.id ? 'Edit City' : 'Add New City'}
                            </h3>
                            <button onClick={() => !isSubmitting && setIsCityModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-200">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <form onSubmit={handleCitySubmit}>
                            <div className="p-6 space-y-5">
                                <div className="bg-orange-50 text-orange-800 text-xs font-bold px-3 py-2 rounded-lg border border-orange-100">
                                    Parent State: {selectedState?.stateName}
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1.5">City Name <span className="text-red-500">*</span></label>
                                    <input 
                                        type="text" required value={formData.cityName}
                                        onChange={(e) => setFormData({...formData, cityName: e.target.value})}
                                        placeholder="e.g. Bengaluru" 
                                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:border-orange-500 outline-none transition-all" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Status</label>
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input type="checkbox" checked={formData.active} onChange={(e) => setFormData({...formData, active: e.target.checked})} className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500" />
                                        <span className="text-sm font-bold text-gray-800">{formData.active ? 'Active' : 'Inactive'}</span>
                                    </label>
                                </div>
                            </div>
                            <div className="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
                                <button type="button" onClick={() => setIsCityModalOpen(false)} className="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-200">Cancel</button>
                                <button type="submit" disabled={isSubmitting || !formData.cityName?.trim()} className="px-5 py-2.5 rounded-xl text-sm font-bold bg-orange-600 hover:bg-orange-700 text-white flex items-center gap-2">
                                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save City'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* PINCODE MODAL */}
            {isPincodeModalOpen && (
                <div className="fixed inset-0 z-[60] bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <h3 className="text-lg font-bold text-gray-900 font-serif flex items-center gap-2">
                                <Navigation className="h-5 w-5 text-orange-500" /> {formData.id ? 'Edit Pincode' : 'Add Pincodes'}
                            </h3>
                            <button onClick={() => !isSubmitting && setIsPincodeModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-200">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <form onSubmit={handlePincodeSubmit}>
                            <div className="p-6 space-y-5">
                                <div className="bg-orange-50 text-orange-800 text-xs font-bold px-3 py-2 rounded-lg border border-orange-100">
                                    Parent City: {selectedCity?.cityName}
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1.5">
                                        {formData.id ? 'Pincode' : 'Pincodes (Comma separated)'} <span className="text-red-500">*</span>
                                    </label>
                                    {formData.id ? (
                                        <input 
                                            type="text" required value={formData.pincodesRaw}
                                            onChange={(e) => setFormData({...formData, pincodesRaw: e.target.value})}
                                            placeholder="e.g. 560001" 
                                            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:border-orange-500 outline-none transition-all font-mono" 
                                        />
                                    ) : (
                                        <textarea 
                                            required value={formData.pincodesRaw}
                                            onChange={(e) => setFormData({...formData, pincodesRaw: e.target.value})}
                                            placeholder="e.g. 560001, 560002, 560003" 
                                            rows="3"
                                            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:border-orange-500 outline-none transition-all font-mono resize-none" 
                                        />
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Status</label>
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input type="checkbox" checked={formData.active} onChange={(e) => setFormData({...formData, active: e.target.checked})} className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500" />
                                        <span className="text-sm font-bold text-gray-800">{formData.active ? 'Active' : 'Inactive'}</span>
                                    </label>
                                </div>
                            </div>
                            <div className="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
                                <button type="button" onClick={() => setIsPincodeModalOpen(false)} className="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-200">Cancel</button>
                                <button type="submit" disabled={isSubmitting || !formData.pincodesRaw?.trim()} className="px-5 py-2.5 rounded-xl text-sm font-bold bg-orange-600 hover:bg-orange-700 text-white flex items-center gap-2">
                                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}