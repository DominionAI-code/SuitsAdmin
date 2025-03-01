import { getSalesReports } from "../Services/orderApi";
import { useEffect,useState } from "react";

const SalesReport = ({ onBack }) => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    const data = await getSalesReports();
    setReports(data);
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Sales Reports</h3>
      <ul>
        {reports.map((report) => (
          <li key={report.id}>
            {report.month}: ${report.total_revenue}
          </li>
        ))}
      </ul>
      <button onClick={onBack} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg">
        Back
      </button>
    </div>
  );
};

export default SalesReport;
