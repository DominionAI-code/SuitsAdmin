import { useState, useEffect } from 'react';
import { getSalesReports, generateSalesReport } from '../Services/api';

const SalesReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    setError(null);
    try {
      const reportsData = await getSalesReports();
      setReports(reportsData);
    } catch (error) {
      setError(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateReport = async () => {
    setGenerating(true);
    setError(null);
    try {
      await generateSalesReport();
      fetchReports(); // Refresh reports list
      alert('Sales report generated successfully!');
    } catch (error) {
      setError(error.response?.data || error.message);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Sales Reports</h1>

      {error && <p className="text-red-500">Error: {error}</p>}
      {loading && <p>Loading reports...</p>}

      <button
        onClick={handleGenerateReport}
        disabled={generating}
        className={`px-4 py-2 rounded ${generating ? 'bg-gray-400' : 'bg-green-500 text-white'}`}
      >
        {generating ? 'Generating...' : 'Generate Report'}
      </button>

      <ul className="mt-6">
        {reports.length > 0 ? (
          reports.map((report) => (
            <li key={report.id} className="mb-4 p-4 border rounded-lg">
              <p>
                <strong>{report.month}</strong> - ${report.total_revenue.toFixed(2)}
              </p>
              <a
                href={report.pdf_report}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Download Report
              </a>
            </li>
          ))
        ) : (
          <p>No sales reports available.</p>
        )}
      </ul>
    </div>
  );
};

export default SalesReports;
    