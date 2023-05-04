import { FC } from 'react';

interface TableProps {
  data: Map<number, Array<string>>,
  columns: any[],
}

const DataTable: FC<TableProps> = ({ data, columns}) => {
    const mapData: any[][] = [];
    const mapRows: number[] = [];

    Array.from(data.entries()).map(([key, value]) => {
        mapRows.push(key);
        mapData.push(value);
    });
  
  return (
    <div className="flex flex-col">
    <div className="overflow-x-auto">
        <div className="p-1.5 w-full inline-block align-middle">
            <div className="overflow-hidden border rounded-lg">
                <table id="tblUsers"className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {columns.map((item) => (
                                <th
                                 scope="col"
                                 className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                >
                                {item}
                                </th>
                            ))}
                           
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {mapRows.map((item, index) => (
                            <tr key={index}>
                                {mapData[index].map((item) => (
                                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                        {item}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
  )
};

export default DataTable;