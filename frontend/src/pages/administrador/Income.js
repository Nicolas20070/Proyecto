import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import AuthenticatedHeader from '../../components/AuthenticatedHeader';
import FloatingMenu from '../../components/FloatingMenu';
import '../../styles/Income.css';

function Income() {
  const [incomes, setIncomes] = useState([
    { id: 1, concepto: 'Mantenimiento', monto: 500, fecha: '2024-10-01' },
    { id: 2, concepto: 'Reparación', monto: 1200, fecha: '2024-10-05' },
    { id: 3, concepto: 'Venta de Repuestos', monto: 300, fecha: '2024-10-10' },
  ]);
  const [globalFilter, setGlobalFilter] = useState('');

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Reporte de Ingresos', 14, 20);
    doc.autoTable({
      head: [['Concepto', 'Monto', 'Fecha']],
      body: incomes.map((income) => [income.concepto, income.monto, income.fecha]),
    });
    doc.save('reporte_ingresos.pdf');
  };

  return (
    <div className='income-container'>
      <AuthenticatedHeader />

      <section className='income-table'>
        <h2>Registro de Ingresos</h2>
        <div className='income-actions'>
          <Button label='Generar Reporte' icon='pi pi-file-pdf' className='p-button-danger' onClick={generatePDF} style={{ marginBottom: '20px' }} />
          <InputText type='search' onChange={(e) => setGlobalFilter(e.target.value)} placeholder='Buscar Ingreso...' style={{ marginBottom: '20px' }} />
        </div>
        <DataTable
          value={incomes}
          paginator
          rows={5}
          globalFilter={globalFilter}
          style={{ maxWidth: '1000px', margin: '0 auto' }}
        >
          <Column field='concepto' header='Concepto' sortable></Column>
          <Column field='monto' header='Monto' sortable></Column>
          <Column field='fecha' header='Fecha' sortable></Column>
        </DataTable>
        <div className='income-summary'>
          <h3>Ingresos Totales: ${incomes.reduce((acc, income) => acc + income.monto, 0)}</h3>
        </div>
      </section>

      <FloatingMenu />
    </div>
  );
}

export default Income;
