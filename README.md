## ***Proyecto API Rest con NodeJS***

### **Descripción**

Este proyecto es un entregable para la materia de procesos y desarrollo de software. Tiene un propósito totalmente educativo y las funcionalidades se encuentran en desarrollo.

### **Dependencias**

Para la implementación del proyecto y colaboradores, es necesario instalar los siguientes servicios:

1. MongoDB community Server, es necesario para activar el servicio de mongoDB, es decir el demonio mongod.exe. Link: [MongoDB community Server](https://www.mongodb.com/try/download/community)
2. Mongo Compass, es la interfaz visual de MongoDB (opcional pero facilita el trabajo). Link: [MongoDB compass](https://www.mongodb.com/products/tools/compass)
3. Postman, es la herramienta que usaremos para las pruebas en la API rest. Link: [Postman](https://www.postman.com/downloads/)
4. NodeJS, es el entorno de ejecución para la capa de servidor. Link: [NodeJS](https://nodejs.org/en)

El resto de dependencias ya se encuentran incluídas en el proyecto de git, se pueden consultar en el archivo package.json.

* Al ingresar al código (Visual Studio Code), en caso de ser necesario utilizar npm install para descargar dependencias faltantes.
* Adicionalmente, ingresar a la carpeta Client (front-end), y realizar nuevamente npm install, para descargar dependencias que pueden estar faltantes.

#### Activar el servidor (Demonio -> mongod.exe)

1. Crear una carpeta llamada "data" en el disco C
2. viajar a la siguiente ruta: C:\Program Files\MongoDB\Server\7.0\bin
3. ejecutar mongod.exe

Si se desea facilitar la ejecución del servidor, se puede agregar la ruta del ejecutable a las variables de entorno del sistema.

En caso de presentarse algún tipo de error, como una suspención repentina del servicio de mongod.exe, se debe hacer lo siguiente:
Ejecutar mongod.exe especificando la ruta de la carpeta data: mongod.exe -dbpath C:/data (data debe ser una carpeta creada en el disco C).

#### Ejecutar la API.

1. Debe estar activo el servidor.
2. comando para ejecutar el servicio back-ed: npm start
3. comando para ejectura el servicio front-end npm run dev

Se comprobará un correcto funcionamiento, si la terminal se presenta un mensaje que indique: "Conectado correctamente a la base de datos".

#### Funcionalidades
