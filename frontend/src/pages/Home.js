import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Carousel } from 'primereact/carousel';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import '../styles/Home.css';

function Home() {
  const services = [
    {
      title: 'Mantenimiento Preventivo',
      description: 'Mantén tu BMW o Mini Cooper en óptimas condiciones con nuestro mantenimiento preventivo especializado.'
    },
    {
      title: 'Reparaciones Especializadas',
      description: 'Reparamos tu vehículo con piezas originales y técnicas especializadas para BMW y Mini Cooper.'
    },
    {
      title: 'Diagnóstico por Computadora',
      description: 'Contamos con equipos de diagnóstico avanzados para identificar problemas rápidamente.'
    },
    {
      title: 'Suspensión y Frenos',
      description: 'Servicio completo para la suspensión y los frenos de tu BMW y Mini Cooper.'
    },
    {
      title: 'Reprogramación Electrónica',
      description: 'Optimiza el rendimiento de tu vehículo con nuestras reprogramaciones electrónicas.'
    }
  ];

  const serviceTemplate = (service) => {
    return (
      <Card className='service-item' title={service.title} style={{ padding: '20px', borderRadius: '10px' }}>
        <p>{service.description}</p>
      </Card>
    );
  };

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='App'>
      <Header />
      <div id='home' className='banner'>
        <h1>Mantenimiento Premium para tu BMW y Mini Cooper</h1>
        <Button label='Reserva tu Cita' className='p-button-danger cta-button' />
      </div>

      <section id='services' className='services'>
        <h2>Nuestros Servicios Especializados</h2>
        <Carousel value={services} itemTemplate={serviceTemplate} numVisible={3} numScroll={1} className='service-carousel' circular autoplayInterval={3000} />
      </section>

      <section id='about' className='about-us'>
        <Card title='Acerca de Nosotros' className='about-us-card' style={{ padding: '20px', margin: '20px 0', borderRadius: '10px', backgroundColor: '#f0f0f0' }}>
          <p>
            En nuestro taller especializado, contamos con un equipo de técnicos altamente capacitados y apasionados por los vehículos BMW y Mini Cooper. Nuestro objetivo es proporcionar un servicio de alta calidad utilizando siempre herramientas y piezas originales para garantizar el mejor rendimiento de tu vehículo. Con años de experiencia en la industria, nos enorgullece ofrecer soluciones confiables y efectivas para mantener tu coche en óptimas condiciones.
          </p>
          <p>
            Nuestro enfoque en la satisfacción del cliente nos impulsa a brindar un servicio excepcional en cada visita. Ya sea para mantenimiento preventivo, reparaciones o mejoras, estamos aquí para ayudarte a cuidar tu BMW o Mini Cooper como se merece.
          </p>
        </Card>
      </section>

      <section id='contact' className='cta-section'>
        <h2>Reserva tu Cita Hoy Mismo</h2>
        <p>Contacta con nosotros para agendar una cita y mantener tu BMW o Mini Cooper en perfectas condiciones.</p>
        <Button label='Contáctanos' className='p-button-danger cta-button' />
      </section>

      {showScrollTop && (
        <Button icon='pi pi-arrow-up' className='scroll-to-top p-button-rounded p-button-text' onClick={scrollToTop} style={{ position: 'fixed', bottom: '50px', right: '30px', backgroundColor: '#000000', color: '#ffffff', zIndex: 9999 }} />
      )}

      <Footer />
    </div>
  );
}

export default Home;
