# 🗓️ Reservation Fullstack App

Aplicación web **full stack de gestión de reservas** que permite crear, editar y administrar turnos de forma eficiente. El sistema integra frontend y backend con base de datos relacional, ofreciendo una solución escalable y organizada.

---

## 🚀 Características

* Crear nuevas reservas
* Listar reservas existentes
* Editar reservas
* Eliminar reservas
* Arquitectura cliente-servidor
* Comunicación API REST

---

## 🧱 Tecnologías utilizadas

### 🔹 Backend

* Java
* Spring Boot
* Spring Data JPA
* PostgreSQL

### 🔹 Frontend

* Angular
* TypeScript
* Node.js

---

## 📂 Estructura del proyecto

```
reservation-fullstack/
│
├── reservation-backend/   # API REST con Spring Boot
├── reservation-frontend/  # Aplicación Angular
└── README.md
```

---

## ⚙️ Instalación y ejecución

### 🔹 Backend

1. Clonar el repositorio:

```bash
git clone https://github.com/FacundoJesus/reservation-fullstack.git
```

2. Configurar la base de datos en `application.properties`

3. Ejecutar la aplicación:

```bash
./mvnw spring-boot:run
```

---

### 🔹 Frontend

1. Ir a la carpeta del frontend:

```bash
cd reservation-frontend
```

2. Instalar dependencias:

```bash
npm install
```

3. Ejecutar la aplicación:

```bash
ng serve
```

4. Abrir en el navegador:

```
http://localhost:4200
```

---

## 🔌 API

El backend expone endpoints REST para la gestión de reservas:

* `GET /reservations` → listar reservas
* `POST /reservations` → crear reserva
* `PUT /reservations/{id}` → actualizar reserva
* `DELETE /reservations/{id}` → eliminar reserva

---

## 🎯 Objetivo del proyecto

Este proyecto fue desarrollado con fines educativos para practicar el desarrollo de aplicaciones **full stack**, integración entre frontend y backend, y manejo de bases de datos.

---

## 📌 Mejoras futuras

* Autenticación de usuarios (JWT)
* Validaciones avanzadas
* Deploy en la nube
* UI/UX mejorada

---

## 👨‍💻 Autor

Facundo


