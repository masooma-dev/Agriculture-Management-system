import { useSelector } from 'react-redux';
import CrudPage from '../components/common/CrudPage';
import * as actions from '../store/tasksSlice';

export default function Tasks() {
  const items = useSelector((s) => s.tasks);
  const crops = useSelector((s) => s.crops);

  const fields = [
    { name: 'title', label: 'Title' },
    { name: 'type', label: 'Type', options: ['Irrigation', 'Fertilizer', 'Spraying', 'Labour'] },
    { name: 'cropId', label: 'Crop', options: crops.map((c) => ({ value: c.id, label: c.name })) },
    { name: 'dueDate', label: 'Due date', type: 'date' },
    { name: 'status', label: 'Status', options: ['Pending', 'Done', 'Overdue'] },
  ];

  return <CrudPage title="Farm Tasks" items={items} fields={fields} actions={actions} csvName="tasks.csv" />;
}