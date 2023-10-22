package com.cvmaker.api.util

import java.util.Optional

fun <T: Any> Optional<T>.asNullable(): T? = this.orElse(null)

inline fun <E: Any, T: Collection<E>> T?.withNotNullOrEmpty(func: T.() -> Unit) {
    if (!this.isNullOrEmpty()) {
        with (this) { func() }
    }
}