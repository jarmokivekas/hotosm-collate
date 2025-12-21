"""Command-line entry point for the renderer."""

from pathlib import Path
import argparse
from .renderer import render_all

def main(argv=None):
    parser = argparse.ArgumentParser(
        prog="hotosm-render",
        description="Render markdown files in /app to HTML using Jinja2 templates in /_layouts",
    )
    parser.add_argument(
        "--source", "-s", default="app", help="Source directory containing .md files (default: app)"
    )
    parser.add_argument(
        "--layouts", "-l", default="_layouts", help="Directory containing Jinja2 layout templates (default: _layouts)"
    )
    args = parser.parse_args(argv)

    source = Path(args.source)
    layouts = Path(args.layouts)

    try:
        generated = render_all(source, layouts)
        print("Generated files:")
        for p in generated:
            print(" -", p)
    except Exception as e:
        print("Error:", e)
        raise

if __name__ == "__main__":
    main()