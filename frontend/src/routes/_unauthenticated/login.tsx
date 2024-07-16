import { createFileRoute } from '@tanstack/react-router';
import { LoginButton } from '~/components/Auth0/LoginButton';

export const Route = createFileRoute('/_unauthenticated/login')({
  component: LoginPage,
});

function LoginPage() {
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img alt="" src="/authImage.png" className="absolute inset-0 h-full w-full object-cover" />
        </aside>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-8 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <h1 className="mt-6 text-2xl font-bold text-primary-dark sm:text-3xl md:text-4xl">
              Login to <span className="text-primary-green">&lt;Geekle&gt;</span>
            </h1>

            <p className="mt-4 leading-relaxed text-gray-500 text-lg">
              Sign in to create and customize architecture diagrams effortlessly using our AI-powered tools. Streamline
              your design process and visualize your projects with ease.
            </p>

            <div className="w-full flex justify-center items-center h-64">
              <LoginButton />
            </div>

            {/* {isLogin ? <Signin setIsLogin={setIsLogin} /> :
                        <Signup setIsLogin={setIsLogin} />
                        } */}
          </div>
        </main>
      </div>
    </section>
  );
}
