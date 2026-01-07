"""Run Campus Connect backend and Research portal together."""
from __future__ import annotations

import subprocess
import sys
import time
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent

CAMPUS_APP = BASE_DIR / "backend" / "app.py"
RESEARCH_APP = BASE_DIR / "backend" / "research_campus_connect" / "app.py"


def _launch(name: str, script_path: Path, cwd: Path | None = None) -> subprocess.Popen:
    if not script_path.exists():
        raise FileNotFoundError(f"{name} script not found at {script_path}")

    print(f"Starting {name} ({script_path}) ...")
    return subprocess.Popen([sys.executable, str(script_path)], cwd=cwd)


def main() -> None:
    processes: list[tuple[str, subprocess.Popen]] = []
    try:
        # Use cwd so relative static/template paths in research app resolve correctly
        processes.append(("campus-connect", _launch("Campus Connect", CAMPUS_APP, cwd=BASE_DIR / "backend")))
        processes.append(("research-portal", _launch("Research Portal", RESEARCH_APP, cwd=BASE_DIR / "backend" / "research_campus_connect")))

        print("Both servers started. Ctrl+C to stop.")

        while True:
            time.sleep(1)
            for name, proc in list(processes):
                code = proc.poll()
                if code is not None:
                    print(f"{name} exited with code {code}. Shutting down remaining processes.")
                    raise SystemExit(code)
    except KeyboardInterrupt:
        print("Stopping servers ...")
    finally:
        for name, proc in processes:
            if proc.poll() is None:
                print(f"Terminating {name} ...")
                proc.terminate()
                try:
                    proc.wait(timeout=5)
                except subprocess.TimeoutExpired:
                    print(f"Force killing {name} ...")
                    proc.kill()


if __name__ == "__main__":
    main()
