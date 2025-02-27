const InventoryTable = ({ data = [], columns = [] }) => {
    // Handle empty data or columns
    if (data.length === 0 || columns.length === 0) {
      return (
        <div className="text-center text-gray-500 py-4">
          No data available
        </div>
      );
    }
  
    return (
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            {columns.map((col, index) => (
              <th key={col.accessor || index} className="border p-2">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={row.id || rowIndex} className="border">
              {columns.map((col, colIndex) => (
                <td key={col.accessor || colIndex} className="p-2 border">
                  {row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default InventoryTable;