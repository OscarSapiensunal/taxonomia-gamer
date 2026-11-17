-- ============================================================
--  Test "¿Qué tipo de jugador eres?" · [Inserte nombre de equipo]
--  Pega TODO este archivo en Supabase → SQL Editor → Run.
--  Crea la tabla, las reglas de seguridad (RLS), el tiempo real
--  y una vista con el resumen por sala. Se puede correr varias veces.
-- ============================================================

create table if not exists public.respuestas (
  id          bigint generated always as identity primary key,
  sala        text        not null default 'cv',
  t           smallint    not null,   -- triunfador  (0-9)
  e           smallint    not null,   -- explorador  (0-9)
  s           smallint    not null,   -- socializador(0-9)
  a           smallint    not null,   -- asesino     (0-9)
  tipo        text        not null,
  mundo       text        not null,
  apodo       text,
  created_at  timestamptz not null default now(),
  constraint sala_ok   check (sala ~ '^[a-z0-9_-]{1,24}$'),
  constraint pts_ok    check (t between 0 and 9 and e between 0 and 9 and s between 0 and 9 and a between 0 and 9
                              and t + e + s + a = 18),
  constraint tipo_ok   check (tipo in ('T','E','S','A')),
  constraint mundo_ok  check (mundo in ('COMBATE','AVENTURA','CARRERAS','PUZLES','SIMULACION',
                                        'ESTRATEGIA','RITMO','DIDACTICOS','CONCURSOS')),
  constraint apodo_ok  check (apodo is null or char_length(apodo) <= 20)
);

create index if not exists respuestas_sala_idx on public.respuestas (sala, created_at);

-- Seguridad: con la anon key solo se puede INSERTAR y LEER.
-- Nadie puede editar ni borrar desde el navegador.
alter table public.respuestas enable row level security;

drop policy if exists "insertar respuestas" on public.respuestas;
create policy "insertar respuestas" on public.respuestas
  for insert to anon, authenticated with check (true);

drop policy if exists "leer respuestas" on public.respuestas;
create policy "leer respuestas" on public.respuestas
  for select to anon, authenticated using (true);

revoke update, delete on public.respuestas from anon, authenticated;

-- Tiempo real para la página de resultados
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'respuestas'
  ) then
    alter publication supabase_realtime add table public.respuestas;
  end if;
end $$;

-- Resumen por sala (útil para revisar desde el panel)
create or replace view public.resumen_salas
with (security_invoker = true) as
select sala,
       count(*)                                   as personas,
       count(*) filter (where tipo = 'T')         as triunfadores,
       count(*) filter (where tipo = 'E')         as exploradores,
       count(*) filter (where tipo = 'S')         as socializadores,
       count(*) filter (where tipo = 'A')         as asesinos,
       max(created_at)                            as ultima
from public.respuestas
group by sala;

grant select on public.resumen_salas to anon, authenticated;

-- Para borrar el ensayo (correr a mano desde el panel, no desde la web):
-- delete from public.respuestas where sala = 'ensayo';
