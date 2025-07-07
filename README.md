# SAPUI5 Learning Workspace (Monorepo con pnpm)

Este repositorio es un monorepo gestionado con [pnpm](https://pnpm.io/) para organizar y desarrollar múltiples proyectos de aprendizaje de SAPUI5. El uso de un monorepo nos permite centralizar dependencias, simplificar la gestión de proyectos y mantener un entorno de desarrollo consistente.

## ✨ Características

- __Gestión Centralizada:__ Todas las dependencias se instalan en una única carpeta `node_modules` en la raíz, ahorrando espacio en disco y tiempo de instalación.
- **Workflows Simplificados:** Ejecuta comandos para proyectos específicos o para todos a la vez desde la raíz del workspace.
- **Dependencias Compartidas:** Herramientas de desarrollo como `@ui5/cli` se instalan una sola vez en la raíz y están disponibles para todos los proyectos.
- **Estructura Organizada:** Cada proyecto de SAPUI5 vive en su propia carpeta, manteniendo el código aislado y limpio.

---

## 🚀 Cómo Empezar

Sigue estos pasos para configurar el entorno de desarrollo en tu máquina local.

### Prerrequisitos

Asegúrate de tener instalado lo siguiente:

- [Node.js](https://nodejs.org/) (se recomienda la versión LTS más reciente)
- [pnpm](https://pnpm.io/installation) (puedes instalarlo globalmente con `npm install -g pnpm`)

### Instalación

1. **Clona el repositorio:**

```bash
git clone <URL_DE_TU_REPOSITORIO>
cd <NOMBRE_DE_LA_CARPETA>

```

2. **Instala todas las dependencias:**
Ejecuta el siguiente comando desde la **carpeta raíz** del proyecto. pnpm leerá el archivo `pnpm-workspace.yaml` e instalará las dependencias de todos los proyectos del workspace.

```bash
pnpm install

```

---

## 📂 Estructura del Proyecto

El monorepo está organizado de la siguiente manera:

```ini
/
├── 📁 01-quickstart/       # Proyecto 1: App básica en JavaScript
│   ├── 📁 webapp/
│   ├── 📄 package.json     # Dependencias y scripts de '01-quickstart'
│   └── 📄 ui5.yaml
│
├── 📁 02-project-ts/       # Proyecto 2: App con TypeScript
│   ├── 📁 webapp/
│   ├── 📄 package.json     # Dependencias y scripts de '02-project-ts'
│   └── 📄 ui5.yaml
│
├── 📄 .gitignore
├── 📄 node_modules/       # Creada por pnpm, contiene TODAS las dependencias
├── 📄 package.json         # package.json raíz para dependencias globales (ej: @ui5/cli)
├── 📄 pnpm-lock.yaml      # Lockfile de pnpm
└── 📄 pnpm-workspace.yaml   # ¡CLAVE! Define los proyectos que forman parte del workspace

```

---

## 🛠️ Comandos Útiles

Todos los comandos deben ejecutarse desde la **carpeta raíz** del monorepo.

### Iniciar un Servidor de Desarrollo

Para ejecutar el servidor de desarrollo de un proyecto específico, usamos el flag `--filter` seguido del nombre del paquete (definido en su `package.json`) o la ruta de la carpeta.

**Ejemplo para el proyecto `01-quickstart`:**
*(Suponiendo que su `package.json` tiene un script `"start": "ui5 serve -o /index.html"`)*

```bash
# Filtrando por el nombre de la carpeta (recomendado)
pnpm --filter (name of package.json)  run start

# O filtrando por el nombre del paquete (ej: "name": "quickstart")
pnpm --filter ui5.02-project-ts run start

```

**Ejemplo para el proyecto `02-project-ts`:**

```bash
# Filtrando por el nombre de la carpeta
pnpm --filter ./02-project-ts start

# O filtrando por el nombre del paquete (ej: "name": "project-ts")
pnpm --filter project-ts start

```

### Ejecutar un Comando en Todos los Proyectos

Puedes ejecutar un script en todos los proyectos a la vez usando el flag `-r` (recursivo).

**Ejemplo para construir todos los proyectos:**
*(Suponiendo que cada `package.json` tiene un script `"build": "ui5 build"`)*

```bash
pnpm -r build

```

### Añadir una Dependencia a un Proyecto Específico

Para añadir una dependencia a un solo proyecto, usa de nuevo el flag `--filter`.

**Ejemplo: Añadir `moment` al proyecto `02-project-ts`:**

```bash
pnpm --filter project-ts add moment

```

**Para añadir una dependencia de desarrollo (`-D`):**

```bash
pnpm --filter project-ts add -D typescript

```

---

## 🌱 Cómo Añadir un Nuevo Proyecto

1. Crea una nueva carpeta en la raíz (ej: `03-new-project`).

2. Dentro de la nueva carpeta, crea su `package.json` (con un `"name"` único), su `ui5.yaml` y su estructura de `webapp`.

3. **Importante:** Añade la nueva carpeta al archivo `pnpm-workspace.yaml` en la raíz del proyecto.

```yaml
packages:
  - '01-quickstart'
  - '02-project-ts'
  - '03-new-project' # <-- Añade la nueva línea aquí

```

4. Vuelve a la raíz y ejecuta `pnpm install` para que pnpm reconozca el nuevo proyecto y enlace sus dependencias.