"""Reconstruye las páginas del libro desde contenido.json, sin necesitar el PDF."""
from pathlib import Path
import json, html

ROOT=Path(__file__).resolve().parents[1]
BOOK=ROOT/'wajomeismo-puro'
data=json.loads((BOOK/'contenido.json').read_text(encoding='utf-8'))
sections=data['sections']
e=html.escape

def header():
    return '''<a class="skip" href="#contenido">Ir al contenido</a>
<header class="site-header"><a class="brand" href="../../index.html">WAJOMEA.<b>GROUP</b></a>
<nav aria-label="Navegación del portal"><a href="../../index.html">Inicio</a><a href="../../badbear-med.html">Medicina</a><a href="../../badbear-music/index.html">Música</a><a href="../index.html" aria-current="page">Libros</a></nav></header>'''

def footer():
    return '<footer class="site-footer"><strong>BADBEAR.BOOKS</strong><span>Una publicación de WAJOMEA.GROUP</span><a href="../index.html">Volver a la biblioteca</a></footer>'

def toc(active=None):
    out='<ol class="toc-list">'
    for s in sections:
        label='Prólogo' if s['number']==0 else f"{s['number']:02d}"
        current=' aria-current="page"' if active==s['number'] else ''
        out+=f'<li><a href="{s["file"]}"{current}><span class="toc-number">{label}</span><span>{e(s["title"])}</span><small>{s["minutes"]} min</small></a></li>'
    return out+'</ol>'

def page(title,body,description,attrs=''):
    return f'''<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{e(title)} | BADBEAR.BOOKS</title><meta name="description" content="{e(description)}">
<meta name="theme-color" content="#fffaf3"><link rel="stylesheet" href="lector.css?v=20261004-1">
<script src="lector.js?v=20261004-1" defer></script></head><body {attrs}>{header()}{body}{footer()}</body></html>'''

total_minutes=sum(s['minutes'] for s in sections)
index=f'''<main id="contenido" class="book-home">
<div class="breadcrumb"><a href="../index.html">BADBEAR.BOOKS</a><span> / </span><span>WAJOMEÍSMO PURO</span></div>
<section class="book-hero" aria-labelledby="book-title"><div class="cover-wrap"><img src="portada.jpeg" width="671" height="1024" alt="Portada original de WAJOMEÍSMO: paisaje cósmico y símbolo central"></div>
<div class="book-presentation"><p class="eyebrow">PRIMERA PUBLICACIÓN · LECTURA EN LÍNEA</p><h1 id="book-title">WAJOMEÍSMO<br><span>PURO</span></h1><p class="subtitle">{e(data['subtitle'])}</p><p class="book-description">Un ensayo sobre el orden, la autonomía, el pensamiento y la construcción de un legado. Explora la obra original capítulo por capítulo y acompaña tu lectura con una guía editorial independiente.</p>
<div class="book-facts"><span>Prólogo + 20 capítulos</span><span>Ensayo</span><span>≈ {total_minutes} min de lectura</span></div>
<p class="publisher">Una publicación de <strong>WAJOMEA.GROUP</strong><br>Biblioteca digital <strong>BADBEAR.BOOKS</strong></p>
<div class="actions"><a class="button primary" href="prologo.html">Comenzar a leer <span aria-hidden="true">→</span></a><a class="button secondary" href="#indice">Ver capítulos</a><a class="button secondary" href="guia-de-lectura.html">Guía de lectura</a><a class="button resume" data-resume hidden href="prologo.html">Continuar lectura</a></div>
</div></section>
<section id="indice" class="index-panel" aria-labelledby="index-title"><div class="section-heading"><div><p class="eyebrow">ELIGE TU PUNTO DE PARTIDA</p><h2 id="index-title">Índice de la obra</h2></div><p>Cada capítulo tiene su propia página.<br>Puedes regresar al índice en cualquier momento.</p></div>{toc()}</section>
<section class="edition-note"><h2>Sobre esta edición digital</h2><p>Esta edición presenta el texto original con su portada, prólogo y veinte capítulos. El índice sigue el contenido desarrollado en el libro. Se han retirado los encabezados y números de página y corregido el rótulo del capítulo 15 para facilitar la lectura.</p><p>Las ideas del texto corresponden a un ensayo de opinión. La <a href="guia-de-lectura.html">guía de lectura</a> es una ampliación editorial separada: propone preguntas y ejercicios sin modificar la obra.</p></section>
</main>'''
(BOOK/'index.html').write_text(page('WAJOMEÍSMO PURO',index,'Lee WAJOMEÍSMO PURO en BADBEAR.BOOKS: prólogo, veinte capítulos, portada original y guía de lectura.'),encoding='utf-8')

for s in sections:
    number=s['number'];label='Prólogo' if number==0 else f'Capítulo {number:02d}'
    prev=sections[number-1] if number else None
    nxt=sections[number+1] if number<20 else None
    content='\n'.join(f'<{b["tag"]}>{b["html"]}</{b["tag"]}>' for b in s['blocks'])
    previous=f'<a href="{prev["file"]}"><small>← Anterior</small>{e(prev["title"])}</a>' if prev else '<a href="index.html"><small>← Presentación</small>Sobre el libro</a>'
    following=f'<a href="{nxt["file"]}"><small>Siguiente →</small>{e(nxt["title"])}</a>' if nxt else '<a href="guia-de-lectura.html"><small>Continúa explorando →</small>Guía de lectura</a>'
    body=f'''<main id="contenido" class="reader-shell"><div class="breadcrumb"><a href="../index.html">BADBEAR.BOOKS</a><span> / </span><a href="index.html">WAJOMEÍSMO PURO</a></div>
<div class="reader-layout"><aside class="reader-sidebar"><a class="book-mini" href="index.html"><img src="portada.jpeg" width="671" height="1024" alt="Portada de WAJOMEÍSMO PURO"><span><strong>WAJOMEÍSMO PURO</strong><small>Índice y presentación</small></span></a>
<details class="chapter-menu" open><summary>Capítulos del libro</summary>{toc(number)}<a class="guide-link" href="guia-de-lectura.html">Ampliación editorial: guía de lectura →</a></details></aside>
<div class="reading-column"><div class="reader-tools" aria-label="Preferencias de lectura"><div class="text-size"><span>Tamaño del texto</span><button type="button" data-font="-1" aria-label="Reducir tamaño del texto">A−</button><button type="button" data-font="1" aria-label="Aumentar tamaño del texto">A+</button></div><label>Tono de página <select id="paper"><option value="light">Claro</option><option value="warm">Cálido</option></select></label><output id="read-status" aria-live="polite">Lectura en línea</output></div>
<article class="chapter" aria-labelledby="chapter-title"><header class="chapter-header"><p class="eyebrow">TEXTO ORIGINAL · {label.upper()}</p><h1 id="chapter-title">{e(s['title'])}</h1><p class="chapter-meta">{s['minutes']} min de lectura · WAJOMEA.GROUP</p><div class="progress-track" aria-hidden="true"><span data-progress></span></div></header><div class="book-text">{content}</div></article>
<nav class="chapter-navigation" aria-label="Capítulo anterior y siguiente">{previous}{following}</nav><a class="back-index" href="index.html#indice">Ver el índice completo ↑</a></div></div></main>'''
    attrs=f'data-chapter="{number}" data-chapter-title="{e(s["title"])}"'
    (BOOK/s['file']).write_text(page(f'{label}: {s["title"]}',body,f'{label} de WAJOMEÍSMO PURO. Texto original para leer en BADBEAR.BOOKS.',attrs),encoding='utf-8')

guide='''<main id="contenido" class="guide-page"><div class="breadcrumb"><a href="../index.html">BADBEAR.BOOKS</a><span> / </span><a href="index.html">WAJOMEÍSMO PURO</a></div>
<article class="guide-article"><header class="chapter-header"><p class="eyebrow">AMPLIACIÓN EDITORIAL · BADBEAR.BOOKS</p><h1>Guía de lectura y reflexión</h1><p class="subtitle">Una lectura pausada, con preguntas y ejercicios propios.</p></header>
<div class="book-text"><p>Esta guía acompaña la obra y se mantiene separada de su texto original. Su propósito es ayudarte a examinar las ideas, reconocer tus acuerdos y desacuerdos y convertir las reflexiones útiles en decisiones concretas. Las preguntas no tienen una respuesta obligatoria.</p>
<h2>1. Leer con criterio propio</h2><p>Un ensayo expone una mirada particular del mundo. Durante la lectura, distingue tres elementos: lo que el texto afirma, las razones que ofrece y tu propia interpretación. Una afirmación rotunda puede resultar memorable, pero su intensidad no reemplaza una explicación ni constituye por sí sola una prueba.</p><p>Cuando encuentres una generalización, pregúntate a quién se refiere, qué casos abarca y qué situaciones deja fuera. Valorar una idea no exige aceptar todas las demás. Puedes conservar una reflexión sobre disciplina y cuestionar otra sobre relaciones personales.</p><div class="exercise"><strong>Ejercicio de lectura</strong><p>Elige un párrafo. Escribe su idea principal con tus palabras, una razón que la respalde y una pregunta que necesite mayor desarrollo. Si plantea un hecho verificable, sepáralo de las opiniones y metáforas.</p></div>
<h2>2. Orden y disciplina en la vida diaria</h2><p>El orden puede entenderse como una forma de dar continuidad a tus prioridades. Un horario, un espacio de trabajo cuidado y una tarea terminada son expresiones concretas de esa continuidad. La disciplina resulta más útil cuando responde a un propósito que puedes explicar y revisar.</p><p>Evita diseñar una rutina ideal que dependa de circunstancias perfectas. Comienza con una acción pequeña y repetible: veinte minutos de lectura, una revisión semanal de pendientes o un bloque de trabajo sin interrupciones. Observa qué facilita la constancia y qué la vuelve innecesariamente difícil.</p><div class="exercise"><strong>Una semana de práctica</strong><p>Elige un hábito y registra cada día si lo realizaste, qué obstáculo apareció y qué ajuste harás. Al final de la semana, evalúa el sistema que construiste, además de tu esfuerzo.</p></div>
<h2>3. Dolor, emociones y responsabilidad</h2><p>Reflexionar sobre una experiencia difícil puede ayudarte a comprenderla. Para hacerlo, distingue el acontecimiento, la emoción que provoca y la acción que eliges. La emoción no necesita decidir toda tu conducta; tampoco necesita desaparecer para que puedas actuar con cuidado.</p><p>Describe el problema con precisión. Pregunta qué parte está bajo tu control, qué información te falta y qué apoyo puede ser útil. Darte tiempo para procesar una situación y buscar ayuda cuando la necesitas también son decisiones responsables.</p><div class="exercise"><strong>Diario de una situación</strong><p>Escribe cuatro líneas: qué ocurrió, qué sentiste, qué necesitas y cuál es el siguiente paso razonable. Revisa después si ese paso resolvió algo o si conviene cambiarlo.</p></div>
<h2>4. Autonomía, límites y relaciones</h2><p>La autonomía consiste en participar conscientemente en tus decisiones. En una relación, conviene expresar lo que deseas, escuchar lo que la otra persona desea y comprobar si existen acuerdos compatibles. Los límites personales se comunican sobre tu propia participación y tus decisiones.</p><p>Una relación respetuosa permite decir sí o no, disentir y cambiar de opinión. El consentimiento, el respeto y la responsabilidad son condiciones para construir acuerdos. Evalúa las conductas de cada persona sin deducir su valor a partir de su sexo o de una etiqueta general.</p><div class="exercise"><strong>Un límite bien explicado</strong><p>Completa: «Para mí es importante…», «Puedo comprometerme a…» y «Si esto no se cumple, mi decisión será…». Revisa si lo que propones se puede comunicar con claridad y sin amenazas.</p></div>
<h2>5. Atención, silencio y uso del tiempo</h2><p>Tu atención es limitada. Un entorno con interrupciones frecuentes puede dificultar una tarea aunque tengas tiempo disponible. Identifica las distracciones que más se repiten y decide cuáles puedes reducir: notificaciones, cambios constantes de actividad o compromisos que aceptas sin revisar tus prioridades.</p><p>El silencio puede servir para pensar antes de responder. Para que resulte útil en una conversación, distingue una pausa comunicada de una retirada que deja a la otra persona sin entender qué ocurre. Puedes pedir tiempo y acordar cuándo retomar el diálogo.</p><div class="exercise"><strong>Mapa de atención</strong><p>Durante un día, anota en qué actividades concentraste tu atención. Selecciona una que quieras proteger y reserva un bloque específico para ella. Define qué resultado pequeño indicará que lo aprovechaste.</p></div>
<h2>6. Propósito, legado y aprendizaje compartido</h2><p>Un legado puede tomar formas cercanas: enseñar una habilidad, terminar una obra, conservar conocimiento o mejorar algo que otras personas utilizarán. Para concretarlo, identifica a quién beneficia tu proyecto y cómo podrá continuar sin depender de tu presencia permanente.</p><p>Al compartir una idea, deja espacio para las preguntas. Enseñar implica hacer comprensible un método y permitir que quien aprende desarrolle su propio criterio. Documentar un proceso, reconocer sus límites y revisarlo facilita que el conocimiento se mantenga útil.</p><div class="exercise"><strong>Tu proyecto en una página</strong><p>Define su propósito, las personas a las que puede servir, el primer resultado que vas a entregar y dónde quedará documentado. Añade una fecha de revisión para comprobar si sigue respondiendo a lo que quieres construir.</p></div>
<h2>Cuaderno de cierre</h2><p>Al terminar el libro, responde: ¿qué idea te hizo detenerte?, ¿con qué afirmación discrepas y por qué?, ¿qué aspecto necesita evidencia adicional?, ¿qué práctica concreta quieres probar? Conserva tus respuestas y vuelve a ellas después de unas semanas. La lectura también se desarrolla en lo que reconsideras con el tiempo.</p></div>
<div class="actions"><a class="button primary" href="index.html#indice">Volver al índice</a><a class="button secondary" href="prologo.html">Leer el texto original</a></div></article></main>'''
(BOOK/'guia-de-lectura.html').write_text(page('Guía de lectura de WAJOMEÍSMO PURO',guide,'Guía editorial de lectura: preguntas y ejercicios sobre disciplina, autonomía, atención, relaciones y propósito.'),encoding='utf-8')
print('Generadas 23 páginas de WAJOMEÍSMO PURO.')
