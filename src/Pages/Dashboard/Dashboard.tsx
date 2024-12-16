import DataTable from '../../components/Datatable';
import '../Dashboard/Dashboard.css';

const Dashboard: React.FC = () => {

    return (
    <div>  
      <div className='data'>
        <h2 className='Marvel'>Marvel Figures</h2>
        <DataTable />
        </div>
      </div>
    );
  };
  

export default Dashboard;