# Taller de Backend paso a paso

## 馃攳 Descripci贸n

Implementaci贸n de un backend basado en ExpressJS, para que siva como API de una aplicaci贸n cliente, desarrollado mediante TypeScript y siguiendo la arquitectura router-handler-controller.

## 馃洜 Principales herramientas empleadas

-   馃摝 `Webpack` para compilaci贸n y empaquetado del c贸digo TypeScript.
-   馃敀 `JWT` como generador de tokens.
-   鈿欙笍 `dotenv` para la gesti贸n de variables de entorno.
-   馃摑 `Swagger` para la documentaci贸n de la API REST.
-   馃捑 `Pino` como herramienta de logging.
-   鉁? `Joi` para la validaci贸n de los datos de entrada.
-   馃И `Jest` para los test unitarios, as铆 como `supertest` para los tests de integraci贸n de la API.
-   馃攳 `ESLint` como linter y formateador del c贸digo.
-   馃惗 `Husky` para la gesti贸n de los Git Hooks.
-   馃惓 `Docker` para la gesti贸n de im谩genes en desarrollo y testing.
-   馃洟 `Sequelize` como ORM para el acceso a una base de datos MySQL.

## 馃捇 Requisitos del sistema

Para poder ejecutar este c贸digo, el sistema debe contar con estos requisitos m铆nimos:

-   NodeJS lts/fermium
-   npm 6.14.15
-   npx 6.14.15
-   Docker 20.10.2
-   docker-compose 1.29.2

Como herramientas adicionales:

-   nvm 0.38.0
-   Navegador web (recomendado Google Chrome 97.0)
-   Herramienta de gesti贸n de datos (recomendado MySQL Workbench 8.0)
-   Herramienta de gesti贸n de peticiones REST (recomendado Postman 9.9.3)
-   Editor de c贸digo (recomendado VScode 1.63.2)

## 馃敟 Comandos disponibles

### 鉁? Cambiar la versi贸n de Node

```sh
nvm use
```

### 猬囷笍 Instalaci贸n de dependencias

```sh
npm i
```

### 馃И Ejecuci贸n de los tests

**Archivos requeridos:**

-   `.env.test`

```sh
# Tests unitarios y de integraci贸n.
npm test
# Tests en modo inspecci贸n.
npm run test:watch
# Covertura de tests.
npm run test:coverage
```

### 馃彮 Arranque de la aplicaci贸n en modo desarrollo

**Atchivos requeridos:**

-   `.env.development`

```sh
npm run dev
```

### 馃殌 Compilar la aplicaci贸n [TBD]

TBD

## 鈿欙笍 Variables de entorno

Los archivos de variables de entorno empleados en este repositorio son los siguientes:

-   `.env` para producci贸n.
-   `.env.development` para desarrollo.
-   `.env.test` para testing.

Las variables de entorno definidas en este momento son las siguientes:

```sh
NODE_ENV=production | development | test

# Nombre de la aplicaci贸n que aparecer谩 en los logs del sistema.
SERVICE_NAME=
# Nivel de mensajes de log que quieres que aparezcan.
LOG_LEVEL=fatal | error | warn | info | debug | trace | silent

# Define el puerto del servidor que mejor se adapte al entorno en el que vayas a trabajar.
SERVER_PORT=4000

# Ruta de conexi贸n con la base de datos, dependiente del entorno en el que est茅s trabajando.
MYSQL_URL=mysql://<user>:<pass>@<url>:<port>/<database_name>
# Indicador de si quieres que MySQL lance logs por cada operaci贸n. Vac铆o es que no, 'true' es que s铆.
MYSQL_LOG=

# El resto de las variables de entorno que necesites ir谩n a partir de aqu铆.
```

## 馃摋 Documentaci贸n de la API REST

Una vez arrancado el servidor (en modo desarrollo), la documentaci贸n de la API estar谩 disponible en la siguiente URL:

`http://localhost:<port>/__/apidoc`

## Archivo tsconfig.json

- `"target": "es5"`
  Nos permite definir a qu茅 versi贸n de ECMAScript queremos que el c贸digo TS sea transpilado.

  Al crear el archivo autom谩ticamente, nos aparece seleccionada la opci贸n de es5 (2009) pero en caso de que no indic谩semos esta opci贸n de configuraci贸n, por defecto TS transpilar谩 a es3 (1999).

  Entre todas las opciones que acepta esta propiedad existe el de ESNEXT.

  Cuando seleccionamos este valor, la versi贸n de ES a la que se transpilar谩 el c贸digo en TypeScript, ser谩 aqulla m谩s reciente, que nuestra vesri贸n de TypeScript soporte.

- `"module": "commonjs"`
  Nos permitir谩 definir qu茅 sistema de carga de m贸dulos utilizar谩 la aplicaci贸n.

  Como norma general, todas nuestras aplicaciones tanto para NodeJS como para navegador, cuando est谩n en JS, usan m贸dulos CommonJS por lo tanto, se aconseja dejar esta opci贸n.

- `"strict": true`
  Es el "selecte-all" de las opciones strict admitidas por TypeScript para controlar los errores en el c贸digo.

- `"esModuleInterop": true`
  Permite la compatibilidad de c贸digo al transpilar nuestra aplicaci贸n a JS, cuando en ella estamos usando m贸dulos CommonJS/AMD/UMD en conjunci贸n con m贸dulos ES6.

- `"skipLibCheck": true`
  Omite la comprobaci贸n en profundidad del contenido de los archivos de definici贸n de tipos (.d.ts.)

  Es 煤til ponerlo a true cuando consideramos que puede haber alguna copia de una determinada librer铆a en el node_modules.

  Si consideramos que los archivos .d.ts presentes en nuestro proyecto as铆 como que todas las definiciones en el proyecto son 煤nicas, podemos ponerla a false.

- `"forceConsistentCasingInFileNames": true`
  Est谩 dise帽ada para lanzarnos un error cuando el proyecto est谩 siendo desarrollado en diferentes sistemas operativos, con diferentes sistemas case-sensitive a la hora de nombrar los archivos.

- `"allowJs": true`
  Nos permite realizar compilaciones TypeScript, de c贸digo basado en JavaScript.

  Esta propiedad est谩 genial cuando estamos realizando migraciones de c贸digo desde JS a TS.

  Adem谩s, con este flag activo podemos importar archivos JS dentro de archivos TS.

- `"checkJS: true`
  Funciona en t谩ndem con allowJs de manera que cuando la primera est谩 activada, el compilador de TS (incluso el que est谩 ejecut谩ndose en background dentro de VSCode) es capaz de detectar errores dentro de archivos JS.

  Esta propiedad es equivalente a utilizar la directiva de comentario // @ts-check.

- `"outDir": "path/to/dir"`
  Por defecto y si esta propiedad no es definida, cuando transpilamos c贸digo TypeScript, los archivos JavaScript resultantes ser谩n colocados siguiendo la estructura del proyecto en el que estamos trabajando, en paralelo a los mismos archivos TypeScript.

  Por el contrario, si queremos tener centralizado el resultado final de la compilaci贸n, podemos utilizar esta propiedad para indicar en qu茅 directorio queremos colocar el resultado de la compilaci贸n.

  Hay que indicar que la estructura de archivos del resultado de la compilaci贸n mantendr谩 la estructura definida por los archivos TypeScript.

- `"rootDir": "root/path"`
  Se usa en conjunci贸n a outDir de manera que, si la primera no es definida, se coger谩 por defecto la ra铆z del proyecto.

  En cualquier caso, esta propiedad no afecta de ninguna manera los archivos que van a ser compilados.

- `"noImplicitAny": true`
  Le indicar谩 a TypeScript que marque como error cualquier resultado en el que una inferencia de datos d茅 como resultado `any`.

  Adem谩s de esto, nos obligar谩 a no usar ning煤n tipo de dato como `any` en nuestro c贸digo.

  Esta es una de las opciones de configuraci贸n que est谩n cubiertas cuando tenemos `"strict": true`.

- `"resolveJsonModule": true`
  Permite importar archivos `json`, ya que esta funcionalidad no est谩 soportada de manera nativa en TypeScript.

- `"sourceMap": true`
  Genear archivos de reference entre el c贸digo TypeScript y el generado JavaScript, para mojorar las operaciones de depuraci贸n de c贸digo.
