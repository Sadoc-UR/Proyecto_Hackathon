# 📢 Reporte Ciudadano

**Reporte Ciudadano** es una plataforma diseñada para facilitar la denuncia de emergencias y situaciones críticas mediante un chatbot interactivo impulsado por inteligencia artificial. Este sistema permite a los usuarios generar reportes, clasificarlos automáticamente y enviarlos a una base de datos para su seguimiento.

---

## 🚀 Comenzando

Estas instrucciones te ayudarán a obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas.

### 📋 Prerrequisitos

Asegúrate de tener instalados los siguientes programas y herramientas:

- **Node.js** (versión 14 o superior)
- **npm** (gestor de paquetes de Node.js)
- **MongoDB** (base de datos para almacenar los reportes)
- Navegador web moderno (Google Chrome, Firefox, etc.)

### 🔧 Instalación

Sigue estos pasos para configurar el entorno de desarrollo:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/usuario/Proyecto_Hackathon.git
   cd Proyecto_Hackathon
   ```

2. Instala las dependencias del proyecto:
   ```bash
   npm install
   ```

3. Configura las variables de entorno:
   - Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:
     ```plaintext
     MONGO_URI=mongodb://localhost:27017/denuncias
     PORT=3000
     ```

4. Inicia el servidor:
   ```bash
   node server.js
   ```

5. Abre el navegador y accede a:
   ```
   http://localhost:3000
   ```

---

## 🧪 Ejecutando las pruebas

### Pruebas de extremo a extremo (E2E)

Ejecuta las pruebas para verificar el funcionamiento completo del sistema:

```bash
npm run test:e2e
```

### Pruebas de estilo de código

Asegúrate de que el código sigue las convenciones establecidas:

```bash
npm run lint
```

---

## 🚀 Despliegue

Para desplegar el proyecto en un entorno de producción:

1. Configura un servidor con Node.js y MongoDB.
2. Sube los archivos del proyecto al servidor.
3. Configura las variables de entorno en el servidor.
4. Inicia el servidor con un administrador de procesos como **PM2**:
   ```bash
   pm2 start server.js
   ```

---

## 🛠️ Construido con

- **[Node.js](https://nodejs.org/)** - Entorno de ejecución para JavaScript.
- **[Express.js](https://expressjs.com/)** - Framework para el backend.
- **[MongoDB](https://www.mongodb.com/)** - Base de datos NoSQL.
- **[TailwindCSS](https://tailwindcss.com/)** - Framework de CSS para diseño responsivo.
- **[FontAwesome](https://fontawesome.com/)** - Librería de íconos.

---

## 🤝 Contribuyendo

Si deseas contribuir al proyecto, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz un commit (`git commit -m 'Agrega nueva funcionalidad'`).
4. Sube tus cambios a tu rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request en el repositorio original.

---

## 📌 Versionado

Este proyecto utiliza [SemVer](http://semver.org/) para el control de versiones. Para ver las versiones disponibles, consulta los [tags en este repositorio](https://github.com/usuario/Proyecto_Hackathon/tags).

---

## ✒️ Autores

- **[Sadoc](https://github.com/Sadoc-UR)** - *Desarrollador*
- **[Baruc](https://github.com/Baruc921119)** - *Desarrollador*
- **[Luis](https://github.com/Xwisito)** - *Desarrollador*
- **[Daniel](https://github.com/DanielHuerta19)** - *Desarrollador*
- **[I_V_A_N_S](https://github.com/EmileLang)** - *Desarrollador*

Consulta también la lista de [contribuyentes](https://github.com/usuario/Proyecto_Hackathon/contributors) que participaron en este proyecto.

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - consulta el archivo [LICENSE.md](LICENSE.md) para más detalles.

---

## 🎉 Agradecimientos

- A todos los desarrolladores que contribuyeron con ideas y código.
- Inspiración tomada de proyectos similares.
- A la comunidad de código abierto por su apoyo.