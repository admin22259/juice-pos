import { SaleRecord, ExpenseRecord, InventoryItem } from './types';

export const MOCK_SALES: SaleRecord[] = [
  { id: '1', date: '2023-10-25', productName: 'عصير مانجو طازج', quantity: 15, price: 15, total: 225, paymentMethod: 'Cash' },
  { id: '2', date: '2023-10-25', productName: 'كوكتيل فواكه', quantity: 8, price: 20, total: 160, paymentMethod: 'Card' },
  { id: '3', date: '2023-10-25', productName: 'عصير فراولة', quantity: 12, price: 12, total: 144, paymentMethod: 'Cash' },
  { id: '4', date: '2023-10-26', productName: 'سموذي أفوكادو', quantity: 20, price: 25, total: 500, paymentMethod: 'Online' },
  { id: '5', date: '2023-10-26', productName: 'عصير قصب', quantity: 50, price: 5, total: 250, paymentMethod: 'Cash' },
  { id: '6', date: '2023-10-27', productName: 'وافل نوتيلا', quantity: 5, price: 30, total: 150, paymentMethod: 'Card' },
  { id: '7', date: '2023-10-27', productName: 'عصير برتقال', quantity: 25, price: 10, total: 250, paymentMethod: 'Cash' },
  { id: '8', date: '2023-10-28', productName: 'ميلك شيك أوريو', quantity: 10, price: 22, total: 220, paymentMethod: 'Online' },
];

export const MOCK_EXPENSES: ExpenseRecord[] = [
  { id: '1', date: '2023-10-25', category: 'فواكه', amount: 500, description: 'شراء مانجو وفراولة' },
  { id: '2', date: '2023-10-26', category: 'مواد تغليف', amount: 150, description: 'أكواب بلاستيك وشفاطات' },
  { id: '3', date: '2023-10-26', category: 'كهرباء', amount: 200, description: 'فاتورة الأسبوع' },
  { id: '4', date: '2023-10-27', category: 'فواكه', amount: 350, description: 'شراء موز وبرتقال' },
  { id: '5', date: '2023-10-28', category: 'أجور', amount: 800, description: 'يوميات العمال' },
];

export const MOCK_INVENTORY: InventoryItem[] = [
  { id: '1', name: 'مانجو كيت', category: 'فواكه', quantity: 5, unit: 'صندوق', minThreshold: 3, lastUpdated: '2023-10-28' },
  { id: '2', name: 'فراولة مجمدة', category: 'فواكه', quantity: 20, unit: 'كجم', minThreshold: 10, lastUpdated: '2023-10-27' },
  { id: '3', name: 'سكر أبيض', category: 'جاف', quantity: 50, unit: 'كجم', minThreshold: 20, lastUpdated: '2023-10-25' },
  { id: '4', name: 'أكواب 300مل', category: 'تغليف', quantity: 150, unit: 'قطعة', minThreshold: 500, lastUpdated: '2023-10-26' },
  { id: '5', name: 'موز بلدي', category: 'فواكه', quantity: 12, unit: 'كجم', minThreshold: 15, lastUpdated: '2023-10-28' },
  { id: '6', name: 'حليب كامل الدسم', category: 'جاف', quantity: 8, unit: 'لتر', minThreshold: 10, lastUpdated: '2023-10-28' },
];