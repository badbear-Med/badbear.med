#!/usr/bin/env python3
"""Regenera capítulos HTML y, opcionalmente, el manual PDF desde fuentes Markdown.

Uso: python tools/generar-temas-sotelo.py [--pdf]
HTML: solo biblioteca estándar. PDF: reportlab, Pillow y fuentes DejaVu Sans.
No modifica configuración de acceso, bancos de preguntas ni otros cursos.
"""
from pathlib import Path
import html, re, json, argparse, hashlib

ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT / 'cirugia-general/rotacion-dr-sotelo'
TEMAS = BASE / 'temas'
VERSION = '20261001-sotelo-temas1'
DESCRIPTIONS = [
    'Mecanismo, punto guía, lectura de TC y decisiones de observación o resección.',
    'Función inmunitaria, interpretación del recuento y umbrales de prevención en VIH.',
    'Estaciones, eje corto, morfología, metástasis y límites de RECIST.',
    'Reconocimiento temprano, sepsis, desbridamiento y control del foco.',
    'Parks, relación con esfínteres, RM y técnicas que protegen la continencia.',
    'Maniobra de talones, interpretación y evaluación de irritación peritoneal.',
    'Histología, nombres completos, segmentos y biomarcadores.',
    'Colectomías por territorio, principios oncológicos, adyuvancia y recto.',
    'Balón, Dormia, dilatación, litotricia, rescate y drenaje temporal.',
    'Incidencia, predisposición, hábitos, microbiota y detección oportuna.'
]

def inline(s, pdf=False):
    s=html.escape(s,quote=False)
    s=re.sub(r'\*\*(.+?)\*\*',r'<b>\1</b>',s)
    s=re.sub(r'\[([^\]]+)\]\(([^\s)]+)\)',
        lambda m: ('<link href="'+html.escape(m[2],quote=True)+'" color="#0061d5">'+m[1]+'</link>') if pdf and m[2].startswith('https://') else
        (m[1] if pdf else '<a href="'+html.escape(m[2],quote=True)+'">'+m[1]+'</a>'),s)
    return s

def blocks(text):
    lines=text.splitlines();i=0
    while i<len(lines):
        line=lines[i].strip()
        if not line:i+=1;continue
        if line.startswith('#'):
            m=re.match(r'^(#{1,3})\s+(.+)$',line)
            if m:yield ('heading',len(m[1]),m[2]);i+=1;continue
        if line.startswith('[[FIG:'):
            m=re.fullmatch(r'\[\[FIG:([^|]+)\|(.+)\]\]',line)
            if not m:raise ValueError(line)
            yield ('figure',m[1],m[2]);i+=1;continue
        if line.startswith('|'):
            rows=[]
            while i<len(lines) and lines[i].strip().startswith('|'):
                row=[c.strip() for c in lines[i].strip().strip('|').split('|')]
                if not all(re.fullmatch(r':?-+:?',c) for c in row):rows.append(row)
                i+=1
            if not rows or len({len(row) for row in rows})!=1:raise ValueError('Tabla irregular')
            yield ('table',rows);continue
        if line.startswith('> '):
            yield ('fija',line[2:]);i+=1;continue
        if re.match(r'^(?:- |\d+\. )',line):
            ordered=bool(re.match(r'^\d+\. ',line));items=[]
            while i<len(lines) and re.match(r'^(?:- |\d+\. )',lines[i].strip()):
                items.append(re.sub(r'^(?:- |\d+\. )','',lines[i].strip()));i+=1
            yield ('list',ordered,items);continue
        paras=[line];i+=1
        while i<len(lines) and lines[i].strip():
            if re.match(r'^(#|\||>|- |\d+\. |\[\[FIG:)',lines[i].strip()):break
            paras.append(lines[i].strip());i+=1
        yield ('paragraph',' '.join(paras))

def load_chapters():
    chapters=[]
    for n,f in enumerate(sorted((TEMAS/'fuentes').glob('*.md'))):
        text=f.read_text(encoding='utf-8');bs=list(blocks(text))
        chapters.append(dict(number=n+1,slug=f.stem,title=bs[0][2],description=DESCRIPTIONS[n],blocks=bs[1:],
                             words=len(re.findall(r'\b\w+\b',text))))
    assert len(chapters)==10
    return chapters

def render_body(ch):
    out=[];toc=[];section=0
    for b in ch['blocks']:
        if b[0]=='heading':
            section+=1;sid=f'seccion-{section}';toc.append((sid,b[2]))
            out.append(f'<h{b[1]} id="{sid}">{inline(b[2])}</h{b[1]}>')
        elif b[0]=='paragraph':out.append('<p>'+inline(b[1])+'</p>')
        elif b[0]=='fija':out.append('<aside class="sotelo-fija">'+inline(b[1])+'</aside>')
        elif b[0]=='list':
            tag='ol' if b[1] else 'ul';out.append('<'+tag+'>'+''.join('<li>'+inline(t)+'</li>' for t in b[2])+'</'+tag+'>')
        elif b[0]=='table':
            rows=b[1];out.append('<div class="sotelo-table" role="region" aria-label="Tabla de estudio" tabindex="0"><table><thead><tr>'+''.join('<th scope="col">'+inline(c)+'</th>' for c in rows[0])+'</tr></thead><tbody>'+''.join('<tr>'+''.join('<td>'+inline(c)+'</td>' for c in r)+'</tr>' for r in rows[1:])+'</tbody></table></div>')
        elif b[0]=='figure':
            out.append('<figure><img src="../imagenes/'+html.escape(b[1],quote=True)+'" alt="'+html.escape(b[2],quote=True)+'" loading="lazy"><figcaption>'+inline(b[2])+'</figcaption></figure>')
    return '\n'.join(out),toc

def build_html(chapters):
    for i,ch in enumerate(chapters):
        body,toc=render_body(ch)
        prev=chapters[i-1] if i else None;nxt=chapters[i+1] if i+1<len(chapters) else None
        nav=''.join('<a href="'+a['slug']+'.html">'+label+': '+html.escape(a['title'])+'</a>' for a,label in [(prev,'Anterior'),(nxt,'Siguiente')] if a)
        template=f'''<!doctype html>
<html lang="es"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{html.escape(ch['title'])} | Rotación con Dr. Sotelo · BADBEAR.MED</title>
<meta name="description" content="{html.escape(ch['description'],quote=True)}">
<link rel="icon" href="../../../assets/logos/cursos/cirugia-general/logo.png">
<link rel="stylesheet" href="../../../assets/css/course-lock.css">
<script src="../../../assets/js/course-lock-config.js"></script>
<script src="../../../assets/js/course-lock.js" data-course="cirugia-general"></script>
<link rel="stylesheet" href="sotelo-lectura.css?v={VERSION}">
</head><body class="sotelo-reader">
<a class="sotelo-skip" href="#contenido">Ir al contenido</a>
<header class="sotelo-header"><a class="sotelo-brand" href="../../../badbear-med.html"><img src="../../../dermatologia/badbear_logo.png" alt="Logo BADBEAR.MED"><span>BADBEAR.<b>MED</b></span></a><nav aria-label="Navegación"><a href="../../rotacion-dr-sotelo.html#temas">Todos los temas</a><a href="../../index.html">Cirugía General</a><a href="../../../index.html">WAJOMEA.GROUP</a></nav></header>
<main class="sotelo-layout"><aside class="sotelo-index"><details open><summary>En este capítulo</summary><nav aria-label="Índice del capítulo"><ol>{''.join('<li><a href="#'+sid+'">'+html.escape(title)+'</a></li>' for sid,title in toc)}</ol></nav></details><a class="sotelo-download" href="../documentos/manual-rotacion-sotelo.pdf">Descargar manual completo</a></aside>
<article id="contenido" class="sotelo-article"><div class="sotelo-chapter-head"><span class="sotelo-kicker">ROTACIÓN CON DR. SOTELO · TEMA {ch['number']:02d} / 10</span><h1>{html.escape(ch['title'])}</h1><p class="sotelo-deck">{html.escape(ch['description'])}</p><p class="sotelo-meta">BADBEAR.MED · WAJOMEA.GROUP · Edición de estudio: 1 octubre 2026</p></div>
{body}
<nav class="sotelo-pager" aria-label="Capítulos consecutivos">{nav}</nav>
<p class="sotelo-study-note">Material de estudio elaborado para la rotación. La atención clínica requiere valoración individual y protocolos del equipo tratante. Las imágenes del material aportado se utilizan como apoyo docente; no sustituyen un estudio clínico completo.</p></article></main>
<footer class="sotelo-footer"><a href="../../rotacion-dr-sotelo.html#temas">Volver a Rotación con Dr. Sotelo</a><span>BADBEAR.MED · WAJOMEA.GROUP</span></footer>
</body></html>'''
        (TEMAS/(ch['slug']+'.html')).write_text(template,encoding='utf-8')
    manifest=[{k:c[k] for k in ['number','slug','title','description','words']} for c in chapters]
    (TEMAS/'indice.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')

def build_pdf(chapters):
    from reportlab.pdfbase import pdfmetrics
    from reportlab.pdfbase.ttfonts import TTFont
    from reportlab.lib import colors
    from reportlab.lib.styles import getSampleStyleSheet,ParagraphStyle
    from reportlab.lib.enums import TA_LEFT
    from reportlab.platypus import BaseDocTemplate,PageTemplate,Frame,Paragraph,Spacer,PageBreak,Table,TableStyle,Image,KeepTogether
    from reportlab.platypus.tableofcontents import TableOfContents
    from reportlab.lib.pagesizes import A4
    for name,file in [('Study','DejaVuSans.ttf'),('Study-Bold','DejaVuSans-Bold.ttf'),('Study-Oblique','DejaVuSans-Oblique.ttf'),('Study-BoldOblique','DejaVuSans-BoldOblique.ttf')]:
        fontpath=Path('/usr/share/fonts/truetype/dejavu')/file
        if not fontpath.exists():fontpath=fontpath.parent/('DejaVuSans-Bold.ttf' if 'Bold' in name else 'DejaVuSans.ttf')
        pdfmetrics.registerFont(TTFont(name,str(fontpath)))
    pdfmetrics.registerFontFamily('Study',normal='Study',bold='Study-Bold',italic='Study-Oblique',boldItalic='Study-BoldOblique')
    blue=colors.HexColor('#0061d5');red=colors.HexColor('#e5223f');dark=colors.HexColor('#172538');green=colors.HexColor('#007746')
    st=getSampleStyleSheet()
    st.add(ParagraphStyle(name='BodyStudy',fontName='Study',fontSize=10,leading=15,textColor=dark,spaceAfter=8))
    st.add(ParagraphStyle(name='ChapterStudy',fontName='Study-Bold',fontSize=23,leading=29,textColor=blue,spaceAfter=16,keepWithNext=True))
    st.add(ParagraphStyle(name='SectionStudy',fontName='Study-Bold',fontSize=13,leading=18,textColor=blue,spaceBefore=14,spaceAfter=8,keepWithNext=True))
    st.add(ParagraphStyle(name='MetaStudy',parent=st['BodyStudy'],fontSize=8,leading=12,textColor=colors.HexColor('#526175')))
    st.add(ParagraphStyle(name='CellStudy',parent=st['BodyStudy'],fontSize=8.2,leading=11.6,spaceAfter=0))
    st.add(ParagraphStyle(name='CellHeadStudy',parent=st['CellStudy'],fontName='Study-Bold',textColor=colors.white))
    st.add(ParagraphStyle(name='FijaStudy',parent=st['BodyStudy'],textColor=green,borderColor=green,borderWidth=1,borderPadding=10,backColor=colors.HexColor('#f0fff6'),spaceBefore=9,spaceAfter=12))
    st.add(ParagraphStyle(name='TocStudy',fontName='Study',fontSize=10,leading=15,spaceBefore=8,leftIndent=0,firstLineIndent=0))
    class Manual(BaseDocTemplate):
        def afterFlowable(self,f):
            if isinstance(f,Paragraph) and f.style.name=='ChapterStudy':
                key='capitulo-'+str(self.seq.nextf('chapters'))
                self.canv.bookmarkPage(key);self.canv.addOutlineEntry(f.getPlainText(),key,0)
                self.notify('TOCEntry',(0,f.getPlainText(),self.page,key))
    W,H=A4;fw=W-88
    def page(canvas,doc):
        canvas.saveState();canvas.setStrokeColor(blue);canvas.setLineWidth(2);canvas.line(44,H-31,W-44,H-31)
        canvas.setFont('Study-Bold',8);canvas.setFillColor(blue);canvas.drawString(44,H-23,'BADBEAR.');canvas.setFillColor(red);canvas.drawString(91,H-23,'MED')
        canvas.setFont('Study',8);canvas.setFillColor(dark);canvas.drawRightString(W-44,H-23,'Rotación con Dr. Sotelo')
        canvas.setStrokeColor(colors.HexColor('#d5dfed'));canvas.setLineWidth(.5);canvas.line(44,31,W-44,31)
        canvas.setFont('Study',7);canvas.drawString(44,20,'WAJOMEA.GROUP · Edición de estudio · 1 octubre 2026');canvas.drawRightString(W-44,20,str(doc.page));canvas.restoreState()
    output=BASE/'documentos/manual-rotacion-sotelo.pdf'
    doc=Manual(str(output),pagesize=A4,leftMargin=44,rightMargin=44,topMargin=47,bottomMargin=43,title='Rotación con Dr. Sotelo — diez temas desarrollados',author='BADBEAR.MED · WAJOMEA.GROUP',allowSplitting=1)
    doc.addPageTemplates([PageTemplate(id='Study',frames=Frame(44,43,fw,H-90,leftPadding=0,rightPadding=0,topPadding=0,bottomPadding=0),onPage=page)])
    flow=[Spacer(1,72),Paragraph('BADBEAR.<font color="#e5223f">MED</font>',ParagraphStyle('CoverBrand',fontName='Study-Bold',fontSize=31,leading=38,textColor=blue)),Spacer(1,25),Paragraph('Rotación con<br/>Dr. Sotelo',ParagraphStyle('CoverTitle',fontName='Study-Bold',fontSize=32,leading=40,textColor=dark)),Spacer(1,18),Paragraph('Cirugía General · Gastroenterología<br/>Diez temas desarrollados',st['SectionStudy']),Spacer(1,20),Paragraph('Conceptos, anatomía, diagnóstico, interpretación de imágenes y tratamiento razonado. Cada capítulo contiene repaso BADBEAR.MED FIJA: y bibliografía.',st['BodyStudy']),Spacer(1,26),Paragraph('Material educativo de BADBEAR.MED, del grupo WAJOMEA.GROUP. Elaborado a partir de los temas de la rotación y los archivos aportados, con ampliación y precisiones clínicas.',st['BodyStudy']),Spacer(1,16),Paragraph('Las decisiones clínicas requieren valoración individual y protocolos locales. Las imágenes extraídas del material aportado son apoyo docente; su procedencia clínica original no está documentada y no sustituyen un estudio completo.',st['MetaStudy']),PageBreak(),Paragraph('Contenido',st['SectionStudy'])]
    toc=TableOfContents();toc.levelStyles=[st['TocStudy']];flow.extend([toc,Spacer(1,22),Paragraph('Cómo usar este manual',st['SectionStudy']),Paragraph('Lee primero el desarrollo del tema y vuelve después a los bloques BADBEAR.MED FIJA:. Los cuadros comparan conceptos; no reemplazan evaluación individual. Consulta las referencias enlazadas para revisar las guías y las actualizaciones.',st['BodyStudy']),Paragraph('Archivos originales preservados junto al manual: temas-exposicion-original.pdf y temas-colon-coledocolitiasis-original.pptx. Las láminas originales se conservan como material aportado, mientras que estos capítulos incorporan matices y correcciones.',st['BodyStudy'])])
    for ch in chapters:
        flow.extend([PageBreak(),Paragraph(f'Tema {ch["number"]:02d} · '+inline(ch['title'],True),st['ChapterStudy']),Paragraph(ch['description'],st['BodyStudy'])])
        pending_heading=None
        for bi,b in enumerate(ch['blocks']):
            if b[0]=='heading':
                heading=Paragraph(inline(b[2],True),st['SectionStudy'])
                if bi+1<len(ch['blocks']) and ch['blocks'][bi+1][0]=='figure':pending_heading=heading
                else:flow.append(heading)
            elif b[0]=='paragraph':flow.append(Paragraph(inline(b[1],True),st['BodyStudy']))
            elif b[0]=='fija':flow.append(Paragraph(inline(b[1],True),st['FijaStudy']))
            elif b[0]=='list':
                for n,item in enumerate(b[2]):flow.append(Paragraph((str(n+1)+'. ' if b[1] else '• ')+inline(item,True),st['BodyStudy']))
            elif b[0]=='table':
                data=[[Paragraph(inline(cell,True),st['CellHeadStudy'] if ri==0 else st['CellStudy']) for cell in row] for ri,row in enumerate(b[1])]
                count=len(data[0]);widths=[fw/count]*count
                if count==3:widths=[fw*.23,fw*.34,fw*.43]
                table=Table(data,colWidths=widths,repeatRows=1,hAlign='LEFT')
                table.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),blue),('VALIGN',(0,0),(-1,-1),'TOP'),('ROWBACKGROUNDS',(0,1),(-1,-1),[colors.white,colors.HexColor('#f2f7ff')]),('GRID',(0,0),(-1,-1),.35,colors.HexColor('#ccd8e9')),('LEFTPADDING',(0,0),(-1,-1),7),('RIGHTPADDING',(0,0),(-1,-1),7),('TOPPADDING',(0,0),(-1,-1),8),('BOTTOMPADDING',(0,0),(-1,-1),8)]))
                flow.extend([table,Spacer(1,9)])
            elif b[0]=='figure':
                img=Image(str(BASE/'imagenes'/b[1]));ratio=min(fw/img.imageWidth,220/img.imageHeight);img.drawWidth=img.imageWidth*ratio;img.drawHeight=img.imageHeight*ratio
                figureflow=([pending_heading] if pending_heading else [])+[img,Spacer(1,6),Paragraph(inline(b[2],True),st['MetaStudy']),Spacer(1,10)]
                flow.append(KeepTogether(figureflow));pending_heading=None
    doc.multiBuild(flow)
    print('PDF:',output)

def main():
    args=argparse.ArgumentParser();args.add_argument('--pdf',action='store_true');opts=args.parse_args()
    chapters=load_chapters();build_html(chapters)
    if opts.pdf:build_pdf(chapters)
    print('Capítulos:',len(chapters),'Palabras:',sum(c['words'] for c in chapters))
    for c in chapters: print(c['slug'],c['words'])

if __name__=='__main__':main()
