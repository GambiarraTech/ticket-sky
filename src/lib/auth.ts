import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const codRole = switchCodRole(ctx.resolvedUrl);
    const { ['ticketsky-token']: token } = parseCookies(ctx);

    try {
        if (!token) {
            throw new Error('Token not found');
        }

        const token_splitted = token.split('-');
        const user = token_splitted[0];
        const decoded = Buffer.from(user, 'base64').toString('ascii');
        const role = decoded[0];

        if (role === codRole) {
            return { props: {} };
        } else {
            throw new Error('Role mismatch');
        }
    } catch (error) {
        console.error(error);

        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        };
    }
};

function switchCodRole(url: string) {
    const urlSplitted = url.split('/')
    switch (urlSplitted[1]) {
        case 'admin':
            return '1';
        case 'promoter':
            return '2';
        case 'cliente':
            return '3';
        default:
            throw new Error('Invalid URL');
    }
}
