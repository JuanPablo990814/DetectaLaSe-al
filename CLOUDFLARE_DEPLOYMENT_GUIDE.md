# 🚀 Guía de Despliegue en Cloudflare Pages - Detecta La Señal

Este documento resume los problemas técnicos encontrados durante el despliegue de la aplicación y sus soluciones definitivas para evitar que se repitan en futuros proyectos de Next.js.

## 1. Persistencia de Datos y el Edge Runtime
### ❌ El problema
Originalmente, el Leaderboard guardaba los datos en un archivo local `leaderboard.json` usando el módulo `fs` de Node.js.
- **Por qué falló:** Cloudflare Pages usa el **Edge Runtime** (basado en V8), que no tiene acceso al sistema de archivos local (`fs`) y tiene un entorno de solo lectura.

### ✅ La solución
Migrar la persistencia a **Supabase** (o cualquier base de datos externa).
- Se creó `lib/supabase.ts` para gestionar la conexión.
- Se configuró la ruta de la API (`app/api/leaderboard/route.ts`) para usar `export const runtime = 'edge'`.

## 2. Sincronización de Dependencias (Windows vs Linux)
### ❌ El problema
El archivo `package-lock.json` generado en Windows a menudo entra en conflicto con las herramientas de Cloudflare que corren en Linux (`npm error npm ci can only install packages when... are in sync`).
- **Por qué falló:** Paquetes como `workerd` y `wrangler` tienen versiones específicas por plataforma que `npm ci` no siempre resuelve bien desde un lockfile de Windows.

### ✅ La solución
**Ignorar el `package-lock.json` en Git.**
- Se añadió `package-lock.json` al `.gitignore`.
- Esto obliga a Cloudflare a ejecutar un `npm install` limpio y decidir las versiones correctas para su entorno de Linux automáticamente.

## 3. Variables de Entorno en el Build
### ❌ El problema
Next.js inyecta (inline) las variables que empiezan por `NEXT_PUBLIC_` **durante el proceso de compilación**.
- **Por qué falló:** Si añades las variables al dashboard de Cloudflare **después** de que el build haya terminado, el código ya compilado tendrá valores vacíos (`""`), resultando en errores 500.

### ✅ La solución
1. Añadir las variables en el panel de Cloudflare (**Settings -> Variables and Secrets**) **antes** de iniciar el despliegue.
2. Si se cambian las variables, es obligatorio **Reintentar el despliegue (Retry Deployment)** para que se vuelvan a inyectar en el código.

## 4. Robustez del Código (Build-Safe)
### ❌ El problema
Si el código intenta inicializar el cliente de Supabase con URLs vacías (porque faltan las variables de entorno), el proceso de compilación de Next.js (`Collecting page data`) puede fallar y detener el despliegue.

### ✅ La solución
Hacer que la inicialización sea segura:
```typescript
// En lib/supabase.ts
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;
```
Y en las rutas de API, verificar si el cliente existe antes de usarlo:
```typescript
if (!supabase) return NextResponse.json({ error: "Configuración faltante" }, { status: 500 });
```

## 5. Configuración de Build en Cloudflare
Para proyectos Next.js (App Router) en Cloudflare Pages, la configuración debe ser:
- **Framework preset:** None (o Next.js si está actualizado).
- **Build command:** `npm run pages:build`.
- **Output directory:** `.vercel/output/static`.
- **Environment variables:** 
    - `NODE_VERSION`: 18 o superior.
    - `NEXT_PUBLIC_SUPABASE_URL`: [Tu URL].
    - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: [Tu Key].

---
*Documento generado por Antigravity para Juan Pablo - 2026*
