"""Comprueba respaldo, integridad, rutas y restauración con archivos de prueba."""

import hashlib
import importlib.util
import json
from pathlib import Path
import tempfile
import unittest
import zipfile

spec = importlib.util.spec_from_file_location("respaldo", Path(__file__).with_name("respaldo-sitio.py"))
respaldo = importlib.util.module_from_spec(spec)
spec.loader.exec_module(respaldo)


class BackupTests(unittest.TestCase):
    def test_restore_and_integrity(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp) / "site"
            root.mkdir()
            files = {
                "index.html": b"<!doctype html><title>BADBEAR.MED</title>",
                "badbear-music/audios/canci\u00f3n.mp3": bytes(range(256)),
                "badbear-books/libros/libro.pdf": b"%PDF-original",
                "assets/css/style.css": b"body { color: blue; }",
            }
            for name, content in files.items():
                path = root / name
                path.parent.mkdir(parents=True, exist_ok=True)
                path.write_bytes(content)
            (root / ".git").mkdir()
            (root / ".git/config").write_text("No debe incluirse")
            (root / "node_modules").mkdir()
            (root / "node_modules/module.js").write_text("Dependencia")
            destination = Path(tmp) / "backup"
            archive, count = respaldo.create_backup(root, destination)
            self.assertEqual(count, len(files))
            inventory = json.loads(archive.with_suffix(".manifest.json").read_text())
            self.assertEqual(inventory["sha256"], hashlib.sha256(archive.read_bytes()).hexdigest())
            self.assertTrue(archive.with_suffix(".zip.sha256").is_file())
            restored = Path(tmp) / "restored"
            with zipfile.ZipFile(archive) as bundle:
                self.assertEqual(set(bundle.namelist()), set(files))
                bundle.extractall(restored)
            for name, content in files.items():
                self.assertEqual((restored / name).read_bytes(), content)
            second, _ = respaldo.create_backup(root, destination)
            self.assertNotEqual(second, archive)
            self.assertTrue(archive.exists())

    def test_reject_recursive_and_missing_projects(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            with self.assertRaises(ValueError):
                respaldo.create_backup(root, root / "backups")
            (root / "index.html").write_text("BADBEAR")
            with self.assertRaises(ValueError):
                respaldo.create_backup(root, root / "backups")


if __name__ == "__main__":
    unittest.main()
