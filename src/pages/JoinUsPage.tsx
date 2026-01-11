import { JoinUsForm } from '../components/JoinUsForm';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Helmet } from 'react-helmet-async';
export function JoinUsPage() {
  return <div className="min-h-screen bg-brand-white flex flex-col">
    <Navbar />
    <div className="pt-20 flex-1 flex items-center justify-center">
      <Helmet>
        <title>Join Us - DuckHats</title>
        <link rel="canonical" href="https://duckhats.com/join-us" />
        <meta
          name="description"
          content="Join our team at DuckHats and be part of something amazing."
        />
      </Helmet>
      <JoinUsForm />
    </div>
    <Footer />
  </div>;
}