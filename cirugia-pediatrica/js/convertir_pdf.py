import fitz
from pathlib import Path
from PIL import Image
import io

PDF = Path("assets/docs/cirugia-pediatrica.pdf")
SALIDA = Path("assets/teoria")

SALIDA.mkdir(parents=True, exist_ok=True)

doc = fitz.open(PDF)

print(f"Total de páginas: {len(doc)}")

for i, pagina in enumerate(doc):

    pix = pagina.get_pixmap(
        matrix=fitz.Matrix(1.5, 1.5),
        alpha=False
    )

    imagen = Image.open(
        io.BytesIO(pix.tobytes("png"))
    )

    nombre = SALIDA / f"pagina-{i + 1:03d}.webp"

    imagen.save(
        nombre,
        "WEBP",
        quality=82,
        method=6
    )

    print(
        f"Convertida {i + 1}/{len(doc)} -> {nombre}"
    )

doc.close()

print("LISTO: conversión terminada.")