# Taller de Backend paso a paso

## 🔍 Descripción

Implementación de un backend basado en ExpressJS, para que siva como API de una aplicación cliente, desarrollado mediante TypeScript y siguiendo la arquitectura router-handler-controller.

## 🛠 Principales herramientas empleadas

-   📦 `Webpack` para compilación y empaquetado del código TypeScript.
-   🔒 `JWT` como generador de tokens.
-   ⚙️ `dotenv` para la gestión de variables de entorno.
-   📝 `Swagger` para la documentación de la API REST.
-   💾 `Pino` como herramienta de logging.
-   ✅ `Joi` para la validación de los datos de entrada.
-   🧪 `Jest` para los test unitarios, así como `supertest` para los tests de integración de la API.
-   🔍 `ESLint` como linter y formateador del código.
-   🐶 `Husky` para la gestión de los Git Hooks.
-   🐳 `Docker` para la gestión de imágenes en desarrollo y testing.
-   🛢 `Sequelize` como ORM para el acceso a una base de datos MySQL.

## 💻 Requisitos del sistema

Para poder ejecutar este código, el sistema debe contar con estos requisitos mínimos:

-   NodeJS lts/fermium
-   npm 6.14.15
-   npx 6.14.15
-   Docker 20.10.2
-   docker-compose 1.29.2

Como herramientas adicionales:

-   nvm 0.38.0
-   Navegador web (recomendado Google Chrome 97.0)
-   Herramienta de gestión de datos (recomendado MySQL Workbench 8.0)
-   Herramienta de gestión de peticiones REST (recomendado Postman 9.9.3)
-   Editor de código (recomendado VScode 1.63.2)

## 🔥 Comandos disponibles

### ✅ Cambiar la versión de Node

```sh
nvm use
```

### ⬇️ Instalación de dependencias

```sh
npm i
```

### 🧪 Ejecución de los tests

**Archivos requeridos:**

-   `.env.test`

```sh
# Tests unitarios y de integración.
npm test
# Tests en modo inspección.
npm run test:watch
# Covertura de tests.
npm run test:coverage
```

### 🏭 Arranque de la aplicación en modo desarrollo

**Atchivos requeridos:**

-   `.env.development`

```sh
npm run dev
```

### 🚀 Compilar la aplicación [TBD]

TBD

## ⚙️ Variables de entorno

Los archivos de variables de entorno empleados en este repositorio son los siguientes:

-   `.env` para producción.
-   `.env.development` para desarrollo.
-   `.env.test` para testing.

Las variables de entorno definidas en este momento son las siguientes:

```sh
NODE_ENV=production | development | test

# Nombre de la aplicación que aparecerá en los logs del sistema.
SERVICE_NAME=
# Nivel de mensajes de log que quieres que aparezcan.
LOG_LEVEL=fatal | error | warn | info | debug | trace | silent

# Define el puerto del servidor que mejor se adapte al entorno en el que vayas a trabajar.
SERVER_PORT=4000

# Ruta de conexión con la base de datos, dependiente del entorno en el que estés trabajando.
MYSQL_URL=mysql://<user>:<pass>@<url>:<port>/<database_name>
# Indicador de si quieres que MySQL lance logs por cada operación. Vacío es que no, 'true' es que sí.
MYSQL_LOG=

# El resto de las variables de entorno que necesites irán a partir de aquí.
```

## 📗 Documentación de la API REST

Una vez arrancado el servidor (en modo desarrollo), la documentación de la API estará disponible en la siguiente URL:

`http://localhost:<port>/__/apidoc`

## Archivo tsconfig.json

- `"target": "es5"`
  Nos permite definir a qué versión de ECMAScript queremos que el código TS sea transpilado.

  Al crear el archivo automáticamente, nos aparece seleccionada la opción de es5 (2009) pero en caso de que no indicásemos esta opción de configuración, por defecto TS transpilará a es3 (1999).

  Entre todas las opciones que acepta esta propiedad existe el de ESNEXT.

  Cuando seleccionamos este valor, la versión de ES a la que se transpilará el código en TypeScript, será aqulla más reciente, que nuestra vesrión de TypeScript soporte.

- `"module": "commonjs"`
  Nos permitirá definir qué sistema de carga de módulos utilizará la aplicación.

  Como norma general, todas nuestras aplicaciones tanto para NodeJS como para navegador, cuando están en JS, usan módulos CommonJS por lo tanto, se aconseja dejar esta opción.

- `"strict": true`
  Es el "selecte-all" de las opciones strict admitidas por TypeScript para controlar los errores en el código.

- `"esModuleInterop": true`
  Permite la compatibilidad de código al transpilar nuestra aplicación a JS, cuando en ella estamos usando módulos CommonJS/AMD/UMD en conjunción con módulos ES6.

- `"skipLibCheck": true`
  Omite la comprobación en profundidad del contenido de los archivos de definición de tipos (.d.ts.)

  Es útil ponerlo a true cuando consideramos que puede haber alguna copia de una determinada librería en el node_modules.

  Si consideramos que los archivos .d.ts presentes en nuestro proyecto así como que todas las definiciones en el proyecto son únicas, podemos ponerla a false.

- `"forceConsistentCasingInFileNames": true`
  Está diseñada para lanzarnos un error cuando el proyecto está siendo desarrollado en diferentes sistemas operativos, con diferentes sistemas case-sensitive a la hora de nombrar los archivos.

- `"allowJs": true`
  Nos permite realizar compilaciones TypeScript, de código basado en JavaScript.

  Esta propiedad está genial cuando estamos realizando migraciones de código desde JS a TS.

  Además, con este flag activo podemos importar archivos JS dentro de archivos TS.

- `"checkJS: true`
  Funciona en tándem con allowJs de manera que cuando la primera está activada, el compilador de TS (incluso el que está ejecutándose en background dentro de VSCode) es capaz de detectar errores dentro de archivos JS.

  Esta propiedad es equivalente a utilizar la directiva de comentario // @ts-check.

- `"outDir": "path/to/dir"`
  Por defecto y si esta propiedad no es definida, cuando transpilamos código TypeScript, los archivos JavaScript resultantes serán colocados siguiendo la estructura del proyecto en el que estamos trabajando, en paralelo a los mismos archivos TypeScript.

  Por el contrario, si queremos tener centralizado el resultado final de la compilación, podemos utilizar esta propiedad para indicar en qué directorio queremos colocar el resultado de la compilación.

  Hay que indicar que la estructura de archivos del resultado de la compilación mantendrá la estructura definida por los archivos TypeScript.

- `"rootDir": "root/path"`
  Se usa en conjunción a outDir de manera que, si la primera no es definida, se cogerá por defecto la raíz del proyecto.

  En cualquier caso, esta propiedad no afecta de ninguna manera los archivos que van a ser compilados.

- `"noImplicitAny": true`
  Le indicará a TypeScript que marque como error cualquier resultado en el que una inferencia de datos dé como resultado `any`.

  Además de esto, nos obligará a no usar ningún tipo de dato como `any` en nuestro código.

  Esta es una de las opciones de configuración que están cubiertas cuando tenemos `"strict": true`.

- `"resolveJsonModule": true`
  Permite importar archivos `json`, ya que esta funcionalidad no está soportada de manera nativa en TypeScript.

- `"sourceMap": true`
  Genear archivos de reference entre el código TypeScript y el generado JavaScript, para mojorar las operaciones de depuración de código.
