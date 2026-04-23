#!/bin/bash
set -e
cd "$(dirname "$0")"
uv sync
uv run python -m style_vault.app.main
