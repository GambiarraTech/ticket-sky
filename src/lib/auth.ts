import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { ['ticketsky-token']: token } = parseCookies(ctx)

    if (!token){
        return {
            redirect: {
              destination: '/',
              permanent: false
            }
        }
    }
    return{
        props: {}
    }
}



