#!/usr/bin/env python3
"""Crea un respaldo ZIP restaurable de los archivos locales de BADBEAR.MED."""

import argparse
import hashlib
import json
import os
from pathlib import Path
import tempfile
from datetime import datetime, timezone
import zipfile


EXCLUDED_DIRS = {".git", "node_modules", "__pycache__", ".venv", "venv", ".pytest_cache"}
EXCLUDED_FILES = {".DS_Store", "Thumbs.db"}


def site_files(root):
    for current, dirs, names in os.walk(root):
        dirs[:] = sorted(name for name in dirs if name not in EXCLUDED_DIRS)
        for name in sorted(names):
            if name in EXCLUDED_FILES:
                continue
            file = Path(current) / name
            if not file.is_file():
                continue
            if not file.resolve().is_relative_to(root):
                raise ValueError(f"El archivo enlazado está fuera del proyecto: {file.relative_to(root)}")
            yield file


def create_backup(root, destination):
    root = Path(root).resolve()
    destination = Path(destination).resolve()
    if not (root / "index.html").is_file():
        raise ValueError("El proyecto debe contener index.html en su carpeta principal.")
    if destination.is_relative_to(root):
        raise ValueError("El destino debe estar fuera del proyecto para evitar respaldos recursivos.")
    destination.mkdir(parents=True, exist_ok=True)
    stamp = datetime.now(timezone.utc).strftime("%Y%m%d-%H%M%S")
    with tempfile.NamedTemporaryFile(prefix=f"BADBEAR-{stamp}-", suffix=".zip", dir=destination, delete=False) as tmp:
        archive = Path(tmp.name)
    manifest = []
    try:
        with zipfile.ZipFile(archive, "w", compression=zipfile.ZIP_STORED, allowZip64=True) as bundle:
            for file in site_files(root):
                relative = file.relative_to(root).as_posix()
                before = file.stat()
                bundle.write(file, arcname=relative)
                after = file.stat()
                if (before.st_size, before.st_mtime_ns) != (after.st_size, after.st_mtime_ns):
                    raise ValueError(f"El archivo cambió durante el respaldo: {relative}. Repite cuando termine la edición.")
                manifest.append({"path": relative, "bytes": after.st_size})
        with zipfile.ZipFile(archive) as bundle:
            bad = bundle.testzip()
            if bad:
                raise ValueError(f"No pasó la comprobación del ZIP: {bad}")
        digest = hashlib.sha256()
        with archive.open("rb") as src:
            for chunk in iter(lambda: src.read(1024 * 1024), b""):
                digest.update(chunk)
        checksum = archive.with_suffix(".zip.sha256")
        checksum.write_text(f"{digest.hexdigest()}  {archive.name}\n", encoding="utf-8")
        inventory = archive.with_suffix(".manifest.json")
        inventory.write_text(json.dumps({
            "project": "BADBEAR.MED · WAJOMEA.GROUP",
            "created_utc": datetime.now(timezone.utc).isoformat(),
            "archive": archive.name,
            "sha256": digest.hexdigest(),
            "files": manifest,
        }, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    except Exception:
        archive.unlink(missing_ok=True)
        archive.with_suffix(".zip.sha256").unlink(missing_ok=True)
        archive.with_suffix(".manifest.json").unlink(missing_ok=True)
        raise
    return archive, len(manifest)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--proyecto", type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument("--destino", type=Path, help="Carpeta de respaldo fuera del proyecto.")
    args = parser.parse_args()
    destination = args.destino or args.proyecto.resolve().parent / "RESPALDOS-BADBEAR"
    try:
        archive, count = create_backup(args.proyecto, destination)
    except (OSError, ValueError, zipfile.BadZipFile) as error:
        parser.exit(1, f"No se pudo crear el respaldo: {error}\n")
    print(f"Respaldo verificado: {archive}")
    print(f"Archivos incluidos: {count}")
    print("Conserva el ZIP, su archivo .sha256 y su manifiesto fuera del repositorio.")


if __name__ == "__main__":
    main()
