import React, { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardStats } from './components/DashboardStats';
import { ChartsSection } from './components/ChartsSection';
import { InventoryTable } from './components/InventoryTable';
import { AIAnalysis } from './components/AIAnalysis';
import { ConfirmationModal } from './components/ConfirmationModal';
import { ViewState, SaleRecord, ExpenseRecord, InventoryItem } from './types';
import { MOCK_SALES, MOCK_EXPENSES, MOCK_INVENTORY } from './constants';
import { Menu, Trash2 } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Data State
  const [sales, setSales] = useState<SaleRecord[]>(MOCK_SALES);
  const [expenses, setExpenses] = useState<ExpenseRecord[]>(MOCK_EXPENSES);
  const [inventory, setInventory] = useState<InventoryItem[]>(MOCK_INVENTORY);

  // Modal State
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    type: 'sale' | 'expense' | 'inventory' | null;
    id: string | null;
  }>({ isOpen: false, type: null, id: null });

  // Derived State (Real-time calculations)
  const kpiData = useMemo(() => {
    const totalRevenue = sales.reduce((sum, item) => sum + item.total, 0);
    const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
    return {
      totalRevenue,
      totalExpenses,
      netProfit: totalRevenue - totalExpenses,
      ordersCount: sales.length
    };
  }, [sales, expenses]);

  const lowStockCount = useMemo(() => {
    return inventory.filter(item => item.quantity <= item.minThreshold).length;
  }, [inventory]);

  // Actions
  const initiateDelete = (type: 'sale' | 'expense' | 'inventory', id: string) => {
    setDeleteModal({ isOpen: true, type, id });
  };

  const confirmDelete = () => {
    const { type, id } = deleteModal;
    if (!type || !id) return;

    if (type === 'sale') {
      setSales(prev => prev.filter(item => item.id !== id));
    } else if (type === 'expense') {
      setExpenses(prev => prev.filter(item => item.id !== id));
    } else if (type === 'inventory') {
      setInventory(prev => prev.filter(item => item.id !== id));
    }

    setDeleteModal({ isOpen: false, type: null, id: null });
  };

  const cancelDelete = () => {
    setDeleteModal({ isOpen: false, type: null, id: null });
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <>
            <DashboardStats data={kpiData} lowStockCount={lowStockCount} />
            <ChartsSection sales={sales} expenses={expenses} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                 <InventoryTable 
                   inventory={inventory.slice(0, 3)} 
                   onDelete={(id) => initiateDelete('inventory', id)} 
                 /> 
              </div>
              <div className="lg:col-span-1">
                 <div className="bg-orange-500 rounded-2xl p-6 text-white h-full flex flex-col justify-center items-center text-center shadow-lg shadow-orange-500/20">
                    <h3 className="text-xl font-bold mb-2">هل تحتاج مساعدة؟</h3>
                    <p className="opacity-90 mb-4">استخدم المحلل الذكي للحصول على نصائح لزيادة مبيعاتك.</p>
                    <button 
                      onClick={() => setCurrentView('ai-insights')}
                      className="bg-white text-orange-600 px-6 py-2 rounded-lg font-bold shadow-lg hover:bg-orange-50 transition"
                    >
                      اذهب للمحلل الذكي
                    </button>
                 </div>
              </div>
            </div>
          </>
        );
      case 'inventory':
        return <InventoryTable inventory={inventory} onDelete={(id) => initiateDelete('inventory', id)} />;
      case 'ai-insights':
        return <AIAnalysis sales={sales} expenses={expenses} inventory={inventory} />;
      case 'sales':
        return (
           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
             <div className="p-6 border-b border-gray-100">
               <h3 className="text-xl font-bold text-gray-800">سجل المبيعات</h3>
             </div>
             <div className="overflow-x-auto">
              <table className="w-full text-right">
                  <thead className="bg-gray-50 text-gray-500">
                    <tr>
                      <th className="px-6 py-4">التاريخ</th>
                      <th className="px-6 py-4">المنتج</th>
                      <th className="px-6 py-4">الكمية</th>
                      <th className="px-6 py-4">السعر</th>
                      <th className="px-6 py-4">الإجمالي</th>
                      <th className="px-6 py-4">الدفع</th>
                      <th className="px-6 py-4">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {sales.map((sale) => (
                      <tr key={sale.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-gray-600">{sale.date}</td>
                        <td className="px-6 py-4 font-medium text-gray-900">{sale.productName}</td>
                        <td className="px-6 py-4 text-gray-600">{sale.quantity}</td>
                        <td className="px-6 py-4 text-gray-600">{sale.price}</td>
                        <td className="px-6 py-4 font-bold text-green-600">{sale.total} ج.م</td>
                        <td className="px-6 py-4">
                          <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs">{sale.paymentMethod}</span>
                        </td>
                        <td className="px-6 py-4">
                          <button 
                            onClick={() => initiateDelete('sale', sale.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
              </table>
             </div>
           </div>
        );
      case 'expenses':
         return (
           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
             <div className="p-6 border-b border-gray-100">
               <h3 className="text-xl font-bold text-gray-800">سجل المصروفات</h3>
             </div>
             <div className="overflow-x-auto">
               <table className="w-full text-right">
                  <thead className="bg-gray-50 text-gray-500">
                    <tr>
                      <th className="px-6 py-4">التاريخ</th>
                      <th className="px-6 py-4">القسم</th>
                      <th className="px-6 py-4">الوصف</th>
                      <th className="px-6 py-4">المبلغ</th>
                      <th className="px-6 py-4">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {expenses.map((exp) => (
                      <tr key={exp.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-gray-600">{exp.date}</td>
                        <td className="px-6 py-4">
                           <span className="bg-red-50 text-red-600 px-2 py-1 rounded text-xs font-medium">{exp.category}</span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{exp.description}</td>
                        <td className="px-6 py-4 font-bold text-red-600">{exp.amount} ج.م</td>
                        <td className="px-6 py-4">
                          <button 
                            onClick={() => initiateDelete('expense', exp.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
               </table>
             </div>
           </div>
        );
      default:
        return <div>جاري العمل عليها...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-orange-50/30 flex text-gray-800 font-sans">
      <Sidebar 
        currentView={currentView} 
        onNavigate={setCurrentView} 
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex-1 md:mr-64 transition-all duration-300">
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-gray-100 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
              <Menu size={24} />
            </button>
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {currentView === 'dashboard' && 'لوحة القيادة'}
                {currentView === 'sales' && 'المبيعات'}
                {currentView === 'inventory' && 'إدارة المخازن'}
                {currentView === 'expenses' && 'المصروفات'}
                {currentView === 'ai-insights' && 'تحليل الذكاء الاصطناعي'}
              </h2>
              <p className="text-sm text-gray-500">مرحباً بك، مدير النظام</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-left">
              <p className="text-xs text-gray-400">آخر تحديث للبيانات</p>
              <p className="text-sm font-medium text-gray-700">اليوم، 10:30 ص</p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">
              م
            </div>
          </div>
        </header>

        <main className="p-6 max-w-7xl mx-auto">
          {renderContent()}
        </main>
      </div>

      <ConfirmationModal 
        isOpen={deleteModal.isOpen}
        title="تأكيد الحذف"
        message="هل أنت متأكد من حذف هذا السجل؟ لا يمكن التراجع عن هذا الإجراء وسيتم تحديث البيانات والإحصائيات فوراً."
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}