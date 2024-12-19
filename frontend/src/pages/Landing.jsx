const Landing = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <header className="w-full py-6 bg-blue-600 text-white text-center">
                <h1 className="text-4xl font-bold">Welcome to Our SAAS Business</h1>
            </header>
            <main className="flex flex-col items-center mt-10">
                <h2 className="text-3xl font-semibold mb-4">Revolutionize Your Workflow</h2>
                <p className="text-lg text-gray-700 mb-8 text-center max-w-2xl">
                    Our software as a service (SAAS) solution helps you streamline your processes, increase productivity, and achieve your business goals with ease.
                </p>
                <a className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300" href="/login">
                    Login
                </a>
            </main>
            <footer className="w-full py-4 bg-gray-800 text-white text-center mt-auto">
                <p>&copy; 2023 SAAS Business. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Landing;