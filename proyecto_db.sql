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

-- Crear la tabla Empleados
CREATE TABLE Empleados (
    empleado_id INT AUTO_INCREMENT PRIMARY KEY,
    rol_id INT,
    nombre VARCHAR(100) NOT NULL,
    cargo VARCHAR(255),
    edad int (3),
    email VARCHAR(100),
    telefono varchar(20),
    CC int(10),
    estado varchar(20) NOT NULL,
    contraseña varchar (100) not null,
    FOREIGN KEY (rol_id) REFERENCES Roles(rol_id)
);

-- Crear la tabla Clientes
CREATE TABLE Clientes (
    cliente_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(255),
    telefono VARCHAR(20),
    email VARCHAR(100),
	contraseña varchar (100) not null
);

-- Crear la tabla Vehiculos
CREATE TABLE Vehiculos (
    vehiculo_id INT AUTO_INCREMENT PRIMARY KEY,
    placa varchar (8) unique not null ,
    cliente_id INT,
    marca ENUM('BMW', 'Mini Cooper') NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    anio INT NOT NULL,
    vin VARCHAR(17) UNIQUE NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES Clientes(cliente_id)
);

-- Crear la tabla Servicios
CREATE TABLE Servicios (
    servicio_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL
);

-- Crear la tabla Repuestos
CREATE TABLE Repuestos (
    repuesto_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
	categoria ENUM('Pendiente', 'En Proceso', 'Completada') NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    cantidad INT NOT NULL,
	ubicacion VARCHAR(100),
    proveedor varchar (100),
	empleado_id INT,
    createAT DATE,
    updateAT DATE,
    estado ENUM ('Agotado','Por agotarse', 'Descontinuado','Activo'),
    FOREIGN KEY (empleado_id) REFERENCES Empleados(empleado_id)
);


-- Crear la tabla Historial_Reparaciones
CREATE TABLE Historial_Reparaciones (
    reparacion_id INT AUTO_INCREMENT PRIMARY KEY,
    vehiculo_id INT,
    servicio_id INT,
    fecha DATE NOT NULL,
    descripcion TEXT,
    costo DECIMAL(10, 2),
    FOREIGN KEY (vehiculo_id) REFERENCES Vehiculos(vehiculo_id),
    FOREIGN KEY (servicio_id) REFERENCES Servicios(servicio_id)
);

-- Crear la tabla Citas
CREATE TABLE Citas (
    cita_id INT AUTO_INCREMENT PRIMARY KEY,
    vehiculo_id INT,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    empleado_id INT,
    servicio_id INT,
    estado ENUM('Pendiente', 'En Proceso', 'Completada') NOT NULL,
    FOREIGN KEY (vehiculo_id) REFERENCES Vehiculos(vehiculo_id),
    FOREIGN KEY (empleado_id) REFERENCES Empleados(empleado_id),
    FOREIGN KEY (servicio_id) REFERENCES Servicios(servicio_id)
);


-- Crear la tabla Servicios_Repuestos
CREATE TABLE Servicios_Repuestos (
    servicio_id INT,
    repuesto_id INT,
    cantidad INT NOT NULL,
    PRIMARY KEY (servicio_id, repuesto_id),
    FOREIGN KEY (servicio_id) REFERENCES Servicios(servicio_id),
    FOREIGN KEY (repuesto_id) REFERENCES Repuestos(repuesto_id)
);

CREATE TABLE Alertas (
    alerta_id INT AUTO_INCREMENT PRIMARY KEY,
    repuesto_id INT,
    mensaje VARCHAR(255),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (repuesto_id) REFERENCES Repuestos(repuesto_id)
);

DELIMITER //

CREATE TRIGGER check_repuesto_quantity
AFTER UPDATE ON Repuestos
FOR EACH ROW
BEGIN
    IF NEW.cantidad = 5 THEN
        INSERT INTO Alertas (repuesto_id, mensaje)
        VALUES (NEW.repuesto_id, CONCAT('Se va a agotar el repuesto "', NEW.nombre, '"'));
    END IF;
END //

DELIMITER ;




INSERT INTO Roles (rol_id, nombre) VALUES 
(1, 'Administrador'),
(2, 'Empleado'),
(3, 'Cliente');

-- Insertar un empleado con rol_id 1
INSERT INTO Empleados (rol_id, nombre, cargo, edad, email, telefono, CC, estado, contraseña)
VALUES (1, 'Juan Pérez', 'Administrador', 35, 'juan.perez@example.com', 3001234567, 1234567890, 'Activo', 'contraseña123');

-- Insertar un empleado con rol_id 2
INSERT INTO Empleados (rol_id, nombre, cargo, edad, email, telefono, CC, estado, contraseña)
VALUES (2, 'María Gómez', 'Asistente', 29, 'maria.gomez@example.com', 3009876543, 987654320, 'Activo', 'contraseña456');

-- Insertar un empleado con rol_id 3
INSERT INTO Empleados (rol_id, nombre, cargo, edad, email, telefono, CC, estado, contraseña)
VALUES (3, 'Carlos Martínez', 'Técnico', 40, 'carlos.martinez@example.com', 3005551234, 555123456, 'Inactivo', 'contraseña789');


INSERT INTO Clientes (nombre, direccion, telefono, email,contraseña) VALUES 
('Carlos Rodríguez', 'Calle Tercera 789', '555-7890', 'carlos.rodriguez@correo.com','654'),
('Ana Fernández', 'Avenida Cuarta 101', '555-1011', 'ana.fernandez@correo.com','456');

INSERT INTO Vehiculos (placa, cliente_id, marca, modelo, anio, vin) VALUES 
('XYZ1234', 1, 'BMW', 'Serie 3', 2020, '1HGCM82633A123456'),
('ABC5678', 2, 'Mini Cooper', 'Countryman', 2019, '2T1BR12E1RC123456');

INSERT INTO Servicios (nombre, descripcion, precio) VALUES 
('Cambio de Aceite', 'Cambio de aceite sintético y revisión de filtros', 75.00),
('Alineación y Balanceo', 'Alineación y balanceo de las 4 ruedas', 120.00);

INSERT INTO Repuestos (nombre, descripcion, categoria, precio, cantidad, ubicacion, proveedor, empleado_id, estado) VALUES 
('Filtro de Aceite', 'Filtro compatible con BMW y Mini Cooper', 'Pendiente', 15.00, 50, 'Estante A', 'Proveedor X', 2, 'Activo'),
('Neumático', 'Neumático 225/50 R17', 'Pendiente', 150.00, 20, 'Estante B', 'Proveedor Y', 2, 'Por agotarse');

INSERT INTO Historial_Reparaciones (vehiculo_id, servicio_id, fecha, descripcion, costo) VALUES 
(1, 1, '2024-08-01', 'Cambio de aceite y revisión completa', 100.00),
(2, 2, '2024-08-02', 'Alineación y balanceo', 120.00);

INSERT INTO Citas (vehiculo_id, fecha, hora, empleado_id, servicio_id, estado) VALUES 
(1, '2024-08-10', '09:00:00', 2, 1, 'Pendiente'),
(2, '2024-08-11', '10:30:00', 2, 2, 'Pendiente');

INSERT INTO Servicios_Repuestos (servicio_id, repuesto_id, cantidad) VALUES 
(1, 1, 1),  -- Filtro de aceite usado en el cambio de aceite
(2, 2, 4);  -- Neumáticos usados en alineación y balanceo

INSERT INTO Alertas (repuesto_id, mensaje) VALUES 
(2, 'El repuesto Neumático está por agotarse'),
(1, 'El repuesto Filtro de Aceite ha sido solicitado recientemente');

select * from Repuestos
