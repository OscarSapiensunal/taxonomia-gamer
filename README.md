# ¿Qué tipo de jugador eres? 🐸

Test de tipo de jugador para la exposición **«La Taxonomía de los Videojuegos»** de *[Inserte nombre de equipo]*:
Computación Visual, Ingeniería de Sistemas y Computación, Universidad Nacional de Colombia, 2026.

- **Test:** `index.html` tiene 18 decisiones A/B (los 6 pares de tipos de Bartle, 3 veces cada uno) y 3 preguntas que te asignan uno de los 9 géneros interactivos de Mejías-Climent (2021).
- **Resultados en vivo:** `resultados.html?sala=cv` muestra a todo el salón sobre los ejes de Bartle (actuar/interactuar × jugadores/mundo).

Integrantes: Angel Valeria Palacio Suarez · Laura Vanesa Alvarez Lafont · Oscar Javier Saavedra Montero · Sergio Nicolas Correa Escobar.

## Cómo conectarlo a Supabase (5 minutos)

1. Crea un proyecto en [supabase.com](https://supabase.com).
2. Ve a **SQL Editor**, pega todo [`supabase/schema.sql`](supabase/schema.sql) y dale **Run**. Eso crea la tabla, las reglas de seguridad y el tiempo real.
3. En **Project Settings → API**, copia la *Project URL* y la llave *anon public*, y pégalas en [`js/config.js`](js/config.js).
4. Haz commit y push. GitHub Pages publica solo.

Sin llaves, la página funciona en **modo demo**: guarda las respuestas solo en tu navegador, así que sirve para probar.

### Salas
- `?sala=ensayo` sirve para practicar y `?sala=cv` es la clase real.
- Para borrar el ensayo, corre en el SQL Editor: `delete from respuestas where sala = 'ensayo';`

### Seguridad
- La *anon key* es pública por diseño.
- Las reglas RLS solo permiten **insertar** y **leer**. Nadie puede editar ni borrar desde la web.
- Los valores se validan en la base de datos: puntajes entre 0 y 9 que suman 18, tipos y géneros válidos y apodos de máximo 20 caracteres.

## Fuentes
- Bartle, R. (1996). *Hearts, Clubs, Diamonds, Spades: Players Who Suit MUDs.* https://mud.co.uk/richard/hcds.htm
- Andreasen, E. y Downey, B., método de puntuación del test de Bartle (pares equilibrados). Las preguntas de este test son propias.
- Mejías-Climent, L. (2021). Clasificaciones de videojuegos. *Revista Tradumàtica*, 19, 22–46.

*«Evidencia científica»: Bartle es un modelo de diseño, no un diagnóstico psicológico.*

## Créditos
- Sprites del Sapo Rolo y el taxi: [RenderCrafting-Toucan](https://github.com/trimsucne/RenderCrafting-Toucan) (CC0).
- Tal cual: modelo 3D propio en Blender, renderizado como sprite.
- Íconos: pixel art propio.
- Fuentes: *Press Start 2P* y *VT323* (Google Fonts, OFL).
