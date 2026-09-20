<script>
	import { cn } from "$lib/utils.js";
	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	} = $props();
</script>

<div
	bind:this={ref}
	data-slot="bubble-group"
	class={cn("gap-2 flex min-w-0 flex-col", className)}
	{...restProps}
>
	{@render children?.()}
</div>