

# Proyecto Básico SAPUI5 / OpenUI5

Este es un proyecto de inicio ("boilerplate") para una aplicación SAPUI5/OpenUI5. Contiene la configuración mínima necesaria para levantar un servidor de desarrollo local y mostrar un control simple (`sap.m.Button`).

## Requisitos Previos

- [Node.js](https://nodejs.org/) (versión LTS recomendada).
- `pnpm` como gestor de paquetes. Puedes instalarlo con `npm install -g pnpm`.

## Estructura del Proyecto

```
/
|-- webapp/
|   |-- index.html      # Punto de entrada de la aplicación
|   |-- index.js        # Lógica inicial de la aplicación (control de botón)
|   `-- manifest.json   # Descriptor de la aplicación (ID, etc.)
|-- package.json        # Dependencias de desarrollo y scripts
`-- ui5.yaml            # Configuración de UI5 Tooling
```

## Archivos Clave y su Configuración

A continuación se detallan los archivos principales y el código final que los hace funcionar.

### 1. `package.json`

Define las dependencias de desarrollo (solo la UI5 CLI) y el script para iniciar el servidor.

```json
{
  "name": "sapui5",
  "version": "1.0.0",
  "description": "Proyecto básico de SAPUI5",
  "scripts": {
    "start": "ui5 serve -o index.html"
  },
  "devDependencies": {
    "@ui5/cli": "^4.0.19"
  }
}
```

### 2. `ui5.yaml`

Configura el servidor de desarrollo de UI5. Le indica qué versión del framework usar y qué librerías cargar (como `sap.m` para los controles y `themelib_sap_horizon` para el tema visual). La UI5 CLI se encargará de descargar y servir estas librerías automáticamente.

```yaml
specVersion: "4.0"
metadata:
  name: sapui5
type: application
framework:
  name: OpenUI5
  version: "1.136.1"
  libraries:
    - name: sap.ui.core
    - name: sap.m
    - name: themelib_sap_horizon
```

### 3. `webapp/manifest.json`

El descriptor de la aplicación. Lo más importante aquí es el `id` (`sap.app.id`), que actúa como el "namespace" o identificador único de toda la aplicación.

```json
{
  "_version": "1.58.0",
  "sap.app": {
    "id": "sapui5"
  }
}
```

### 4. `webapp/index.html`

El archivo HTML principal. Carga el framework de SAPUI5 y conecta el namespace de la aplicación (`sapui5`) con su ubicación física (`./`) usando `data-sap-ui-resource-roots`. Luego, inicializa la aplicación ejecutando el módulo `sapui5/index.js` a través de `data-sap-ui-on-init`.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Quickstart Tutorial</title>
    <script id="sap-ui-bootstrap"
        src="resources/sap-ui-core.js"
        data-sap-ui-libs="sap.m"
        data-sap-ui-compat-version="edge"
        data-sap-ui-theme="sap_horizon_dark"
        data-sap-ui-async="true"
        data-sap-ui-on-init="module:sapui5/index"
        data-sap-ui-resource-roots='{
            "sapui5": "./"
        }'>
    </script>
</head>
<body class="sapUiBody" id="content"></body>
</html>
```

### 5. `webapp/index.js`

El código JavaScript que se ejecuta al iniciar la aplicación. Crea un botón (`sap.m.Button`) y lo coloca en el elemento del `body` que tiene el `id="content"`.

```javascript
sap.ui.define([
    "sap/m/Button",
    "sap/m/MessageToast"
], (Button, MessageToast) => {
    "use strict";

    new Button({
        text: "Ready...",
        press() {
            MessageToast.show("Hello World!");
        }
    }).placeAt("content");

});
```

## Guía de Inicio Rápido

Sigue estos pasos para ejecutar el proyecto en tu máquina local.

### 1. Instalar Dependencias

Abre una terminal en la carpeta raíz del proyecto y ejecuta el siguiente comando para instalar la UI5 CLI:

```bash
pnpm install
```

### 2. Iniciar el Servidor de Desarrollo

Una vez instaladas las dependencias, inicia el servidor local con:

```bash
pnpm start
```

Este comando ejecutará `ui5 serve -o index.html`. Automáticamente se abrirá una pestaña en tu navegador web predeterminado en `http://localhost:8080/index.html` y deberías ver un botón con el texto "Ready...". Al hacer clic en él, aparecerá un mensaje "Hello World!".

---