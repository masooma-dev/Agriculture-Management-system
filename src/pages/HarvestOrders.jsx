import HarvestSummary from '../components/harvest/HarvestSummary';
import HarvestForm from '../store/HarvestForm'

import HarvestList from '../store/HarvestList';

export default function HarvestOrders() {
  return (
    <>
      <h2>Harvest and Orders</h2>
      <HarvestSummary />
      <HarvestForm />
      <HarvestList />
    </>
  );
}