-- Eliminar la base de datos si ya existe
DROP DATABASE IF EXISTS proyecto;

-- Crear la base de datos
CREATE DATABASE proyecto;

-- Usar la base de datos creada
USE proyecto;

-- Crear la tabla Roles
CREATE TABLE Roles (
    rol_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);
CREATE TABLE cargos_taller (
    cargo_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_cargo VARCHAR(50) NOT NULL,
    descripcion TEXT
);


-- Crear la tabla Empleados
CREATE TABLE Usuarios (
    usuario_id INT AUTO_INCREMENT PRIMARY KEY,
    rol_id INT,
    cargo_id INT,
    nombre VARCHAR(100) NOT NULL,
    cargo VARCHAR(255),
    edad INT(3),
    email VARCHAR(100) UNIQUE,
    telefono VARCHAR(20),
    CC VARCHAR(20) UNIQUE,
    estado ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo',
    contrasena VARCHAR(100) NOT NULL,
    FOREIGN KEY (rol_id) REFERENCES Roles(rol_id),
	FOREIGN KEY (cargo_id) REFERENCES cargos_taller(cargo_id)
);

-- Crear la tabla Vehiculos
CREATE TABLE Vehiculos (
    vehiculo_id INT AUTO_INCREMENT PRIMARY KEY,
    placa VARCHAR(8) UNIQUE NOT NULL,
    usuario_id INT,
    marca ENUM('BMW', 'Mini Cooper') NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    anio INT NOT NULL,
    vin VARCHAR(17) UNIQUE NOT NULL,
    color VARCHAR(50),
    kilometraje INT,
    ultima_revision DATE,
    estado ENUM('Activo', 'En Mantenimiento', 'Inactivo') DEFAULT 'Activo',

    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id)
);

-- Crear la tabla Servicios
CREATE TABLE Servicios (
    servicio_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    duracion_estimada TIME,
    categoria ENUM('Mantenimiento Preventivo', 'Reparación', 'Diagnóstico', 'Personalización') NOT NULL,
    estado ENUM('Activo', 'Inactivo') DEFAULT 'Activo',
);

-- Crear la tabla Repuestos
CREATE TABLE Repuestos (
    repuesto_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    categoria ENUM('Motor', 'Transmisión', 'Suspensión', 'Frenos', 'Carrocería', 
                  'Eléctrico', 'Aceites y Fluidos', 'Filtros', 'Neumáticos', 'Accesorios') NOT NULL,
    marca_compatible ENUM('BMW', 'Mini Cooper', 'Ambos') NOT NULL,
    numero_parte VARCHAR(50) UNIQUE,
    precio_compra DECIMAL(10, 2) NOT NULL,
    precio_venta DECIMAL(10, 2) NOT NULL,
    cantidad INT NOT NULL,
    cantidad_minima INT DEFAULT 5,
    ubicacion VARCHAR(100),
    proveedor VARCHAR(100),
    usuario_id INT,
    estado ENUM('Activo', 'Por agotarse', 'Agotado', 'Descontinuado') DEFAULT 'Activo',
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id)
);

-- Crear la tabla Historial_Reparaciones
CREATE TABLE Historial_Reparaciones (
    reparacion_id INT AUTO_INCREMENT PRIMARY KEY,
    vehiculo_id INT,
    servicio_id INT,
    usuario_id INT,
    fecha_inicio DATETIME NOT NULL,
    fecha_fin DATETIME,
    descripcion TEXT,
    diagnostico TEXT,
    costo_total DECIMAL(10, 2),
    estado ENUM('En Proceso', 'Completada', 'Cancelada') DEFAULT 'En Proceso',
    FOREIGN KEY (vehiculo_id) REFERENCES Vehiculos(vehiculo_id),
    FOREIGN KEY (servicio_id) REFERENCES Servicios(servicio_id),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id)
);

-- Crear la tabla Citas
CREATE TABLE Citas (
    cita_id INT AUTO_INCREMENT PRIMARY KEY,
    vehiculo_id INT,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    usuario_id INT,
    servicio_id INT,
    estado ENUM('Pendiente', 'Confirmada', 'En Proceso', 'Completada', 'Cancelada') NOT NULL DEFAULT 'Pendiente',
    notas TEXT,
    createAT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateAT TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (vehiculo_id) REFERENCES Vehiculos(vehiculo_id),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id),
    FOREIGN KEY (servicio_id) REFERENCES Servicios(servicio_id)
);

-- Crear la tabla Servicios_Repuestos
CREATE TABLE Servicios_Repuestos (
    servicio_id INT,
    repuesto_id INT,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10, 2) ,
    PRIMARY KEY (servicio_id, repuesto_id),
    FOREIGN KEY (servicio_id) REFERENCES Servicios(servicio_id),
    FOREIGN KEY (repuesto_id) REFERENCES Repuestos(repuesto_id)
);

-- Crear la tabla Alertas
CREATE TABLE Alertas (
    alerta_id INT AUTO_INCREMENT PRIMARY KEY,
    repuesto_id INT,
    tipo ENUM('Stock Bajo', 'Agotado', 'Precio Actualizado', 'Mantenimiento') NOT NULL,
    mensaje VARCHAR(255),
    leida BOOLEAN DEFAULT FALSE,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (repuesto_id) REFERENCES Repuestos(repuesto_id)
);

-- Trigger para alertas de stock bajo
DELIMITER //
CREATE TRIGGER check_repuesto_quantity
AFTER UPDATE ON Repuestos
FOR EACH ROW
BEGIN
    IF NEW.cantidad <= NEW.cantidad_minima AND NEW.cantidad > 0 THEN
        INSERT INTO Alertas (repuesto_id, tipo, mensaje)
        VALUES (NEW.repuesto_id, 'Stock Bajo', 
                CONCAT('Stock bajo del repuesto "', NEW.nombre, '". Cantidad actual: ', NEW.cantidad));
    ELSEIF NEW.cantidad = 0 THEN
        INSERT INTO Alertas (repuesto_id, tipo, mensaje)
        VALUES (NEW.repuesto_id, 'Agotado', 
                CONCAT('El repuesto "', NEW.nombre, '" se ha agotado.'));
    END IF;
END //
DELIMITER ;

-- Insertar Roles
INSERT INTO Roles (nombre) VALUES 
('Administrador'),
('Empleado'),
('Cliente');
INSERT INTO cargos_taller (nombre_cargo, descripcion) VALUES
('Gerente de Taller', 'Responsable de la supervisión general del taller y del personal.'),
('Asesor de Servicio', 'Encargado de recibir y atender a los clientes, brindar asesoramiento sobre el servicio requerido.'),
('Técnico Especializado en BMW', 'Técnico con conocimientos avanzados y certificación en la reparación de vehículos BMW.'),
('Técnico Especializado en Mini Cooper', 'Técnico especializado en el mantenimiento y reparación de vehículos Mini Cooper.'),
('Técnico de Diagnóstico', 'Encargado de realizar diagnósticos electrónicos y mecánicos avanzados en vehículos.'),
('Jefe de Repuestos', 'Responsable de la gestión de inventarios y suministros de repuestos en el taller.'),
('Asistente de Repuestos', 'Asiste al jefe de repuestos en la organización y control de inventarios.'),
('Técnico de Carrocería', 'Especialista en la reparación de carrocería y pintura para vehículos accidentados o dañados.'),
('Electricista Automotriz', 'Especialista en la reparación y diagnóstico de problemas eléctricos en vehículos.'),
('Técnico de Mantenimiento General', 'Responsable de los servicios de mantenimiento rutinario como cambios de aceite, filtros, y revisión de frenos.'),
('Administrador de Servicio al Cliente', 'Encargado de supervisar la satisfacción del cliente y gestionar quejas o solicitudes adicionales.'),
('Lavador de Autos', 'Realiza la limpieza y preparación de los vehículos para ser entregados al cliente.');


-- Insertar Empleados
INSERT INTO Usuarios (rol_id, nombre, edad, email, telefono, CC, estado, contrasena) VALUES 
(1, 'Juan Pérez', 35, 'juan.perez@example.com', '3001234567', 1234567890, 'Activo', 'contraseña123'),
(2, 'María Gómez', 29, 'maria.gomez@example.com', '3009876543', 987654320, 'Activo', 'contraseña456'),
(3, 'Carlos Martínez', 40, 'carlos.martinez@example.com', '3005551234', 555123456, 'Activo', 'contraseña789');


-- Insertar Vehículos
INSERT INTO Vehiculos (placa, usuario_id, marca, modelo, anio, vin) VALUES 
('ABC123', 1, 'BMW', 'M3', 2022, 'WBSWD93577PY24410'),
('DEF456', 1, 'BMW', 'X5', 2021, 'WBAKJ234567L12345'),
('GHI789', 2, 'Mini Cooper', 'S', 2023, 'WMWXU93578T123456'),
('JKL012', 3, 'BMW', 'Serie 5', 2022, 'WBAJD98765K98765');

-- Insertar Servicios
INSERT INTO Servicios (nombre, descripcion, precio) VALUES 
('Mantenimiento Preventivo BMW', 'Servicio completo según kilometraje', 850000.00),
('Mantenimiento Preventivo Mini', 'Servicio completo según kilometraje', 750000.00),
('Diagnóstico Computarizado', 'Revisión completa con escáner BMW/Mini', 180000.00),
('Alineación y Balanceo', 'Servicio especializado', 220000.00);

-- Insertar Repuestos
INSERT INTO Repuestos (
    nombre, descripcion, categoria, marca_compatible, numero_parte,
    precio_compra, precio_venta, cantidad, cantidad_minima,
    ubicacion, proveedor, usuario_id, estado
) VALUES 
-- Motor
('Filtro de Aceite BMW', 'Original BMW', 'Motor', 'BMW', 'BM11427566327', 
 45000, 85000, 30, 10, 'A-101', 'BMW AG', 1, 'Activo'),

('Kit de Embrague Mini', 'Original Mini Cooper', 'Transmisión', 'Mini Cooper', 'MC21207572842', 
 850000, 1200000, 5, 2, 'B-201', 'Mini Cooper Parts', 1, 'Por agotarse'),

-- Frenos
('Pastillas Brembo M3', 'Para BMW M3/M4', 'Frenos', 'BMW', 'BR34116799163', 
 280000, 380000, 12, 4, 'C-101', 'Brembo', 1, 'Activo'),

-- Suspensión
('Amortiguadores M Sport', 'Kit delantero BMW', 'Suspensión', 'BMW', 'BM31316796940', 
 1200000, 1800000, 4, 2, 'D-101', 'Bilstein', 1, 'Por agotarse'),

-- Aceites
('Aceite Motor 5W-30', 'BMW LL-04', 'Aceites y Fluidos', 'Ambos', 'BM83212365935',
 45000, 65000, 100, 20, 'E-101', 'Castrol', 1, 'Activo'),

-- Filtros
('Filtro de Aire N20', 'Para motor N20/N26', 'Filtros', 'BMW', 'BM13718619696',
 65000, 95000, 15, 5, 'F-101', 'Mann Filter', 1, 'Activo');

-- Insertar Historial_Reparaciones
INSERT INTO Historial_Reparaciones (vehiculo_id, servicio_id, fecha_inicio, fecha_fin, descripcion, costo_total) VALUES 
(1, 1, '2024-01-15', '2024-01-15', 'Mantenimiento 10,000 km BMW M3', 950000.00),
(3, 2, '2024-01-20', '2024-01-20', 'Mantenimiento 15,000 km Mini Cooper S', 850000.00),
(2, 3, '2024-01-25', '2024-01-25', 'Diagnóstico por falla de motor', 180000.00);

-- Insertar Citas
INSERT INTO Citas (vehiculo_id, fecha, hora, usuario_id, servicio_id, estado) VALUES 
(1, '2024-02-01', '09:00:00', 2, 1, 'Pendiente'),
(3, '2024-02-01', '11:00:00', 3, 2, 'Pendiente'),
(2, '2024-02-02', '14:00:00', 2, 3, 'Pendiente');

-- Insertar Servicios_Repuestos
INSERT INTO Servicios_Repuestos (servicio_id, repuesto_id, cantidad) VALUES 
(1, 1, 1),  -- Filtro de aceite para mantenimiento BMW
(1, 5, 6),  -- Aceite para mantenimiento BMW
(2, 5, 4);  -- Aceite para mantenimiento Mini

select * from vehiculos
