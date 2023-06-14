import { AuthContext } from '@/contexts/AuthContext';
import * as router from '@/pages/api/router';
import { useContext, useEffect, useState } from 'react';

export default function MeuPerfil() {
  const { user } = useContext(AuthContext);
  const [promoter, setPromoter] = useState({
    id: '',
    nome: '',
    email: '',
    cpf_cnpj: '',
    service: 'editarPromoter',
  });

  async function editarPromoter(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    promoter.service = 'editarPromoter';
    const res = await router.apiPost(promoter, 'promoter');
    alert(res.result);
  }

  useEffect(() => {
    router.apiPost({ service: 'getPerfil', id: user.id }, 'promoter').then((value) => {
      if (value.result != null) {
        setPromoter(value.result);
      }
    });
  }, []);

  return (
    <>
      <div>Faaala Fiote</div>
    </>
  );
}
