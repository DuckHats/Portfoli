import { Hero } from '../components/Hero';
import { Navbar } from '../components/Navbar';
import { Helmet } from 'react-helmet-async';
export function HomePage() {
  return <main className="min-h-screen w-full bg-[#f5f5f5] selection:bg-[#e63946] selection:text-white flex flex-col">
    <Helmet>
      <title>Home - DuckHats</title>
      <link rel="canonical" href="https://duckhats.com/" />
      <meta
        name="description"
        content="Welcome to DuckHats, your go-to platform for innovative projects and a passionate team."
      />
    </Helmet>

    <Navbar />
    <div className="flex-1">
      <Hero />
    </div>
  </main>;

}