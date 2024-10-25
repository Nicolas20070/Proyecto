import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import AuthenticatedHeader from '../../components/AuthenticatedHeader';
import FloatingMenu from '../../components/FloatingMenu';
import '../../styles/Processes.css';

function Processes() {
    const [selectedProcess, setSelectedProcess] = useState(null);
    const [displayDialog, setDisplayDialog] = useState(false);

    const processesData = [
        {
            id: 1,
            title: 'Cambio de Aceite y Filtro',
            progress: 70,
            remainingTime: '30 minutos',
            mechanicNote: 'Faltan ajustes finales.',
            parts: ['Aceite Sintético', 'Filtro de Aceite']
        },
        {
            id: 2,
            title: 'Revisión de Frenos',
            progress: 50,
            remainingTime: '1 hora',
            mechanicNote: 'Revisando desgaste de discos y pastillas.',
            parts: ['Pastillas de freno', 'Discos de freno']
        },
        {
            id: 3,
            title: 'Alineación y Balanceo',
            progress: 90,
            remainingTime: '15 minutos',
            mechanicNote: 'Realizando balanceo final.',
            parts: ['Contrapesos', 'Herramientas de alineación']
        },
    ];

    const handleViewDetails = (process) => {
        setSelectedProcess(process);
        setDisplayDialog(true);
    };

    const hideDialog = () => {
        setDisplayDialog(false);
        setSelectedProcess(null);
    };

    return (
        <div className='processes-container'>
            <AuthenticatedHeader />
            <FloatingMenu/>
            <section className='processes-summary'>
                <h2>Procesos Actuales en el Taller</h2>
                <div className='processes-list'>
                    {processesData.map((process) => (
                        <Card key={process.id} title={process.title} className='process-card'>
                            <div className='process-details'>
                                <ProgressBar value={process.progress} className='process-progress' />
                                <p><strong>Tiempo Restante:</strong> {process.remainingTime}</p>
                                <p><strong>Observaciones del Mecánico:</strong> {process.mechanicNote}</p>
                                <p><strong>Repuestos Utilizados:</strong> {process.parts.join(', ')}</p>
                            </div>
                            <Button label='Ver Detalles' className='p-button-secondary process-details-button' onClick={() => handleViewDetails(process)} />
                        </Card>
                    ))}
                </div>
            </section>

            {selectedProcess && (
                <Dialog header={`Detalles del Proceso: ${selectedProcess.title}`} visible={displayDialog} style={{ width: '50vw' }} onHide={hideDialog}>
                    <div className='dialog-content'>
                        <p><strong>Tiempo Restante:</strong> {selectedProcess.remainingTime}</p>
                        <p><strong>Observaciones del Mecánico:</strong> {selectedProcess.mechanicNote}</p>
                        <p><strong>Repuestos Utilizados:</strong> {selectedProcess.parts.join(', ')}</p>
                        <p><strong>Detalle Adicional:</strong> Todo el proceso se está realizando con herramientas y técnicas certificadas para asegurar la máxima calidad del servicio.</p>
                    </div>
                </Dialog>
            )}

        </div>
    );
}

export default Processes;
