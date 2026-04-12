-- Script para crear la tabla de posiciones en Supabase
-- Copia y pega este código en el "SQL Editor" de tu proyecto de Supabase y dale a "Run".

create table leaderboard (
  id bigint primary key generated always as identity,
  name text not null,
  score int not null,
  created_at timestamp with time zone default now()
);

-- Opcional: Habilitar políticas de seguridad si usas RLS (Row Level Security)
-- Por ahora, para que funcione rápido, puedes deshabilitar RLS en la tabla 'leaderboard' 
-- desde el panel de "Table Editor" en Supabase.
