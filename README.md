# Panel Shop Backend

## Proyecto

Backend de Panel Shop para administrar los productos de una tienda.

## Descripción

API REST construida con NestJS. Permite consultar, crear y actualizar productos, además de cambiar su estado de vigencia. Los datos se guardan en MongoDB y las imágenes de producto se almacenan en Vercel Blob.

La API escucha en el puerto `3001`. Las rutas de productos comienzan con `/products`.

## Requisitos

- Node.js compatible con las dependencias del proyecto.
- pnpm.
- Una instancia de MongoDB y su URI de conexión.
- Un token de lectura y escritura de Vercel Blob para cargar imágenes.

Configura `MONGODB_URI` y `BLOB_READ_WRITE_TOKEN` en un archivo `.env` en la raíz del proyecto. Puedes usar `.env.example` como referencia.

## Tecnología / versión

Las versiones indicadas son las declaradas en `package.json`:

- Node.js: no se fija una versión en el proyecto.
- NestJS: `^12.0.1`.
- TypeScript: `^6.0.2`.
- Mongoose: `^9.10.3`.
- pnpm: gestor de paquetes usado por el proyecto (`pnpm-lock.yaml`).
- MongoDB: base de datos mediante Mongoose.
- Vercel Blob: almacenamiento de imágenes.

## Estructura del proyecto

```text
.
├── src/
│   ├── products/
│   │   ├── dto/                 # DTOs para crear y actualizar productos
│   │   ├── entities/            # Entidades de productos
│   │   ├── schemas/             # Esquema de MongoDB
│   │   ├── products.controller.ts
│   │   ├── products.module.ts
│   │   └── products.service.ts  # Lógica de productos e imágenes
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts                  # Inicio de la aplicación (puerto 3001)
├── test/                        # Pruebas end-to-end
├── .env.example                 # Variables de entorno requeridas
├── package.json
└── pnpm-lock.yaml
```

## Cómo ejecutar

1. Instala pnpm si aún no está disponible en tu entorno.
2. Instala las dependencias:

   ```bash
   pnpm install
   ```

3. Crea `.env` en la raíz del proyecto (por ejemplo, en PowerShell):

   ```powershell
   Copy-Item .env.example .env
   ```

4. Edita `.env` y asigna los valores reales a `MONGODB_URI` y `BLOB_READ_WRITE_TOKEN`.
5. Inicia el servidor en modo desarrollo:

   ```bash
   pnpm start:dev
   ```

La API estará disponible en `http://localhost:3001`.

## Autor

Edson Espinoza.
