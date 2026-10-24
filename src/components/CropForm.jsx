import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCrop } from '../store/cropsSlice';
import { validateCrop } from '../utils/validators';

export default function CropForm() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [field, setField] = useState('');
  const [plantingDate, setPlantingDate] = useState('');
  const [cuttingDate, setCuttingDate] = useState('');
  const [healthScore, setHealthScore] = useState('');
  const [expectedQty, setExpectedQty] = useState('');
  const [status, setStatus] = useState('Planted');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = { ...validateCrop({ name, field, plantingDate }) };
    if (!cuttingDate) errs.cuttingDate = 'Cutting date is required';
    else if (plantingDate && cuttingDate < plantingDate)
      errs.cuttingDate = 'Must be after planting date';
    const score = Number(healthScore);
    if (healthScore === '' || score < 0 || score > 100)
      errs.healthScore = 'Enter 0 to 100';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    dispatch(addCrop({
      name, field, plantingDate, cuttingDate,
      healthScore: score,
      expectedQty: Number(expectedQty) || 0,
      status,
    }));
    setName(''); setField(''); setPlantingDate('');
    setCuttingDate(''); setHealthScore(''); setExpectedQty('');
    setStatus('Planted');
  };

  const err = (k) => errors[k] && <div style={{ color: 'red' }}>{errors[k]}</div>;

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10, margin: '20px 0', flexWrap: 'wrap' }}>
      <div><input placeholder="Crop name" value={name} onChange={(e) => setName(e.target.value)} />{err('name')}</div>
      <div><input placeholder="Field" value={field} onChange={(e) => setField(e.target.value)} />{err('field')}</div>
      <div><input type="date" title="Planting date" value={plantingDate} onChange={(e) => setPlantingDate(e.target.value)} />{err('plantingDate')}</div>
      <div><input type="date" title="Cutting date" value={cuttingDate} onChange={(e) => setCuttingDate(e.target.value)} />{err('cuttingDate')}</div>
      <div><input type="number" placeholder="Health score (0-100)" value={healthScore} onChange={(e) => setHealthScore(e.target.value)} />{err('healthScore')}</div>
      <div><input type="number" placeholder="Expected qty (kg)" value={expectedQty} onChange={(e) => setExpectedQty(e.target.value)} /></div>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option>Planted</option>
        <option>Growing</option>
        <option>Harvested</option>
      </select>
      <button type="submit">Add Crop</button>
    </form>
  );
}