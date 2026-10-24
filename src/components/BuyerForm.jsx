import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBuyer } from '../store/buyersSlice';
import { validateName, formatCnic, validateCnic, validateImage } from '../utils/validators';

export default function BuyerForm() {
  const dispatch = useDispatch();
  const buyers = useSelector((s) => s.buyers) || [];
  const crops = useSelector((s) => s.crops) || [];
  const harvests = useSelector((s) => s.harvests) || [];

  const [name, setName] = useState('');
  const [cnic, setCnic] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [cropId, setCropId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [date, setDate] = useState('');
  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState('');
  const [fileKey, setFileKey] = useState(0);

  const stockOf = (crop) => {
    if (!crop) return 0;
    const harvested = harvests
      .filter((h) => String(h.cropId) === String(crop.id) || h.crop === crop.name || h.cropName === crop.name)
      .reduce((sum, h) => sum + Number(h.quantity ?? h.qty ?? 0), 0);
    const sold = buyers
      .filter((b) => String(b.cropId) === String(crop.id))
      .reduce((sum, b) => sum + Number(b.quantity || 0), 0);
    return harvested - sold;
  };

  const selected = crops.find((c) => String(c.id) === String(cropId));
  const available = stockOf(selected);

  const onFile = (e) => {
    const f = e.target.files[0] || null;
    setFile(f);
    setPreview(f ? URL.createObjectURL(f) : '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    const n = validateName(name);
    const c = validateCnic(cnic, buyers);
    const i = validateImage(file);
    if (n) errs.name = n;
    if (c) errs.cnic = c;
    if (i) errs.image = i;
    if (!cropId) errs.crop = 'Select a crop';
    const q = Number(quantity);
    if (!q || q <= 0) errs.quantity = 'Enter a quantity above 0';
    else if (selected && q > available) errs.quantity = `Only ${available} kg in stock`;
    if (!date) errs.date = 'Date is required';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const reader = new FileReader();
    reader.onload = () => {
      dispatch(addBuyer({
        name: name.trim(), cnic, image: reader.result,
        cropId: selected.id, cropName: selected.name,
        quantity: q, date,
      }));
      setName(''); setCnic(''); setFile(null); setPreview('');
      setCropId(''); setQuantity(''); setDate('');
      setFileKey((k) => k + 1);
      setMsg('Buyer saved successfully');
      setTimeout(() => setMsg(''), 3000);
    };
    reader.readAsDataURL(file);
  };

  const err = (k) => errors[k] && <div className="text-danger small">{errors[k]}</div>;

  return (
    <form onSubmit={handleSubmit} className="d-flex gap-2 flex-wrap my-3">
      {msg && <div className="alert alert-success w-100 py-1">{msg}</div>}
      <div>
        <input className="form-control" placeholder="Buyer name" value={name} onChange={(e) => setName(e.target.value)} />
        {err('name')}
      </div>
      <div>
        <input className="form-control" placeholder="CNIC 12345-1234567-1" value={cnic} onChange={(e) => setCnic(formatCnic(e.target.value))} />
        {err('cnic')}
      </div>
      <div>
        <select className="form-control" value={cropId} onChange={(e) => setCropId(e.target.value)}>
          <option value="">Select crop</option>
          {crops.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        {selected && <div className="small text-muted">In stock: {available} kg</div>}
        {err('crop')}
      </div>
      <div>
        <input className="form-control" type="number" placeholder="Quantity (kg)" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        {err('quantity')}
      </div>
      <div>
        <input className="form-control" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        {err('date')}
      </div>
      <div>
        <input key={fileKey} className="form-control" type="file" accept="image/jpeg,image/png" onChange={onFile} />
        {err('image')}
      </div>
      {preview && <img src={preview} alt="preview" style={{ height: 50, borderRadius: 4 }} />}
      <button className="btn btn-success" type="submit">Add Buyer</button>
    </form>
  );
}