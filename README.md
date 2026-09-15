# 🛒 Tiendita CI/CD

Aplicación ligera de **Tiendita** (e-commerce básico) construida con **Node.js + Express**, lista para usarse en un laboratorio de **DevOps / CI/CD con Azure Pipelines**.

## 🚀 Endpoints

| Endpoint          | Descripción                                          |
| ----------------- | ---------------------------------------------------- |
| `GET /api/health`  | Retorna `{"status": "OK", "environment": "..."}`     |
| `GET /api/products` | Retorna una lista fija de productos (id, nombre, precio, stock) |
| `GET /api/hello`   | Retorna `{"message": "Hola desde DevOps", ...}`       |

> El campo `environment` proviene de `process.env.APP_ENVIRONMENT` o su valor por defecto `LOCAL`.

Ejemplos de respuesta:

```bash
curl http://localhost:3000/api/health
# {"status":"OK","environment":"LOCAL"}

curl http://localhost:3000/api/hello
# {"message":"Hola desde DevOps","environment":"LOCAL"}

curl http://localhost:3000/api/products
# [{"id":1,"nombre":"Coca-Cola 600ml","precio":18.5,"stock":50}, ...]
```

## 📋 Requisitos

* Node.js 18 o superior.
* npm (incluido con Node.js).
* Git (opcional, para el control de versiones).

## ⚙️ Guía de ejecución local

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd Laboratorio-CICD
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Ejecutar las pruebas unitarias

```bash
npm test
```

Debe mostrarse una salida similar a:

```
PASS ./index.test.js
Tests:       3 passed, 3 total
```

### 4. Levantar el servidor

```bash
npm start
```

El servidor se ejecutará en `http://localhost:3000` y mostrará:

```
Tiendita corriendo en http://localhost:3000 (ambiente: LOCAL)
```

Para detenerlo, presiona `Ctrl + C`.

### 5. Cambiar puerto y ambiente (opcional)

```bash
PORT=4000 APP_ENVIRONMENT=STAGING npm start
```

En **Windows (PowerShell/Cmd)** usa:

```powershell
$env:PORT=4000; $env:APP_ENVIRONMENT="STAGING"; npm start
```

## 🧪 Pruebas unitarias

Las pruebas usan **Jest + Supertest** y validan que los endpoints `/api/health`, `/api/products` y `/api/hello` respondan código `200`.

```bash
npm test
```

## 🛠 Scripts disponibles

| Comando       | Descripción                         |
| ------------- | ----------------------------------- |
| `npm start`   | Inicia el servidor Express          |
| `npm test`    | Ejecuta las pruebas unitarias       |

## 🔄 Integración con Azure Pipelines

Crea un pipeline YAML (`azure-pipelines.yml`) en la raíz del repositorio con este contenido:

```yaml
trigger:
  - main

pool:
  vmImage: "ubuntu-latest"

steps:
  - task: NodeTool@0
    inputs:
      versionSpec: "20.x"
    displayName: "Instalar Node.js"

  - script: npm install
    displayName: "Instalar dependencias"

  - script: npm test
    displayName: "Ejecutar pruebas unitarias"

  - script: npm start
    displayName: "Iniciar servidor (smoke test)"
```

Para crearlo en Azure DevOps:

1. Ve a **Pipelines → Pipelines → New Pipeline**.
2. Selecciona **Azure Repos Git** (o GitHub) y elige el repositorio.
3. Selecciona **Starter pipeline** y reemplaza el contenido con el YAML anterior.
4. Guarda y ejecuta el pipeline. La etapa de CI instalará dependencias y correrá las pruebas automáticamente.

## 📁 Estructura del proyecto

```
├── index.js          # Servidor principal (Express)
├── index.test.js     # Pruebas unitarias (Jest + Supertest)
├── package.json      # Dependencias y scripts
├── .gitignore        # Ignora node_modules, logs, .env, etc.
└── README.md         # Este archivo
```

## 🧯 Solución de problemas

| Problema                          | Solución                                                            |
| --------------------------------- | ------------------------------------------------------------------- |
| `npm install` falla               | Verifica que Node.js 18+ esté instalado con `node -v`.              |
| El puerto 3000 está ocupado       | Usa otra variable `PORT`, por ejemplo `PORT=4000 npm start`.        |
| `npm test` no encuentra pruebas   | Ejecuta desde la raíz del proyecto (donde está `package.json`).     |
| Los endpoints no responden        | Confirma que el servidor arrancó antes de hacer `curl`.             |