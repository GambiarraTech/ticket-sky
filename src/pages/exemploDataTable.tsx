import DataTable from "@/components/table/DataTable";
import { FC } from "react";


const App: FC = () => {
    
    const columns: any[] =[
        'Id',
        'nome',
        'email',
        'senha'
    ];

    let data = new Map<number, Array<string>>;
    data.set(1, ['1', 'Luana', 'luana@gmail.com', '***']);
    data.set(2, ['2', 'Davi', 'davi@gmail.com', '*****']);

  return (
    <><div>
        <h1 className="text-center text-2xl text-blue-800 font-display font-semibold">Usuários</h1>
    </div>
    <div>
        <DataTable columns = {columns} data={data} />
    </div></>
  );

};

export default App;