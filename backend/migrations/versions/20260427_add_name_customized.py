"""add name_customized to users

Revision ID: 7a1d4c2e08f1
Revises: 460faca60550
Create Date: 2026-04-27 00:00:00.000000

用户在 /profile 改名后置为 1，Google 登录同步时仅在 0 状态下覆盖 name。
"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '7a1d4c2e08f1'
down_revision: Union[str, Sequence[str], None] = '460faca60550'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(
            sa.Column(
                'name_customized',
                sa.Boolean(),
                nullable=False,
                server_default=sa.text('0'),
                comment='用户是否在 /profile 编辑过 name；为 1 时 Google 登录不再覆盖',
            )
        )


def downgrade() -> None:
    """Downgrade schema."""
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('name_customized')
