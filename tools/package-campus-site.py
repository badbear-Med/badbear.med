"""Package tracked website assets for the Campus gateway without modifying sources."""
import argparse
import hashlib
import json
from pathlib import Path
import shutil
import subprocess

MAX_STATIC = 25 * 1024 * 1024
PRIVATE_EXTENSIONS = {".sql", ".ps1", ".sh", ".toml", ".py", ".md", ".mjs"}
PRIVATE_PARTS = {"gateway", "piloto", "migrations", "node_modules", "tests", "test", "tools", "docs"}
PRIVATE_NAMES = {"CNAME", "wrangler.json", "wrangler.jsonc", "package.json", "package-lock.json", "worker-backend.js"}


def package(repository, output):
    tracked = subprocess.check_output(["git", "ls-files", "-z"], cwd=repository)
    static = output / "static"
    large = output / "large"
    static.mkdir(parents=True)
    large.mkdir()
    manifest = {}
    for name in tracked.decode("utf-8").split("\0"):
        if not name:
            continue
        relative = Path(name)
        if (any(part.startswith(".") or part in PRIVATE_PARTS for part in relative.parts)
                or relative.name in PRIVATE_NAMES or relative.suffix.lower() in PRIVATE_EXTENSIONS):
            continue
        source = repository / relative
        if source.is_symlink() or not source.is_file():
            raise ValueError(f"Expected a regular checked-out file: {name}")
        if source.stat().st_size > MAX_STATIC:
            with source.open("rb") as stream:
                digest = hashlib.file_digest(stream, "sha256").hexdigest()
            destination = large / digest
            manifest[relative.as_posix()] = {"key": f"campus-site/{digest}", "bytes": source.stat().st_size}
        else:
            destination = static / relative
        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(source, destination)
    for required in ("index.html", "badbear-med.html", "badbear-campus/index.html"):
        if not (static / required).is_file():
            raise ValueError(f"Missing required site entry: {required}")
    (output / "large-assets.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("output", type=Path, help="New output directory")
    args = parser.parse_args()
    root = Path(subprocess.check_output(["git", "rev-parse", "--show-toplevel"], text=True).strip())
    package(root, args.output.resolve())
