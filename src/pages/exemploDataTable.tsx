import DataTable from '@/components/table/DataTable';
import { FC } from 'react';

const App: FC = () => {
  const columns: any[] = ['Código', 'Nome', 'Email', 'CPF/CNPJ'];

  let data = new Map<number, Array<string>>();
  data.set(1, ['1', 'Luana', 'luana@gmail.com', '256.456.810-61']);
  data.set(2, ['2', 'Davi', 'davi@gmail.com', '53.590.918/0001-02']);
  data.set(3, ['3', 'Luana', 'luana@gmail.com', '256.456.810-61']);
  data.set(4, ['4', 'Davi', 'davi@gmail.com', '53.590.918/0001-02']);
  data.set(5, ['5', 'Luana', 'luana@gmail.com', '256.456.810-61']);
  data.set(6, ['6', 'Davi', 'davi@gmail.com', '53.590.918/0001-02']);
  data.set(7, ['7', 'Luana', 'luana@gmail.com', '256.456.810-61']);
  data.set(8, ['8', 'Davi', 'davi@gmail.com', '53.590.918/0001-02']);
  data.set(9, ['9', 'Luana', 'luana@gmail.com', '256.456.810-61']);
  data.set(10, ['10', 'Davi', 'davi@gmail.com', '53.590.918/0001-02']);
  data.set(12, ['11', 'Luana', 'luana@gmail.com', '256.456.810-61']);
  data.set(23, ['12', 'Davi', 'davi@gmail.com', '53.590.918/0001-02']);
  data.set(34, ['13', 'Luana', 'luana@gmail.com', '256.456.810-61']);
  data.set(45, ['14', 'Davi', 'davi@gmail.com', '53.590.918/0001-02']);
  data.set(54, ['15', 'Luana', 'luana@gmail.com', '256.456.810-61']);
  data.set(65, ['16', 'Davi', 'davi@gmail.com', '53.590.918/0001-02']);
  data.set(75, ['17', 'Luana', 'luana@gmail.com', '256.456.810-61']);
  data.set(85, ['18', 'Davi', 'davi@gmail.com', '53.590.918/0001-02']);
  data.set(95, ['19', 'Luana', 'luana@gmail.com', '256.456.810-61']);
  data.set(105, ['20', 'Davi', 'davi@gmail.com', '53.590.918/0001-02']);

  return <DataTable title="Promoters" columns={columns} data={data} />;
};

export default App;
