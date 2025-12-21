"""Core rendering utilities: parse front matter, render a single file, render all markdown files."""

from pathlib import Path
import yaml
from jinja2 import Environment, FileSystemLoader, select_autoescape
import markdown as md

def parse_front_matter(text: str):
    """Parse YAML front matter if present.

    Returns a tuple (meta: dict, content: str).
    If no front matter is present, meta will be an empty dict and content is the full text.

    Raises:
      ValueError if front matter exists but cannot be parsed into a dict.
    """
    if text.startswith("---"):
        # Split into lines and find the closing '---' line
        lines = text.splitlines()
        end_idx = None
        for i in range(1, len(lines)):
            if lines[i].strip() == "---":
                end_idx = i
                break
        if end_idx is None:
            raise ValueError("Front matter start found but no closing '---' line")

        front = "\n".join(lines[1:end_idx])
        content = "\n".join(lines[end_idx + 1 :])
        meta = yaml.safe_load(front) or {}
        if not isinstance(meta, dict):
            raise ValueError("Parsed front matter is not a mapping/dictionary")
        return meta, content
    else:
        return {}, text

def render_file(src_path: Path, layouts_dir: Path, output_path: Path = None):
    """Render a single markdown file to HTML using a Jinja2 template from layouts_dir.

    - src_path: Path to .md file
    - layouts_dir: Path to directory containing layout templates (template name = <layout>.html)
    - output_path: where to write the generated HTML (defaults to replacing .md with .html next to source)

    The function will parse YAML front matter from the markdown file and pass `meta` and
    `content` (converted to HTML) into the template context.

    Raises:
      RuntimeError if the requested template is not found.
      ValueError for malformed front matter.
    """
    text = src_path.read_text(encoding="utf-8")
    meta, markdown_content = parse_front_matter(text)

    # Enforce that layout is present and a string; fail fast for incorrect data
    layout = meta.get("layout", "default")
    if not isinstance(layout, str) or not layout:
        raise ValueError(f"Expected a non-empty string `layout` in front matter of {src_path}")

    template_name = f"{layout}.html"

    env = Environment(
        loader=FileSystemLoader(str(layouts_dir)),
        # autoescape=select_autoescape(["html", "xml"]),
    )

    try:
        template = env.get_template(template_name)
    except Exception as e:
        raise RuntimeError(f"Template '{template_name}' not found in {layouts_dir}: {e}")

    # Convert markdown to HTML. Use common useful extensions.
    html_content = md.markdown(markdown_content, extensions=["extra", "toc", "tables"])

    # Provide template with: content (HTML), meta (front matter), and source path
    rendered = template.render(content=html_content, meta=meta, source=str(src_path))

    if output_path is None:
        output_path = src_path.with_suffix(".html")

    output_path.write_text(rendered, encoding="utf-8")
    return output_path

def render_all(source_dir: Path = Path("app"), layouts_dir: Path = Path("_layouts")):
    """Render all .md files found under source_dir (recursive).

    Returns a list of generated file paths.

    Behavior:
    - Walks recursively under source_dir and renders every '*.md' file it finds.
    - For each .md file, chooses layout via front-matter `layout`; defaults to 'default'.
    - Writes output .html next to the source .md file (replacing the extension).
    """
    source_dir = Path(source_dir)
    layouts_dir = Path(layouts_dir)

    if not source_dir.exists():
        raise FileNotFoundError(f"Source directory {source_dir} does not exist")
    if not layouts_dir.exists():
        raise FileNotFoundError(f"Layouts directory {layouts_dir} does not exist")

    generated = []
    for md_file in source_dir.rglob("*.md"):
        print(f"Rendering {md_file}")
        out = render_file(md_file, layouts_dir)
        generated.append(out)
    return generated