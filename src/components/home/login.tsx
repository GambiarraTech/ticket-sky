import Link from 'next/link';
import Forms from "./forms";
import NavBar from "./navbarhome";


export default function Login() {
    return (
        <NavBar>
            <Forms>

                <form action="" className="space-y-6">
                    <img className="h-24 " src="./images/logoTS2.png" alt="logoForm" />
                    <div>
                        <label htmlFor="email" className="text-sm font-bold text-azulBalanço block ">Digite o email: </label>
                        <input id="email" type="email" className="w-full p-2 border border-gray-300 rounded mt-1" />
                    </div>
                    <div>
                        <label htmlFor="password" className="text-sm font-bold text-azulBalanço block">Digite a senha: </label>
                        <input id='password' type="password" className="w-full p-2 border border-gray-300 rounded mt-1" />
                    </div>
                    <button className="px-4 py-2 text-sm font-medium text-white bg-azulBalanço border border-azulBalanço rounded-l-lg rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-azulBalanço dark:hover:bg-white dark:focus:ring-blue-500 dark:focus:text-white">Fazer login</button>
                    <button><a className=" px-10 py-4 justify-center" href="/">Esqueceu sua senha?</a></button>
                    <br />
                    <Link href='/cadastro' className="text-azulBalanço font-bold underline">Crie uma nova conta</Link>
                </form>

            </Forms>
        </NavBar>
    );
}


