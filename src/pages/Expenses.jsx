import { useSelector } from 'react-redux';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import CrudPage from '../components/common/CrudPage';
import * as actions from '../store/expensesSlice';
import { selectProfitByCrop } from '../store/selectors';

export default function Expenses() {
  const items = useSelector((s) => s.expenses);
  const crops = useSelector((s) => s.crops);
  const pl = useSelector(selectProfitByCrop);

  const fields = [
    { name: 'cropId', label: 'Crop', options: crops.map((c) => ({ value: c.id, label: c.name })) },
    { name: 'category', label: 'Category', options: ['Seeds', 'Fertilizer', 'Labour', 'Fuel'] },
    { name: 'amount', label: 'Amount', type: 'number' },
    { name: 'date', label: 'Date', type: 'date' },
    { name: 'note', label: 'Note', optional: true },
  ];

  return (
    <CrudPage title="Expenses & Profit/Loss" items={items} fields={fields} actions={actions} csvName="expenses.csv">
      <div style={{ height: 260 }} className="mb-3">
        <ResponsiveContainer>
          <BarChart data={pl}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#198754" />
            <Bar dataKey="expense" fill="#dc3545" />
            <Bar dataKey="profit" fill="#0d6efd" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </CrudPage>
  );
}