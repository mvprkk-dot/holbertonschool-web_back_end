#!/usr/bin/env python3
"""
example
"""
from typing import Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """
    example
    """

    return ((page - 1) * page_size, page * page_size)
