import { component$, Slot, useStyles$ } from "@builder.io/qwik";

import styles from './index.css?inline'

export default component$(() => {
    useStyles$(styles)

    return <div class="two-columns">
        <div class="two-columns__column two-columns__column--left">
            <Slot name="left" />
        </div>
        <div class="two-columns__column two-columns__column--right">
            <Slot name="right" />
        </div>
    </div>

})